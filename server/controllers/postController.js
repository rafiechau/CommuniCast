const fs = require('fs');
const path = require('path');
const { Post, User, Vote } = require('../models');
const { handleServerError, handleSuccess, handleResponse, handleNotFound, handleCreated } = require("../helpers/handleResponseHelper");
const { validateJoi, schemaPost } = require('../helpers/joiHelper');

exports.getPosts = async (req, res) => {
    try{
        const { id } = req;
        const userId = id;
        
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

        for (let post of posts) {
            const hasVoted = await Vote.findOne({ where: { postId: post.id, userId } });
            post.dataValues.hasVoted = !!hasVoted;
        }
        
        return handleSuccess(res, { message: "success retrieved from database", data: posts  });
    }catch(error){
        console.log(error);
        return handleServerError(res);
    }
}

exports.checkUserVote = async (req, res) => {
    try {
        const { postId } = req.params;
        const { id } = req;
        const userId = id;

        const vote = await Vote.findOne({
            where: {
                userId: userId,
                postId: postId
            }
        });

        const hasVoted = vote !== null;
        return res.json({ hasVoted });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


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
        const { id } = req;
        const userId = id;
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

exports.updatePost = async (req, res) => {
    try {
        const imagePath = req?.file?.path;
        const postId = req.params.postId;
        const postData = req.body;
        const userId = 1;

        const { error, handleRes } = validateJoi(res, postData, schemaPost);
        if (error) {
            return handleRes;
        }

        const currentPost = await Post.findOne({ where: { id: postId, userId: userId } });
        if (!currentPost) {
            return handleResponse(res, 404, { message: 'Post not found or access denied' });
        }

        if (imagePath) {
            postData.image = imagePath.replace(/\//g, '\\'); // Mengganti semua slash dengan backslash

            const fullOldImagePath = path.join(__dirname, '.', currentPost.image); // Pastikan path ini benar
            fs.unlink(fullOldImagePath, (err) => {
                if (err) {
                    console.error('Failed to delete old image:', err);
                }
            });
        }

        await Post.update(postData, { where: { id: postId } });
        return handleCreated(res, { message: "success" });
    } catch (error) {
        console.log(error);
        return handleServerError(res);
    }
};


exports.deletePost = async(req, res) => {
    try{
        const postId = req.params.postId
        const userId = 1
        const role = "pro"

        if (role !== "pro") {
            return res.status(403).json({ message: 'Unauthorized: Only users with "pro" role can delete posts.' });
        }

        const postToDelete = await Post.findOne({ where: { id: postId, userId: userId } });
        if (!postToDelete) {
            return res.status(404).json({ message: "Post not found or you're not authorized to delete this post." });
        }

        await postToDelete.destroy();
        return res.status(200).json({ message: 'Post successfully deleted.' });
    }catch(error){
        console.log(error);
        return handleServerError(res);
    }
}

//login
exports.likePost = async (req, res) => {

    try{
        const { postId } = req.params
        const { id } = req;
        const userId = id;
        const { voteValue } = req.body
        // const userId = 1;

        const [vote, created ] = await Vote.findOrCreate({
            where: { userId, postId },
            defaults: {userId, postId, value: voteValue}
        })

        if(!created && vote.value !== voteValue){
            vote.value = voteValue
            await vote.save()
        }

        const totalLikes = (await Vote.sum('value', { where: { postId } })) || 0;
        await Post.update({ voteCount: totalLikes }, { where: { id: postId } });

        const updatedPost = await Post.findByPk(postId, {
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['id', 'fullName', 'email'],
              },
            ],
            attributes: { exclude: ['userId'] },
          });
      
          return handleResponse(res, 200, {
            updatedPost,
            message: 'Voted post.',
          });
    }catch(error){
        console.log(error);
        return handleServerError(res);
    }
}

exports.unlikePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { id } = req;
        const userId = id; 

        const vote = await Vote.findOne({
            where: { userId, postId }
        });

        if (vote) {
            await vote.destroy();

            const totalLikes = (await Vote.sum('value', { where: { postId } })) || 0;
            await Post.update({ voteCount: totalLikes }, { where: { id: postId } });

            const updatedPost = await Post.findByPk(postId, {
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'fullName', 'email'],
                    },
                ],
                attributes: { exclude: ['userId'] },
            });

            return handleResponse(res, 200, {
                updatedPost,
                message: 'Unliked post successfully.',
            });
        } else {
            return handleResponse(res, 404, { message: 'Vote not found.' });
        }
    } catch (error) {
        console.log(error);
        return handleServerError(res);
    }
};
