import { Router } from "express";
import { jwtSecurity } from "../security/jwt";
import { cardC } from "../controllers/cardsController";

class CardsRoutes {
  public router: Router = Router();

  constructor() {
    this.configRoutes();
  }
  configRoutes(): void {
    this.router.get('/api/card', cardC.getCards);
    this.router.get('/api/card/:id', cardC.getCard);
    this.router.post('/api/card', jwtSecurity.verificarToken, cardC.postCard);
    this.router.delete('/api/card/:id', jwtSecurity.verificarToken, cardC.deleteCard);
    this.router.put('/api/cart/:id', jwtSecurity.verificarToken, cardC.putCard);
  }
}

export const cardsR = new CardsRoutes();
