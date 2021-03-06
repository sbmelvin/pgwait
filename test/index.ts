import pgwait from '../src/index';

const app = async () => {
    await pgwait({
        host: 'localhost',
        port: 5432,
        database: 'pgwait',
        user: 'postgres',
        password: 'postgres',
        delay: 2
    });
}

app();