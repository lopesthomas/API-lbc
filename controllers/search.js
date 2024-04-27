const Search = require("../models/Search");
const lbc = require("leboncoin-api-search");
const fs = require("fs");

exports.allSearch = (req, res, next) => {const results = lbc.searchMultiples(
	{
		category: lbc.CATEGORY.ANIMAUX,
		keywords: `${req.query.q}`,
        locations: ['Ain'],
		limit: 2,
	},
	10,
    console.log("searchSchema"),
	//console.log(req)
).then((results) => res.status(200).json(results))
.catch((error) => res.status(400).json({ error }))};

//console.log(searchSchema);