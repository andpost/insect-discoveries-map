import { Art } from "./art-entity";

export interface InsektenFund {

    art : Art;
    
    datum: string;

    beobachter: string;
    
    lat: number;
    
    lon: number;

    fundort: string;

    stadium: string;

    anzahl: number;

    pruefung: string;
}