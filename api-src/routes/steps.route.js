import router from 'express-promise-router';
import StepsController from '../controllers/steps.controller';
const routerInstance = router();
const controller = new StepsController();

routerInstance.route('/')
    .get(controller.getAll);

export default routerInstance;
