import { Router } from 'express';
import reportController from '../controllers/reportController.js';

const router = Router();

/**
 * @route   GET /api/reports
 * @desc    Get list of available reports
 * @access  Public
 */
router.get('/', reportController.getReports.bind(reportController));

/**
 * @route   GET /api/reports/:reportId
 * @desc    Get specific report data
 * @access  Public
 * @params  reportId - The ID of the report to retrieve
 * @query   startDate - Optional start date filter (YYYY-MM-DD)
 * @query   endDate - Optional end date filter (YYYY-MM-DD)
 */
router.get('/:reportId', reportController.getReportById.bind(reportController));

export default router;

