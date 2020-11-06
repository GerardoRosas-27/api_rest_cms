import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import { pageR } from "./routes/pageRouter";
import { cardsR } from "./routes/cardsRouter";
import { usuarioR } from "./routes/usuariosRouter";

class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.start();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        //-- middlewares de la cabecera
        this.app.use((req, res, next) => {

            // Dominio que tengan acceso (ej. 'http://example.com')
            res.setHeader('Access-Control-Allow-Origin', '*');

            // Metodos de solicitud que deseas permitir
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

            // Encabecedados que permites (ej. 'X-Requested-With,content-type')
            res.setHeader('Access-Control-Allow-Headers', '*');

            next();
        });

    }
    routes() {
        this.app.use('/', pageR.router);
        this.app.use('/', cardsR.router);
        this.app.use('/', usuarioR.router);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("aplicacion corriendo en el puerto: " + this.app.get('port'));
        });
    }
}
new Server();
