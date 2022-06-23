import mongoose from "mongoose";

const JobSchema=new mongoose.Schema({
    company:{
        type:String,
        required:[true,"Please provide company"],
        maxlength:20
    },
    position:{
        type:String,
        required:[true,"Please provide position"],
        maxlength:100
    },
    status:{
        type:String,
        enum:["interview","decline","pending"],
        default:"pending",
        maxlength:20
    },
    jobType:{
        type:String,
        enum:["full-time","part-time","internship"],
        default:"full-time",
    },
    jobLocation:{
        type:String,
        required:true,
        default:"my city",
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:[true,"Please provide user"]
    },
},
{timestamp:true}
)

export default mongoose.model('Job',JobSchema);