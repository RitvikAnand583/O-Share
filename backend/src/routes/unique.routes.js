import { Router } from "express";
import { uniqueIdCreation } from "../controller/unique.controller.js";
import {verifyJWT} from "../middleware/auth.middleware.js"

const router = Router()

router.route("/unique-id")
    .post(verifyJWT,uniqueIdCreation)

export default router