export interface Card {
    id?: number;
    nombre: string;
    descripcion: string;
    boton: string;
    imagen?: string;
    link: string;
    page?: number | string;
    archivo?: any;
}