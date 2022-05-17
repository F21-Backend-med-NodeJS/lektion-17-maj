const express = require('express');
const app = express(); // Detta skapar en express applikation
const PORT = 8000;

app.use(express.json()); // Tolka allt i body som JSON 

const insults = [
    {
        insult: "Never hung poison on a fouler toad",
        play: "Rickard III"
    },
    {
        insult: "He thinks too much: such men are dangerous. ",
        play: "Julius Ceasar"
    }
];

app.get('/api/insults', (request, response) => {
    //response.send(JSON.stringify(insults));
    response.json(insults); // Kör JSON.stringify automatiskt så det blir samma som ovan kod
});

app.post('/api/insults', (request, response) => {
    const insult = request.body;
    console.log(insult);
    insults.push(insult);

    const resObj = {
        success: true,
        insults: insults
    }

    response.json(resObj);
});

app.listen(PORT, () => {
    console.log(`Servern är startad på port: ${PORT}`);
});