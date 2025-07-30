import express from 'express'

import {auth, authAdmin} from '../middleware/auth.js';
import jurusitaCtrl from '../controllers/jurusitaCtrl.js';


const router = express.Router();

router.route('/jurusita')
    .get(auth, authAdmin, jurusitaCtrl.getAll)
    .post(auth, authAdmin, jurusitaCtrl.createOne)

router.route('/jurusita/:id')
    .get(auth, authAdmin, jurusitaCtrl.getOne)
    .patch(auth, authAdmin, jurusitaCtrl.updateOne)

router.put('/jurusita/:id/activate', auth, authAdmin, jurusitaCtrl.activateOne)

router.put('/jurusita/:id/delete', auth, authAdmin, jurusitaCtrl.deleteOne)

export default router;