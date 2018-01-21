import ScenariosService from '../services/scenarios.service';
const scenariosService = new ScenariosService();

export default class ScenariosController {

    async getAllByFeatureId(req, res, next){
        const {featureId} = req.params;
        let scenarios = await scenariosService.getAllByFeatureId(featureId);
        res.status(200).json(scenarios);
    }

    async add(req, res, next){
        const scenario = req.body;
        let newScenario = await scenariosService.add(scenario);
        res.status(200).json(newScenario);
    }

    async update(req, res, next){
        const scenario = req.body;
        let oldScenario = await scenariosService.update(scenario);
        res.status(200).json(scenario);
    }

    async delete(req, res, next){
        const {scenarioId} = req.params;
        let scenario = await scenariosService.delete(scenarioId);
        res.status(200).json(scenario);
    }

}
