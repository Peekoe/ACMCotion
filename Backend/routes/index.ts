import express from 'express';
import PingController from '../controllers/ping';

const router = express.Router();

const controller = new PingController();

router.get('/ping', async (_req, res) => {
    const response = await controller.getMessage();
    return res.send(response);
});

router.post('/ping', async (req, res) => {
    const response = { message: req.query.message};
    return res.send(response);
});

export default router;
