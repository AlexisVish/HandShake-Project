import express from 'express';
import { login, register } from '../../controllers/users/setUser';
import { getUser } from '../../controllers/users/getUser';


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/get-user", getUser);

export default router;
