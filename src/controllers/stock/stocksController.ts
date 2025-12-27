import type { Request, Response, NextFunction } from 'express';
import stocksService from '../../services/stock/stocksService.js';
import type { stocks } from '../../types/stock.types.js';

export class StocksController {
  /**
   * Get stocks data
   */
  async getStocks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { article_reference, depot, date, famille } = req.query;
      
      const params: Record<string, unknown> = {};
      if (article_reference) params.article_reference = article_reference as string;
      if (depot) params.depot = depot as string;
      if (date) params.date = date as string;
      if (famille) params.famille = famille as string;

      const data = await stocksService.getStocks(params);
      
      res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new StocksController();

