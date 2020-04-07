const express = require("express");
const actionDB = require("../data/helpers/actionModel");
const projectDB = require("../data/helpers/projectModel");
const router = express.Router();

//Completed
router.get("/", async (req, res, next) => {
  try {
    const getAllActions = await actionDB.get();
    res.status(200).json(getAllActions);
  } catch (err) {
    next(err);
  }
});

//Completed
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const getActionId = await actionDB.get(id);
    res.status(200).json(getActionId);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", (req, res, next) => {
  const actionBody = req.body;
  actionDB.update(req.params.id, actionBody).then(actionsUpdated => {
    if (actionsUpdated) {
      res.status(200).json(actionsUpdated);
    } else {
      res.status(404).json({ message: "The id for this action is not valid" });
    }
  });
});

//Completed
router.post("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;
  const actionBody = { ...req.body, project_id: id };
  actionDB.insert(actionBody).then(addedProject => {
    res.status(200).json(addedProject);
  });
});

//completed
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteAAction = await actionDB.remove(id);
    res.status(200).json(deleteAAction);
  } catch (err) {
    next(err);
  }
});

function validateProjectId(req, res, next) {
  const { id } = req.params;
  projectDB.get(id).then(projectId => {
    if (projectId) {
      req.actions = projectId;
      next();
    } else {
      res.status(404).json({ message: "invalid project id" });
    }
  });
}

module.exports = router;
