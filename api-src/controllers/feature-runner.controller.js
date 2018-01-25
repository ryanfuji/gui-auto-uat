import { exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);

export default class FeatureRunnerController {

    /**
     * Runs cucumber features
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    async runFeatures(req, res, next){
        let result = await execAsync('cd ../;npm run test:features');
        res.status(200).json(result);
    }

}
