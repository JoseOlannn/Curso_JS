# Actividad: Servidor Backend con Express (Tercera Entrega)

Este proyecto corresponde a la **Tercera Entrega** del curso de Frontend Avanzado con React / DevfSeek.

## Propósito
Integrar Express en nuestro proyecto, creando un servidor básico que facilite la comunicación entre el front-end y el back-end.

## Objetivo
Comprender cómo funciona un servidor Express, cómo se configura y cómo se implementa un simple **"Hola Mundo"** como primer paso, además de endpoints REST para comunicación con el frontend e integración con el servicio de IA (Ollama).

## Instrucciones cumplidas
1. ✅ **Carpeta para el proyecto de Express:** Creada como `4-servidor-express`.
2. ✅ **Inicialización del proyecto NPM:** Archivo `package.json` con configuración de tipo ES Modules (`"type": "module"`).
3. ✅ **Instalación de Express:** Instalado `express`, `cors` y `dotenv` con NPM.
4. ✅ **Implementación del servidor básico:**
   - Endpoint GET `/` que responde exactamente **`Hola Mundo`**.
   - Endpoint GET `/api/status` para chequeo de salud del servicio.
   - Endpoint POST `/data` para pruebas con payloads JSON.
   - Endpoint POST `/api/ask` para intermediar peticiones hacia Ollama con modo demostración inteligente en caso de que Ollama no esté corriendo.
   - Endpoints GET y POST `/api/messages` con persistencia en `db.json`.
5. ✅ **Pruebas del servidor:** Script automatizado `test-api.js` que verifica que todos los endpoints respondan correctamente.

---

## Cómo ejecutar el servidor

1. Abre tu terminal y entra a esta carpeta:
   ```bash
   cd "carpeta 5\4-servidor-express"
   ```

2. Si no has instalado las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor:
   ```bash
   npm start
   ```
   O en modo desarrollo con recarga automática:
   ```bash
   npm run dev
   ```

4. Verás en la consola:
   ```text
   ===============================================
    Servidor Express escuchando en http://localhost:8080
    Endpoint Hola Mundo: http://localhost:8080/
    Endpoint API Status: http://localhost:8080/api/status
   ===============================================
   ```

5. Abre en tu navegador [http://localhost:8080](http://localhost:8080) y verás el mensaje:
   ```text
   Hola Mundo
   ```

---

## Cómo ejecutar las pruebas automáticas

Con el servidor encendido en una terminal, abre otra terminal y ejecuta:
```bash
npm test
```
O bien:
```bash
node test-api.js
```

Verás todas las pruebas superadas con indicador verde `[PASS]`.

