const { User, Comment, Post } = require("../models");
const Joi = require("joi")

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
    // const { id } = req.params
    const userId = 1;
    const id = 1;
    const findComment = await Comment.findByPk(id);
    if (!findComment) return res.status(400).json({ error: error.details[0].message });

    const commentSchema = Joi.object({
      comment: Joi.string().required(),
    });


    const { error, value } = commentSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { comment } = value;

    const data = await Comment.update({ comment, postId: id, userId }, {
      where: { id: id },
      returning: true
    })
    res.status(201).json({
      data,
      status: 'Success Edit comment',
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  postComment,
  deleteComment,
  editComment
}