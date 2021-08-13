const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const candidateModel = new Schema(
    {
        
        name: {
            desc: "User name",
            trim: true,
            type: String,
            index: true,
            required: true,
        },
        email: {
            desc: "User email Id",
            trim: true,
            type: String,
            index: true,
            unique: true,
            required: true,
        },
        testMatchesObject: [{
            type: mongoose.Types.ObjectId,
            required:true,
            ref: 'testScore'
           }],


    });


module.exports = mongoose.model('Candidate', candidateModel);

