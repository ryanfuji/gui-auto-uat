import router from 'express-promise-router';
import ScenariosController from '../controllers/scenarios.controller';
const routerInstance = router();
const controller = new ScenariosController();

routerInstance.route('/getAllByFeatureId/:featureId')
    .get(controller.getAllByFeatureId);

routerInstance.route('/add')
    .post(controller.add);

routerInstance.route('/update')
    .put(controller.update);

routerInstance.route('/delete/:scenarioId')
    .delete(controller.delete);

export default routerInstance;
