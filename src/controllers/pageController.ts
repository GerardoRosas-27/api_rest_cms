import { Request, Response } from "express";
import { format } from "morgan";
import CrudService from "../services/crudService";
import { pageService } from "../services/pageService";

class PageController {
    crudService: CrudService;
    constructor() {
        this.crudService = new CrudService();
        this.crudService.init("page", "id");
    }

    public async getPages(req: Request, res: Response) {
        try {
            const result = await pageService.select(undefined);
            console.log(result);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ "mensaje": "Error al consultar pages" });
        }


    }

    public async getPage(req: Request, res: Response) {

        try {
            const { id } = req.params;
            const result = await this.crudService.select(parseInt(id));
            console.log(result);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ "mensaje": "Error al consultar page" });
        }
    }

    public async postPage(req: Request, res: Response) {
        console.log(req.body);
        req.body.usuario = parseInt(req.body.userId);
        delete req.body.userId;
        const result = await this.crudService.insert(req.body);
        console.log(result);

        if (result.affectedRows === 1) {
            res.status(201).json({ "mensaje": "Los datos se registro" });
        } else {
            res.status(500).json({ "mensaje": "Error al registrar el contacto" });
        }
    }

    public async putPage(req: Request, res: Response) {
        console.log(req.body)
        const { id } = req.params;
        delete req.body.name;
        delete req.body.id;
        delete req.body.userId;

        console.log(req.body);
        const result = await this.crudService.update(parseInt(id), req.body);
        console.log(result);
        if (result.affectedRows === 1) {
            res.status(201).json({ "mensaje": "Los datos se actualizarón" });
        }
        else {
            res.status(500).json({ "mensaje": "Error al actualizar los datos" });
        }
    }

    public async deletePage(req: Request, res: Response) {
        const { id } = req.params;
        const result = await this.crudService.delete(parseInt(id));
        console.log(result);
        if (result.affectedRows === 1) {
            res.status(201).json({ "mensaje": "El dato se elimino" });
        } else {
            res.status(500).json({ "mensaje": "Error al eliminar el dato" });
        }
    }

}
export const pageC = new PageController();