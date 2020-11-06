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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageC = void 0;
const crudService_1 = __importDefault(require("../services/crudService"));
const pageService_1 = require("../services/pageService");
class PageController {
    constructor() {
        this.crudService = new crudService_1.default();
        this.crudService.init("page", "id");
    }
    getPages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield pageService_1.pageService.select(undefined);
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
                const result = yield this.crudService.select(parseInt(id));
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
            console.log(req.body);
            req.body.usuario = parseInt(req.body.userId);
            delete req.body.userId;
            const result = yield this.crudService.insert(req.body);
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
            delete req.body.name;
            delete req.body.id;
            delete req.body.userId;
            console.log(req.body);
            const result = yield this.crudService.update(parseInt(id), req.body);
            console.log(result);
            if (result.affectedRows === 1) {
                res.status(201).json({ "mensaje": "Los datos se actualizarón" });
            }
            else {
                res.status(500).json({ "mensaje": "Error al actualizar los datos" });
            }
        });
    }
    deletePage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield this.crudService.delete(parseInt(id));
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
