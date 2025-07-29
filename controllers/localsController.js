import pool from "../database/prenotabledb.js";
import { getAllLocalsQuery, getLocalQuery, dynamicSearchQuery, getMostRatedLocalsQuery, getOwnerLocalsQuery } from "../database/queries.js";
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
		res.json(formattedResults);
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
		queryToAdd += ' AND locals.city LIKE ?';
		queryParamsToAdd.push(`%${where}%`);
	}
	if (price) {
		queryToAdd += ' AND prices.price = ?';
		queryParamsToAdd.push(price);
	}
	if (typologies) {
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
		queryToAdd += ' AND locals.province = ?';
		queryParamsToAdd.push(province);
	}
	if (rating) {
		console.log(rating);
		const ratingsRanges = {
			one_star: [0, 1.50],
			two_star: [1.50, 2.50],
			three_star: [2.50, 3.50],
			four_star: [3.50, 4.50],
			five_star: [4.50, 5]
		}
		ratingQueryToAdd += ' HAVING average_rating >= ? AND average_rating <= ?';
		const [minRange, maxRange] = ratingsRanges[rating]
		queryParamsToAdd.push(minRange, maxRange);
	}

	const completeQuery = `
	${dynamicSearchQuery} ${queryToAdd ? queryToAdd : ""} ${categoriesQueryToAdd ? categoriesQueryToAdd : ""} GROUP BY locals.id ${ratingQueryToAdd}
	`;

	try {
		const [results] = await pool.query(completeQuery, queryParamsToAdd);
		if (results.length > 0) {
			res.json(results)
		} else {
			res.json({ message: "Nessun risultato", results: false })
		}
	} catch (error) {
		console.error(error);
		res.status(500).send({ status: 500, message: "Errore interno al server" });
	}
}

// [GET] 10 most rated locals:
async function getMostRatedLocals(req, res) {
	try {
		const [results] = await pool.query(getMostRatedLocalsQuery);
		res.json(results)
	} catch (error) {
		console.error(error);
		res.status(500).send({ status: 500, message: "Errore interno al server" });
	}
}

// [GET] owners locals:
async function getOwnerLocals(req, res) {
	const id = req.params.id;

	try {
		const [results] = await pool.query(getOwnerLocalsQuery, [id]);
		res.json(results);
	} catch (error) {
		console.error(error);
		res.status(500).send({ status: 500, message: "Errore interno al server" });
	}
}

export {
	getAllLocals,
	getLocalById,
	getLocalsSearchedParams,
	getMostRatedLocals,
	getOwnerLocals
}