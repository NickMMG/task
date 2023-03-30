require('dotenv').config();
const express = require('express');
const expressConfig = require('./config/express');
const employeeRouter = require('./routes/employee.routes');
const edicationsRouter = require('./routes/edication.routes');
const app = express();

expressConfig(app);

app.use('/api/Employee', employeeRouter);
app.use('/api/Edication', edicationsRouter);

// eslint-disable-next-line prefer-destructuring
const PORT = process.env.PORT;

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}/`)
);
