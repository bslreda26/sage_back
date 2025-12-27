import { getConnection, closeConnection } from '../config/database.js';
import { V_STOCK } from '../views_migrations/stock.js';
import { V_VALEUR_STOCK } from '../views_migrations/valeur_stock.js';

/**
 * Array of all migration functions to run
 * Add new migrations here as you create them
 */
const migrations = [
  { name: 'V_STOCK', fn: V_STOCK },
  { name: 'V_VALEUR_STOCK', fn: V_VALEUR_STOCK },
  // Add more migrations here as you create them
  // Example: { name: 'createOtherView', fn: createOtherView },
];

/**
 * Runs all migration functions
 */
async function runMigrations() {
  try {
    console.log(`Running ${migrations.length} migration(s)...\n`);
    
    // Establish database connection
    await getConnection();
    
    // Run each migration
    for (const migration of migrations) {
      try {
        console.log(`Running migration: ${migration.name}`);
        await migration.fn();
      } catch (error) {
        console.error(`  ✗ Error running migration ${migration.name}:`, error);
        throw error;
      }
    }
    
    console.log('\n✓ All migrations completed successfully');
  } catch (error) {
    console.error('\n✗ Migration process failed:', error);
    process.exit(1);
  } finally {
    await closeConnection();
  }
}

// Run migrations if this file is executed directly
runMigrations();
