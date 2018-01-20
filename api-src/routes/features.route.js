import router from 'express-promise-router';
import FeaturesController from '../controllers/features.controller';
const routerInstance = router();
const controller = new FeaturesController();

routerInstance.route('/getAllBySuiteId/:suiteId')
    .get(controller.getAllBySuiteId);

routerInstance.route('/add')
    .post(controller.add);

routerInstance.route('/update')
    .put(controller.update);

routerInstance.route('/delete/:featureId')
    .delete(controller.delete);

export default routerInstance;
