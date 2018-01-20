import router from 'express-promise-router';
import SuitesController from '../controllers/suites.controller';
const routerInstance = router();
const controller = new SuitesController();

routerInstance.route('/getAllByProjectId/:projectId')
    .get(controller.getAllByProjectId);

routerInstance.route('/add')
    .post(controller.add);

routerInstance.route('/update')
    .put(controller.update);

routerInstance.route('/delete/:suiteId')
    .delete(controller.delete);

export default routerInstance;
