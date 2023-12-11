const express = require('express');
const app = express()
const port = 3000

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/api/', (req, res) => {
    const date = new Date();
    const unix = date.getTime();
    const utc = date.toUTCString();

    res.json({
        unix: unix,
        utc: utc
    });
})

app.get('/api/:date', (req, res) => {
    const date = new Date(req.params.date);
    let unix = '';
    let utc = '';
    let error = false;
    if(!isNaN(date)){
        unix = date.getTime();
        utc = date.toUTCString();
    }else{
        let unixTimestamp = parseInt(req.params.date);
        let dateConverted = new Date(unixTimestamp);
        
        if(isNaN(dateConverted)){
            error = true;
        } else{
            unix = unixTimestamp;
            utc = dateConverted.toUTCString();
        }
    }

    if(!error){
        res.json({
            unix: unix,
            utc: utc
        });
    } else{
        res.json({
            error: "Invalid Date"
        });
    }
})