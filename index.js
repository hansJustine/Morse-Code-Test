const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const e = require('express');

// const uri = process.env.DATABASE || 'mongodb://localhost/morse'
const port = process.env.PORT || 3000;

// mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex:true })
//         .then(() => console.log('You\'re connected to the database.'))
//         .catch(err => console.log(err));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

const morseCodes = {
    a: '.-', b: '-...', c: '-.-.', d: '-..', e: '.', f: '..-.',
    g: '--.', h: '....', i: '..', j: '.---', k: '-.-', l: '.-..',
    m: '--', n: '-.', o: '---', p: '.--.', q: '--.-', r: '.-.',
    s: '...', t: '-', u: '..-', v: '...-', w: '.--', x: '-..-',
    y: '-.--', z: '--..', 1: '.----', 2: '..---', 3: '...--', 4: '....-',
    5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.', 0: '-----'
}

var tempCodes = [];

app.get('/', (req, res) => {
    res.render('homepage');
});

app.get('/letters', (req, res) => {
    const randomLetter = () => {
        const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
                            'o', 'p', 'q', 'r', 's','t', 'u', 'v', 'w', 'x', 'y', 'z'];
        let randomNum = Math.floor(Math.random() * 26);
        return letters[randomNum]; 
    }
    tempCodes = [];
    for(let i = 0; i < 15; i++){
        let random = randomLetter();
        tempCodes.push({letter: random, code: morseCodes[random]})
    }
    res.render('letters', {morseCodes, tempCodes});
});

app.get('/lettersAndNums', (req, res) => {
    const randomLetterOrNum = () => {
        const lettersAndNums = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
                        'o', 'p', 'q', 'r', 's','t', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2',
                        '3', '4', '5', '6', '7', '8', '9', '0'];
        let randomNum = Math.floor(Math.random() * 36);
        return lettersAndNums[randomNum]; 
    }
    tempCodes = [];
    for(let i = 0; i < 15; i++){
        let random = randomLetterOrNum();
        tempCodes.push({letter: random, code: morseCodes[random]})
    }
    console.log(tempCodes);
    res.render('lettersAndNums', {morseCodes, tempCodes});
});

app.post('/result', (req, res) => {
    const answers = req.body.codes;
    let wrongAnswers = [];
    let score = 0;

    for(let i = 0; i < 15; i++){
        if(answers[i].toLowerCase() === tempCodes[i].letter){
            score++;
        } else {
            wrongAnswers.push(Object.assign({wrongLetter: answers[i]}, tempCodes[i]));
        }
    }
    console.log(wrongAnswers, score)
    res.render('lettersResult', {wrongAnswers, score});
});

app.listen(port, () => console.log(`The server is listening to port ${port}`))