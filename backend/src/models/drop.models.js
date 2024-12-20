import mongoose, {Schema} from "mongoose";


const dropSchema = new Schema(
    {
        drop: {
            type: String,
            required: [true, 'drop is required']
        },
        picture: {
            type: String
        },
        dropSender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        receiverCity: {
            type: String,
            required: true
        },
        receiverState: {
            type: String,
            required: true
        },
        receiverCountry: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)


export const Drop = mongoose.model("Drop", dropSchema)