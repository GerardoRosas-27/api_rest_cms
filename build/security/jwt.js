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
exports.jwtSecurity = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const usuariosService_1 = require("../services/usuariosService");
class Jwt {
    verificarToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("entro verificar token");
            try {
                if (!req.headers.authorization) {
                    return res.status(401).send('Unauhtorized Request');
                }
                let token = req.headers.authorization.split(' ')[1];
                if (token === 'null') {
                    return res.status(401).send('Unauhtorized Request');
                }
                const payload = yield jsonwebtoken_1.default.verify(token, config_1.SECRECT);
                if (!payload) {
                    return res.status(401).send('Unauhtorized Request');
                }
                console.log("token desifrado:");
                console.log(payload);
                next();
            }
            catch (e) {
                //console.log(e)
                return res.status(401).send('Unauhtorized Request');
            }
        });
    }
    verificarTokenAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("entro verificar token");
            try {
                if (!req.headers.authorization) {
                    return res.status(401).send('Unauhtorized Request');
                }
                let token = req.headers.authorization.split(' ')[1];
                if (token === 'null') {
                    return res.status(401).send('Unauhtorized Request');
                }
                const payload = yield jsonwebtoken_1.default.verify(token, config_1.SECRECT);
                if (!payload) {
                    return res.status(401).send('Unauhtorized Request');
                }
                console.log("token desifrado:");
                console.log(payload);
                const resultAdmin = yield usuariosService_1.usuarioService.getUser(parseInt(payload.id), undefined);
                if (resultAdmin.length > 0) {
                    if (resultAdmin[0].rol === "admin") {
                        next();
                    }
                    else {
                        return res.status(401).send({ mensaje: 'No cuentas con los permisos de administrador' });
                    }
                }
                else {
                    return res.status(401).send({ mensaje: 'Tu usuario ya fue eliminado del sistema' });
                }
            }
            catch (e) {
                //console.log(e)
                return res.status(401).send('Unauhtorized Request');
            }
        });
    }
}
exports.jwtSecurity = new Jwt();
