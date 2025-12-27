# Sage Backend API

Express.js API server for connecting to SQL Server (Sage database) and generating reports.

## Features

- Express 5.x with TypeScript
- SQL Server connectivity using `mssql` package
- RESTful API for report generation
- Connection pooling for efficient database access
- Environment-based configuration

## Prerequisites

- Node.js (v18 or higher recommended)
- SQL Server instance with Sage database
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Configure your database connection in `.env`:
```env
DB_SERVER=your_server_name
DB_PORT=1433
DB_DATABASE=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password
DB_ENCRYPT=false
DB_TRUST_SERVER_CERTIFICATE=true
```

## Development

Run the development server with hot reload:
```bash
npm run dev
```

The server will start on `http://localhost:3000` (or the port specified in `.env`).

## Building

Build the TypeScript project:
```bash
npm run build
```

The compiled JavaScript files will be in the `dist/` directory.

## Production

Start the production server:
```bash
npm start
```

Make sure to build the project first using `npm run build`.

## API Endpoints

### Health Check
- `GET /health` - Check if the server is running

### Reports
- `GET /api/reports` - Get list of available reports
- `GET /api/reports/:reportId` - Get specific report data
  - Query parameters:
    - `startDate` (optional) - Start date filter (YYYY-MM-DD)
    - `endDate` (optional) - End date filter (YYYY-MM-DD)

## Project Structure

```
src/
├── config/
│   └── database.ts      # Database connection configuration
├── controllers/
│   └── reportController.ts  # Report business logic
├── routes/
│   └── reports.ts       # Report API routes
├── services/
│   └── reportService.ts # Database query services
├── types/
│   └── report.types.ts  # TypeScript type definitions
└── index.ts             # Application entry point
```

## Implementing Reports

To implement a specific report, edit `src/services/reportService.ts` and add your SQL query logic in the `getReportById` method:

```typescript
async getReportById(reportId: string, queryParams?: Record<string, unknown>): Promise<ReportData[]> {
  switch (reportId) {
    case 'sales':
      return this.executeQuery(
        'SELECT * FROM Sales WHERE Date >= @startDate AND Date <= @endDate',
        queryParams
      );
    default:
      throw new Error(`Report ${reportId} not found`);
  }
}
```

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `DB_SERVER` - SQL Server hostname/instance
- `DB_PORT` - SQL Server port (default: 1433)
- `DB_DATABASE` - Database name
- `DB_USER` - SQL Server username
- `DB_PASSWORD` - SQL Server password
- `DB_ENCRYPT` - Enable encryption (true/false)
- `DB_TRUST_SERVER_CERTIFICATE` - Trust server certificate (true/false)

## License

ISC

