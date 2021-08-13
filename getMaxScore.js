const TestScoreModel = require('../Models/testScoreModel');
const CandidateModel = require('../Models/candidateModel');
const HttpError = require('../Models/http_error');



const getMaxScore = async (req, res, next) => {

  
  let userDetails;

   try {
    userDetails = await CandidateModel.find();
   } catch (err) {
    return next(new HttpError('Something went wrong, Please check again.', 500));
  }

  let maxScore = 0;
  let maxScoreCandidateName; 


  for(let player in userDetails){


     let user;
     try {
        user = await CandidateModel.findById(userDetails[player]._id);
       } catch (err) {
        return next(new HttpError('Something went wrong, Please check again.', 500));
      }

      let matchScore = 0;
     for(let match in user.testMatchesObject){
        
        let matchDetails;
        
       try {
        matchDetails = await TestScoreModel.findById(user.testMatchesObject[match]);
       } catch (err) {
        return next(new HttpError('Something went wrong, Please check again.', 500));
      }

       if(matchDetails.test_round === 'first_round'){
          matchScore = matchScore + parseInt(matchDetails.round_one_score);
        }else if(matchDetails.test_round === 'second_round'){
          matchScore =matchScore + parseInt(matchDetails.round_second_score);
        }else if(matchDetails.test_round === 'third_round'){
            matchScore =matchScore + parseInt(matchDetails.round_third_score);
        }
          if(matchScore > maxScore) {
           maxScore = matchScore;
           console.log(maxScore);
           maxScoreCandidateName = userDetails[player].name;
       }
       
      }
    }
   

  res.status(201).json({"maxScore":maxScore, "maxScoreCandidateName": maxScoreCandidateName});

};

exports.getMaxScore = getMaxScore;