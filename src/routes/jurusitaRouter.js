import express from 'express'

import protectRoute from '../middlewares/authMiddleware.js';
import authAdmin from '../middlewares/authAdminMiddleware.js';
import { jurusitaCtrl } from '../controllers/jurusitaCtrl.js';


const router = express.Router();

router.route('/jurusita')
    .get(protectRoute, authAdmin, jurusitaCtrl.getAll)
    .post(protectRoute, authAdmin, jurusitaCtrl.create)

router.route('/jurusita/:id')
    .get(protectRoute, authAdmin, jurusitaCtrl.getOne)
    .put(protectRoute, authAdmin, jurusitaCtrl.updateOne)
    .patch(protectRoute, authAdmin, jurusitaCtrl.deleteOne)

router.patch('/jurusita/:id/activate', protectRoute, authAdmin, jurusitaCtrl.activateOne)

    