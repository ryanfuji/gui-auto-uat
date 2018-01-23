import ResultsService from '../services/results.service';
const resultsService = new ResultsService();

export default class ResultsController {

    async getAll(req, res, next){
        let results = await resultsService.getAll();
        res.status(200).json(results);
    }

    async delete(req, res, next){
        const {resultId} = req.params;
        let result = await resultsService.delete(resultId);
        res.status(200).json(result);
    }

    async create(req, res, next){
        const {projectId, projectTitle} = req.body;
        let result = await resultsService.create(projectId, projectTitle);
        res.status(200).json(result);
    }

    async getById(req, res, next){
        const {resultId} = req.params;
        let result = await resultsService.getById(resultId);
        res.status(200).json(result);
    }

}
