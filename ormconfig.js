module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*{.ts,.js}', 'src/**/*{.ts,.js}'],
  synchronize: true,
  dropSchema: true
}
