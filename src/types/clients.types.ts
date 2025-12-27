export interface balance_clients {
//parms:date
  client_reference: string; 
  client_name: string;
  solde: string;
}

export interface extrait_clients {
  //parms:client_reference,date_debut,date_fin
    client_reference: string; 
    client_name: string;
    solde_initial: string;
    credit: string;
    debit: string;
    solde_final: string;
  }
  