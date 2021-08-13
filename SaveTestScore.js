const TestScoreModel = require('../Models/testScoreModel');
const CandidateModel = require('../Models/candidateModel');
const HttpError = require('../Models/http_error');


const SaveTestScore = async (req, res, next) => {

    const { email, test_round, score } = req.body;

    let userDetails;
    try {
        userDetails = await CandidateModel.findOne({ email: email });
    } catch (err) {
        return next(new HttpError('Unable to get Player details', 500));
    }
    if (score > 10) {
        return next(new HttpError('Score must be out of 10. Not more then 10!', 502));
    }
    
     console.log(userDetails.testMatchesObject);
     // Check used already play the round or not
     for(let item in userDetails.testMatchesObject){
         console.log(userDetails.testMatchesObject[item]);
        let matchRoundDetails;
         try {
             matchRoundDetails = await TestScoreModel.findById(userDetails.testMatchesObject[item]);
        } catch (err) {
            return next(new HttpError('Something went wrong, Please check again.', 500));
        }
        console.log(matchRoundDetails);
         if(matchRoundDetails.test_round === test_round){
             return next(new HttpError('Player Already played this round !', 502));
         } 
        }
    

    if (userDetails) {

        let model;
        if (test_round === 'first_round') {
            model = {
                creator: userDetails._id,
                test_round,
                round_one_score: score
            };
        } else if (test_round === 'second_round') {
            model = {
                creator: userDetails._id,
                test_round,
                round_second_score: score
            };
        } else if (test_round === 'third_round') {
            model = {
                creator: userDetails._id,
                test_round,
                round_third_score: score
            };
        }

        const testMatch = new TestScoreModel(model);
        try {
            await testMatch.save();
            userDetails.testMatchesObject.push(testMatch._id);
            await userDetails.save();
        } catch (err) {
            return next(new HttpError('Unable to Save details.', 500));
        }
    } else {
        return next(new HttpError('User not registered for upload test score.First register!'));
    }

    res.status(201).json({ msg: 'Test Score saved successfully.' });


};

exports.SaveTestScore = SaveTestScore;