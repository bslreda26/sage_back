export interface stocks {
//parms:article_reference,depot,date,famille
  article_reference: string;
  article_designation: string;
  article_famille: string;
  famille_code: string;
  article_quantity: number;
  depot_intitule: string;
  depot_code: string;
}

export interface valeur_stock {
  //parms:article_reference,date,famille
  article_reference: string;
  article_designation: string;
  article_famille: string;
  article_cmup: number;
  article_prix_ttc: number;
  total_cmup: number;
  total_ttc: number;
  article_quantity: number;
}

export interface rotation_stock {
  //parms:article_reference,date_debut,date_fin 
  article_reference: string;
  article_designation: string;
  stock_initial: number;
  entree: number;
  sortie: number;
  stock_final: number;
}








