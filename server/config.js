const isDev = process.env.DEV

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT,
  STATIC_PATH: process.env.STATIC_PATH,
  DEV: isDev,

  AWS_QUEUE_URL: process.env.AWS_QUEUE_URL,
  AWS_BUCKET: process.env.AWS_BUCKET,

  MONGODB_URI: process.env.MONGODB_URI,

  CREATE_E2E_TEST: '0',
  EXECUTE_E2E_TEST: '1',

  EXECUTE_RANDOM_TEST: '2',

  REGISTER_VR_TEST: '3',
  EXECUTE_VR_TEST: '4',

  UPLOAD_GAD_START: '5'
}
