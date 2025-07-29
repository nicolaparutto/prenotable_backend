// db connection:
import pool from "../database/prenotabledb.js";
// queries:
import { getRegionsQuery, getTypologiesQuery } from "../database/queries/utilitiesQueries.js";


// ROUTES FUNCTIONS:
//---------------------
// [GET] all regions:
const getAllRegions = (req, res) => {
	res.send("ricevi tutte le regioni")
}
// [GET] all locals typologies:
const getAllLocalsTypologies = (req, res) => {
	res.send("ricevi tutte le tipologie")
}

export {
	getAllRegions,
	getAllLocalsTypologies
}