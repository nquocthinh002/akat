const StockModel = require('../models/stock.model')

class StockController {

    // ================= GET ALL =================
    getStocks = async (req, res) => {
        try {
            const stocks = await StockModel.find({ deleted: false })
                .select('stock priceClose description')
                .lean()

            return res.status(200).json({
                status: true,
                data: stocks
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }

    // ================= GET BY ID =================
    getStockById = async (req, res) => {
        try {
            const stock = await StockModel.findOne({
                _id: req.params.id,
                deleted: false
            }).lean()

            if (!stock) {
                return res.status(404).json({
                    status: false,
                    message: 'Stock not found'
                })
            }

            return res.status(200).json({
                status: true,
                data: stock
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }

    // ================= CREATE =================
    createStock = async (req, res) => {
        try {
            const { stock, priceClose, description } = req.body

            const exist = await StockModel.findOne({ stock })
            if (exist) {
                return res.status(400).json({
                    status: false,
                    message: 'Stock already exists'
                })
            }

            const newStock = await StockModel.create({
                stock,
                priceClose,
                description
            })

            return res.status(201).json({
                status: true,
                data: newStock
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }

    // ================= UPDATE =================
    updateStock = async (req, res) => {
        try {
            const { priceClose, description } = req.body

            const updateData = {
                ...(priceClose !== undefined && { priceClose }),
                ...(description !== undefined && { description })
            }

            const stock = await StockModel.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true, runValidators: true }
            )

            if (!stock) {
                return res.status(404).json({
                    status: false,
                    message: 'Stock not found'
                })
            }

            return res.status(200).json({
                status: true,
                data: stock
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }
    // ================= DELETE (SOFT) =================
    deleteStock = async (req, res) => {
        try {
            const stock = await StockModel.findByIdAndUpdate(
                req.params.id,
                {
                    deleted: true,
                    deletedAt: new Date()
                },
                { new: true }
            )

            if (!stock) {
                return res.status(404).json({
                    status: false,
                    message: 'Stock not found'
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

    // ================= SEARCH =================
    searchStock = async (req, res) => {
        try {
            const { q } = req.query

            const stocks = await StockModel.find({
                stock: { $regex: q, $options: 'i' },
                deleted: false
            })
                .select('stock priceClose')
                .lean()

            return res.status(200).json({
                status: true,
                data: stocks
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