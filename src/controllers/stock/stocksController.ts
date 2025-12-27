import type { Request, Response, NextFunction } from 'express';
import stocksService from '../../services/stock/stocksService.js';
import type { stocks } from '../../types/stock.types.js';

export class StocksController {
  /**
   * Get stocks data
   */
  async getStocks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { article_reference, depot, date, famille, page, pageSize } = req.body;
      
      const params: Record<string, unknown> = {};
      if (article_reference) params.article_reference = article_reference as string;
      if (depot) params.depot = depot as string;
      if (date) params.date = date as string;
      if (famille) params.famille = famille as string;

      // Parse pagination parameters with defaults
      const pageNumber = page && !isNaN(Number(page)) && Number(page) > 0 ? Number(page) : 1;
      const pageSizeNumber = pageSize && !isNaN(Number(pageSize)) && Number(pageSize) > 0 ? Number(pageSize) : 10;

      const result = await stocksService.getStocks(params, pageNumber, pageSizeNumber);
      
      res.json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new StocksController();

