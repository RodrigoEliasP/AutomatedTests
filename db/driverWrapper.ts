import sql from 'mssql';
import { DriverWrapper } from '../types/driverWrapper';

const createMssqlDriverWrapper = async (
  mssql: typeof sql, 
  config: sql.config
): Promise<DriverWrapper> => {
  const connection = await mssql.connect(config);

  return {
    async delete(table, where) {
      let query = `DELETE FROM $table WHERE $clause`;
      query = query.replace('$table', table);
      query = query.replace('$clause', where.join(', AND'));
      await connection.query(query);
    },
    /**
     * assure the fields and values being sorted in the arrays
     * @param table Table to insert
     * @param fields Fields to be inserted
     * @param values Values to be inserted into the fields specified
     */
    async insert(table, fields, values) {
      let query = `
      INSERT INTO 
      $table 
      ($fields)
      VALUES ($values)
      `;
      const request = connection.request();
      query = query.replace('$table', table);
      query = query.replace('$fields', fields.join(','));
      query = query.replace(
        '$values', 
        fields.map(field => '@' + field).join(',')
      );

      fields.forEach((field, i) => {
        request.input(field, values[i]);
      })
      await connection.query(query);
    },
    async select<T = any>(table: string) {
      let query = `
        SELECT * FROM $table
      `;
      query = query.replace('$table', table);
      const response = await connection.query<T>(query);
      return response.recordset;
    },
    async update(table, where, fields, values) {
      let query = `
        UPDATE $table
        SET
          $fields
        WHERE
          $clause
      `;
      const request = connection.request();
      query = query.replace('$table', table);
      query = query.replace(
        '$fields',
        fields.map(field => `${field} = @${field}`)
        .join(',')
      )
      query = query.replace('$clause', where.join('AND, '));
      fields.forEach((field, i) => {
        request.input(field, values[i]);
      })
      await request.query(query);
    },
  }
}

export { createMssqlDriverWrapper }