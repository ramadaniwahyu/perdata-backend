import express from "express";
import authCtrl from "../controllers/authCtrl.js";
import auth from "../middleware/auth.js"

const router = express.Router();

router.route('/profile')
    .get(auth, authCtrl.getInfo)
    .patch(auth, authCtrl.updateInfo)

router.post('/login', authCtrl.login)
router.get('/logout', authCtrl.logout)
router.post('/refresh_token', authCtrl.refreshToken)

export default router;