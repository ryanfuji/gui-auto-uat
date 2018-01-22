import Project from '../models/project.model';
import fs from 'fs';
import Feature from '../models/feature.model';
import Scenario from '../models/scenario.model';

export default class ProjectsService {

    async getAll(){
        return await Project.find();
    }

    async add(project){
        let newProject = new Project(project);
        return await newProject.save();
    }

    async update(project){
        let oldProject = await Project.findByIdAndUpdate(project._id, project);
        return project;
    }

    async delete(projectId){
        return await Project.findByIdAndRemove(projectId);
    }

    async generateAllFeatureFilesForProject(projectId){
        await this.removeAllOldFeatures();
        let features = await Feature.find({projectId: projectId});
        if(features.length === 0){
            return;
        }
        let featureDir = __dirname.replace('/api-src/services', '/src/features');
        for(let feature of features){
            let scenarios = await Scenario.find({featureId: feature._id});
            if(scenarios.length === 0){
                continue;
            }
            await fs.writeFileSync(featureDir+'/'+feature.filename+'.feature',
                this.generateFeatureString(feature, scenarios));
        }
    }

    generateFeatureString(feature, scenarios){
        let featureString = 'Feature: ' + feature.title + '\n';
        featureString += '\t' + feature.story.replace('\n', '\n\t') + '\n\n';
        for(let scenario of scenarios){
            featureString += this.generateScenarioString(scenario) + '\n';
        }
        return featureString;
    }

    generateScenarioString(scenario){
        let scenarioString = 'Scenario: ';
        scenarioString += scenario.title + '\n';
        for(let step of scenario.steps){
            scenarioString += '\t' + step + '\n';
        }
        return scenarioString;
    }

    async removeAllOldFeatures(){
        let featureDir = __dirname.replace('/api-src/services', '/src/features');
        let files = await fs.readdirSync(featureDir);
        for(let file of files){
            await fs.unlinkSync(featureDir + '/' + file);
        }
    }

}
