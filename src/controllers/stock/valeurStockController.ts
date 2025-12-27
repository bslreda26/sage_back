import type { Request, Response, NextFunction } from 'express';
import valeurStockService from '../../services/stock/valeurStockService.js';

export class ValeurStockController {
  /**
   * Get valeur stock data with pagination
   */
  async getValeurStock(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { article_reference, depot_code, famille_code, page, pageSize } = req.body;
      
      const params: Record<string, unknown> = {};
      if (article_reference) params.article_reference = article_reference as string;
      if (depot_code) params.depot_code = depot_code as string;
      if (famille_code) params.famille_code = famille_code as string;

      // Parse pagination parameters with defaults
      const pageNumber = page && !isNaN(Number(page)) && Number(page) > 0 ? Number(page) : 1;
      const pageSizeNumber = pageSize && !isNaN(Number(pageSize)) && Number(pageSize) > 0 ? Number(pageSize) : 10;

      const result = await valeurStockService.getValeurStock(params, pageNumber, pageSizeNumber);
      
      res.json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ValeurStockController();

