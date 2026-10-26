import express from 'express';
const app = express();
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});
//-----------------------------------------//
app.get(`/api/status`, (req, res) => {
    res.json({
        status: `Server online`,
        version: `1.0.0`,
    });
});
//# sourceMappingURL=index.js.map