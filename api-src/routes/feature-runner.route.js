import router from 'express-promise-router';
import FeatureRunnerController from '../controllers/feature-runner.controller';
const routerInstance = router();
const controller = new FeatureRunnerController();

routerInstance.route('/run')
    .get(controller.runFeatures);

export default routerInstance;
