import express from "express"; // express import.
const utilitiesRouter = express.Router(); // router inizialization.

import { getAllRegions, getAllLocalsTypologies } from "../controllers/utilitiesController.js"; // controller functions import.

// ROUTES:
//---------------------
// [GET] all regions:
utilitiesRouter.get("/regions", getAllRegions);
// [GET] all typologies:
utilitiesRouter.get("/typologies", getAllLocalsTypologies);


export default utilitiesRouter;