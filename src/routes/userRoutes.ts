import express from "express";
import { createUser, deleteUser, getAll, getByPage, getOneUser, login, updateUser } from "../controllers.ts/usercontroller";


const router = express.Router()

router.post('/create', createUser)
router.post('/login', login)
router.get('/getAll', getAll)
router.patch('/update', updateUser)
router.delete('/delete', deleteUser)
router.get('/getOneUser/', getOneUser)
router.get('/getByPage/:page?', getByPage)

export default router;
