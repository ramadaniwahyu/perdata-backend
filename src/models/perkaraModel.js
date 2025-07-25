import mongoose from "mongoose";

const riwayatSchema = new mongoose.Schema({
    tgl: Date,
    desc: String
})

const perkaraSchema = new mongoose.Schema({
    nomor: {
        type: Number,
        required: true
    },
    kodePerkara: {
        type: String,
        required: true
    },
    tahun: {
        type: Number,
        required: true
    },
    kodeSatker: {
        type: String,
        required: true
    },
    tglDaftar: {
        type: Date
    },
    tglPutusan: {
        type: Date
    },
    tglMinutasi: {
        type: Date
    },
    tglBht: {
        type: Date
    },
    riwayat: {
        type: [riwayatSchema]
    },
    isDeleted: {
        type: Boolean,
        default: false,
        select: false
    }
},{
    timestamps: true
});

const Perkara = mongoose.model('Perkara', perkaraSchema);

export default Perkara;