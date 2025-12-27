import type { Request, Response, NextFunction } from 'express';
import reportService from '../services/reportService.js';
import type { ReportQueryParams } from '../types/report.types.js';

export class ReportController {
  /**
   * Get list of available reports
   */
  async getReports(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const reports = await reportService.getAvailableReports();
      res.json({
        success: true,
        data: reports,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get a specific report by ID
   */
  async getReportById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { reportId } = req.params;
      const queryParams = req.query as ReportQueryParams;

      // Convert query params to the format expected by the service
      const params: Record<string, unknown> = {};
      if (queryParams.startDate) params.startDate = queryParams.startDate;
      if (queryParams.endDate) params.endDate = queryParams.endDate;
      
      // Add any other query parameters
      Object.keys(queryParams).forEach((key) => {
        if (key !== 'startDate' && key !== 'endDate' && queryParams[key]) {
          params[key] = queryParams[key];
        }
      });

      if (!reportId) {
        res.status(400).json({ success: false, message: 'Report ID is required' });
        return;
      }
      
      const data = await reportService.getReportById(reportId, params);
      
      res.json({
        success: true,
        data,
        reportId,
        params: queryParams,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ReportController();

