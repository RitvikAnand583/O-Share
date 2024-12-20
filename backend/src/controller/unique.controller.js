import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Unique } from "../models/unique.models.js"
import { createUniqueId } from "../utils/createUniqueId.js";
import { getLocationDetail } from "../utils/getLocationDetail.js";

const uniqueIdCreation = asyncHandler( async (req, res) => {

    const long = 84.9849806;
    const lat = 24.7892751;
    const {city, state, country} = await getLocationDetail(lat, long)

    //create unique id and check if it already exists or not
    let UniqueCode = createUniqueId();

    let uniqueIdPresent = await Unique.findOne({
        $and: [{UniqueCode}, {state}]
    })


    while (uniqueIdPresent) {
        console.log("inside",uniqueIdPresent);
        
        if (uniqueIdPresent) {
            UniqueCode = createUniqueId();
            uniqueIdPresent = await Unique.findOne({
                $and: [{UniqueCode}, {state}]
            })

        } else {
            // console.log("outside",uniqueIdPresent);
            break; 
        }
    }

    const userId = req.user._id

    const uniqueIdSubmit = await Unique.create({
        UniqueCode,
        city,
        state,
        country,
        userId
    })

    const uniqueIdSubmitGet = await Unique.findById(uniqueIdSubmit._id)

        if (!uniqueIdSubmitGet) {
            throw new ApiError(500, "Error while creating unique id")
        }

        return res
            .status(200)
            .json(new ApiResponse(200, {uniqueIdSubmit}, "Unique id created successfully"))

})

export {uniqueIdCreation}
