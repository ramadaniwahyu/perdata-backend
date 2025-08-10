import express from "express"
import {auth, authAdmin} from "../middleware/auth.js"
import perkaraCtrl from "../controllers/perkaraCtrl.js";

const router = express.Router();

router.route('/perkara')
    .get(auth, authAdmin, perkaraCtrl.getAll)
    .post(auth, authAdmin, perkaraCtrl.createOne);

router.route('/perkara/:id')
    .get(auth, authAdmin, perkaraCtrl.getOne)
    .patch(auth, authAdmin, perkaraCtrl.updateOne)
    .post(auth, authAdmin, perkaraCtrl.deleteOne);

router.patch('/perkara/:id/riwayat', auth, authAdmin, perkaraCtrl.riwayatOne);    
router.patch('/perkara/:id/delete', auth, authAdmin, perkaraCtrl.deleteOne);

export default router;