const { User, Comment, Post } = require("../models");
const Joi = require("joi");
const { default: axios } = require("axios");
const midtransClient = require('midtrans-client')


const postComment = async (req, res) => {
  try {
    // const userId = req.id
    // const { id } = req.params
    const userId = 1;
    const id = 1;
    const commentSchema = Joi.object({
      comment: Joi.string().required(),
    });

    const { error, value } = commentSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { comment } = value;

    const createComment = await Comment.create({ comment, postId: id, userId })
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
    // const userId = req.id
    const { id } = req.params
    const userId = 1;
    // const id = 1;
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
    // const { payload } = req.body //ngirim id dari client
    // const findUser = await User.findByPk(+req.additionalData.userId);
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });
    let parameter = {
      transaction_details: {
        order_id: Math.floor(Math.random() * 100000),
        gross_amount: 10000,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        email: "GOD@Gmail.com",
        email: findUser.email,
      },
    };
    // const midtrans_token = await snap.createTransaction(parameter);
    // await User.update({ role: "pro" }, {
    //   where: { id: id }
    // })
    res.status(201).json(midtrans_token);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  postComment,
  deleteComment,
  editComment,
  midtrans
}