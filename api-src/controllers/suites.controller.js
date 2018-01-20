import SuitesService from '../services/suites.service';
const suitesService = new SuitesService();

export default class SuitesController {

    async getAllByProjectId(req, res, next){
        const {projectId} = req.params;
        let suites = await suitesService.getAllByProjectId(projectId);
        res.status(200).json(suites);
    }

    async add(req, res, next){
        const suite = req.body;
        let newSuite = await suitesService.add(suite);
        res.status(200).json(newSuite);
    }

    async update(req, res, next){
        const suite = req.body;
        let updatedSuite = await suitesService.update(suite);
        res.status(200).json(updatedSuite);
    }

    async delete(req, res, next){
        const {suiteId} = req.params;
        let suite = await suitesService.delete(suiteId);
        res.status(200).json(suite);
    }
}
