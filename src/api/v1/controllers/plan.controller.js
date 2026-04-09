const Plan = require('../models/plan.model')

// 🧩 Tạo plan mới
exports.createPlan = async (req, res) => {
  try {
    const plan = new Plan(req.body)
    await plan.save()
    res.status(201).json(plan)
  } catch (err) {
    res.status(500).json({ message: 'Lỗi tạo plan', error: err.message })
  }
}

// 🧩 Lấy danh sách tất cả plan
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find({ deleted: false })
    res.json(plans)
  } catch (err) {
    res.status(500).json({ message: 'Lỗi lấy danh sách plan', error: err.message })
  }
}



// 🧩 Cập nhật plan
exports.updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!plan) return res.status(404).json({ message: 'Không tìm thấy plan' })
    res.json(plan)
  } catch (err) {
    res.status(500).json({ message: 'Lỗi cập nhật plan', error: err.message })
  }
}

// 🧩 Xóa mềm plan
exports.deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      { deleted: true, deletedAt: new Date() },
      { new: true }
    )
    if (!plan) return res.status(404).json({ message: 'Không tìm thấy plan' })
    res.json({ message: 'Đã xóa plan', plan })
  } catch (err) {
    res.status(500).json({ message: 'Lỗi xóa plan', error: err.message })
  }
}
