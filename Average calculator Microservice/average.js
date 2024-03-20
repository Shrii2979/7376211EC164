const express = require('express');

const app = express();
const port = 3001;

function calculateAverage(numbers) {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

app.post('/calculate', (req, res) => {
  const { numbers } = req.body;
  if (!numbers || !Array.isArray(numbers)) {
    return res.status(400).send('Invalid request: Numbers must be an array');
  }
  const average = calculateAverage(numbers);
  res.json({ average });
});

app.listen(port, () => console.log(`Microservice listening on port ${port}`));
