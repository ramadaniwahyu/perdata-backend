import express from 'express'

import {auth, authAdmin} from '../middleware/auth.js';
import eksekusiCtrl from '../controllers/eksekusiCtrl.js';


const router = express.Router();

router.route('/eksekusi')
    .get(auth, authAdmin, eksekusiCtrl.get)
    .post(auth, authAdmin, eksekusiCtrl.createOne)

router.route('/eksekusi/:id')
    .get(auth, authAdmin, eksekusiCtrl.getOne)
    .patch(auth, authAdmin, eksekusiCtrl.updateOne)

router.put('/eksekusi/:id/delete', auth, authAdmin, eksekusiCtrl.deleteOne)

router.route('/permohonan-eksekusi')
    .get(eksekusiCtrl.searchOne)
    .post(eksekusiCtrl.createOne)    

router.route('/permohonan-eksekusi/:id')
    .get(eksekusiCtrl.getOne)
    .patch(eksekusiCtrl.updateOne)  

export default router;