
const productContoller = {};

const products = [
    {
        name: 'Sabritas',
        id: 1,
        description: "Bolsa de sabritas de 200g"
    },
    {
        name: 'Refresco',
        id: 2,
        description: "Refreso retornable"
    }
];

productContoller.get = (req, res) => {
    res.json(products);
};

productContoller.post = (req, res) => {
    const { name, description } = req.body;

    if (name && description) {
        const product = {
            name,
            description,
            id: products.length + 1
        };
        products.push(product);
        res.json(product);
    } else {
        res.send('Envie los datos solicitados');
    }
};

module.exports = productContoller;
