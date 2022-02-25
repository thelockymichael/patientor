"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
const PORT = 3001;
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const server = http_1.default.createServer(app_1.default);
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
