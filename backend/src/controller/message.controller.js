import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { Message } from "../models/message.models.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { Unique } from "../models/unique.models.js";

// there is two way to send message
// 1. send message by uniqueCode itself -> easy but not able to track the user
// 2. sender will have to send on user uniqueCode code by his username -> Implemented

const message = asyncHandler( async (req, res) => {
    const {message} = req.body

    if(!message) {
        throw new ApiError(400, "Message is required")
    }

    const {userUniqueCode} = req.params

    if (!userUniqueCode?.trim()) {
        throw new ApiError(400, "userUniqueCode is missing")
    }

    const receiverId = await Unique.findOne({userUniqueCode})

    const imageLocalPath = req.files?.picture[0]?.path;

    if (!imageLocalPath) {
        throw new ApiError(400, "Picture is required")
    }

    const picture = await uploadOnCloudinary(imageLocalPath)

 
    if (!picture) {
        throw new ApiError(400, "Picture is required")
    }

    const messageDetails = await Message.create({
        message: message,
        picture: picture?.url || "",
        messageSender: req.user._id,
        messageReceiver: receiverId._id
    })

    const messageSend = await Message.findById(messageDetails._id)


    if (!messageSend) {
        throw new ApiError(500, "Error while sending message")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Message sent successfully"))

})

export { message }