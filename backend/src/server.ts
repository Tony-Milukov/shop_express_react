import * as path from 'path';
import * as fs from 'fs';

require('dotenv')
  .config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const sequelize = require('./db.ts');
const router = require('./routes/index.ts');
const errorHandler = require('./middelwares/errorHandler.ts');

const app = express();
app.use(cors());
app.use('/api', errorHandler, router);

// allow static
app.use(express.static(path.join(__dirname, 'static/avatars')));
const start = async (PORT: any) => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => console.log(`Server was started, and is running on PORT: ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};
start(process.env.PORT);
