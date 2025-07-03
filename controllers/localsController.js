import pool from "../database/prenotabledb.js";
import { allLocalsQuery } from "../database/queries.js";

// ROUTES FUNCTIONS:
//---------------------
// [GET] all locals:
async function getAllLocals(req, res) {
	try {
		const [results] = await pool.query(allLocalsQuery)
		const formattedResults = results.map(local => {
			return { ...local, typologies: local.typologies.split(", ") }
		})
		res.send(formattedResults)
	} catch (error) {
		console.error(error)
		res.status(500).send({ status: 500, message: "Errore interno al server" })
	}
}

// [GET] one local:
function getLocalById(req, res) {
	res.send("ciao")
}



// [DELETE] one local:
// [MODIFY] one local:
// [STORE] one local:


export {
	getAllLocals,
	getLocalById
}