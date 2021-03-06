import pg from "pg"

interface PGWaitOptions {
    host?: string,
    port?: number,
    database?: string,
    user?: string,
    password?: string,
    delay?: number
}

interface PGWaitDefaultOptions extends PGWaitOptions {
    delay: number,
    minDelay: number
}

export default function pgwait(options: PGWaitOptions): Promise<void> {
    const defaultOpts: PGWaitDefaultOptions = {
        delay: 4,        // Delay in seconds
        minDelay: 2     // Minimum allowed delay in seconds
    }

    if (!options.delay) {
        console.warn("options.delay not set, using default value of %d seconds.", defaultOpts.delay)
        options.delay ??= defaultOpts.delay
    }

    if (options.delay < defaultOpts.minDelay) {
        console.error("options.delay cannot be lower than 2 seconds. Setting value to %d seconds.", defaultOpts.minDelay)
        options.delay = 2
    }

    // setInterval expects time in milliseconds
    options.delay *= 1000

    const pool = new pg.Pool({
        host: options.host,
        port: options.port,
        database: options.database,
        user: options.user,
        password: options.password
    })

    const timeStamp = (): string => {
        const d = new Date();
        return d.toLocaleTimeString();
    }
    
    const printStatusMsg = (status: string): void => {
        const statusMsg = "%s - Status: %STATUS%".replace('%STATUS%', status);
        console.log(statusMsg, timeStamp());
    }

    const connect = (): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                await pool.query('SELECT 1');
                printStatusMsg('Online');
                resolve();
            }   
            catch (e) {
                printStatusMsg('Offline');
                reject()
            }
        })
    }

    return new Promise(async (resolve): Promise<void> => {
        try {
            await connect()
            resolve()
        }
        catch (e) {
            const pgInterval = setInterval(async () => {
                try {
                    await connect()
                    clearInterval(pgInterval)
                    resolve()
                } catch (e) {}
            }, options.delay)
        }
    })
}