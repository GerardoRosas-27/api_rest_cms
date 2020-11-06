"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const pageRouter_1 = require("./routes/pageRouter");
const cardsRouter_1 = require("./routes/cardsRouter");
const usuariosRouter_1 = require("./routes/usuariosRouter");
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
        this.start();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default("dev"));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
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
        this.app.use(express_fileupload_1.default());
        this.app.use(express_1.default.static('./public'));
    }
    routes() {
        this.app.use('/', pageRouter_1.pageR.router);
        this.app.use('/', cardsRouter_1.cardsR.router);
        this.app.use('/', usuariosRouter_1.usuarioR.router);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("aplicacion corriendo en el puerto: " + this.app.get('port'));
        });
    }
}
new Server();
