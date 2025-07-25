import jwt from "jsonwebtoken";
import User from "../models/userModel.js"

const createAccessToken = (user) => {
    return jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '11m' })
}
const createRefreshToken = (user) => {
    return jwt.sign({user}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

const authCtrl = {
    register: async (req, res) => {
        try {
            const { email, name, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ msg: "All field is required!" })
            }

            if (password.length < 6) {
                return res.status(400).json({ msg: "Password should be at least 6 characters long." })
            }

            if (name.length < 3) {
                return res.status(400).json({ msg: "Name should be at least 3 characters long." })
            }

            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ msg: "Email already exists" })
            }

            const profileImage = `https://robohash.org/${name}`;

            const user = new User({
                email, password, name, profileImage
            });

            await user.save();

            const accesstoken = createAccessToken(user._id)

            res.status(201).json({
                token: accesstoken,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    profileImage: user.profileImage
                },
            });

        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) return res.status(400).json({ msg: "All fields are required." });

            //check user if exist
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ msg: "User does not exist." });

            //check user if activated
            if (!user.isActive) return res.status(403).json({msg: "User is inactive."})

            //check password is correct
            const isPasswordCorrect = await user.comparePassword(password);
            if (!isPasswordCorrect) return res.status(400).json({ msg: "Invalid credentials." });

            // If login success , create access token and refresh token
            const accesstoken = createAccessToken(user._id)
            const refreshtoken = createRefreshToken(user._id)

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
            })

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                accesstoken: accesstoken
            });
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/api/refresh_token' })
            return res.json({ msg: "Keluar" })
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },
    refreshToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) return res.status(400).json({ msg: "Please login." })

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please login." })

                const accesstoken = createAccessToken({ id: user.id })

                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    accesstoken: accesstoken
                });
            })
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },
    getInfo: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password -is_admin -is_active');
            if (!user) return res.status(400).json({ msg: "User is not exist." });

            res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                });
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },
    updateInfo: async (req, res) => {
        try {
             const { name, email, password } = req.body;

             if (name.length < 3) 
                return res.status(400).json({ msg: "Name should be at least 3 characters long." })
            

            if (password.length < 6)
                return res.status(400).json({ msg: "Password's length is minimal 6 characters." })

            await User.findByIdAndUpdate({ _id: req.user.id }, {
                name, email, password
            }) 
            
            res.json({msg: "Profil updated."})
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },
    changePassword: async (req, res) => {
        try {
            const { oldPassword, newPassword } = req.body;

            const user = User.findOne({ _id: req.user.id });
            const isOldPasswordCorrect = await user.comparePassword(oldPassword);
            if (!isOldPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." });

            if (newPassword && newPassword.length < 6)
                return res.status(400).json({ msg: "Password's length is minimal 6 characters." })

            // Password Encryption
            const passwordHash = await bcrypt.hash(newPassword, 10)

            await User.findOneAndUpdate({ _id: req.user.id }, {
                password: passwordHash
            }, { new: true })

            res.status(200).json({ message: "Password updated" })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
}

export default authCtrl;