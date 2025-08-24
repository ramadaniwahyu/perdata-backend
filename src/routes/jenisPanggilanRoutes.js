import express from "express";

import { auth, authAdmin } from "../middleware/auth.js";

import jenisPanggilanCtrl from "../controllers/jenisPanggilanCtrl.js";

const router = express.Router();

router.route("/jenis-panggilan")
    .get(auth, authAdmin, jenisPanggilanCtrl.get)
    .post(auth, authAdmin, jenisPanggilanCtrl.create);

router.route("/jenis-panggilan/:id")
    .patch(auth, authAdmin, jenisPanggilanCtrl.update)
    .put(auth, authAdmin, jenisPanggilanCtrl.delete);

router.put("/jenis-panggilan/:id/delete", auth, authAdmin, jenisPanggilanCtrl.delete);

export default router;