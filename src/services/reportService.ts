import sql from 'mssql';
import getConnection from '../config/database.js';
import type { ReportData } from '../types/report.types.js';

export class ReportService {
  /**
   * Execute a SQL query and return results
   */
  async executeQuery(query: string, params?: Record<string, unknown>): Promise<ReportData[]> {
    try {
      const pool = await getConnection();
      const request = pool.request();

      // Add parameters if provided
      if (params) {
        Object.keys(params).forEach((key) => {
          request.input(key, params[key]);
        });
      }

      const result = await request.query(query);
      return result.recordset as ReportData[];
    } catch (error) {
      console.error('Error executing query:', error);
      throw new Error(`Database query failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get a specific report by ID
   * This is a placeholder - implement your actual report queries here
   */
  async getReportById(reportId: string, queryParams?: Record<string, unknown>): Promise<ReportData[]> {
    // TODO: Implement your specific report queries based on reportId
    // Example structure:
    // switch (reportId) {
    //   case 'sales':
    //     return this.executeQuery('SELECT * FROM Sales WHERE Date >= @startDate AND Date <= @endDate', queryParams);
    //   default:
    //     throw new Error(`Report ${reportId} not found`);
    // }
    
    throw new Error(`Report ${reportId} not implemented yet. Please implement in reportService.ts`);
  }

  /**
   * Get list of available reports
   */
  async getAvailableReports(): Promise<{ id: string; name: string; description?: string }[]> {
    // TODO: You can either hardcode this list or fetch from a database table
    return [
      { id: 'sales', name: 'Sales Report', description: 'Sales data report' },
      { id: 'inventory', name: 'Inventory Report', description: 'Inventory levels report' },
    ];
  }
}

export default new ReportService();

