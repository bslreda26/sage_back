import sql from 'mssql';
import getConnection from '../../config/database.js';
import type { extrait_clients } from '../../types/clients.types.js';

export class ExtraitClientsService {
  /**
   * Get extrait clients data
   */
  async getExtraitClients(params?: Record<string, unknown>): Promise<extrait_clients[]> {
    try {
      const pool = await getConnection();
      const request = pool.request();

      // Add parameters if provided
      if (params?.client_reference) {
        request.input('client_reference', sql.NVarChar, params.client_reference);
      }
      if (params?.date_debut) {
        request.input('date_debut', sql.Date, params.date_debut);
      }
      if (params?.date_fin) {
        request.input('date_fin', sql.Date, params.date_fin);
      }

      // TODO: Implement your actual SQL query here
      // Example: const query = 'SELECT * FROM vue_extrait_clients WHERE client_reference = @client_reference';
      const query = '';
      
      const result = await request.query(query);
      return result.recordset as extrait_clients[];
    } catch (error) {
      console.error('Error fetching extrait clients:', error);
      throw new Error(`Failed to fetch extrait clients: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export default new ExtraitClientsService();

