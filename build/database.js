"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const config_1 = require("./config");
const pool = promise_mysql_1.default.createPool(config_1.keys.database);
function conexion() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield pool.getConnection();
            pool.releaseConnection(result);
            console.log("Base de datos conectada.");
        }
        catch (error) {
            console.log("error al conectar la base de datos");
        }
    });
}
conexion();
exports.default = pool;
