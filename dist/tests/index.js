"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../src/index"));
const app = async () => {
    await index_1.default({
        host: 'localhost',
        port: 5432,
        database: 'pgwait',
        user: 'postgres',
        password: 'postgres',
        retry: 2
    });
};
app();
//# sourceMappingURL=index.js.map