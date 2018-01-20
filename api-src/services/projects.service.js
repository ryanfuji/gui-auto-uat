import Project from '../models/project.model';

export default class ProjectsService {

    async getAll(){
        return await Project.find();
    }

    async add(project){
        let newProject = new Project(project);
        return await newProject.save();
    }

    async update(project){
        let oldProject = await Project.findByIdAndUpdate(project._id, project);
        return project;
    }

    async delete(projectId){
        return await Project.findByIdAndRemove(projectId);
    }

}
