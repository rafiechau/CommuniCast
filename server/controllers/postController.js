const { Post } = require('../models');
const { handleServerError, handleResponse } = require("../helpers/handleResponseHelper")

exports.getPosts = async (req, res) => {
    try{
        const posts = await Post.findAll({
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: ['id', 'fullName', 'imagePath', ]
                },
            ],
            attributes: { exclude: ['userId'] },
            order: [['createdAt', 'DESC']]
        })
        return handleResponse(posts)
    }catch(error){
        console.log(error);
        return handleServerError(res)
    }
}