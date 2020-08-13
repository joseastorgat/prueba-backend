import models from './models/index.js';

export const helloWorld =  (req, res) => {
    res.send('Hello World');
};
  

export const getAllBooks =  (req, res) => {
    models.Book.findAll()
    .then(libros => res.send( libros ))
    .catch(e => console.error(e));
};

export const getBookById = (req, res) => {
    models.Book.findById(parseInt(req.params.id))
    .then(libro=> res.send( libro))
    .catch(e => console.error(e));
};

export const createBook = (req, res) => {
    const { name } = req.body;

    console.log(req.body);
    console.log(`nombre del libro a crear ${name}`)

    models.Book.create({name: name})
        .then( book => {
            res.send(book);
        })
        .catch( e => 
            res.send("No se pudo crear")
        );
};


export const updateBook = (req, res) => {

    const { name } = req.body;

    models.Book.update( {name: name}, {
        where: {
            id: req.params.id
        }
    })
    .then( book => {
        res.send(book);
    }).catch( e =>
        res.send("No se pudo actualizar")
    );};


export const deleteBook = (req, res) => {

    models.Book.destroy({
        where: {
            id: req.params.id
        }
    })
    .then( book => {
        res.send(book);
    }).catch( e => 
        res.send("No se pudo eliminar")
    );
};

