const { User, Comment, Post } = require("../models");
const Joi = require("joi");
const midtransClient = require('midtrans-client')
const {
  createToken,
} = require("../utils/jwtUtil");
const redisClient = require('../utils/redisClient');

const {
  handleServerError,
  handleSuccess,
  handleResponse,
  handleNotFound,
} = require("../helpers/handleResponseHelper");

const postComment = async (req, res) => {
  try {
    const userId = req.id
    const { id } = req.params
    const commentSchema = Joi.object({
      comment: Joi.string().required(),
    });

    const { error, value } = commentSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { comment } = value;

    const createComment = await Comment.create({ comment, postId: id, userId: userId })
    res.status(201).json({
      createComment,
      message: 'Success add comment'
    });
  } catch (err) {
    console.log(err);
  }
}

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params
    const comment = await Comment.findOne({ where: { id } });
    if (!comment) return res.status(400).json({ error: error.details[0].message });

    await Comment.destroy({ where: { id } });
    res.status(201).json({
      message: 'Success delete comment'
    });
  } catch (err) {
    console.log(err);
  }
}

const editComment = async (req, res) => {
  try {
    const { id } = req.params
    const findComment = await Comment.findOne({ where: { id } });
    if (!findComment) return res.status(400).json({ message: "error" });

    const commentSchema = Joi.object({
      comment: Joi.string().required(),
    });


    const { error, value } = commentSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { comment } = value;

    await Comment.update({ comment }, {
      where: { id: id },
      returning: true
    })
    res.status(201).json({
      findComment,
      status: 'Success Edit comment',
    });
  } catch (err) {
    console.log(err);
  }
}

const midtrans = async (req, res) => {
  try {
    const findUser = await User.findByPk(+req.id);
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });
    let parameter = {
      transaction_details: {
        order_id: Math.floor(Math.random() * 100000),
        gross_amount: 200000,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        email: findUser?.dataValues?.email,
        first_name: findUser?.dataValues?.fullName,
      },
    };
    const midtrans_token = await snap.createTransaction(parameter);
    res.status(201).json(midtrans_token);
  } catch (err) {
    console.log(err);
  }
}

const updateRoleStatus = async (req, res) => {
  try {
    const findUser = await User.findOne({ where: { id: req.id } });
    if (!findUser) return res.status(400).json({ message: "User not found" });

    if (findUser.role === 'pro') {
      return res.status(400).json({ message: "The role is already pro" })
    }
    await User.update({ role: "pro" }, {
      where: { id: req.id }
    })

    const findUpdateUser = await User.findOne({ where: { id: req.id } });
    const token = createToken(findUpdateUser);
    redisClient.setex(findUpdateUser.id.toString(), 24 * 60 * 60, token);
    if (!token) {
      throw new Error("Token Created failed");
    }
    return handleSuccess(res, {
      token: token,
      message: "success",
    });

  } catch (err) {
    console.log(err);
  }
}

const getCommentById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findOne({ where: { id: req.id } })
    const dataComment = await Comment.findAll({
      where: { postId: id },
      include: [
        {
          model: User,
          attributes: ["fullName", "imagePath", "id"]
        }
      ]
    })
    res.status(201).json({
      dataComment,
      user
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  postComment,
  getCommentById,
  deleteComment,
  editComment,
  midtrans,
  updateRoleStatus
}