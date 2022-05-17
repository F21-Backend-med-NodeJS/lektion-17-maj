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

function filterPlays(play) {
    const result = insults.filter((insult) => {
        if (insult.play.includes(play)) {
            return insult;
        }
    });

    return result;
}

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

app.get('/api/insults/:play', (request, response) => {
    const play = request.params.play;
    console.log(play);
    const result = filterPlays(play);
    console.log(result);

    const resObj = {
        success: false,
        insults: []
    }

    if (result.length > 0) {
        resObj.success = true;
        resObj.insults = result;
    }

    response.json(resObj); 
});

app.get('/api/plays', (request, response) => {
    const maxResults = request.query.max;
    const result = [];

    for (let i = 0; i < maxResults; i++) {
        result.push(insults[i]);
    }

    const resObj = {
        insults: result
    }

    response.json(resObj);
});

app.listen(PORT, () => {
    console.log(`Servern är startad på port: ${PORT}`);
});