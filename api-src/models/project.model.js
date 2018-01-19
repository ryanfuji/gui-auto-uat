import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProjectSchema = Schema({
    title: {
        type: String
    }
});

const Project = module.exports = mongoose.model('Project', ProjectSchema);
