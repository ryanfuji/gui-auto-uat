import Suite from '../models/suite.model';

export default class SuitesService {

    async getAllByProjectId(projectId) {
        return await Suite.find({projectId: projectId});
    }

    async add(suite){
        let newSuite = new Suite(suite);
        return await newSuite.save();
    }

    async update(suite){
        let oldSuite = await Suite.findByIdAndUpdate(suite._id, suite);
        return suite;
    }

    async delete(suiteId){
        return await Suite.findByIdAndRemove(suiteId);
    }

}
