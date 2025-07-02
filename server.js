import express from "express"; // express import.
import dotenv from "dotenv"; // dotenv import.
import cors from "cors"; // cors import.
import localsRouter from "./routes/localsRouter.js";
const app = express(); // express initialization.
dotenv.config(); // dotenv configuration.
const port = process.env.PORT; // server port.

//=======================================================================================
app.use(cors({ origin: process.env.ORIGIN })); // server access configuration.

app.use(express.json()); // express middleware for JSON request body conversion.
app.use(express.static('public')); // statics assets public.


app.get('/', (req, res) => {
	res.send('Server entry point') // server initialization for comunications.
});

app.use("/locals", localsRouter);

app.listen(port, () => {
	console.log(`Server attivo alla porta ${port}`); // server activation for comunications.
});