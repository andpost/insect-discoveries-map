import { Artfoto } from "./artfoto-entity";
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

    artfoto : Artfoto;

    beobachtungen : Beobachtung[];
}