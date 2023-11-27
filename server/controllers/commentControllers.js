const { User, Comment, Post } = require("../models");
const Joi = require("joi")

const postComment = async (req, res) => {
  try {
    // const userId = req.id
    // const { id } = req.params
    const userId = 1;
    const id = 1;
    const transSchema = Joi.object({
      comment: Joi.string().required(),
    });

    const { error, value } = transSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { comment } = value;

    const createComment = await Comment.create({ comment , postId: id, userId })
    res.status(201).json({
      createComment,
      message: 'Success add comment'
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  postComment
}