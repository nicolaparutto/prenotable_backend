// Function for days order in locals data:
const daysOrder = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];
function orderByDay(daysArray) {
	return daysArray.sort((a, b) => {
		return daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day)
	})
}

export {
	orderByDay
}