import { Router } from "express";
import { jwtSecurity } from "../security/jwt";
import { usuarioC } from "../controllers/usuariosController";

class UsuariosRoutes {
  public router: Router = Router();

  constructor() {
    this.configRoutes();
  }
  configRoutes(): void {
    this.router.get('/api/usuario', jwtSecurity.verificarToken, usuarioC.getUsuarios);
    this.router.get('/api/usuario/:id', jwtSecurity.verificarToken, usuarioC.getUsuario);
    this.router.post('/api/usuario/signup',jwtSecurity.verificarTokenAdmin, usuarioC.signup);
    this.router.post('/api/usuario/signin', usuarioC.signin);
    this.router.delete('/api/usuario/:id', jwtSecurity.verificarToken, usuarioC.deleteUsuario);
    this.router.put('/api/usuario/:id', jwtSecurity.verificarToken, usuarioC.putUsuario);
  }
}

export const usuarioR = new UsuariosRoutes();
