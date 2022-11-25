import mssql from 'mssql';

export const testDBConfig: mssql.config = {
  server: 'localhost',
  port: 1433,
  user: 'sa',
  password: 'root',
  database: 'master',
  options: {
    trustServerCertificate: true,
  }
}