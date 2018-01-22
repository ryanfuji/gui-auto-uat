import FeaturesService from '../services/features.service';
const featuresService = new FeaturesService();

export default class FeaturesController {

    async getAllBySuiteId(req, res, next){
        const {suiteId} = req.params;
        let features = await featuresService.getAllBySuiteId(suiteId);
        res.status(200).json(features);
    }

    async add(req, res, next){
        const feature = req.body;
        let newFeature = await featuresService.add(feature);
        res.status(200).json(newFeature);
    }

    async update(req, res, next){
        const feature = req.body;
        let updatedFeature = await featuresService.update(feature);
        res.status(200).json(updatedFeature);
    }

    async delete(req, res, next){
        const {featureId} = req.params;
        let feature = await featuresService.delete(featureId);
        res.status(200).json(feature);
    }

    async filenameExists(req, res, next){
        const {filename, projectId} = req.params;
        let features = await featuresService.findByProjectAndFilename(projectId, filename);
        if(features.length > 0){
            res.status(200).json({filenameExists: true});
        } else {
            res.status(200).json({filenameExists: false});
        }
    }
}
