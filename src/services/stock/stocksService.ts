import sql from 'mssql';
import getConnection from '../../config/database.js';
import type { stocks, PaginatedResponse } from '../../types/stock.types.js';

export class StocksService {

  async getStocks(
    params?: Record<string, unknown>,
    page: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse<stocks>> {
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
      if (params?.depot) {
        request.input('depot', sql.NVarChar, params.depot);
        conditions.push('(depot_code = @depot OR depot_intitule = @depot)');
      }
      if (params?.famille) {
        request.input('famille', sql.NVarChar, params.famille);
        conditions.push('(famille_code = @famille OR article_famille = @famille)');
      }
     

      // Build the query using V_STOCK view
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
      if (params?.depot) {
        countRequest.input('depot', sql.NVarChar, params.depot);
      }
      if (params?.famille) {
        countRequest.input('famille', sql.NVarChar, params.famille);
      }
      
      const countQuery = `SELECT COUNT(*) as total FROM V_STOCK ${whereClause}`;
      const countResult = await countRequest.query(countQuery);
      const totalItems = countResult.recordset[0].total;

      // Get paginated data (SQL Server supports numeric literals in OFFSET/FETCH)
      const dataQuery = `
        SELECT * FROM V_STOCK 
        ${whereClause}
        ORDER BY article_reference
        OFFSET ${offset} ROWS
        FETCH NEXT ${limit} ROWS ONLY
      `;
      
      const dataResult = await request.query(dataQuery);
      const data = dataResult.recordset as stocks[];

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
      console.error('Error fetching stocks:', error);
      throw new Error(`Failed to fetch stocks: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export default new StocksService();

