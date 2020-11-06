import mysql from "promise-mysql";
import { keys } from "./config";

const pool = mysql.createPool(keys.database);

async function conexion(){
    try {
        const result = await pool.getConnection();
        pool.releaseConnection(result);
        console.log("Base de datos conectada.");
    } catch (error) {
        console.log("error al conectar la base de datos");
    }
}
conexion();
export default pool;