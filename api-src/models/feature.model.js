import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const FeatureSchema = Schema({
    filename: {
        type: String
    },
    projectId: {
        type: String
    },
    suiteId: {
        type: String
    },
    title: {
        type: String
    },
    story: {
        type: String
    }
});

const Feature = module.exports = mongoose.model('Feature', FeatureSchema);
