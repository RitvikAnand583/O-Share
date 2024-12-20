import express from "express";
// import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use(express.static("public"))

app.use(cookieParser())



// import routes
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/mesage.routes.js";
import uniqueRoutes from "./routes/unique.routes.js";
import dropRoutes from "./routes/drop.routes.js";

app.use("/user" , userRoutes)
app.use("/message", messageRoutes)
app.use("/unique", uniqueRoutes)
app.use("/drop", dropRoutes)


export{app}