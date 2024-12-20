import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
// import { User } from "../models/user.models.js"
import { Drop } from "../models/drop.models.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { getLocationDetail } from "../utils/getLocationDetail.js";

const dropIt = asyncHandler( async (req, res) => {
    const {dropMessage} = req.body

    if(!dropMessage) {
        throw new ApiError(400, "drop is required")
    }
    const long = 84.9849806;
    const lat = 24.7892751;

    const {city, state, country} = await getLocationDetail(lat, long)

    const imageLocalPath = req.files?.picture[0]?.path;

    if (!imageLocalPath) {
        throw new ApiError(400, "Picture is required")
    }

    const picture = await uploadOnCloudinary(imageLocalPath)

    if (!picture) {
        throw new ApiError(400, "Picture is required")
    }

    const dropDetails = await Drop.create({
        drop: dropMessage,
        picture: picture?.url || "",
        dropSender: req.user._id,
        receiverCity: city,
        receiverCountry: country,
        receiverState: state
    })

    const dropSend = await Drop.findById(dropDetails._id)

    if (!dropSend) {
        throw new ApiError(500, "Error while sending drop")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {dropDetails}, "drop sent successfully"))

})

export { dropIt }