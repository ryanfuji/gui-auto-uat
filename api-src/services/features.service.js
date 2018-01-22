import Feature from '../models/feature.model';

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
        return await Feature.findByIdAndRemove(featureId);
    }

    async findByProjectAndFilename(projectId, filename){
        return await Feature.find({projectId: projectId, filename: filename});
    }

}
