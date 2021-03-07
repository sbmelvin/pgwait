interface PGWaitOptions {
    host?: string;
    port?: number;
    database?: string;
    user?: string;
    password?: string;
    retry?: number;
}
export default function pgwait(options?: PGWaitOptions): Promise<void>;
export {};
