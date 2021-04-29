import { Foto } from "./foto-entity";
import { Beobachtung } from "./beobachtung-entity";

export interface Art {

    name : string;
    
    nameDeutsch : string;

    ordnung : string;

    familie : string;

    urlWikipedia : string;

    urlInsektenSachsen : string;

    urlSonstige : string;

    urlVideo : string;

    foto : Foto;

    beobachtungen : Beobachtung[];

    notizen : string;
}