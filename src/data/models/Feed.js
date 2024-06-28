import mongoose from "mongoose";

const feedSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    commentedBy:[
        {
            text:String,
            owner:String
        }
    ],
    urlToImage: {
        type: String,
        required: true,
    }
});

export default mongoose.model("Feed", feedSchema);