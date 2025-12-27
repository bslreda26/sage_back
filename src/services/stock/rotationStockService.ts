import sql from 'mssql';
import getConnection from '../../config/database.js';
import type { rotation_stock } from '../../types/stock.types.js';

export class RotationStockService {
  /**
   * Get rotation stock data
   */
  async getRotationStock(params?: Record<string, unknown>): Promise<rotation_stock[]> {
    try {
      const pool = await getConnection();
      const request = pool.request();

      // Add parameters if provided
      if (params?.article_reference) {
        request.input('article_reference', sql.NVarChar, params.article_reference);
      }
      if (params?.date_debut) {
        request.input('date_debut', sql.Date, params.date_debut);
      }
      if (params?.date_fin) {
        request.input('date_fin', sql.Date, params.date_fin);
      }

      // TODO: Implement your actual SQL query here
      // Example: const query = 'SELECT * FROM vue_rotation_stock WHERE article_reference = @article_reference';
      const query = 'SELECT * FROM vue_rotation_stock WHERE 1=1';
      
      const result = await request.query(query);
      return result.recordset as rotation_stock[];
    } catch (error) {
      console.error('Error fetching rotation stock:', error);
      throw new Error(`Failed to fetch rotation stock: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export default new RotationStockService();

