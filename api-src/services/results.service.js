import Result from '../models/result.model';
import fs from 'fs';
const importFresh = require('import-fresh');

export default class ResultsService {

    async getAll(){
        return await Result.find().sort({start: -1});
    }

    async getById(resultId){
        return await Result.findById(resultId);
    }

    async delete(resultId){
        return await Result.findByIdAndRemove(resultId);
    }

    async create(projectId, projectTitle){
        const resultsDir = __dirname.replace('/api-src/services', '/results');
        let resultsObj = importFresh(resultsDir + '/results.json');
        let result = new Result();
        result.projectId = projectId;
        result.projectTitle = projectTitle;
        result.start = resultsObj.stats.start;
        result.end = resultsObj.stats.end;
        result.duration = resultsObj.stats.duration;
        result.scenarios = [];
        for(let scenarioRan of resultsObj.suites.suites){
            let scenario = {
                title: scenarioRan.title,
                tests: []
            };
            for(let testRan of scenarioRan.tests){
                let test = {
                    title: testRan.title,
                    state: testRan.state,
                    err: {
                        message: testRan.err.message,
                        stack: testRan.err.stack
                    }
                };
                scenario.tests.push(test);
            }
            result.scenarios.push(scenario);
        }

        let newResult = await result.save();
        await fs.unlinkSync(resultsDir + '/results.json');
        return newResult;
    }

}
