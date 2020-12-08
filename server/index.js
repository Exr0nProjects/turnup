const PORT = 1942;

const express = require('express')
const app = express();

app.use((req) => {
    console.log(`${Date()}: ${req.path}`);
    req.next();
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static('public'));

app.listen(PORT, () => console.log('listening on port', PORT));
