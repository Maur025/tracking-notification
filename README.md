# Tracking Notification Server

Un servidor de notificaciones de seguimiento construido con Node.js, TypeScript, Express y Vitest.

## 🚀 Características

- **Express.js** - Framework web rápido y minimalista
- **TypeScript** - Tipado estático para JavaScript
- **Vitest** - Framework de testing ultrarrápido
- **pnpm** - Gestor de paquetes eficiente
- **Nodemon** - Recarga automática durante el desarrollo
- **CORS** - Configuración de CORS incluida

## 📦 Instalación

```bash
# Instalar dependencias
pnpm install
```

## 🛠️ Scripts Disponibles

```bash
# Desarrollo con recarga automática
pnpm dev

# Compilar TypeScript
pnpm build

# Ejecutar en producción
pnpm start

# Ejecutar tests
pnpm test

# Ejecutar tests con interfaz web
pnpm test:ui

# Ejecutar tests una vez
pnpm test:run

# Ejecutar tests con coverage
pnpm test:coverage

# Limpiar directorio de build
pnpm clean

# Verificar tipos sin compilar
pnpm type-check
```

## 🏗️ Estructura del Proyecto

```
tracking-notification/
├── src/
│   ├── __tests__/
│   │   └── server.test.ts
│   └── index.ts
├── dist/                 # Código compilado
├── coverage/             # Reportes de coverage
├── .gitignore
├── nodemon.json
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
NODE_ENV=development
```

## 📚 API Endpoints

### GET /
Página principal de la API
```json
{
  "message": "Welcome to Tracking Notification API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "api": "/api"
  }
}
```

### GET /health
Health check del servidor
```json
{
  "message": "Server is running!",
  "timestamp": "2025-08-25T10:00:00.000Z",
  "uptime": 123.456,
  "environment": "development"
}
```

### GET /api/notifications
Endpoint de notificaciones
```json
{
  "notifications": [],
  "total": 0,
  "message": "Notifications endpoint working"
}
```

## 🧪 Testing

El proyecto incluye tests de ejemplo usando Vitest y Supertest:

```bash
# Ejecutar todos los tests
pnpm test

# Ejecutar tests con interfaz web
pnpm test:ui

# Ejecutar tests con coverage
pnpm test:coverage
```

## 🚀 Desarrollo

1. Instalar dependencias:
   ```bash
   pnpm install
   ```

2. Iniciar el servidor de desarrollo:
   ```bash
   pnpm dev
   ```

3. El servidor estará disponible en `http://localhost:3000`

## 📝 Próximos Pasos

- [ ] Configurar ESLint y Prettier
- [ ] Añadir autenticación JWT
- [ ] Integrar base de datos
- [ ] Añadir documentación Swagger/OpenAPI
- [ ] Configurar CI/CD
- [ ] Añadir logging estructurado
- [ ] Implementar rate limiting

## 📄 Licencia

ISC
