import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ResultSchema = Schema({
   projectId: {
       type: String
   },
   projectTitle: {
       type: String
   },
   start: {
       type: Date
   },
   end: {
       type: Date
   },
   duration: {
       type: Number
   },
   scenarios: [
       {
            title: {
                type: String
            },
            tests: [{
                title: {
                    type: String
                },
                state: {
                    type: String
                },
                err: {
                    message: {
                        type: String
                    },
                    stack: {
                        type: String
                    }
                }
            }]
        }

   ]
});

const Result = module.exports = mongoose.model('Result', ResultSchema);
