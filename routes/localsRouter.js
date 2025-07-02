import express from "express"; // express import.
const localsRouter = express.Router(); // router inizialization.
import { getAllLocals, getLocalById } from "../controllers/localsController.js"; // controller functions import.

// ROUTES:
//---------------------
// [GET] all locals:
localsRouter.get("/", getAllLocals);

// [GET] one local:
localsRouter.get("/:id", getLocalById);


export default localsRouter;