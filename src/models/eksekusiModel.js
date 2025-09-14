import mongoose from "mongoose";

const pemohonSchema = new mongoose.Schema({
    nik: String,
    name: String,
    alamat: String,
    email: String,
    telp: String,
    tempat_lahir: String,
    tgl_lahir: Date,
})

const termohonSchema = new mongoose.Schema({
    nik: String,
    name: String,
    alamat: String,
    email: String,
    telp: String,
    tempat_lahir: String,
    tgl_lahir: Date,
})

const fileSchema = new mongoose.Schema({
    name: String,
    nomor: String,
    tgl: String,
    file: {
        url: String,
        location: String,
    }
})

const eksekusiSchema = new mongoose.Schema({
    nomorRegister: {
        type: String,
        required: true,
    },
    tglRegister: {
        type: Date,
        required: true
    },
    name: {
        type: String,
    },
    alamat: {
        type: String,
    },
    email: {
        type: String,
    },
    telp: {
        type: String,
    },
    rekening: {
        nomor: String,
        nama: String,
        bank: String
    },
    perkara: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Perkara'
    },
    pemohon: {
        type: [pemohonSchema]
    },
    termohon: {
        type: [termohonSchema]
    },
    jenis: {
        type: String,
    },
    attachment: {
        type: [fileSchema]
    },
    desc: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
        select: false
    }
}, {
    timestamps: true
});

const Eksekusi = mongoose.model('Eksekusi', eksekusiSchema);

export default Eksekusi;