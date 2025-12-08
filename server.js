const express = require('express');
const path = require('path');
const pool = require('./db');

const app = express();
app.use(express.json());

// Serve static files from project root (index.html, css, js...)
app.use(express.static(path.join(__dirname)));

// Simple DB ping
app.get('/api/ping', async (req, res) => {
  try {
    const r = await pool.query('SELECT NOW() as now');
    res.json({ ok: true, now: r.rows[0].now });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Products from DB (if table exists)
app.get('/api/products', async (req, res) => {
  try {
    const q = `SELECT id, nombre as name, precio as price, imagen as img, categoria FROM productos LIMIT 100`;
    const r = await pool.query(q);
    res.json({ ok: true, products: r.rows });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Product CRUD
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const r = await pool.query('SELECT id, nombre as name, precio as price, imagen as img, categoria FROM productos WHERE id = $1', [id]);
    if (r.rowCount === 0) return res.status(404).json({ ok: false, error: 'Not found' });
    res.json({ ok: true, product: r.rows[0] });
  } catch (err) { res.status(500).json({ ok: false, error: err.message }); }
});

app.post('/api/products', async (req, res) => {
  try {
    const { nombre, precio, imagen, categoria } = req.body;
    const r = await pool.query('INSERT INTO productos (nombre, precio, imagen, categoria) VALUES ($1,$2,$3,$4) RETURNING id, nombre as name, precio as price, imagen as img, categoria', [nombre, precio, imagen, categoria]);
    res.status(201).json({ ok: true, product: r.rows[0] });
  } catch (err) { res.status(500).json({ ok: false, error: err.message }); }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, imagen, categoria } = req.body;
    const r = await pool.query('UPDATE productos SET nombre=$1, precio=$2, imagen=$3, categoria=$4 WHERE id=$5 RETURNING id, nombre as name, precio as price, imagen as img, categoria', [nombre, precio, imagen, categoria, id]);
    if (r.rowCount === 0) return res.status(404).json({ ok: false, error: 'Not found' });
    res.json({ ok: true, product: r.rows[0] });
  } catch (err) { res.status(500).json({ ok: false, error: err.message }); }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM productos WHERE id=$1', [id]);
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ ok: false, error: err.message }); }
});

// Users CRUD
app.get('/api/users', async (req, res) => {
  try {
    const r = await pool.query('SELECT id, nombre as name, email, telefono as phone, creado_en FROM usuarios LIMIT 100');
    res.json({ ok: true, users: r.rows });
  } catch (err) { res.status(500).json({ ok: false, error: err.message }); }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const r = await pool.query('SELECT id, nombre as name, email, telefono as phone, creado_en FROM usuarios WHERE id=$1', [id]);
    if (r.rowCount === 0) return res.status(404).json({ ok: false, error: 'Not found' });
    res.json({ ok: true, user: r.rows[0] });
  } catch (err) { res.status(500).json({ ok: false, error: err.message }); }
});

app.post('/api/users', async (req, res) => {
  try {
    const { nombre, email, telefono, password } = req.body;
    const r = await pool.query('INSERT INTO usuarios (nombre, email, telefono, password) VALUES ($1,$2,$3,$4) RETURNING id, nombre as name, email, telefono as phone, creado_en', [nombre, email, telefono, password]);
    res.status(201).json({ ok: true, user: r.rows[0] });
  } catch (err) { res.status(500).json({ ok: false, error: err.message }); }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, telefono, password } = req.body;
    const r = await pool.query('UPDATE usuarios SET nombre=$1, email=$2, telefono=$3, password=$4 WHERE id=$5 RETURNING id, nombre as name, email, telefono as phone, creado_en', [nombre, email, telefono, password, id]);
    if (r.rowCount === 0) return res.status(404).json({ ok: false, error: 'Not found' });
    res.json({ ok: true, user: r.rows[0] });
  } catch (err) { res.status(500).json({ ok: false, error: err.message }); }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM usuarios WHERE id=$1', [id]);
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ ok: false, error: err.message }); }
});

// Pedidos (orders)
app.get('/api/pedidos', async (req, res) => {
  try {
    const r = await pool.query('SELECT id, usuario_id as user_id, total, metodo_pago as payment_method, fecha FROM pedidos ORDER BY fecha DESC LIMIT 100');
    res.json({ ok: true, pedidos: r.rows });
  } catch (err) { res.status(500).json({ ok: false, error: err.message }); }
});

app.get('/api/pedidos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pr = await pool.query('SELECT id, usuario_id as user_id, total, metodo_pago as payment_method, fecha FROM pedidos WHERE id=$1', [id]);
    if (pr.rowCount === 0) return res.status(404).json({ ok: false, error: 'Not found' });
    const details = await pool.query('SELECT producto_id as product_id, cantidad, precio FROM pedido_detalle WHERE pedido_id=$1', [id]);
    res.json({ ok: true, pedido: pr.rows[0], detalle: details.rows });
  } catch (err) { res.status(500).json({ ok: false, error: err.message }); }
});

app.post('/api/pedidos', async (req, res) => {
  // Expected body: { usuario_id, items: [{ producto_id, cantidad, precio }], metodo_pago }
  const client = await pool.connect();
  try {
    const { usuario_id, items, metodo_pago } = req.body;
    if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ ok: false, error: 'Items required' });
    const total = items.reduce((s,i)=> s + Number(i.precio) * Number(i.cantidad), 0);
    await client.query('BEGIN');
    const r = await client.query('INSERT INTO pedidos (usuario_id, total, metodo_pago) VALUES ($1,$2,$3) RETURNING id, fecha', [usuario_id, total, metodo_pago]);
    const pedidoId = r.rows[0].id;
    const insertText = 'INSERT INTO pedido_detalle (pedido_id, producto_id, cantidad, precio) VALUES ($1,$2,$3,$4)';
    for (const it of items){
      await client.query(insertText, [pedidoId, it.producto_id, it.cantidad, it.precio]);
    }
    await client.query('COMMIT');
    res.status(201).json({ ok: true, pedido_id: pedidoId, fecha: r.rows[0].fecha, total });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ ok: false, error: err.message });
  } finally { client.release(); }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
