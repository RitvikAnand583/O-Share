import {ApiError} from "../utils/ApiError.js";

const getLocationDetail = async (lat,long) => {
    const apikey = process.env.GOOGLE_MAP_API_KEY;

    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${apikey}`;

// console.log(apiUrl);


    const response = await fetch(apiUrl);

    // console.log(response);


    const data = await response.json();
    console.log(data);
    
    const finalData = data.results[0].formatted_address;

    const finalDataSplit = finalData.split(" ");
    const city = finalDataSplit[finalDataSplit.length - 4].split(",")[0];
    const state = finalDataSplit[finalDataSplit.length - 3];
    const country = finalDataSplit[finalDataSplit.length - 1];

    console.log(city, state, country);
    return { city, state, country };
    

}

export { getLocationDetail }