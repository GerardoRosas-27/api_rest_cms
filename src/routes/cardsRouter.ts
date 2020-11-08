import { Router } from "express";
import { jwtSecurity } from "../security/jwt";
import { cardC } from "../controllers/cardsController";

class CardsRoutes {
  public router: Router = Router();

  constructor() {
    this.configRoutes();
  }
  configRoutes(): void {
    this.router.get('/api/card/page/:id', cardC.getCardsPage);
    this.router.get('/api/card/:id', cardC.getCard);
    this.router.post('/api/card', jwtSecurity.verificarToken, cardC.postCard);
    this.router.put('/api/card/:id', jwtSecurity.verificarToken, cardC.putCard);
    this.router.delete('/api/card/:id', jwtSecurity.verificarToken, cardC.deleteCard);
  }
}

export const cardsR = new CardsRoutes();
