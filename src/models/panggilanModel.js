import mongoose from "mongoose";

const panggilanSchema = new mongoose.Schema({
    nomorPerkara: {
        type: String,
        required: true,
        trim: true
    },
    pihak: {
        type: String,
        required: true
    },
    alamat: {
        type: String
    },
    jenisPanggilan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JenisPanggilan'
    },
    tglKirim: {
        type: Date
    },
    nomorKirim:{
        type: String
    },
    tglPelaksanaan: {
        type: Date
    },
    hasilPanggilan: {
        type: String
    },
    desc: {
        type: String
    },
    jurusita: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jurusita'
    },
    edoc: {
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

const Panggilan = mongoose.model('Panggilan', panggilanSchema)

export default Panggilan;