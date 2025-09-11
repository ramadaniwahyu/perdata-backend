import express from 'express'

import {auth, authAdmin} from '../middleware/auth.js';
import panggilanCtrl from '../controllers/panggilanCtrl.js';


const router = express.Router();

router.route('/panggilan')
    .get(auth, panggilanCtrl.getAll)
    .post(auth, panggilanCtrl.create)

router.route('/panggilan/:id')
    .get(auth, panggilanCtrl.get)
    .patch(auth, panggilanCtrl.update)
    .put(auth, panggilanCtrl.delete)

router.put('/panggilan/:id/delete', auth, panggilanCtrl.delete)

router.post('/panggilan/:id/pengiriman', auth, panggilanCtrl.cancelPengiriman)

router.post('/panggilan/:id/pelaksanaan', auth, panggilanCtrl.cancelPelaksanaan)

export default router;