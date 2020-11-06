import { Request, Response } from "express";
import { Usuario } from "../models/usuarios";
import { usuarioService } from "../services/usuariosService";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { SECRECT } from "../config";

class UsuariosController {

    public async signup(req: Request, res: Response) {
        let usuario: Usuario = req.body;
        const usuarioExiste: Usuario[] = await usuarioService.getUser(undefined, usuario.username);
        if (usuarioExiste.length === 0) {
            usuario.contra = await bcrypt.hashSync(usuario.contra, 10);
            usuario.rol = "user";
            const result = await usuarioService.postUser(usuario);
            console.log(result.insertId);
            if (result.warningCount === 0) {
                const token = await jwt.sign({ id: result.insertId }, SECRECT);
                res.status(200).json({ "mensaje": "usuario registrado", token });
            } else {
                res.status(401).json({ "mensaje": "Error al registrar el usuario" });
            }
        } else {
            res.status(401).json({ "mensaje": "Error el nombre de usuario ya existe" });
        }
    }

    public async signin(req: Request, res: Response) {
        const usuario: Usuario = req.body;
        let verificada: Boolean = false;
        const result: Usuario[] = await usuarioService.getUser(undefined, usuario.username);
        console.log(result);
        if (result.length > 0) {
            verificada = bcrypt.compareSync(usuario.contra, result[0].contra);
            if (verificada) {
                const token = jwt.sign({ id: result[0].id }, SECRECT);
                res.status(200).json({ mensaje: "Sesión iniciada", usuario: result[0].username, token, rol: result[0].rol });
            } else {
                res.status(401).json({ mensaje: "Contraseña incorrecta" });
            }
        } else {
            res.status(401).json({ mensaje: "El usuario no existe" });
        }
    }

    public async getUsuarios(req: Request, res: Response) {
        try {
            const result = await usuarioService.getUser(undefined);
            console.log(result);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ "mensaje": "Error al consultar usuarios" });
        }
    }

    public async getUsuario(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await usuarioService.getUser(parseInt(id), undefined);
            console.log(result);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ "mensaje": "Error al consultar usuarios" });
        }
    }

    public async putUsuario(req: Request, res: Response) {
        console.log(req.body)
        const { id } = req.params;
        console.log(req.body);
        const usuario: Usuario = req.body;
        const result0: Usuario[] = await usuarioService.getUser(parseInt(id));
        console.log(result0);
        if (result0[1]) {
            const aditResult = Object.assign(result0[1], usuario);
            const result = await usuarioService.putUser(parseInt(id), aditResult);
            console.log(result);
            if (result.affectedRows === 1) {
                res.status(201).json({ "mensaje": "Los datos se actualizarón" });
            }
            else {
                res.status(500).json({ "mensaje": "Error al actualizar los datos" });
            }
        } else {
            res.status(500).json({ "mensaje": "El dato no se encontro para actualizar" });
        }
    }

    public async deleteUsuario(req: Request, res: Response) {
        const { id } = req.params;
        const result = await usuarioService.deleteUser(parseInt(id));
        console.log(result);
        if (result.affectedRows === 1) {
            res.status(201).json({ "mensaje": "El dato se elimino" });
        } else {
            res.status(500).json({ "mensaje": "Error al eliminar el dato" });
        }
    }

}
export const usuarioC = new UsuariosController();