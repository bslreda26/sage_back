export interface stocks {
//parms:article_reference,depot,date,famille
  article_reference: string;
  article_designation: string;
  article_famille: string;
  article_quantity: number;
  depot_intitule: string;
  depot_code: string;
  famille_code: string;
}


export interface valeur_stock {
  //parms:article_reference,depot_code,famille_code
  article_reference: string;
  depot_code: string;
  famille_code: string;
  stock_valeur: number;
  stock_cmup: number;
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

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}








