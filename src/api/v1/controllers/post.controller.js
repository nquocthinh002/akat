const PostModel = require('../models/post.model')

class StockController {

    // ================= GET ALL =================
    getPosts = async (req, res) => {
        try {
            const posts = await PostModel.find({ deleted: false })
                .select('stock priceClose description')
                .lean()

            return res.status(200).json({
                status: true,
                data: posts
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }



    // ================= CREATE =================
    createPost = async (req, res) => {
        try {
            const { userId, imageUrl, description } = req.body
            const newPost = await PostModel.create({
                userId,
                imageUrl,
                description
            })

            return res.status(201).json({
                status: true,
                data: newPost
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }

    // ================= UPDATE =================
    updatePost = async (req, res) => {
        try {
            const { imageUrl, description } = req.body

            const updateData = {
                ...(imageUrl !== undefined && { imageUrl }),
                ...(description !== undefined && { description })
            }

            const post = await PostModel.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true, runValidators: true }
            )

            if (!post) {
                return res.status(404).json({
                    status: false,
                    message: 'post not found'
                })
            }

            return res.status(200).json({
                status: true,
                data: post
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }
    // ================= DELETE (SOFT) =================
    deletePost = async (req, res) => {
        try {
            const post = await PostModel.findByIdAndUpdate(
                req.params.id,
                {
                    deleted: true,
                    deletedAt: new Date()
                },
                { new: true }
            )

            if (!post) {
                return res.status(404).json({
                    status: false,
                    message: 'post not found'
                })
            }

            return res.status(200).json({
                status: true,
                message: 'Deleted successfully'
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }



}

module.exports = new StockController()