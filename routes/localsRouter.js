import express from "express"; // express import.
const localsRouter = express.Router(); // router inizialization.

import { getAllLocals, getLocalById, getLocalsSearchedParams, getMostRatedLocals, getOwnerLocals } from "../controllers/localsController.js"; // controller functions import.

// ROUTES:
//---------------------
// [GET] all locals:
localsRouter.get("/", getAllLocals);
// [GET] one local:
localsRouter.get("/local/:id", getLocalById);
// [GET] locals by city searched:
localsRouter.get("/search", getLocalsSearchedParams);
// [GET] 10 most rated locals:
localsRouter.get("/most-rated", getMostRatedLocals);
// [GET] oner locals:
localsRouter.get("/owner-locals/:id", getOwnerLocals)
// [GET utilities

export default localsRouter;