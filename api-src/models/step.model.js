import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const StepSchema = Schema({

    step : {
        type: String
    },
    type : {
        type: String
    }
});

const Step = module.exports = mongoose.model('Step', StepSchema);
