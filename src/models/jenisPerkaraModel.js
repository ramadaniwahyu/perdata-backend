import mongoose from "mongoose"

const jenisPerkaraSchema = new mongoose.Schema({
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

const JenisPerkara= mongoose.model('JenisPerkara', jenisPerkaraSchema)

export default JenisPerkara;