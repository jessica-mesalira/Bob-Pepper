module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./db.development.sqlite"
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:"
  },
  production: {
    username: "adminlocal",
    password: "@Bob20pepper20",
    database: "bdbobpepper",
    host: "svrbobpepper.database.windows.net",
    dialect: 'mssql',
    xuse_env_variable: 'DATABASE_URL',
    dialectOptions: {
      options: {
        encrypt: true
      }
    },
    pool: { 
      max: 5,
      min: 1,
      acquire: 5000,
      idle: 30000,
      connectTimeout: 5000
    }
  }
};
// DIALECT = tipo do banco mysql==mysql e tem que instalar o mysql 2 no git bash
//mssql == banco azure(microsoft sql server)
 
