import type { Request, Response, NextFunction } from 'express';
import rotationStockService from '../../services/stock/rotationStockService.js';
import type { rotation_stock } from '../../types/stock.types.js';

export class RotationStockController {
  /**
   * Get rotation stock data
   */
  async getRotationStock(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { article_reference, date_debut, date_fin } = req.query;
      
      const params: Record<string, unknown> = {};
      if (article_reference) params.article_reference = article_reference as string;
      if (date_debut) params.date_debut = date_debut as string;
      if (date_fin) params.date_fin = date_fin as string;

      const data = await rotationStockService.getRotationStock(params);
      
      res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new RotationStockController();

