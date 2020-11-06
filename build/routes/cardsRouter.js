"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardsR = void 0;
const express_1 = require("express");
const jwt_1 = require("../security/jwt");
const cardsController_1 = require("../controllers/cardsController");
class CardsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.configRoutes();
    }
    configRoutes() {
        this.router.get('/api/card', cardsController_1.cardC.getCards);
        this.router.get('/api/card/:id', cardsController_1.cardC.getCard);
        this.router.post('/api/card', jwt_1.jwtSecurity.verificarToken, cardsController_1.cardC.postCard);
        this.router.delete('/api/card/:id', jwt_1.jwtSecurity.verificarToken, cardsController_1.cardC.deleteCard);
        this.router.put('/api/cart/:id', jwt_1.jwtSecurity.verificarToken, cardsController_1.cardC.putCard);
    }
}
exports.cardsR = new CardsRoutes();
