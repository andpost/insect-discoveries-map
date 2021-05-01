import { Foto } from "./foto-entity";

export interface Gattung {
    name : string;
    
    nameDeutsch : string;

    ordnung : string;

    familie : string;

    urlWikipedia : string;

    urlInsektenSachsen : string;

    urlSonstige : string;

    icon : Foto;

    notizen : string;

    fotos: Foto[];
}