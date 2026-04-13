const Signal = require('../models/signal.model')

// 🧩 Tạo Signal mới  
exports.createSignal = async (req, res) => {
  try {
    const signal = new Signal(req.body)
    await signal.save()
    res.status(201).json(signal)
  } catch (err) {
    res.status(500).json({ message: 'Lỗi tạo signal', error: err.message })
  }
}

// 🧩 Lấy danh sách tất cả signal
exports.getAllSignals = async (req, res) => {
  try {
    const signals = await Signal.find({ deleted: false })
    res.json(signals)
  } catch (err) {
    res.status(500).json({ message: 'Lỗi lấy danh sách signal', error: err.message })
  }
}

// 🧩 Lấy signal theo ID
exports.getSignalById = async (req, res) => {
  try {
    const signal = await Signal.findById(req.params.id)
    if (!signal) return res.status(404).json({ message: 'Không tìm thấy signal' })
    res.json(signal)
  } catch (err) {
    res.status(500).json({ message: 'Lỗi lấy signal', error: err.message })
  }
}

// 🧩 Cập nhật signal
exports.updateSignal = async (req, res) => {
  try {
    const signal = await Signal.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!signal) return res.status(404).json({ message: 'Không tìm thấy signal' })
    res.json(signal)
  } catch (err) {
    res.status(500).json({ message: 'Lỗi cập nhật signal', error: err.message })
  }
}

// 🧩 Xóa mềm signal
exports.deleteSignal = async (req, res) => {
  try {
    const signal = await Signal.findByIdAndUpdate(
      req.params.id,
      { deleted: true, deletedAt: new Date() },
      { new: true }
    )
    if (!signal) return res.status(404).json({ message: 'Không tìm thấy signal' })
    res.json({ message: 'Đã xóa signal', signal })
  } catch (err) {
    res.status(500).json({ message: 'Lỗi xóa signal', error: err.message })
  }
}
