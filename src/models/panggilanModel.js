import mongoose from "mongoose";

const panggilanSchema = new mongoose.Schema({
    nomor_perkara: {
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
    jenis_panggilan: {
        type: String
    },
    tgl_kirim: {
        type: Date
    },
    nomor_kirim:{
        type: String
    },
    tgl_dilaksanakan: {
        type: Date
    },
    hasil_panggilan: {
        type: String
    },
    desc: {
        type: String
    },
    jurusita: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pegawai'
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

const Panggilan = mongoose.model('Panggilan', panggilanmongoose.Schema)

export default Panggilan;