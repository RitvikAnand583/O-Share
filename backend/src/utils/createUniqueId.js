const val = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789'

const  createUniqueId = () => {
    let id = ''
    for (let i = 0; i < 6; i++) {
        id += val.charAt(Math.floor(Math.random() * val.length))
    }
    return id
    }

// const getCurrentLocation = () => {
//     global.navigator.geolocation.getCurrentPosition((position) => {
//         const lat = position.coords.latitude
//         const long = position.coords.longitude
//         console.log(lat, long);
        
//     }), (error) => {
//         console.log("location ",error)
//     }

//     return {lat, long}
//     console.log(" herer ",long, lat);

// }

export { createUniqueId }
