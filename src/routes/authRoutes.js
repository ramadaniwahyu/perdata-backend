import express from "express";
import authCtrl from "../controllers/authCtrl.js";
import auth from "../middleware/auth.js"

const router = express.Router();

router.route('/profile')
    .get(auth, authCtrl.getInfo)
    .patch(auth, authCtrl.updateInfo)
    .put(auth, authCtrl.changePassword)

router.post('/login', authCtrl.login)
router.post('/register', authCtrl.register)
router.get('/logout', authCtrl.logout)
router.get('/refresh_token', authCtrl.refreshToken)

export default router;