# 🦙 Guía de Instalación y Uso de Ollama con DeepSeek R1

Esta guía describe cómo configurar **Ollama** y descargar el modelo ligero **DeepSeek R1** para utilizarlo en el proyecto DevfSeek.

---

## 1. Descarga e Instalación de Ollama

1. Ingresa a la página oficial de descargas:
   👉 [https://ollama.com/download](https://ollama.com/download)
2. Descarga el instalador para tu sistema operativo (**Windows** / macOS / Linux).
3. Ejecuta el archivo instalador y sigue los pasos del asistente.

---

## 2. Descargar el Modelo DevSeek / DeepSeek R1

Abre PowerShell o tu terminal y ejecuta el comando para descargar la versión más ligera (1.5B ~ 1.1 GB):

```bash
ollama run deepseek-r1:1.5b
```

Este comando descargará el modelo automáticamente y abrirá una sesión interactiva en la consola. Para salir de la consola de Ollama escribe `/bye`.

---

## 3. Verificar que el Servicio esté Activo

Ollama se ejecuta como un servicio en segundo plano en el puerto `11434`. Puedes verificarlo en tu navegador o mediante curl:

```bash
curl http://localhost:11434/api/tags
```

Si responde con una lista de modelos en formato JSON, ¡Ollama está listo para recibir consultas desde la aplicación React o el servidor Express!

---

## 4. Modo Demostración Integrado

Si estás ejecutando el proyecto sin tener Ollama instalado todavía, la aplicación cuenta con un **fallback inteligente** que simula respuestas de forma realista para que puedas probar la interfaz, el formulario, el historial y el contexto global sin errores de red.

