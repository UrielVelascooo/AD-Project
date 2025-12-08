# AD-Project
Aplicacion que simula una tienda inspirada en adidas

## Ejecución en otra máquina (setup rápido)

Requisitos locales:
- Node.js (>= 18 recomendado) y `npm`.
- PostgreSQL con la base de datos `adidas_db` creada y accesible.

Pasos:

1. Clona el repositorio y entra al directorio:

	```bash
	git clone <repo-url>
	cd AD-Project
	```

2. Copia la plantilla de variables de entorno y ajústala. Es IMPORTANTE no versionar este archivo:

	```bash
	cp .env.example .env
	# editar .env y poner la contraseña en PGPASSWORD si aplica
	```

3. Instala dependencias:

	```bash
	npm install
	```

4. Arranca la aplicación (servidor + UI):

	```bash
	npm start
	```

	El servidor se iniciará en `http://localhost:3000` por defecto. Puedes cambiar el puerto con `PORT`.

5. Probar conexión a la base de datos (opcional):

	```bash
	npm run test-connection
	```

Notas de integración con la base de datos
- El proyecto asume que existe una base de datos `adidas_db` y que el usuario `admin` tiene los privilegios necesarios. Si usas otro usuario o base, actualiza `.env`.
- Las tablas usadas son `productos`, `usuarios`, `pedidos`, `pedido_detalle` (ver `Adidas_db.sql`).

Seguridad y recomendaciones
- No subas `.env` a repositorios públicos. `.gitignore` ya excluye `.env`.
- Para producción, añade hashing de contraseñas y un flujo de autenticación seguro (JWT/session).

Si quieres, puedo:
- Añadir un script para inicializar la BD automáticamente (se puede usar `psql` con `Adidas_db.sql`).
- Implementar autenticación segura (bcrypt + `POST /api/auth/login`).

