import {Router} from 'express';

const router = Router();

interface Student {
    id: number;
    name: string;
    email: string;
    bootcamp: string;
}

const students: Student[] = [];
let siguienteId = 1;

// GET /api/estudiantes
router.get('/', (req, res) => {
    res.json(students);
});

// POST /api/estudiantes
router.post('/', (req, res) => {
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