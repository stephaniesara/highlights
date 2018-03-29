const app = require('./app.js');
const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`Server is currently running on port ${port}!`);
})