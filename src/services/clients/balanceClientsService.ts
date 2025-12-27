import sql from 'mssql';
import getConnection from '../../config/database.js';
import type { balance_clients } from '../../types/clients.types.js';

export class BalanceClientsService {
  /**
   * Get balance clients data
   */
  async getBalanceClients(params?: Record<string, unknown>): Promise<balance_clients[]> {
    try {
      const pool = await getConnection();
      const request = pool.request();

      // Add parameters if provided
      if (params?.date) {
        request.input('date', sql.Date, params.date);
      }

      // TODO: Implement your actual SQL query here
      // Example: const query = 'SELECT * FROM vue_balance_clients WHERE date = @date';
      const query = '';
      
      const result = await request.query(query);
      return result.recordset as balance_clients[];
    } catch (error) {
      console.error('Error fetching balance clients:', error);
      throw new Error(`Failed to fetch balance clients: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export default new BalanceClientsService();

