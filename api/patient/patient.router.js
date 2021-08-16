const {
    createPatient,
    getAllPatients,
    getPatientsById,
    updatePatients,
    deleteUser
} = require("./patient.controller");
const router = require("express").Router();


router.post("/",createPatient);
router.get("/",getAllPatients);
router.get("/:pid",getPatientsById);
router.put("/:id",updatePatients);
router.delete("/",deleteUser);


module.exports = router;