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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error, handleRes } = validateJoi(
      res,
      { email, password },
      schemaUser,
      ["email", "password"]
    );
    if (error) {
      return handleRes;
    }
    const dataUser = await User.findOne({
      where: { email: email },
    });

    if (!dataUser || !comparePassword(password, dataUser?.password)) {
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
    return handleServerError(res);
  }
};

exports.register = async (req, res) => {
  try {
    const newUser = req.body;
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
    console.log(error);
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
