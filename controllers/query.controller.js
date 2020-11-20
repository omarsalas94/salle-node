const CustomerModel = require('../models/customer.model');

const queries = {
    formasConsulta: async (req, res) => {
        // Usando las palabras reservadas asyn-await
        /* try {
            const customers = await CustomerModel.find({});
            res.json(customers);
        } catch (error) {
            res.json({error});
        } */
        // Usando callbacks
        /* CustomerModel.find({}, (error, customers) => {
            if (error) {
                res.status(500).json({error})
            } else {
                res.json(customers);
            }
        }); */
        // Usando el método exec
        CustomerModel.find({}).exec((error, customers) => {
            if (error) {
                res.status(500).json({error})
            } else {
                res.json(customers);
            }
        });
    }, 
    lookupMongo: async (req, res) => {
        try {
            const customers = await CustomerModel.aggregate([
                // Filtra todos aquellos documentos cuyo valor en la propiedad name sea igual a Yolanda
                {
                    $match: {
                        name: 'Yolanda'
                    }
                },
                // Devuelve las propiedades que definimos en el operador $project
                {
                    $project: {
                        name: 1,
                        lastName: 1,
                        fullName: {
                            $concat: ["Saludos: ", "$name", " ", "$lastName"]
                        }
                    }
                }, 
                {
                   $limit: 1 
                }, 
                // Unión de las colecciones Customer y Lesson
                {
                    $lookup: {
                        from: "Lesson",
                        localField: "_id",
                        foreignField: "customerId",
                        as: "lessons"
                    }
                }
            ]);
            res.json(customers)
        } catch (error) {
            res.status(500).json({error});
        }
    },
    lookupMongoose: async (req, res) => {
        try {
            const customers = await CustomerModel.aggregate()
                .lookup({
                    from: "Lesson",
                    localField: "_id",
                    foreignField: "customerId",
                    as: "lessons"
                }).project({
                    name: 1,
                    lastName: 1,
                    fullName: {
                        $concat: ["Saludos: ", "$name", " ", "$lastName"]
                    },
                    lessons: 1
                }).limit(1);
            res.json(customers);
        } catch (error) {
            res.status(500).json({error});
        }
    },
};

module.exports = queries;