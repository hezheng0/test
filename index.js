const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");

app.use(express.static("static"));
app.use(cors());

const port = process.env.PORT || 3000;

app.get("/table", function(req, res) {
	fs.readFile("./static/table.json", (err, data) => {
		if (err) console.log(err);
		var test1 = JSON.parse(data);
		res.send(test1);
	});
});

app.listen(port, () => {
	console.log(`listenning ${port}`);
});
