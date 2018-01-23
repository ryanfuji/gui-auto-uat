import router from 'express-promise-router';
import ResultsController from '../controllers/results.controller';
const routerInstance = new router();
const controller = new ResultsController();

routerInstance.route('/getAll')
    .get(controller.getAll);

routerInstance.route('/delete/:resultId')
    .delete(controller.delete);

routerInstance.route('/create')
    .post(controller.create);

routerInstance.route('/getById/:resultId')
    .get(controller.getById);

export default routerInstance;
