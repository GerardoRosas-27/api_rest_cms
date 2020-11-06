"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageR = void 0;
const express_1 = require("express");
const jwt_1 = require("../security/jwt");
const pageController_1 = require("../controllers/pageController");
class PageRoutes {
    constructor() {
        this.router = express_1.Router();
        this.configRoutes();
    }
    configRoutes() {
        this.router.get('/api/page', pageController_1.pageC.getPages);
        this.router.get('/api/page/:id', pageController_1.pageC.getPage);
        this.router.post('/api/page', jwt_1.jwtSecurity.verificarToken, pageController_1.pageC.postPage);
        this.router.delete('/api/page/:id', jwt_1.jwtSecurity.verificarToken, pageController_1.pageC.deletePage);
        this.router.put('/api/page/:id', jwt_1.jwtSecurity.verificarToken, pageController_1.pageC.putPage);
    }
}
exports.pageR = new PageRoutes();
