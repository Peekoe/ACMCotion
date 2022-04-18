import express from 'express';
import PingController from '../controllers/ping';
import Assignments from '../controllers/canvasToNotion';

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

router.post('/assignments', async (req, res) => {
    let ass = new Assignments();
    let {domain, canvasToken, notionDb, notionToken} = req.body;
    await ass.importAssignments(domain, canvasToken, notionDb, notionToken);
    return res.json({ message: 'Successfully imported all assignments' });
});

// not currently working
router.patch('/assignments', async (req, res) => {
    let ass = new Assignments();
    let {domain, canvasToken, notionDb, notionToken} = req.body;
    await ass.importAssignments(domain, canvasToken, notionDb, notionToken, true);
    return res.json({ message: 'Successfully imported all assignments' });
});

export default router;
