import { Router } from 'express';
import stocksController from '../controllers/stock/stocksController.js';

const router = Router();

/**
 * @route   POST /api/stocks
 * @desc    Get stocks data with pagination
 * @access  Public
 * @body    { 
 *   article_reference?: string, 
 *   depot?: string, 
 *   famille?: string, 
 *   date?: string,
 *   page?: number,
 *   pageSize?: number
 * }
 */
router.post('/', stocksController.getStocks.bind(stocksController));

export default router;

