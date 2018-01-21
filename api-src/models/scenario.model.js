import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ScenarioSchema = Schema({

    featureId: {
        type: String
    },
    suiteId: {
        type: String
    },
    projectId: {
        type: String
    },
    title: {
        type: String
    },
    steps: {
        type: [String]
    }

});

const Scenario = module.exports = mongoose.model('Scenario', ScenarioSchema);
