const Subscription = require('../models/subscription.model')

exports.subscribe = async (req, res) => {
    const { planId } = req.body

    const sub = await Subscription.create({
        userId: req.user.id,
        planId,
        startDate: new Date(),
        status: 'active'
    })

    res.json(sub)
}

exports.mySubscription = async (req, res) => {
    const subs = await Subscription.find({ userId: req.user.id })
    res.json(subs)
}