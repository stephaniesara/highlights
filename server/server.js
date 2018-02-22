const express = require('express');
const app = express();

app.use(express.static('./client/dist'))



app.get('/', (req, res) => {
  res.send('TEST FROM SERVER.js')
});

app.listen(3003, () => {
  console.log('Sever is currently running on port 3003. Your hair looks great today, btw')
})
