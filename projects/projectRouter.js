const express = require ('express');
const projectDB = require('../data/helpers/projectModel');
const router = express.Router();

//Completed
router.get("/", async (req, res, next) => {
    try {
        const getAllUsers = await projectDB.get();
        res.status(200).json(getAllUsers);
    } catch (err) {
        next(err);
    }
});

//Completed
router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        const getProjectId = await projectDB.get(id);
        res.status(200).json(getProjectId);
    } catch (err) {
        next(err);
    }
});

//Completed
router.post('/', async (req, res, next) => {
    const projectBody = req.body;
    try {
        const addProject = await projectDB.insert(req.body);
        res.status(201).json(addProject);
    } catch (err) {
        next(err);
    }
});

//working
router.delete('/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        const deleteAProject = await projectDB.remove(id);
        res.status(200).json(deleteAProject);
    } catch (err) {
        next(err);
    }
});

//CompletedS
router.put('/:id', async (req, res, next) => {
    const {id} = req.params;
    const updateBody = req.body;
    try {
        const updateAProject = await projectDB.update(id, updateBody);
        res.status(200).json(updateAProject);
    } catch (err) {
        next(err);
    }
});





module.exports = router;