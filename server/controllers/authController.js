const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");

const {
  handleServerError,
  handleSuccess,
  handleResponse,
  handleNotFound,
} = require("../helpers/handleResponseHelper");
const { validateJoi, schemaUser } = require("../helpers/joiHelper");
const {
  handleSendMailForgotPass,
  handleSendMailVerifyOTP,
} = require("../helpers/sendMailHelper");

const { comparePassword, hashPassword } = require("../utils/bcryptUtil");
const {
  createToken,
  createTokenForForgetPassword,
  createTokenVerifyEmail,
} = require("../utils/jwtUtil");

const { User, Art, sequelize } = require("../models");

dotenv.config();

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const plainPassword = CryptoJS.AES.decrypt(
      password,
      process.env.CRYPTOJS_SECRET
    ).toString(CryptoJS.enc.Utf8);

    const { error, handleRes } = validateJoi(
      res,
      { email, password: plainPassword },
      schemaUser,
      ["email", "password"]
    );
    if (error) {
      return handleRes;
    }
    const dataUser = await User.findOne({
      where: { email: email },
    });

    if (!dataUser || !comparePassword(plainPassword, dataUser?.password)) {
      return handleResponse(res, 400, { message: "invalid email or password" });
    }
    const token = createToken(dataUser);
    if (!token) {
      throw new Error("Token Created failed");
    }
    return handleSuccess(res, {
      token: token,
      message: "Login success",
    });
  } catch (error) {
    console.log(process.env.CRYPTOJS_SECRET, "<<<<<<<<<<<<<<<<<<");
    console.log(error, "<<<<<<<<<<<<<<<<<<");
    return handleServerError(res);
  }
};

exports.register = async (req, res) => {
  try {
    const newUser = req.body;

    const plainPassword = CryptoJS.AES.decrypt(
      newUserpassword,
      process.env.CRYPTOJS_SECRET
    ).toString(CryptoJS.enc.Utf8);

    newUser.password = plainPassword;

    const { error, handleRes } = validateJoi(res, newUser, schemaUser);
    if (error) {
      return handleRes;
    }
    const isExist = await User.findOne({ where: { email: newUser.email } });
    if (isExist) {
      return handleResponse(res, 400, {
        message: "user with that email already existed",
      });
    }
    const response = await User.create(newUser);
    return handleSuccess(res, {
      data: response,
      message: `success register with name : ${response.fullName}`,
    });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const dataUser = await User.findOne({ where: { email: email } });
    if (dataUser) {
      return handleResponse(res, 400, {
        message: "user with that email already existed",
      });
    }
    const OTP = Math.floor(Math.random() * 9000 + 1000);
    const status = handleSendMailVerifyOTP(OTP, email);
    if (status) {
      return handleSuccess(res, {
        data: {
          token: createTokenVerifyEmail(OTP, email),
          expire: Date.now() + 2 * 60 * 1000,
        },
        message: "OTP sent to email",
      });
    }
    return handleSuccess(res, {
      message: "Email for OTP verify failed to sent",
    });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.checkOtpVerifyEmail = async (req, res) => {
  try {
    const { otp } = req.body;
    const { otpJWT, email } = req;
    const dataUser = await User.findOne({ where: { email: email } });
    if (dataUser) {
      return handleResponse(res, 400, {
        message: "user with that email already existed",
      });
    }
    if (otp != otpJWT) {
      return handleResponse(res, 404, { message: "OTP Invalid" });
    }
    return handleSuccess(res, { message: "success verify" });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const isUserExist = await User.findOne({ where: { email: email } });
    if (!isUserExist) {
      return handleNotFound(res);
    }
    const token = createTokenForForgetPassword(email);
    const resp = await handleSendMailForgotPass(token, email);
    if (resp.accepted.length > 0) {
      return handleSuccess(res, {
        message: "Check your email for forgot password",
      });
    } else {
      return handleSuccess(res, {
        message: "Email for forgot password failed to sent",
      });
    }
  } catch (error) {
    return handleServerError(res);
  }
};

exports.setResetPassword = async (req, res) => {
  try {
    const { email } = req;
    const { new_password } = req.body;

    const plainPassword = CryptoJS.AES.decrypt(
      new_password,
      process.env.CRYPTOJS_SECRET
    ).toString(CryptoJS.enc.Utf8);

    const isUserExist = await User.findOne({ where: { email: email } });
    if (!isUserExist) {
      return handleNotFound(res);
    }
    await User.update(
      { password: hashPassword(plainPassword) },
      { where: { email: email } }
    );
    return handleSuccess(res, {
      message: "Success reset password",
    });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.editProfile = async (req, res) => {
  try {
    const { id, role } = req;
    const newUser = req.body;
    const fieldtoEdit = Object.keys(newUser);
    const { error, handleRes } = validateJoi(
      res,
      newUser,
      schemaUser,
      fieldtoEdit
    );
    const isExist = await User.findOne({ where: { id: id } });
    if (!isExist) {
      return handleNotFound(res);
    }

    if (error) {
      return handleRes;
    }
    if (
      fieldtoEdit.includes("role") &&
      newUser.role != isExist.role &&
      role != "admin"
    ) {
      return handleResponse(res, 403, {
        message: "you dont have access to change role",
      });
    }
    const result = await sequelize.transaction(async (tsc) => {
      if (newUser.role && role === "admin" && isExist.role !== newUser.role) {
        if (newUser.role === "admin") {
          const isExistinArt = await Art.findOne({
            where: { userId: isExist.id },
          });
          if (isExistinArt) {
            await Art.destroy({
              where: { userId: isExist.id },
              transaction: tsc,
            });
          }
        }
      }
      const response = await isExist.update(newUser);
      return response;
    });
    return handleSuccess(res, {
      data: result,
      message: "success edit profile",
    });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { id } = req;
    const response = await User.findByPk(id);
    if (!response) {
      return handleNotFound(res);
    }
    delete response.password;
    return handleSuccess(res, { data: response, message: "success" });
  } catch (error) {
    return handleServerError(res);
  }
};
