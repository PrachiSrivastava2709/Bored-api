import express from "express"
import bodyParser from "body-parser";
import axios from "axios"

const app = express();
const port  = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try{
        const api_response = await axios.get("https://bored-api.appbrewery.com/random");
        const api_data = api_response.data;
        res.render("index.ejs", {data: api_data});
    } catch(error){
        console.log("Failed to make request", error.message);
        res.render("index.ejs", {error: error.message});
    }
});

app.post("/", async(req, res) => {
    try {
        console.log(req.body);
        const type = req.body.type;
        const participants = req.body.participants;

        const api_response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${type}&particpants=${participants}`);
        const api_data = api_response.data;
        res.render("index.ejs", {data: api_data[Math.floor(Math.random() * api_data.length)]});
    } catch(error){
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {error: "No activities that match your criteria."});
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
