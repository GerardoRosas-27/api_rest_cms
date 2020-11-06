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
exports.cardsService = void 0;
const crudService_1 = __importDefault(require("./crudService"));
class CardsService {
    constructor() {
        this.crudC = new crudService_1.default();
        this.crudC.init("cards", "id");
    }
    getCard(id, nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id) {
                return yield this.crudC.select(id);
            }
            else {
                if (nombre) {
                    return yield this.crudC.selectNombre("nombre", nombre);
                }
                else {
                    return yield this.crudC.select();
                }
            }
        });
    }
    getImagenCard(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.crudC.selectNombre("imagen", nombre);
        });
    }
    postCard(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("datos para insertar: ", data);
            return yield this.crudC.insert(data);
        });
    }
    putCard(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("datos para actualizar: ", id, " data: ", data);
            return yield this.crudC.update(id, data);
        });
    }
    deleteCard(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("datos para eliminar: ", id);
            return yield this.crudC.delete(id);
        });
    }
}
exports.cardsService = new CardsService();
