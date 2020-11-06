import { Usuario } from "../models/usuarios";
import CrudService from "./crudService";

class UsuariosService {
    crudC: CrudService;
    constructor() {
        this.crudC = new CrudService();
        this.crudC.init("usuarios", "id");
    }
    
    async getUser(id?: number, nombre?: string ): Promise<Usuario[]> {
        if (id) {
            return await this.crudC.select(id);
        } else {
            if (nombre) {
                return await this.crudC.selectNombre("username", nombre);
            } else {
                return await this.crudC.select();
            }
        }
    }

    async postUser(data: Usuario) {
        console.log("datos para insertar: ", data);
       return await this.crudC.insert(data); 
    }
    
    async putUser(id: number, data: Usuario) {
        console.log("datos para actualizar: ", id  ," data: ", data);
       return await this.crudC.update(id, data); 
    }
    async deleteUser(id: number) {
        console.log("datos para eliminar: ", id);
       return await this.crudC.delete(id); 
    }
}
export const usuarioService = new UsuariosService();