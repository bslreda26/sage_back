import { Router } from 'express';
import stocksController from '../controllers/stock/stocksController.js';
import valeurStockController from '../controllers/stock/valeurStockController.js';

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

/**
 * @route   POST /api/stocks/valeur-stock
 * @desc    Get valeur stock data with pagination
 * @access  Public
 * @body    { 
 *   article_reference?: string, 
 *   depot_code?: string, 
 *   famille_code?: string,
 *   page?: number,
 *   pageSize?: number
 * }
 */
router.post('/valeur-stock', valeurStockController.getValeurStock.bind(valeurStockController));

export default router;

