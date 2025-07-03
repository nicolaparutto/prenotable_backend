import pool from "../database/prenotabledb.js";
import { getAllLocalsQuery, getLocalQuery, dynamicSearchQuery } from "../database/queries.js";
import { orderByDay } from "../functions/utilitiesFunctions.js";


// ROUTES FUNCTIONS:
//---------------------

// [GET] all locals:
async function getAllLocals(req, res) {
	console.log('Chiamata a getLocals');
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
	console.log('Chiamata a getLocalById con id:', req.params.id);
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

// [GET] searched locals:
async function getLocalsSearchedParams(req, res) {
	const { where, price, typologies, province, rating } = req.query;

	let queryToAdd = "";
	let categoriesQueryToAdd = "";
	let ratingQueryToAdd = "";
	const queryParamsToAdd = [];

	if (where) {
		console.log('cercato per città');
		queryToAdd += 'AND locals.city LIKE ?';
		queryParamsToAdd.push(`%${where}%`)
	}
	if (price) {
		console.log('cercato per prezzo')
		queryToAdd += 'AND prices.price = ?';
		queryParamsToAdd.push(price)
	}
	if (typologies) {
		console.log('aggiunta una tipologia', typologies);
		const typologyArray = typologies.split(",").map(t => t.trim());
		const placeholders = typologyArray.map(() => "?").join(", ");
		categoriesQueryToAdd = `
		   AND EXISTS (
		     SELECT 1
		     FROM locals_typologies lt
		     JOIN typologies t ON lt.typology_id = t.id
		     WHERE lt.local_id = locals.id
		       AND t.name IN (${placeholders})
		   )
		 `;
		queryParamsToAdd.push(...typologyArray);
	}
	if (province) {
		console.log('cercato per provincia')
		queryToAdd += 'AND locals.province = ?';
		queryParamsToAdd.push(province)
	}
	if (rating) {
		console.log('ricerca per voto');
		ratingQueryToAdd += 'HAVING average_rating = ?';
		queryParamsToAdd.push(rating)
	}
	const completeQuery = `${dynamicSearchQuery} ${queryToAdd ? queryToAdd : ""} ${categoriesQueryToAdd ? categoriesQueryToAdd : ""} GROUP BY locals.id ${ratingQueryToAdd}`;


	try {
		const [results] = await pool.query(completeQuery, queryParamsToAdd);
		res.send(results);
	} catch (error) {
		console.error(error);
	}
}


// [DELETE] one local:
// [MODIFY] one local:
// [STORE] one local:


export {
	getAllLocals,
	getLocalById,
	getLocalsSearchedParams
}