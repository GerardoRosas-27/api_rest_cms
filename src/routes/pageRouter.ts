import { Router } from "express";
import { jwtSecurity } from "../security/jwt";
import { pageC } from "../controllers/pageController";

class PageRoutes {
  public router: Router = Router();

  constructor() {
    this.configRoutes();
  }
  configRoutes(): void {
    this.router.get('/api/page', pageC.getPages);
    this.router.get('/api/page/:id', pageC.getPage);
    this.router.post('/api/page', jwtSecurity.verificarToken, pageC.postPage);
    this.router.delete('/api/page/:id', jwtSecurity.verificarToken, pageC.deletePage);
    this.router.put('/api/page/:id', jwtSecurity.verificarToken, pageC.putPage);
  }
}
export const pageR = new PageRoutes();
