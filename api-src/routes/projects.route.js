import router from 'express-promise-router';
import ProjectsController from '../controllers/projects.controller';
const routerInstance = router();
const controller = new ProjectsController();

routerInstance.route('/')
    .get(controller.getAll);

routerInstance.route('/add')
    .post(controller.add);

routerInstance.route('/update')
    .put(controller.update);

routerInstance.route('/delete/:projectId')
    .delete(controller.delete);

routerInstance.route('/generateAllFeatureFilesForProject/:projectId')
    .get(controller.generateAllFeatureFilesForProject);

export default routerInstance;
