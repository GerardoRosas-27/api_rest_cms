import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRECT } from "../config";

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
            req.body.userId = payload.id;
            console.log("id del usuario: " + req.body.userId);
            next();
        } catch (e) {
            //console.log(e)
            return res.status(401).send('Unauhtorized Request');
        }
    }
}
export const jwtSecurity = new Jwt();