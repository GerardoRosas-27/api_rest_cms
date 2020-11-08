import { Card } from "../models/cards";
import CrudService from "./crudService";

class CardsService {
    crudC: CrudService;
    constructor() {
        this.crudC = new CrudService();
        this.crudC.init("cards", "id");
    }
    
    async getCard(id?: number, nombre?: string ): Promise<Card[]> {
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
    async getCardsPage(id: number ): Promise<Card[]> {
        return await this.crudC.selectNombre("page", id);
     }
    async getImagenCard(nombre: string ): Promise<Card[]> {
       return await this.crudC.selectNombre("imagen", nombre);
    }

    async postCard(data: Card) {
        console.log("datos para insertar: ", data);
       return await this.crudC.insert(data); 
    }
    
    async putCard(id: number, data: Card) {
        console.log("datos para actualizar: ", id  ," data: ", data);
       return await this.crudC.update(id, data); 
    }
    async deleteCard(id: number) {
        console.log("datos para eliminar: ", id);
       return await this.crudC.delete(id); 
    }
}
export const cardsService = new CardsService();