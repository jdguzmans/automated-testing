const isDev = process.env.DEV

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT,
  STATIC_PATH: process.env.STATIC_PATH,
  DEV: isDev,

  MONGODB_URI: process.env.MONGODB_URI,

  AWS_BUCKET: process.env.AWS_BUCKET
}
