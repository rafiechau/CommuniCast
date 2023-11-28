const { unlink } = require("fs");
const { Post, User } = require('../models');
const { handleServerError, handleSuccess, handleResponse, handleNotFound, handleCreated } = require("../helpers/handleResponseHelper");
const { validateJoi, schemaPost } = require('../helpers/joiHelper');

exports.getPosts = async (req, res) => {
    try{
        const posts = await Post.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'fullName', 'imagePath', ]
                },
            ],
            attributes: { exclude: ['userId'] },
            order: [['createdAt', 'DESC']]
        })
        
        return handleSuccess(res, { message: "success retrieved from database", data: posts  });
    }catch(error){
        console.log(error);
        return handleServerError(res);
    }
}


exports.getPostById = async(req, res) => {
    try{    
        const { postId } = req.params;
        const post = await Post.findByPk(postId, {
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'fullName', 'imagePath', ]
                }
            ],
            attributes: { exclude: ['userId'] },
        })
        if(!post){
            return handleResponse(res, 404, { message: 'Post not found.' });
        }
        return handleResponse(res, 200, post);
    }catch(error){
        console.log(error);
        return handleServerError(res);
    }
}


exports.createPost = async (req, res) => {
    try{
        const image = req.file ? req.file.path : null;
         const postData = { ...req.body, ...(image && { image }) };
        const userId = 1;
        const { error, handleRes } =  validateJoi(res, postData, schemaPost)
        if(error){
            return handleRes
        }

        
        const post = await Post.create({
            ...postData,
            userId
        })
        

        return handleCreated(res, {
            message: "success, Your post has been created",
            data: post
        });
    }catch(error){
        console.log(error);
        return handleServerError(res);
    }
}

// exports.updatePost = async (req, res) => {
//     try{
//         const postId = req.params.postId;
//         const postData = req.body;
//         const userId = 2;

//         const existingPost = await Post.findByPk(postId);
//         if (!existingPost) {
//             return handleNotFound(res, 'Post not found or access denied');
//         }

        

//          // Handle pengunggahan gambar baru
//          if (req.file) {
//             const imagePath = req.file.path;
//             postData.imagePath = imagePath;

//             // Hapus gambar lama
//             if (existingPost.imagePath) {
//                 const oldImagePath = path.join(__dirname, '..', existingPost.imagePath);
//                 unlink(oldImagePath, (err) => {
//                     if (err) console.error('Failed to delete old image:', err);
//                 });
//             }
//         }

//         // Validasi input
//         const { error } = validateJoi(postData, schemaPost);
//         if (error) {
//             return handleResponse(res, 400, { message: error.details[0].message });
//         }

//         console.log(postData)
//         // Perbarui data
//         await Post.update(postData, { where: { id: postId, userId } });

//         return handleCreated(res, {
//             message: "Post updated successfully",
//             post: await Post.findByPk(postId)
//         });
//     }catch(error){
//         console.log(error);
//         return handleServerError(res);
//     }
// }
