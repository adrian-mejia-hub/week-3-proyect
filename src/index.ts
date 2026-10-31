import express from 'express';
import swaggerUi from 'swagger-ui-express';
import estudiantesRouter from './routes/estudiantes.js';
import swaggerOutput from '../swagger_output.json' with { type: 'json' };
import cors from 'cors';



const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());

app.use(express.json());

// Documentación con Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

//-----------------------------------------//
app.get('/api/status', (req, res) => {
    res.json({
        status: 'Server online',
        version: '1.0.0',
    });
});

// Montar todas las rutas bajo el prefijo /api/estudiantes
app.use('/api/estudiantes', estudiantesRouter);

//-----------------------------------------//
app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});
