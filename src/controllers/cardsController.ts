import { Request, Response } from "express";
import fileUpload from "express-fileupload";
import { Card } from "../models/cards";
import { cardsService } from "../services/cardsService";

class CardsController {

    public async getCardsPage(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await cardsService.getCardsPage(parseInt(id));
            console.log(result);
            res.status(200).json({mensaje: "Se cargaron los cards", cards: result});
        } catch (error) {
            console.log(error);
            res.status(500).json({ "mensaje": "Error al consultar cards" });
        }
    }

    public async getCard(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await cardsService.getCard(parseInt(id), undefined);
            console.log(result);
            res.status(200).json({mensaje: "Se cargaron los cards", cards: result});
        } catch (error) {
            res.status(500).json({ "mensaje": "Error al consultar card" });
        }
    }

    public async postCard(req: Request, res: Response) {
        const { files } = req;
        if (files) {
            console.log("si trae archivo");
            console.log(files);
            let archivo: fileUpload.UploadedFile = files.archivo;

            const imgBD = `http://localhost:3000/imagenes/${archivo.name}`;

            const existeImagen = await cardsService.getImagenCard(imgBD);
            if(existeImagen.length > 0){
                res.status(500).json({ 'mensaje': 'el archivo: ' + archivo.name + ' ya existe' });
            }else{
                archivo.mv(`./public/imagenes/${archivo.name}`, async err => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ 'mensaje': 'el archivo: ' + archivo.name + ' no se pudo subir' });
                    } else {
                        let card: Card = req.body;
                        card.imagen = imgBD;
                        console.log(card);
                        const result = await cardsService.postCard(card);
                        console.log(result);
                        if (result.affectedRows === 1) {
                            res.status(201).json({ "mensaje": "Los datos se registro" });
                        } else {
                            res.status(500).json({ "mensaje": "Error al registrar el contacto" });
                        }
    
                    }
                })
            }
        }
    }

    public async putCard(req: Request, res: Response) {
        console.log("entro putcard");
        const { files } = req;
        if (files) {
            const { id } = req.params;
            let archivo: fileUpload.UploadedFile = files.archivo;
            const imgBD = `http://localhost:3000/imagenes/${archivo.name}`;
            const result0: Card[] = await cardsService.getCard(parseInt(id));
            if (result0.length > 0) {
                if (result0[0].imagen === imgBD) {
                    res.status(500).json({ 'mensaje': 'el archivo: ' + archivo.name + ' ya existe' });
                } else {
                    console.log("entro imagen:", result0);
                    archivo.mv(`./public/imagenes/${archivo.name}`, async err => {
                        if (err) {
                            console.log(err);
                            res.status(500).json({ 'mensaje': 'el archivo: ' + archivo.name + ' no se pudo subir' });
                        } else {
                            let card: Card = req.body;
                            if(typeof (card.page) === "string"){
                                card.page = parseInt(card.page);
                             }
                            card.imagen = imgBD;
                            console.log(card);
                            const aditResult = Object.assign(result0[0], card);
                            const result = await cardsService.putCard(parseInt(id), aditResult);
                            console.log(result);
                            if (result.affectedRows === 1) {
                                res.status(201).json({ "mensaje": "Los datos se actualizarón" });
                            }
                            else {
                                res.status(500).json({ "mensaje": "Error al actualizar los datos" });
                            }
                        }
                    })
                }
            } else {
                res.status(500).json({ "mensaje": "El dato no se encontro para actualizar" });
            }
        } else {
            let card: Card = req.body;
            if(typeof (card.page) === "string"){
               card.page = parseInt(card.page);
            }
            delete card.archivo;
            const { id } = req.params;
            const result0: Card[] = await cardsService.getCard(parseInt(id));
            if (result0.length > 0) {
                console.log("entro si hay card");
                const editResult = Object.assign(result0[0], card);
                const result = await cardsService.putCard(parseInt(id), editResult);
                console.log(result);
                if (result.affectedRows === 1) {
                    res.status(201).json({ "mensaje": "Los datos se actualizarón" });
                }
                else {
                    res.status(500).json({ "mensaje": "Error al actualizar los datos" });
                }
            } else {
                res.status(500).json({ "mensaje": "El dato no se encontro para actualizar" });
            }
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