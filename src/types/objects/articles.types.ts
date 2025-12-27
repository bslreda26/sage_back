import type { Famille } from "./familles.types.js";

export interface Article {

    article_reference: string;
    article_designation: string;
    famille: Famille;
    article_prix_vente: number;
    article_prix_achat: number;
    
}