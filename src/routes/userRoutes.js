import express from "express";
import userCtrl from "../controllers/userCtrl.js";
import auth from "../middleware/auth.js"
import authAdmin from "../middleware/authAdmin.js"

const router = express.Router();

router.route('/users')
    .get(auth, authAdmin, userCtrl.getUsers)

router.route('/users/:id')
    .get(auth, authAdmin, userCtrl.getOneUser)
    .patch(auth, authAdmin, userCtrl.updateUser)

router.post('/users/:id/activate', auth, authAdmin, userCtrl.activateUser)

router.put('/users/:id/delete', auth, authAdmin, userCtrl.deleteUser)

export default router;