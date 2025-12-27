import type { Request, Response, NextFunction } from 'express';
import valeurStockService from '../../services/stock/valeurStockService.js';
import type { valeur_stock } from '../../types/stock.types.js';

export class ValeurStockController {
  /**
   * Get valeur stock data
   */
  async getValeurStock(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { article_reference, date, famille } = req.query;
      
      const params: Record<string, unknown> = {};
      if (article_reference) params.article_reference = article_reference as string;
      if (date) params.date = date as string;
      if (famille) params.famille = famille as string;

      const data = await valeurStockService.getValeurStock(params);
      
      res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ValeurStockController();

