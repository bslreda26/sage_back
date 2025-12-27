import sql from 'mssql';
import getConnection from '../../config/database.js';
import type { valeur_stock, PaginatedResponse } from '../../types/stock.types.js';

export class ValeurStockService {
  /**
   * Get valeur stock data with pagination
   */
  async getValeurStock(
    params?: Record<string, unknown>,
    page: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse<valeur_stock>> {
    try {
      const pool = await getConnection();
      const request = pool.request();

      // Build WHERE clause conditions
      const conditions: string[] = [];

      // Add parameters if provided
      if (params?.article_reference) {
        request.input('article_reference', sql.NVarChar, params.article_reference);
        conditions.push('article_reference = @article_reference');
      }
      if (params?.depot_code) {
        request.input('depot_code', sql.NVarChar, params.depot_code);
        conditions.push('depot_code = @depot_code');
      }
      if (params?.famille_code) {
        request.input('famille_code', sql.NVarChar, params.famille_code);
        conditions.push('famille_code = @famille_code');
      }

      // Build the query using V_VALEUR_STOCK view
      const whereClause = conditions.length > 0 
        ? `WHERE ${conditions.join(' AND ')}`
        : '';
      
      // Calculate offset for pagination (validate to prevent SQL injection)
      const offset = Math.max(0, (page - 1) * pageSize);
      const limit = Math.max(1, Math.min(pageSize, 1000)); // Max 1000 items per page

      // Get total count for pagination metadata
      const countRequest = pool.request();
      if (params?.article_reference) {
        countRequest.input('article_reference', sql.NVarChar, params.article_reference);
      }
      if (params?.depot_code) {
        countRequest.input('depot_code', sql.NVarChar, params.depot_code);
      }
      if (params?.famille_code) {
        countRequest.input('famille_code', sql.NVarChar, params.famille_code);
      }
      
      const countQuery = `SELECT COUNT(*) as total FROM V_VALEUR_STOCK ${whereClause}`;
      const countResult = await countRequest.query(countQuery);
      const totalItems = countResult.recordset[0].total;

      // Get paginated data (SQL Server supports numeric literals in OFFSET/FETCH)
      const dataQuery = `
        SELECT * FROM V_VALEUR_STOCK 
        ${whereClause}
        ORDER BY article_reference
        OFFSET ${offset} ROWS
        FETCH NEXT ${limit} ROWS ONLY
      `;
      
      const dataResult = await request.query(dataQuery);
      const data = dataResult.recordset as valeur_stock[];

      // Calculate pagination metadata
      const totalPages = Math.ceil(totalItems / limit);

      return {
        data,
        pagination: {
          page,
          pageSize: limit,
          totalItems,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      };
    } catch (error) {
      console.error('Error fetching valeur stock:', error);
      throw new Error(`Failed to fetch valeur stock: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export default new ValeurStockService();

