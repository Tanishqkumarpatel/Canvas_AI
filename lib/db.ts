import postgres from 'postgres'
const url = process.env.POSTGRES_URL
if (!url) {
    throw new Error('Missing: process.env.POSTGRES_URL')
}
const sql = postgres(url, {ssl: 'require'})
export default sql