import express, {Router} from 'express';
import { createGame } from '../controller/game';

const router:Router = express.Router();


router.post('/game/create',  createGame);

export default router;