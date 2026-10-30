import swaggerAutogen from 'swagger-autogen';
import fs from 'node:fs';

const doc = {
  info: {
    title: 'API de Inscripciones Académicas',
    description: 'Documentación de la API REST',
  },
  host: 'localhost:3000',
};

const outputFile = './swagger_output.json';
const routes = ['./src/index.ts'];

swaggerAutogen()(outputFile, routes, doc).then(() => {
  // Ajuste para prefijo de rutas montadas con router en /api/estudiantes
  if (fs.existsSync(outputFile)) {
    const raw = fs.readFileSync(outputFile, 'utf8');
    const swagger = JSON.parse(raw);
    const newPaths: Record<string, unknown> = {};

    for (const [key, val] of Object.entries(swagger.paths || {})) {
      if (key === '/') {
        newPaths['/api/estudiantes'] = val;
      } else if (key.startsWith('/{id}')) {
        newPaths[`/api/estudiantes${key}`] = val;
      } else {
        newPaths[key] = val;
      }
    }

    swagger.paths = newPaths;
    fs.writeFileSync(outputFile, JSON.stringify(swagger, null, 2), 'utf8');
  }
});
