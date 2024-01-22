//jshint version:6

const express = require('express');
const https = require('https');
const app = express();

app.use(express.static("public")); 

app.get("/weather", function (req, res) {
    const query = req.query.city;
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid=25ad83144b33b61349e5b5534399c693&units=metric#';
    https.get(url, function(response) {
        console.log(response.statusCode);

        let data = '';

        response.on("data", function(chunk) {
            data += chunk;
        });

        response.on("end", function() {
            const weatherdata = JSON.parse(data);
            console.log(weatherdata);
            const temp = weatherdata.main.temp;
            const weatherdescription = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const imageURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

            res.send(`
                <h2>Temperature: ${temp}°C</h2>
                <p>The weather is currently ${weatherdescription}.</p>
                <img src="${imageURL}" alt="Weather Icon">
            `);
        });
    });
});

app.listen(3000, function () {
    console.log("server started on port");
});