"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardC = void 0;
const cardsService_1 = require("../services/cardsService");
class CardsController {
    getCardsPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield cardsService_1.cardsService.getCardsPage(parseInt(id));
                console.log(result);
                res.status(200).json({ mensaje: "Se cargaron los cards", cards: result });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ "mensaje": "Error al consultar cards" });
            }
        });
    }
    getCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield cardsService_1.cardsService.getCard(parseInt(id), undefined);
                console.log(result);
                res.status(200).json({ mensaje: "Se cargaron los cards", cards: result });
            }
            catch (error) {
                res.status(500).json({ "mensaje": "Error al consultar card" });
            }
        });
    }
    postCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { files } = req;
            if (files) {
                console.log("si trae archivo");
                console.log(files);
                let archivo = files.archivo;
                const imgBD = `http://localhost:3000/imagenes/${archivo.name}`;
                const existeImagen = yield cardsService_1.cardsService.getImagenCard(imgBD);
                if (existeImagen.length > 0) {
                    res.status(500).json({ 'mensaje': 'el archivo: ' + archivo.name + ' ya existe' });
                }
                else {
                    archivo.mv(`./public/imagenes/${archivo.name}`, (err) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            console.log(err);
                            res.status(500).json({ 'mensaje': 'el archivo: ' + archivo.name + ' no se pudo subir' });
                        }
                        else {
                            let card = req.body;
                            if (typeof (card.page) === "string") {
                                card.page = parseInt(card.page);
                            }
                            card.imagen = imgBD;
                            console.log(card);
                            const result = yield cardsService_1.cardsService.postCard(card);
                            console.log(result);
                            if (result.affectedRows === 1) {
                                res.status(201).json({ "mensaje": "Los datos se registro" });
                            }
                            else {
                                res.status(500).json({ "mensaje": "Error al registrar el contacto" });
                            }
                        }
                    }));
                }
            }
        });
    }
    putCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("entro putcard");
            const { files } = req;
            if (files) {
                const { id } = req.params;
                let archivo = files.archivo;
                const imgBD = `http://localhost:3000/imagenes/${archivo.name}`;
                const result0 = yield cardsService_1.cardsService.getCard(parseInt(id));
                if (result0.length > 0) {
                    if (result0[0].imagen === imgBD) {
                        res.status(500).json({ 'mensaje': 'el archivo: ' + archivo.name + ' ya existe' });
                    }
                    else {
                        console.log("entro imagen:", result0);
                        archivo.mv(`./public/imagenes/${archivo.name}`, (err) => __awaiter(this, void 0, void 0, function* () {
                            if (err) {
                                console.log(err);
                                res.status(500).json({ 'mensaje': 'el archivo: ' + archivo.name + ' no se pudo subir' });
                            }
                            else {
                                let card = req.body;
                                if (typeof (card.page) === "string") {
                                    card.page = parseInt(card.page);
                                }
                                card.imagen = imgBD;
                                console.log(card);
                                const aditResult = Object.assign(result0[0], card);
                                const result = yield cardsService_1.cardsService.putCard(parseInt(id), aditResult);
                                console.log(result);
                                if (result.affectedRows === 1) {
                                    res.status(201).json({ "mensaje": "Los datos se actualizarón" });
                                }
                                else {
                                    res.status(500).json({ "mensaje": "Error al actualizar los datos" });
                                }
                            }
                        }));
                    }
                }
                else {
                    res.status(500).json({ "mensaje": "El dato no se encontro para actualizar" });
                }
            }
            else {
                let card = req.body;
                if (typeof (card.page) === "string") {
                    card.page = parseInt(card.page);
                }
                delete card.archivo;
                const { id } = req.params;
                const result0 = yield cardsService_1.cardsService.getCard(parseInt(id));
                if (result0.length > 0) {
                    console.log("entro si hay card");
                    const editResult = Object.assign(result0[0], card);
                    const result = yield cardsService_1.cardsService.putCard(parseInt(id), editResult);
                    console.log(result);
                    if (result.affectedRows === 1) {
                        res.status(201).json({ "mensaje": "Los datos se actualizarón" });
                    }
                    else {
                        res.status(500).json({ "mensaje": "Error al actualizar los datos" });
                    }
                }
                else {
                    res.status(500).json({ "mensaje": "El dato no se encontro para actualizar" });
                }
            }
        });
    }
    deleteCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield cardsService_1.cardsService.deleteCard(parseInt(id));
            console.log(result);
            if (result.affectedRows === 1) {
                res.status(201).json({ "mensaje": "El dato se elimino" });
            }
            else {
                res.status(500).json({ "mensaje": "Error al eliminar el dato" });
            }
        });
    }
}
exports.cardC = new CardsController();
