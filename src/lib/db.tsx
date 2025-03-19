import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL, // Vercel 환경 변수에서 가져옴
    ssl: {
        rejectUnauthorized: false,
    },
});

export default pool;
