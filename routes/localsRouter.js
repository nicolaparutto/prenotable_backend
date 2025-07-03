import express from "express"; // express import.
const localsRouter = express.Router(); // router inizialization.

import { getAllLocals, getLocalById, getLocalsSearchedParams } from "../controllers/localsController.js"; // controller functions import.

// ROUTES:
//---------------------
// [GET] all locals:
localsRouter.get("/", getAllLocals);
// [GET] one local:
localsRouter.get("/local/:id", getLocalById);
// [GET] locals by city searched:
localsRouter.get("/search", getLocalsSearchedParams);


export default localsRouter;