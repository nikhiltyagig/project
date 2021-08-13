const CandidateModel = require('../Models/candidateModel');
const HttpError = require('../Models/http_error');

const Candidate = async (req, res, next) => {

    const { name, email } = req.body;

    let userDetails;
    try {
        userDetails = await CandidateModel.findOne({ email: email });
    } catch (err) {
        return next(new HttpError('Something went wrong, Please check again.', 500));
    }

    if(userDetails){
        return next (new HttpError('User Already Exists.', 500));
    } else{

        const createdUser = new CandidateModel({
            email,
            name
          });

          try{
              await createdUser.save();
          } catch (err) {
            return next(new HttpError('Unalbe to Save details.', 500));
        }
    }

 res.status(201).json({ msg: 'User Details saved successfully.'});

};

exports.Candidate = Candidate;