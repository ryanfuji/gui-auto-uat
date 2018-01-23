import Suite from '../models/suite.model';
import Scenario from '../models/scenario.model';
import Feature from '../models/feature.model';

export default class SuitesService {

    async getAllByProjectId(projectId) {
        return await Suite.find({projectId: projectId});
    }

    async add(suite){
        let newSuite = new Suite(suite);
        return await newSuite.save();
    }

    async update(suite){
        let oldSuite = await Suite.findByIdAndUpdate(suite._id, suite);
        return suite;
    }

    async delete(suiteId){
        let scenarios = await Scenario.find({suiteId: suiteId});
        let features = await Feature.find({suiteId: suiteId});
        for(let scenario of scenarios){
            let deletedScenario = await Scenario.findByIdAndRemove(scenario._id);
        }
        for(let feature of features){
            let deletedFeature = await Feature.findByIdAndRemove(feature._id);
        }
        return await Suite.findByIdAndRemove(suiteId);
    }

}
