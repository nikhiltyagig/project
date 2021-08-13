const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const  testScoreModel = new Schema(
    {
    
        test_round:{
            desc: "user roles.",
            trim: true,
            type: String,
            enum: ["first_round", "second_round","third_round"],
            default: "first_round",
            required: true
        },

        round_one_score: {
            desc: "Round one score",
            trim: true,
            type: String,
            index: true
        },
        round_second_score:{
            desc: "Round second score",
            trim: true,
            type: String,
            index: true
        },
        round_third_score: {
            desc: "Round three score",
            trim: true,
            type: String,
            index: true
        },
        creator: {
            type: mongoose.Types.ObjectId,
            required:true,
            ref: 'Candidate'
        }
    });


module.exports = mongoose.model('test_score', testScoreModel);