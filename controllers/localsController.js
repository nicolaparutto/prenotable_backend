import pool from "../database/prenotabledb.js";
import { getAllLocalsQuery, getLocalQuery } from "../database/queries.js";
import { orderByDay } from "../functions/utilitiesFunctions.js";


// ROUTES FUNCTIONS:
//---------------------

// [GET] all locals:
async function getAllLocals(req, res) {
	try {
		const [results] = await pool.query(getAllLocalsQuery)
		// typoligies splitting function:
		const formattedResults = results.map(local => {
			return { ...local, typologies: local.typologies.split(", ") }
		})
		res.send(formattedResults);
	} catch (error) {
		console.error(error);
		res.status(500).send({ status: 500, message: "Errore interno al server" });
	}
};

// [GET] one local:
async function getLocalById(req, res) {
	const id = req.params.id;
	try {
		const [result] = await pool.query(getLocalQuery, [id]);
		//days formatted:
		const formattedDays = orderByDay(result[0].timetables);
		res.json({ ...result[0], timetables: formattedDays });
	} catch (error) {
		console.error(error);
		res.status(500).send({ status: 500, message: "Errore interno al server" });
	}
};



// [DELETE] one local:
// [MODIFY] one local:
// [STORE] one local:


export {
	getAllLocals,
	getLocalById
}