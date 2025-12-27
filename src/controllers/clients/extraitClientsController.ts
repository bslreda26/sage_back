import type { Request, Response, NextFunction } from 'express';
import extraitClientsService from '../../services/clients/extraitClientsService.js';
import type { extrait_clients } from '../../types/clients.types.js';

export class ExtraitClientsController {
  /**
   * Get extrait clients data
   */
  async getExtraitClients(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { client_reference, date_debut, date_fin } = req.query;
      
      const params: Record<string, unknown> = {};
      if (client_reference) params.client_reference = client_reference as string;
      if (date_debut) params.date_debut = date_debut as string;
      if (date_fin) params.date_fin = date_fin as string;

      const data = await extraitClientsService.getExtraitClients(params);
      
      res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ExtraitClientsController();

