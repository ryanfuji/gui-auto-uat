import StepsService from '../services/steps.service';
const stepsService = new StepsService();

export default class StepsController {

    async getAll(req, res, next){
        let steps = await stepsService.getAll();
        res.status(200).json(steps);
    }

}
