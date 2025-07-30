// db connection:
import pool from "../database/prenotabledb.js";
// queries:
import { getRegionsQuery, getTypologiesQuery } from "../database/queries/utilitiesQueries.js";


// ROUTES FUNCTIONS:
//---------------------
// [GET] all regions:
const getAllRegions = async (req, res) => {
	try {
		const [results] = await pool.query(getRegionsQuery)
		res.json(results);
	} catch (error) {
		console.error(error);
	}
}
// [GET] all locals typologies:
const getAllLocalsTypologies = async (req, res) => {
	try {
		const [results] = await pool.query(getTypologiesQuery);
		res.json(results);
	} catch (error) {
		console.error(error);
	}
}

export {
	getAllRegions,
	getAllLocalsTypologies
}