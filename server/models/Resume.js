const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({

    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:false
    },

    filename:String,
    originalName:String,
    path:String,

    name:String,
    email:String,
    phone:String,

    skills:[String],

    matchedSkills:[String],

    missingSkills:[String],

    semanticMatch:{
        type:Number,
        default:0
    },

    experience:String,

    education: [
  {
    degree: String,
    institution: String,
    university: String,
    years: String
  }
],

    summary:String,

    compatibilityScore:{
        type:Number,
        default:0
    },

    strengths:[String],

    weaknesses:[String],

    interviewQuestions:[String],

    rawAI:Object,

    status:{
        type:String,
        default:"completed"
    }

},{
    timestamps:true
});

module.exports = mongoose.model("Resume", resumeSchema);
