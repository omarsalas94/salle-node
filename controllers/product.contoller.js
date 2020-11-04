
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

productContoller.patch = (req, res) => {
    const { productId } = req.params;
    const { name, description } = req.body;

    const index = products.findIndex((product) => product.id === +productId);

    if (index !== -1) {
        const product = {
            ...products[index],
            name: name ? name : products[index].name,
            description: description ? description : products[index].description,
        };
        products[index] = product;
        res.json(product);
    } else {
        res.status(404).send('El producto no existe');
    }
}

module.exports = productContoller;
