import { getConnection, closeConnection } from '../config/database.js';

/**
 * Creates or alters the V_STOCK view
 */
export async function V_VALEUR_STOCK(): Promise<void> {
    const pool = await getConnection();

    try {
        const createViewQuery = `
    CREATE OR ALTER VIEW V_VALEUR_STOCK
AS
SELECT 
F_ARTICLE.AR_REF AS article_reference,
F_DEPOT.DE_NO as depot_code,
F_FAMILLE.FA_CodeFamille AS famille_code,
AS_MontSto as stock_valeur,
AS_MontSto / NULLIF(AS_QteSto, 0) as stock_cmup

FROM F_ARTICLE INNER JOIN F_ARTSTOCK
ON F_ARTICLE.AR_REF = F_ARTSTOCK.AR_REF

INNER JOIN F_DEPOT ON F_DEPOT.DE_NO = F_ARTSTOCK.DE_NO
INNER JOIN F_FAMILLE ON F_FAMILLE.FA_CodeFamille =  F_ARTICLE.FA_CodeFamille
    `;

        await pool.request().query(createViewQuery);
        console.log('✓ V_VALEUR_STOCK view created/updated successfully');
    } catch (error) {
        console.error('✗ Error creating V_VALEUR_  STOCK view:', error);
        throw error;
    }
}
