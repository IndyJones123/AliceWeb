const express = require('express');
const router = require('./src/routes/router')


const app = express();
const port = process.env.PORT || 5000 

app.use('/UPNGame', router)

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
