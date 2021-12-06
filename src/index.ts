import pg from "pg"

interface PGWaitOptions {
    host?: string,
    port?: number,
    database?: string,
    user?: string,
    password?: string,
    retry?: number
}

interface PGWaitDefaultOptions extends PGWaitOptions {
    retry: number,
    minRetry: number
}

export default function pgwait(options?: PGWaitOptions): Promise<void> {
    const defaultOpts: PGWaitDefaultOptions = {
        retry: 4,       // Delay in seconds
        minRetry: 2     // Minimum allowed delay in seconds
    }    
    
    const opts = options ??= defaultOpts

    if (!opts.retry) {
        console.warn("options.retry not set, using default value of %d seconds.", defaultOpts.retry)
        opts.retry ??= defaultOpts.retry
    }

    if (opts.retry < defaultOpts.minRetry) {
        console.error("options.retry cannot be lower than 2 seconds. Setting value to %d seconds.", defaultOpts.minRetry)
        opts.retry = 2
    }

    // setInterval expects time in milliseconds
    opts.retry *= 1000

    const pool = new pg.Pool({
        host: options.host,
        port: options.port,
        database: options.database,
        user: options.user,
        password: options.password
    })
    
    const clean = async (): Promise<void> => {
        await pool.end()
    }

    const timeStamp = (): string => {
        const d = new Date()
        return d.toLocaleTimeString()
    }
    
    const printStatusMsg = (status: string): void => {
        const statusMsg = "%s - Status: %STATUS%".replace('%STATUS%', status)
        console.log(statusMsg, timeStamp())
    }

    const connect = (): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                await pool.query('SELECT 1')
                printStatusMsg('Online')
                await clean()
                resolve()
            }   
            catch (e) {
                printStatusMsg('Offline')
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
            }, opts.retry)
        }
    })
}