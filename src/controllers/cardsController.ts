import { Request, Response } from "express";
import { Card } from "../models/cards";
import { cardsService } from "../services/cardsService";

class CardsController {
   
    public async getCards(req: Request, res: Response) {
        try {
            const result = await cardsService.getCard(undefined);
            console.log(result);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ "mensaje": "Error al consultar pages" });
        }
    }

    public async getCard(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await cardsService.getCard(parseInt(id), undefined);
            console.log(result);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ "mensaje": "Error al consultar page" });
        }
    }

    public async postCard(req: Request, res: Response) {
        const card: Card = req.body;
        const result = await cardsService.postCard(card);
        console.log(result);
        if (result.affectedRows === 1) {
            res.status(201).json({ "mensaje": "Los datos se registro" });
        } else {
            res.status(500).json({ "mensaje": "Error al registrar el contacto" });
        }
    }

    public async putCard(req: Request, res: Response) {
        console.log(req.body)
        const { id } = req.params;
        console.log(req.body);
        const card: Card = req.body;
        const result0: Card[] = await cardsService.getCard(parseInt(id));
        console.log(result0);
        if(result0[1]){
            const aditResult = Object.assign(result0[1], card);
            const result = await cardsService.putCard(parseInt(id), aditResult);
            console.log(result);
            if (result.affectedRows === 1) {
                res.status(201).json({ "mensaje": "Los datos se actualizarón" });
            }
            else {
                res.status(500).json({ "mensaje": "Error al actualizar los datos" });
            }
        }else{
            res.status(500).json({ "mensaje": "El dato no se encontro para actualizar" });
        }
    }

    public async deleteCard(req: Request, res: Response) {
        const { id } = req.params;
        const result = await cardsService.deleteCard(parseInt(id));
        console.log(result);
        if (result.affectedRows === 1) {
            res.status(201).json({ "mensaje": "El dato se elimino" });
        } else {
            res.status(500).json({ "mensaje": "Error al eliminar el dato" });
        }
    }

}
export const cardC = new CardsController();