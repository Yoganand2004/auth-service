const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/Auth");


// Dummy products array
let products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mobile", price: 20000 }
];


// GET all products
router.get("/", verifyToken,(req, res) => {
    console.log(req.user);
    
    res.json(products);
});

// GET product by ID
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
});

// POST create new product
router.post("/", (req, res) => {
    const { name, price } = req.body;

    const newProduct = {
        id: products.length + 1,
        name,
        price
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PUT update product
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;

    res.json(product);
});

// DELETE product
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    products = products.filter(p => p.id !== id);

    res.json({ message: "Product deleted" });
});

module.exports = router;