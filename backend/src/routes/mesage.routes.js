import { Router } from "express";
import {message} from "../controller/message.controller.js"
import {upload} from "../middleware/multer.middleware.js";
import {verifyJWT} from "../middleware/auth.middleware.js"

const router = Router()

router.route("/sendMessage/:username")
    .post(
        verifyJWT,
        upload.fields([
            {
                name: "picture",
                maxCount: 5
            }
        ]),
        message
    )



export default router
