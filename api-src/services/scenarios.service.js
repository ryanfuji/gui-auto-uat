import Scenario from '../models/scenario.model';

export default class ScenariosService {

    async getAllByFeatureId(featureId){
        return await Scenario.find({featureId: featureId});
    }

    async add(scenario){
        let newScenario = new Scenario(scenario);
        return await newScenario.save();
    }

    async update(scenario){
        let oldScenario = await Scenario.findByIdAndUpdate(scenario._id, scenario);
        return scenario;
    }

    async delete(scenarioId){
        return await Scenario.findByIdAndRemove(scenarioId);
    }

}
