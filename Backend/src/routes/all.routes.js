import { Router } from 'express';

import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} from "../controller/usuarios.controller.js";


const router = Router();


//Users
router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router