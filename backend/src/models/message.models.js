import mongoose, {Schema} from "mongoose";


const messageSchema = new Schema(
    {
        message: {
            type: String,
            required: [true, 'Message is required']
        },
        picture: {
            type: String
        },
        messageSender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        messageReceiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
)


export const Message = mongoose.model("Message", messageSchema)