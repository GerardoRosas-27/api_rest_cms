import { Request, Response } from "express";
import fileUpload from "express-fileupload";
import { Page } from "../models/page";
import { pageService } from "../services/pageService";

class PageController {

    public async getPages(req: Request, res: Response) {
        try {
            const result = await pageService.getPage(undefined);
            console.log(result);
            res.status(200).json({ mensaje: "Se cargaron las pages", pages: result });
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
            res.status(200).json({ mensaje: "Se cargaron las pages", pages: result });
        } catch (error) {
            res.status(500).json({ "mensaje": "Error al consultar page" });
        }
    }

    public async postPage(req: Request, res: Response) {

        const { files } = req;
        if (files) {
            console.log("si trae archivo");
            console.log(files);
            let archivo: fileUpload.UploadedFile = files.archivo;

            const imgBD = `http://localhost:3000/imagenes/${archivo.name}`;

            const existeImagen = await pageService.getImagenPage(imgBD);
            if (existeImagen.length > 0) {
                res.status(500).json({ 'mensaje': 'el archivo: ' + archivo.name + ' ya existe' });
            } else {
                archivo.mv(`./public/imagenes/${archivo.name}`, async err => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ 'mensaje': 'el archivo: ' + archivo.name + ' no se pudo subir' });
                    } else {
                        let page: Page = req.body;
                        page.imagen = imgBD;
                        console.log(page);
                        const result = await pageService.postPage(page);
                        console.log(result);
                        if (result.affectedRows === 1) {
                            res.status(201).json({ "mensaje": "Los datos se registro" });
                        } else {
                            res.status(500).json({ "mensaje": "Error al registrar el contacto" });
                        }
                    }
                })
            }
        } else {
            res.status(500).json({ "mensaje": "carga una imagen" });
        }
    }

    public async putPage(req: Request, res: Response) {
        console.log("entro putPage");
        const { files } = req;
        if (files) {
            const { id } = req.params;
            let archivo: fileUpload.UploadedFile = files.archivo;
            const imgBD = `http://localhost:3000/imagenes/${archivo.name}`;
            const result0: Page[] = await pageService.getPage(parseInt(id));
            if (result0.length > 0) {
                if (result0[0].imagen === imgBD) {
                    res.status(500).json({ 'mensaje': 'el archivo: ' + archivo.name + ' ya existe' });
                } else {
                    console.log("entro imagen:", result0);
                    archivo.mv(`./public/imagenes/${archivo.name}`, async err => {
                        if (err) {
                            console.log(err);
                            res.status(500).json({ 'mensaje': 'el archivo: ' + archivo.name + ' no se pudo subir' });
                        } else {
                            let page: Page = req.body;
                            page.imagen = imgBD;
                            console.log(page);
                            const aditResult = Object.assign(result0[0], page);
                            const result = await pageService.putPage(parseInt(id), aditResult);
                            console.log(result);
                            if (result.affectedRows === 1) {
                                res.status(201).json({ "mensaje": "Los datos se actualizarón" });
                            }
                            else {
                                res.status(500).json({ "mensaje": "Error al actualizar los datos" });
                            }
                        }
                    })
                }
            } else {
                res.status(500).json({ "mensaje": "El dato no se encontro para actualizar" });
            }
        } else {
            let page: Page = req.body;
            delete page.archivo;
            const { id } = req.params;
            const result0: Page[] = await pageService.getPage(parseInt(id));
            if (result0.length > 0) {
                const aditResult = Object.assign(result0[0], page);
                const result = await pageService.putPage(parseInt(id), aditResult);
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