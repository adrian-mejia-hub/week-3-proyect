import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

//-----------------------------------------//
app.get(`/api/status`,(req, res) =>{
    res.json({
        status: `Server online`,
        version: `1.0.0`,
    });
});

interface Student {
    id: number;
    name: string;
    email: string;
    bootcamp: string;
}

const students: Student[] = [];
let siguienteId = 1;

app.get('/api/students', (req, res) => {
    res.json(students);
});

app.post('/api/students', (req, res) => {
    const { name, email, bootcamp } = req.body;
    if (!email) {
        return res.status(400).json({ 
            message: '400 Bad Request'
         });
    }
    const newStudent: Student = {
        id: siguienteId += 1,
        name,
        email,
        bootcamp,
    };
    students.push(newStudent);
    return res.status(201).json(newStudent);
});

app.put('/api/students/:id', (req, res) => {
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

app.delete('/api/students/:id', (req, res) => {
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

//-----------------------------------------//
app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});


