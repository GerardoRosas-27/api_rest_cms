import { Request, Response } from "express";
import { Page } from "../models/page";
import { pageService } from "../services/pageService";

class PageController {
   
    public async getPages(req: Request, res: Response) {
        try {
            const result = await pageService.getPage(undefined);
            console.log(result);
            res.status(200).json({mensaje: "Se cargaron las pages", pages: result});
        } catch (error) {
            console.log(error);
            res.status(500).json({ "mensaje": "Error al consultar pages" });
        }
    }

    public async getPage(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await pageService.getPage(parseInt(id), undefined);
            console.log(result);
            res.status(200).json({mensaje: "Se cargaron las pages", pages: result});
        } catch (error) {
            res.status(500).json({ "mensaje": "Error al consultar page" });
        }
    }

    public async postPage(req: Request, res: Response) {
        const page: Page = req.body;
        const result = await pageService.postPage(page);
        console.log(result);
        if (result.affectedRows === 1) {
            res.status(201).json({ "mensaje": "Los datos se registro" });
        } else {
            res.status(500).json({ "mensaje": "Error al registrar el page" });
        }
    }

    public async putPage(req: Request, res: Response) {
        console.log(req.body)
        const { id } = req.params;
        console.log(req.body);
        const page: Page = req.body;
        const result0: Page[] = await pageService.getPage(parseInt(id));
        console.log(result0);
        if(result0[1]){
            const aditResult = Object.assign(result0[1], page);
            const result = await pageService.putPage(parseInt(id), aditResult);
            console.log(result);
            if (result.affectedRows === 1) {
                res.status(201).json({ "mensaje": "Los datos se actualizarón" });
            }
            else {
                res.status(500).json({ "mensaje": "Error al actualizar los datos" });
            }
        }else{
            res.status(500).json({ "mensaje": "El dato no se encontro para actualizar" });
        }
    }

    public async deletePage(req: Request, res: Response) {
        const { id } = req.params;
        const result = await pageService.deletePage(parseInt(id));
        console.log(result);
        if (result.affectedRows === 1) {
            res.status(201).json({ "mensaje": "El dato se elimino" });
        } else {
            res.status(500).json({ "mensaje": "Error al eliminar el dato" });
        }
    }

}
export const pageC = new PageController();