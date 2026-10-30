import { Router } from 'express';

const router = Router();

interface Student {
    id: number;
    name: string;
    email: string;
    bootcamp: string;
}

const students: Student[] = [];
let siguienteId = 1;

// 3. Filtrado por query string
// GET /api/estudiantes
// GET /api/estudiantes?bootcamp=Frontend
router.get('/', (req, res) => {
    // #swagger.description = 'Obtiene la lista de todos los estudiantes o filtra por bootcamp'
    const { bootcamp } = req.query;

    if (bootcamp && typeof bootcamp === 'string') {
        const filtrados = students.filter(
            (s) => s.bootcamp.toLowerCase() === bootcamp.toLowerCase()
        );
        return res.json(filtrados);
    }

    return res.json(students);
});

// 4. Obtener un estudiante por ID
// GET /api/estudiantes/:id
router.get('/:id', (req, res) => {
    // #swagger.description = 'Obtiene el detalle de un estudiante por su ID'
    const id = Number(req.params.id);
    const student = students.find((s) => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: '404 Not Found'
        });
    }

    return res.json(student);
});

// POST /api/estudiantes
router.post('/', (req, res) => {
    // #swagger.description = 'Crea un nuevo estudiante'
    const { name, email, bootcamp } = req.body;
    if (!email) {
        return res.status(400).json({ 
            message: '400 Bad Request'
        });
    }
    const newStudent: Student = {
        id: siguienteId++,
        name,
        email,
        bootcamp,
    };
    students.push(newStudent);
    return res.status(201).json(newStudent);
});

// PUT /api/estudiantes/:id
router.put('/:id', (req, res) => {
    // #swagger.description = 'Actualiza la información de un estudiante existente'
    const id = Number(req.params.id);
    const student = students.find((s) => s.id === id);
    if (!student) {
        return res.status(404).json({
            message: '404 Not Found'
        });
    }
    const { name, email, bootcamp } = req.body;
    if (name !== undefined) student.name = name;
    if (email !== undefined) student.email = email;
    if (bootcamp !== undefined) student.bootcamp = bootcamp;
    return res.json(student);
});

// DELETE /api/estudiantes/:id
router.delete('/:id', (req, res) => {
    // #swagger.description = 'Elimina un estudiante por su ID'
    const id = Number(req.params.id);
    const studentIndex = students.findIndex((s) => s.id === id);
    if (studentIndex === -1) {
        return res.status(404).json({ 
            message: 'Student not found.'
        });
    }

    const [deletedStudent] = students.splice(studentIndex, 1);
    return res.json({ 
        message: 'Student deleted successfully.',
        student: deletedStudent
    });
});

export default router;
