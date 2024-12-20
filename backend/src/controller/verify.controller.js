import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.models.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const otpVerify = asyncHandler( async (req, res) => {
    const { otp, mobile } = req.body

    console.log("mobile: ", mobile);
    // console.log("otp: ", otp);

    if (!otp) {
        throw new ApiError(400, "OTP is required")
    }

    const user = await User.findOne({mobile})
 
    if (user.otp !== otp) {
        throw new ApiError(400, "Invalid OTP")
    }

    user.isVerified = true
    await user.save({validateBeforeSave: false})

    await User.findByIdAndUpdate(
        user._id,
        {
            $unset: {
                otp: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "OTP verified successfully"))

})

export { otpVerify }