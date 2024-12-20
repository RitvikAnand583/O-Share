import { Router } from "express";
import { dropIt } from "../controller/drop.controller.js";
import {upload} from "../middleware/multer.middleware.js";
import {verifyJWT} from "../middleware/auth.middleware.js"

const router = Router()

router.route("/dropMessage")
    .post(
        verifyJWT,
        upload.fields([
            {
                name: "picture",
                maxCount: 5
            }
        ]),
        dropIt
    )



export default router
