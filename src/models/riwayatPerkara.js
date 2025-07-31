import mongoose from "mongoose"

const riwayatPerkaraSchema = new mongoose.Schema({
    tanggal: {
        type: Date,
        required: true,
        trim: true
    },
    tahapan: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false,
        select: false
    }
}, {
    timestamps: true
})

const RiwayatPerkara= mongoose.model('JenisPerkara', riwayatPerkaraSchema)

export default RiwayatPerkara;