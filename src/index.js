"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
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