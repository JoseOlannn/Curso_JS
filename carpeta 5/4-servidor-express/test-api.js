// Script de pruebas para verificar el servidor Express
const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

async function runTests() {
  console.log(`\n🧪 Iniciando pruebas en ${BASE_URL}...\n`);
  let passed = 0;
  let total = 0;

  async function test(name, fn) {
    total++;
    try {
      await fn();
      console.log(`  ✅ [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ❌ [FAIL] ${name}: ${err.message}`);
    }
  }

  // Prueba 1: Endpoint raíz 'Hola Mundo'
  await test('GET / debe responder "Hola Mundo"', async () => {
    const res = await fetch(`${BASE_URL}/`);
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    const text = await res.text();
    if (text !== 'Hola Mundo') throw new Error(`Esperado 'Hola Mundo', recibido: '${text}'`);
  });

  // Prueba 2: Endpoint /api/status
  await test('GET /api/status debe devolver JSON con status online', async () => {
    const res = await fetch(`${BASE_URL}/api/status`);
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    const json = await res.json();
    if (json.status !== 'online') throw new Error(`Estatus inesperado: ${json.status}`);
  });

  // Prueba 3: Endpoint POST /data
  await test('POST /data debe recibir y retornar datos en JSON', async () => {
    const payload = { prueba: 'DevF Express', numero: 42 };
    const res = await fetch(`${BASE_URL}/data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    const json = await res.json();
    if (json.data?.prueba !== 'DevF Express') throw new Error(`Datos no coinciden`);
  });

  // Prueba 4: Endpoint POST /api/ask (Ollama o Mock)
  await test('POST /api/ask debe responder una consulta', async () => {
    const payload = { prompt: 'Hola servidor' };
    const res = await fetch(`${BASE_URL}/api/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    const json = await res.json();
    if (!json.response) throw new Error(`No se recibió campo "response"`);
  });

  // Prueba 5: Endpoint GET /api/messages
  await test('GET /api/messages debe devolver una lista de mensajes', async () => {
    const res = await fetch(`${BASE_URL}/api/messages`);
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    const json = await res.json();
    if (!Array.isArray(json)) throw new Error(`Debe ser un array`);
  });

  console.log(`\n========================================`);
  console.log(` Resultado: ${passed}/${total} pruebas superadas.`);
  console.log(`========================================\n`);

  if (passed !== total) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Error ejecutando pruebas:', err.message);
  console.log('¿Aseguraste encender el servidor con "npm start" primero?');
  process.exit(1);
});

