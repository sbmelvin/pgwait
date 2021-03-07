"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
function pgwait(options) {
    const defaultOpts = {
        delay: 4,
        minDelay: 2
    };
    if (!options.delay) {
        console.warn("options.delay not set, using default value of %d seconds.", defaultOpts.delay);
        options.delay ?? (options.delay = defaultOpts.delay);
    }
    if (options.delay < defaultOpts.minDelay) {
        console.error("options.delay cannot be lower than 2 seconds. Setting value to %d seconds.", defaultOpts.minDelay);
        options.delay = 2;
    }
    options.delay *= 1000;
    const pool = new pg_1.default.Pool({
        host: options.host,
        port: options.port,
        database: options.database,
        user: options.user,
        password: options.password
    });
    const timeStamp = () => {
        const d = new Date();
        return d.toLocaleTimeString();
    };
    const printStatusMsg = (status) => {
        const statusMsg = "%s - Status: %STATUS%".replace('%STATUS%', status);
        console.log(statusMsg, timeStamp());
    };
    const connect = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await pool.query('SELECT 1');
                printStatusMsg('Online');
                resolve();
            }
            catch (e) {
                printStatusMsg('Offline');
                reject();
            }
        });
    };
    return new Promise(async (resolve) => {
        try {
            await connect();
            resolve();
        }
        catch (e) {
            const pgInterval = setInterval(async () => {
                try {
                    await connect();
                    clearInterval(pgInterval);
                    resolve();
                }
                catch (e) { }
            }, options.delay);
        }
    });
}
exports.default = pgwait;
//# sourceMappingURL=index.js.map