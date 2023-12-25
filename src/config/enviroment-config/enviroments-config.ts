export default () => ({
  nodeEnv: process.env.NODE_ENV,
  appId: process.env.APP_ID,
  appPort: process.env.PORT_APP,
  dbPort: process.env.PORT_DB,
  dbUser: process.env.USER_DB,
  dbPassword: process.env.PASSWORD_DB,
  dbHost: process.env.DB_HOST,
  dbName: process.env.NAME_DB,
});
