import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SuiteSchema = Schema({
    title: {
        type: String
    },
    projectId: {
        type: String
    }
});

const Suite = module.exports = mongoose.model('Suite', SuiteSchema);
