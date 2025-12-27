import { getConnection, closeConnection } from '../config/database.js';

/**
 * Creates or alters the V_STOCK view
 */
export async function stocks(): Promise<void> {
    const pool = await getConnection();

    try {
        const createViewQuery = `
     CREATE  OR ALTER VIEW  STOCK 
AS
SELECT 
F_ARTICLE.AR_REF AS article_reference,
F_ARTICLE.AR_DESIGN as article_designation,
F_FAMILLE.FA_Intitule as article_famille,
F_ARTSTOCK.AS_QteSto as article_quantity,
F_DEPOT.DE_INTITULE as depot_intitule,
F_DEPOT.DE_NO as depot_code,
F_FAMILLE.FA_CodeFamille as famille_code


FROM F_ARTICLE INNER JOIN F_FAMILLE
ON F_ARTICLE.FA_CodeFamille =  F_FAMILLE.FA_CodeFamille
INNER JOIN F_ARTSTOCK 
ON F_ARTICLE.AR_REF = F_ARTSTOCK.AR_Ref
INNER JOIN F_DEPOT ON F_DEPOT.DE_NO = F_ARTSTOCK.DE_NO
    `;

        await pool.request().query(createViewQuery);
        console.log('✓ STOCK view created/updated successfully');
    } catch (error) {
        console.error('✗ Error creating STOCK view:', error);
        throw error;
    }
}
