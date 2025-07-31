import mongoose from "mongoose"

const jenisPanggilanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
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

const JenisPanggilan = mongoose.model('JenisPanggilan', jenisPanggilanSchema)

export default JenisPanggilan;