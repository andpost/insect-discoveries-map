import { Art } from "./art-entity";
import { Foto } from './foto-entity';

export interface Beobachtung {

    art : Art;
    
    datum: string;

    datumFormattiert : string;

    beobachter: string;
    
    lat: number;
    
    lon: number;

    fundort: string;

    stadium: string;

    anzahl: number;

    pruefung: string;

    fotos: Foto[];
}