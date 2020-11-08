export interface Page {
    id?: number;
    nombre: string;
    titulo: string;
    descripcion: string;
    imagen?: string;
    boton: string;
    link: string;
    footer: string;
    archivo?: any;
}