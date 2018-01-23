import Feature from '../models/feature.model';
import Scenario from '../models/scenario.model';

export default class FeaturesService {

    async getAllBySuiteId(suiteId){
        return await Feature.find({suiteId: suiteId});
    }

    async add(feature){
        let newFeature = new Feature(feature);
        return await newFeature.save();
    }

    async update(feature){
        let oldFeature = await Feature.findByIdAndUpdate(feature._id, feature);
        return feature;
    }

    async delete(featureId){
        let scenarios = await Scenario.find({featureId: featureId});
        for(let scenario of scenarios){
            let deletedScenario = await Scenario.findByIdAndRemove(scenario._id);
        }
        return await Feature.findByIdAndRemove(featureId);
    }

    async findByProjectAndFilename(projectId, filename){
        return await Feature.find({projectId: projectId, filename: filename});
    }

}
