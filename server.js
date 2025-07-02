import express from "express";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;
const app = express();


app.get('/', (req, res) => {
	res.send('Server entry point')
});

app.listen(port, () => {
	console.log(`Server attivo alla porta ${port}`);
});