import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getLocation = asyncHandler(async (req, res) => {
    try {
        const location = req.ipInfo;
        return res
            .status(200)
            .json(new ApiResponse(200, location, "Location fetched successfully"));
    } catch (error) {
        throw new ApiError(500, error?.message || "Error fetching location");
    }
}
);