const ServiceUsage = require('../models/serviceUsage.model')
const User = require('../models/user.model')

exports.requestService = async (req, res) => {
    const service = await ServiceUsage.create({
        userId: req.user.id,
        planId: req.body.planId
    })

    res.json(service)
}

exports.assignBroker = async (req, res) => {
    const { brokerId } = req.body

    // check broker đang bận
    const busy = await ServiceUsage.findOne({
        brokerId,
        status: { $in: ['pending', 'processing'] }
    })

    if (busy) {
        return res.status(400).json({ msg: 'Broker is busy' })
    }

    const service = await ServiceUsage.findById(req.params.id)

    service.brokerId = brokerId
    service.status = 'processing'

    await service.save()

    res.json(service)
}

exports.completeService = async (req, res) => {
    const service = await ServiceUsage.findById(req.params.id)

    service.status = 'completed'

    await service.save()

    res.json(service)
}