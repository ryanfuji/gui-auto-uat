import ProjectsService from '../services/projects.service';
const projectsService = new ProjectsService();

export default class ProjectsController {

    async getAll(req, res, next){
        let projects = await projectsService.getAll();
        res.status(200).json(projects);
    }

    async add(req, res, next){
        const project = req.body;
        let newProject = await projectsService.add(project);
        res.status(200).json(newProject);
    }

    async update(req, res, next){
        const project = req.body;
        let oldProject = await projectsService.update(project);
        res.status(200).json(project);
    }

    async delete(req, res, next){
        const {projectId} = req.params;
        let project = await projectsService.delete(projectId);
        res.status(200).json(project);
    }

    async generateAllFeatureFilesForProject(req, res, next){
        const {projectId} = req.params;
        await projectsService.generateAllFeatureFilesForProject(projectId);
        res.status(200).json({featuresGenerated: true});
    }

}
