Instrucciones rápidas para probar la conexión PostgreSQL

1) Copia `.env.example` a `.env` y rellena `PGPASSWORD` si tu usuario `admin` tiene contraseña:

   cp .env.example .env
   # editar .env y poner PGPASSWORD=tu_password

2) Instalar dependencias (ya ejecutadas por el asistente):

   npm install

3) Ejecutar el test de conexión:

   npm run test-connection

El script `db-test.js` intentará conectarse a la base de datos `adidas_db` en `localhost:5432` usando el usuario `admin`.

Si la conexión falla, revisa que el servicio Postgres esté corriendo y que las credenciales en `.env` sean correctas.
