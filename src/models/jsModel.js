import mongoose from "mongoose";

const jsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nip: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: false,
        select: false
    },
    isDeleted: {
        type: Boolean,
        default: false,
        select: false
    }
},{
    timestamps: true
});

const Js = mongoose.model('Jurusita', jsSchema);

export default Js;