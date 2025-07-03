import dotenv from "dotenv"; // dotenv import.
dotenv.config(); // dotenv configuration.

import express from "express"; // express import.
const app = express(); // express initialization.
const port = process.env.PORT; // server port.

import localsRouter from "./routes/localsRouter.js"; // localsRouter import.
import cors from "cors"; // cors import.

//=======================================================================================
app.use(cors({ origin: process.env.ORIGIN })); // server access configuration.

app.use(express.json()); // express middleware for JSON request body conversion.
app.use(express.static('public')); // statics assets public.

// server initialization for comunications:
app.get('/', (req, res) => {
	res.send('Server entry point response')
});

// ALL ROUTERS USES:
app.use("/locals", localsRouter); // locals handle route.


// server activation for comunications:
app.listen(port, () => {
	console.log(`✅ Server attivo alla porta ${port}`);
});