
import pool from "../database";

export default class CrudService{

    private nombreTabla!: string;
    private nombreId!: string;

    constructor() {
    }

    public init(tabla: string, id: string) {
        this.nombreTabla = tabla;
        this.nombreId = id;
    }

    public async insert(data: any) {
        const result = await pool.query('INSERT INTO ' + this.nombreTabla + ' set ?', [data]);
        return result
    }

    public async select(id?: number | string) {
        if (id) {
            if (typeof (id) === "string") {
                console.log("entro id String");
                const result = await pool.query('SELECT * FROM ' + this.nombreTabla + ' WHERE ' + this.nombreId + ' = "' + id + '"');
                return result;
            } else {
                const result = await pool.query('SELECT * FROM ' + this.nombreTabla + ' WHERE ' + this.nombreId + ' = ' + id);
                return result;
            }
        } else {
            const result = await pool.query('SELECT * FROM ' + this.nombreTabla);
            return result;
        }
    }

    public async selectNombre(selectNombre: string, nombre: string | number) {
        if (typeof (nombre) === "string") {
            const result = await pool.query('SELECT * FROM ' + this.nombreTabla + ' WHERE ' + selectNombre + ' = "' + nombre + '"');
            return result;
        } else {
            const result = await pool.query('SELECT * FROM ' + this.nombreTabla + ' WHERE ' + selectNombre + ' = ' + nombre);
            return result;
        }
    }

    public async update(id: number, data: any) {
        const result = await pool.query('UPDATE ' + this.nombreTabla + ' SET ? WHERE ' + this.nombreId + ' = ?', [data, id]);
        return result;
    }

    public async delete(id: number) {
        const result = await pool.query('DELETE FROM ' + this.nombreTabla + ' WHERE ' + this.nombreId + ' = ' + id);
        return result;
    }
    public async deleteNombre(nombre: string, id: number) {
        const result = await pool.query('DELETE FROM ' + this.nombreTabla + ' WHERE ' + nombre + ' = ' + id);
        return result;
    }
}
