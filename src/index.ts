import express from 'express';
import estudiantesRouter from './routes/estudiantes.js';

const app = express();
const PORT = 3000;

app.use(express.json());

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
