import type { Request, Response, NextFunction } from 'express';
import balanceClientsService from '../../services/clients/balanceClientsService.js';
import type { balance_clients } from '../../types/clients.types.js';

export class BalanceClientsController {
  /**
   * Get balance clients data
   */
  async getBalanceClients(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { date } = req.query;
      
      const params: Record<string, unknown> = {};
      if (date) params.date = date as string;

      const data = await balanceClientsService.getBalanceClients(params);
      
      res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new BalanceClientsController();

