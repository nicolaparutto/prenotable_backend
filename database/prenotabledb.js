import mysql2 from "mysql2/promise";
import dotenv from "dotenv"; // dotenv import.
dotenv.config(); // dotenv configuration.

const pool = mysql2.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: process.env.DB_PORT || 3306,
	waitForConnections: true,
	connectionLimit: 0,
	queueLimit: 0
});

async function testPoolConnection() {
	try {
		// Prendo una connessione dal pool
		const connection = await pool.getConnection();

		// Faccio una semplice query per testare la connessione
		await connection.query('SELECT 1');
		console.log('✅ Database Connected!');

		connection.release(); // Importantissimo rilasciare la connessione
	} catch (err) {
		console.error('❌ Errore connessione pool DB:', err);
		process.exit(1);
	}
}
testPoolConnection();

export default pool