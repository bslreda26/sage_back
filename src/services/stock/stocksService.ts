import sql from 'mssql';
import getConnection from '../../config/database.js';
import type { stocks } from '../../types/stock.types.js';

export class StocksService {
  /**
   * Get stocks data
   */
  async getStocks(params?: Record<string, unknown>): Promise<stocks[]> {
    try {
      const pool = await getConnection();
      const request = pool.request();

      // Add parameters if provided
      if (params?.article_reference) {
        request.input('article_reference', sql.NVarChar, params.article_reference);
      }
      if (params?.depot) {
        request.input('depot', sql.NVarChar, params.depot);
      }
      if (params?.date) {
        request.input('date', sql.Date, params.date);
      }
      if (params?.famille) {
        request.input('famille', sql.NVarChar, params.famille);
      }

      // TODO: Implement your actual SQL query here
      // Example: const query = 'SELECT * FROM vue_stocks WHERE article_reference = @article_reference';
      const query = 'SELECT * FROM vue_stocks WHERE 1=1';
      
      const result = await request.query(query);
      return result.recordset as stocks[];
    } catch (error) {
      console.error('Error fetching stocks:', error);
      throw new Error(`Failed to fetch stocks: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export default new StocksService();

