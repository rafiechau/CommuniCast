const fs = require('fs');
const path = require('path');
const { Post, User, Vote } = require('../models');
const { handleServerError, handleSuccess, handleResponse, handleNotFound, handleCreated } = require("../helpers/handleResponseHelper");
const { validateJoi, schemaPost } = require('../helpers/joiHelper');
const redisClient = require('../utils/redisClient');

exports.getPosts = async (req, res) => {
    try{
        const cachedJobs = await redisClient.get(process.env.REDIS_KEY_POST);
        const { id } = req;
        const userId = id;

        if(cachedJobs){
            return handleSuccess(res, { message: "Data from cache", data: JSON.parse(cachedJobs)  });
        }else{
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
            await redisClient.set(process.env.REDIS_KEY_POST, JSON.stringify(posts), 'EX', 100);
            return handleSuccess(res, { message: "success retrieved from database", data: posts  });
        }
    }catch(error){
        console.log(error);
        return handleServerError(res);
    }
}




exports.getAllPostsByUser = async (req, res) => {
    try {
        const { id } = req;
        const userId = id;
            const posts = await Post.findAll({
                where: { userId: userId },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'fullName', 'imagePath']
                    },
                ],
                order: [['createdAt', 'DESC']]
            });
    
            for (let post of posts) {
                const hasVoted = await Vote.findOne({ where: { postId: post.id, userId } });
                post.dataValues.hasVoted = !!hasVoted;
            }
    
            if (!posts || posts.length === 0) {
                return res.status(404).json({ message: 'No posts found for this user.' });
            }
            await redisClient.set(process.env.REDIS_KEY_MYPOST, JSON.stringify(posts), 'EX', 100);
            return handleSuccess(res, { message: "success retrieved from database", data: posts  });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


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
        const { id, role } = req;
        const userId = id;

        if (role === 'standard') {
            const redisKey = `postRateLimit:${userId}`;
            const lastPostTime = await redisClient.get(redisKey);

            if (lastPostTime) {
                const timeDiff = Date.now() - parseInt(lastPostTime);
                if (timeDiff < 60000) { // 1 menit
                    return res.status(429).json({ message: "Karna kamu belum bayar, maka kamu hanya bisa create post setiap 1 jam." });
                }
            }
           
            await redisClient.set(redisKey, Date.now().toString(), 'EX', 60); 
        }
        const { error, handleRes } =  validateJoi(res, postData, schemaPost)
        if(error){
            return handleRes
        }
       
        const post = await Post.create({
            ...postData,
            userId
        })

        try {
            const cacheExists = await redisClient.exists(process.env.REDIS_KEY_POST);
            if (cacheExists) {
                await redisClient.del(process.env.REDIS_KEY_POST);
                console.log('Cache cleared successfully');
            }
        } catch (cacheError) {
            console.error('Error while clearing cache:', cacheError);
        }
        

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
        const { id } = req;
        const userId = id;

        const { error, handleRes } = validateJoi(res, postData, schemaPost);
        if (error) {
            return handleRes;
        }

        const currentPost = await Post.findOne({ where: { id: postId, userId: userId } });
        if (!currentPost) {
            return handleResponse(res, 404, { message: 'Post not found or access denied' });
        }

        if (imagePath) {
            postData.image = imagePath.replace(/\//g, '\\'); 
        
            if (currentPost.image) {
                const fullOldImagePath = path.join(__dirname, '..', currentPost.image); 
    
                fs.unlink(fullOldImagePath, (err) => {
                    if (err) {
                        console.error('Failed to delete old image:', err);
                    }
                });
            }
        }

        await Post.update(postData, { where: { id: postId } });
        try {
            const cacheExists = await redisClient.exists(process.env.REDIS_KEY_POST);
            if (cacheExists) {
                await redisClient.del(process.env.REDIS_KEY_POST);
                console.log('Cache cleared successfully');
            }
        } catch (cacheError) {
            console.error('Error while clearing cache:', cacheError);
        }
        
        return handleCreated(res, { message: "success update data" });
    } catch (error) {
        console.log(error);
        return handleServerError(res);
    }
};


exports.deletePost = async(req, res) => {
    try{
        const postId = req.params.postId
        const { id } = req;
        const userId = id;

        const postToDelete = await Post.findOne({ where: { id: postId, userId: userId } });
        if (!postToDelete) {
            return res.status(404).json({ message: "Post not found or you're not authorized to delete this post." });
        }

        await postToDelete.destroy();
        try {
            const cacheExists = await redisClient.exists(process.env.REDIS_KEY_POST);
            if (cacheExists) {
                await redisClient.del(process.env.REDIS_KEY_POST);
                console.log('Cache cleared successfully');
            }
        } catch (cacheError) {
            console.error('Error while clearing cache:', cacheError);
        }
        
        return res.status(200).json({ message: 'Post successfully deleted.' });
    }catch(error){
        console.log(error);
        return handleServerError(res);
    }
}


exports.likePost = async (req, res) => {

    try{
        const { postId } = req.params
        const { id } = req;
        const userId = id;
        const { voteValue } = req.body

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
            message: 'Like post.',
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
