# Tracking Notification Server

Un servidor de notificaciones construido con Node.js, TypeScript, Express y Vitest.

## Instalación

```bash
# Instalar dependencias
pnpm install
```

## Scripts Disponibles

```bash
# Desarrollo con recarga automática
pnpm dev

# Compilar TypeScript
pnpm build

# Ejecutar en producción
pnpm start

# Ejecutar tests
pnpm test
```

## Estructura del Proyecto
```plaintext
tracking-notification/
├── .github/              # configuraciones de GitHub Actions
├── dist/                 # Código compilado
├── metric/
│   ├── docker-compose.yml        # Configuración de métricas con Prometheus y Grafana
│   └── prometheus.yml    # Configuración de Prometheus
├── src/
│   ├── common/           # Código común (middlewares, utilidades, configuraciones)
│   ├── config/           # Configuración de la aplicación
│   ├── docs/             # Documentación de la API, auto-generado por tsoa
│   ├── module/           # Módulos de la aplicación (canales, notificaciones, email y whatsapp)
│   ├── routes/           # Rutas de la aplicación, auto-generadas por tsoa y definidas manualmente
│   ├── server/           # Configuración del servidor e inicialización
│   ├── util/             # Utilidades y funciones helper globales
│   ├── worker/           # workers para procesamiento en paralelo
│   ├── app-server.ts     # Configuración de la aplicación Express
│   ├── index.ts          # Archivo principal para iniciar la aplicación
│   ├── worker-job-names.ts      # Archivo de configuración y referencia de los jobs que ejecutaran los workers
│   └── worker-topics.ts         # Archivo de configuración y referencia de los tópicos para bullmq
├── tmp/                  # Archivos temporales de playwright
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

usa de referencia el archivo [env.example](./.env.example)

## Licencia

MIT License
