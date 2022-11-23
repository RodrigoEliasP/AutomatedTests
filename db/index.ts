import mssql from 'mssql';

const createDatabase = () => {
  return mssql.connect({
    server: 'localhost',
    port: 1433,
    user: 'sa',
    password: 'root',
    options: {
      trustServerCertificate: true,
    }
  })
}

export { createDatabase };
