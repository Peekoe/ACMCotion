import express from 'express';
import PingController from '../controllers/ping';
import canvasToNotion from '../controllers/canvasToNotion';

const NAMESPACE: string = "Router";

const router = express.Router();

const pingController = new PingController();

router.get('/ping', async (_req, res) => {
    const response = await pingController.getMessage();
    return res.send(response);
});

router.post('/ping', async (req, res) => {
    const response = { message: req.query.message};
    return res.send(response);
});

router.get('/allAssignments', async (req, res) => {
    let response = await canvasToNotion.getAssignmentsFromCourses();
    return res.send(response);
});

export default router;
