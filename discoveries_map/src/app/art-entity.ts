import { Beobachtung } from "./beobachtung-entity";

export interface Art {

    name : string;
    
    nameDeutsch : string;

    ordnung : string;

    urlWikipedia : string;

    urlInsektenSachsen : string;

    urlSonstige : string;

    beobachtungen : Beobachtung[];
}