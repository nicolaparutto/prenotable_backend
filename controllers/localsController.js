


// ROUTES FUNCTIONS:
//---------------------
// [GET] all locals:
function getAllLocals(req, res) {
	res.send("tutti i locali")
}
// [GET] one local:
function getLocalById(req, res) {
	res.send(`Locale con id ${req.params.id}`)
}



export {
	getAllLocals,
	getLocalById
}