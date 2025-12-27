import sql from 'mssql';
import getConnection from '../../config/database.js';
import type { valeur_stock } from '../../types/stock.types.js';

export class ValeurStockService {
  /**
   * Get valeur stock data
   */
  async getValeurStock(params?: Record<string, unknown>): Promise<valeur_stock[]> {
    try {
      const pool = await getConnection();
      const request = pool.request();

      // Add parameters if provided
      if (params?.article_reference) {
        request.input('article_reference', sql.NVarChar, params.article_reference);
      }
      if (params?.date) {
        request.input('date', sql.Date, params.date);
      }
      if (params?.famille) {
        request.input('famille', sql.NVarChar, params.famille);
      }

      // TODO: Implement your actual SQL query here
      // Example: const query = 'SELECT * FROM vue_valeur_stock WHERE article_reference = @article_reference';
      const query = 'SELECT * FROM vue_valeur_stock WHERE 1=1';
      
      const result = await request.query(query);
      return result.recordset as valeur_stock[];
    } catch (error) {
      console.error('Error fetching valeur stock:', error);
      throw new Error(`Failed to fetch valeur stock: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export default new ValeurStockService();

