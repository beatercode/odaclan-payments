import dbConnect from "../../../utils/dbConnect";
import Payment from "../../../models/Payment"

dbConnect()

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const { method } = req

    switch (method) {
        case 'GET':
            try {
                const payments = await Payment.find({})
                res.status(200).json({ success: true, data: payments })
            } catch (err) {
                res.status(400).json({ success: false })
            }
            break;
        case 'POST':
            try {
                const payment = await Payment.create(req.body)
                res.status(201).json({ success: true, data: payment })
            } catch (err) {
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break
    }
}