const pool = require('./db');

async function testConnection(){
  try{
    console.log('Intentando conectar a PostgreSQL con:');
    console.log(` host=${process.env.PGHOST||'localhost'} port=${process.env.PGPORT||5432} db=${process.env.PGDATABASE||'adidas_db'} user=${process.env.PGUSER||'admin'}`);
    const res = await pool.query('SELECT NOW() as now');
    console.log('Conexión exitosa. Hora del servidor:', res.rows[0].now);
    await pool.end();
    process.exit(0);
  }catch(err){
    console.error('Error al conectar:', err.message || err);
    try{ await pool.end(); }catch(e){}
    process.exit(1);
  }
}

// Run
if(require.main === module) testConnection();

module.exports = { testConnection };
