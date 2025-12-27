export interface stocks {
//parms:article_reference,depot,date,famille
  article_reference: string;
  article_designation: string;
  article_famille: string;
  article_cmup : number;
  article_prix_ttc: number;
  article_quantity: number;
  total_cmup: number; //CMUP
  total_ttc: number;
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








