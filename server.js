const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require('cors')



const port = process.env.PORT || 3000
app.use(express.static(__dirname + "/build"));
app.use(express.json());
app.use(cors());

var dbUrl = 'mongodb+srv://durga:user@cluster0.bmgwf.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(dbUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, (err) => {
	if (err) return console.error(err);
	console.log('Connection Established');
})


const Product = mongoose.model("products", {
	"id": Number,
	"product": {
		"productid": Number,
		"category": String,
		"price": Number,
		"name": String,
		"instock": Boolean
	}
})



app.get("/product/get", (req, res) => {
	Product.find({}, (err, products) => {
		if (err) {
			console.error(err);
			return res.send({
				success: 0,
				message: err
			})
		}
		res.send({
			success: 1,
			data: products
		});
	})
})

app.post("/product/create", (req, res) => {
	const { body } = req;

	Product.find({}, { id: 1 })
	.sort({"id": -1})
	.limit(1)
	.then((maxProduct) => {
		const id = (maxProduct[0])?maxProduct[0].id + 1:0;
		
		const newProduct = new Product({
			id: id,
			product: {
				productid: id,
				category: body.category,
				price: body.price,
				name: body.name,
				instock: body.instock
			}
		})

		newProduct.save().then((product) => {
			res.send({
				success: 1,
				data: product
			});
		}).catch((err) => {
			console.error(err);
			return res.send({
				success: 0,
				message: err
			})
		})

	}).catch((err) => {
		console.error(err);
		return res.send({
			success: 0,
			message: err
		})
	})
})

app.post("/product/update/:id", (req, res) => {
	Product.updateOne({id: req.params.id}, { product: req.body })
	.then((updateRes) => {
		if(updateRes.nModified == 0) throw "Update Failed";
		res.send({
			success: 1,
			message: "Updated successfully"
		});
	})
	.catch((err) => {
		console.error(err);
		return res.send({
			success: 0,
			message: err
		})
	})
})

app.get("/product/delete/:id", (req, res) => {
	Product.deleteOne({id: req.params.id})
	.then((deleteRes) => {
		res.send({
			success: 1,
			message: "Deleted successfully"
		})
	})
	.catch((err) => {
		console.error(err);
		return res.send({
			success: 0,
			message: err
		})
	})
})


//Intialization 
app.listen(port, () => {
	console.log("\nListening http://localhost:" + port);
})