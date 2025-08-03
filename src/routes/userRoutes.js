import express from "express";
import userCtrl from "../controllers/userCtrl.js";
import {auth, authAdmin} from "../middleware/auth.js"

const router = express.Router();

router.route('/users')
    .get(auth, authAdmin, userCtrl.getUsers)

router.route('/users/:id')
    .get(auth, authAdmin, userCtrl.getOneUser)
    .patch(auth, authAdmin, userCtrl.updateUser)
    .post(auth, authAdmin, userCtrl.activateUser)
    .put(auth, authAdmin, userCtrl.deleteUser)

router.post('/users/:id/activate', auth, authAdmin, userCtrl.activateUser)

router.put('/users/:id/delete', auth, authAdmin, userCtrl.deleteUser)

export default router;