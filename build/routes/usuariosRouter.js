"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioR = void 0;
const express_1 = require("express");
const jwt_1 = require("../security/jwt");
const usuariosController_1 = require("../controllers/usuariosController");
class UsuariosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.configRoutes();
    }
    configRoutes() {
        this.router.get('/api/usuario', jwt_1.jwtSecurity.verificarToken, usuariosController_1.usuarioC.getUsuarios);
        this.router.get('/api/usuario/:id', jwt_1.jwtSecurity.verificarToken, usuariosController_1.usuarioC.getUsuario);
        this.router.post('/api/usuario/signup', jwt_1.jwtSecurity.verificarTokenAdmin, usuariosController_1.usuarioC.signup);
        this.router.post('/api/usuario/signin', usuariosController_1.usuarioC.signin);
        this.router.delete('/api/usuario/:id', jwt_1.jwtSecurity.verificarToken, usuariosController_1.usuarioC.deleteUsuario);
        this.router.put('/api/usuario/:id', jwt_1.jwtSecurity.verificarToken, usuariosController_1.usuarioC.putUsuario);
    }
}
exports.usuarioR = new UsuariosRoutes();
