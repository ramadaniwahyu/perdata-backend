import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profileImage: {
        type: String,
        default: ""
    },
    role : {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
        select: false
    }
},{
    timestamps: true
});

// hashing password before saving to db
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    
    // const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, 10);

    // if (this.profileImage) return next();

    // this.profileImage = `https://robohash.org/${this.name}`

    next();
});


// compare password func
userSchema.methods.comparePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password)
}

const User = mongoose.model("User", userSchema);

export default User;