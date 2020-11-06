import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRECT } from "../config";
import { usuarioService } from "../services/usuariosService";

class Jwt {
    public async verificarToken(req: Request, res: Response, next: NextFunction) {
        console.log("entro verificar token");
        try {
            if (!req.headers.authorization) {
                return res.status(401).send('Unauhtorized Request');
            }
            let token = req.headers.authorization.split(' ')[1];
            if (token === 'null') {
                return res.status(401).send('Unauhtorized Request');
            }
            const payload: any = await jwt.verify(token, SECRECT);
            if (!payload) {
                return res.status(401).send('Unauhtorized Request');
            }
            console.log("token desifrado:");
            console.log(payload);
            next();
        } catch (e) {
            //console.log(e)
            return res.status(401).send('Unauhtorized Request');
        }
    }
    public async verificarTokenAdmin(req: Request, res: Response, next: NextFunction) {
        console.log("entro verificar token");
        try {
            if (!req.headers.authorization) {
                return res.status(401).send('Unauhtorized Request');
            }
            let token = req.headers.authorization.split(' ')[1];
            if (token === 'null') {
                return res.status(401).send('Unauhtorized Request');
            }
            const payload: any = await jwt.verify(token, SECRECT);
            if (!payload) {
                return res.status(401).send('Unauhtorized Request');
            }
            console.log("token desifrado:");
            console.log(payload);
            const resultAdmin = await usuarioService.getUser(parseInt(payload.id), undefined);
            if(resultAdmin.length > 0){
                if(resultAdmin[0].rol === "admin"){
                    next();
                }else{
                    return res.status(401).send({mensaje:'No cuentas con los permisos de administrador'});
                }  
            }else{
                return res.status(401).send({mensaje:'Tu usuario ya fue eliminado del sistema'});
            }
        } catch (e) {
            //console.log(e)
            return res.status(401).send('Unauhtorized Request');
        }
    }
}
export const jwtSecurity = new Jwt();