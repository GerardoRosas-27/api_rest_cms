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
exports.pageC = void 0;
const pageService_1 = require("../services/pageService");
class PageController {
    getPages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield pageService_1.pageService.getPage(undefined);
                console.log(result);
                res.status(200).json(result);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ "mensaje": "Error al consultar pages" });
            }
        });
    }
    getPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield pageService_1.pageService.getPage(parseInt(id), undefined);
                console.log(result);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json({ "mensaje": "Error al consultar page" });
            }
        });
    }
    postPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = req.body;
            const result = yield pageService_1.pageService.postPage(page);
            console.log(result);
            if (result.affectedRows === 1) {
                res.status(201).json({ "mensaje": "Los datos se registro" });
            }
            else {
                res.status(500).json({ "mensaje": "Error al registrar el contacto" });
            }
        });
    }
    putPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { id } = req.params;
            console.log(req.body);
            const page = req.body;
            const result0 = yield pageService_1.pageService.getPage(parseInt(id));
            console.log(result0);
            if (result0[1]) {
                const aditResult = Object.assign(result0[1], page);
                const result = yield pageService_1.pageService.putPage(parseInt(id), aditResult);
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
        });
    }
    deletePage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield pageService_1.pageService.deletePage(parseInt(id));
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
exports.pageC = new PageController();
