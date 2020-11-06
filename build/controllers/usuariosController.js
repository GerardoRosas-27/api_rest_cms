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
exports.usuarioC = void 0;
const usuariosService_1 = require("../services/usuariosService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config");
class UsuariosController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let usuario = req.body;
            const usuarioExiste = yield usuariosService_1.usuarioService.getUser(undefined, usuario.username);
            if (usuarioExiste.length === 0) {
                usuario.contra = yield bcrypt_1.default.hashSync(usuario.contra, 10);
                usuario.rol = "user";
                const result = yield usuariosService_1.usuarioService.postUser(usuario);
                console.log(result.insertId);
                if (result.warningCount === 0) {
                    const token = yield jsonwebtoken_1.default.sign({ id: result.insertId }, config_1.SECRECT);
                    res.status(200).json({ "mensaje": "usuario registrado", token });
                }
                else {
                    res.status(401).json({ "mensaje": "Error al registrar el usuario" });
                }
            }
            else {
                res.status(401).json({ "mensaje": "Error el nombre de usuario ya existe" });
            }
        });
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = req.body;
            let verificada = false;
            const result = yield usuariosService_1.usuarioService.getUser(undefined, usuario.username);
            console.log(result);
            if (result.length > 0) {
                verificada = bcrypt_1.default.compareSync(usuario.contra, result[0].contra);
                if (verificada) {
                    const token = jsonwebtoken_1.default.sign({ id: result[0].id }, config_1.SECRECT);
                    res.status(200).json({ mensaje: "Sesión iniciada", usuario: result[0].username, token, rol: result[0].rol });
                }
                else {
                    res.status(401).json({ mensaje: "Contraseña incorrecta" });
                }
            }
            else {
                res.status(401).json({ mensaje: "El usuario no existe" });
            }
        });
    }
    getUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield usuariosService_1.usuarioService.getUser(undefined);
                console.log(result);
                res.status(200).json(result);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ "mensaje": "Error al consultar usuarios" });
            }
        });
    }
    getUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield usuariosService_1.usuarioService.getUser(parseInt(id), undefined);
                console.log(result);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json({ "mensaje": "Error al consultar usuarios" });
            }
        });
    }
    putUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { id } = req.params;
            console.log(req.body);
            const usuario = req.body;
            const result0 = yield usuariosService_1.usuarioService.getUser(parseInt(id));
            console.log(result0);
            if (result0[1]) {
                const aditResult = Object.assign(result0[1], usuario);
                const result = yield usuariosService_1.usuarioService.putUser(parseInt(id), aditResult);
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
    deleteUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield usuariosService_1.usuarioService.deleteUser(parseInt(id));
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
exports.usuarioC = new UsuariosController();
