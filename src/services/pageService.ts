import { Page } from "../models/page";
import CrudService from "./crudService";

class PageService {
    crudC: CrudService;
    constructor() {
        this.crudC = new CrudService();
        this.crudC.init("page", "id");
    }
    
    async getPage(id?: number, nombre?: string ): Promise<Page[]> {
        if (id) {
            return await this.crudC.select(id);
        } else {
            if (nombre) {
                return await this.crudC.selectNombre("nombre", nombre);
            } else {
                return await this.crudC.select();
            }
        }
    }

    async postPage(page: Page) {
        console.log("datos para insertar: ", page);
       return await this.crudC.insert(page); 
    }
    
    async putPage(id: number, page: Page) {
        console.log("datos para actualizar: ", id  ," data: ", page);
       return await this.crudC.update(id, page); 
    }
    async deletePage(id: number) {
        console.log("datos para eliminar: ", id);
       return await this.crudC.delete(id); 
    }
}
export const pageService = new PageService();