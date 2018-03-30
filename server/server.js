const app = require('./app.js');
const port = process.env.PORT || 80;

app.listen(port, () => {
  console.log(`Server is currently running on port ${port}!`);
})
