import Step from '../models/step.model';

export default class StepsService {

    async getAll(){
        return await Step.find();
    }

}
