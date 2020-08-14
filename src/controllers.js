import models from './models/index.js';


export const getAllBooks =  (req, res) => {
    models.Book.findAll()
    .then(libros => res.send( libros ))
    .catch(e => console.error(e));
};

export const getBookById = (req, res) => {
    models.Book.findById(parseInt(req.params.id))
    .then(libro=> 
        {
            if(libro === null){
                res.status(404).send({"msg": "No existe ese libro"});
            }
            else{
                res.send(libro);
            }
        })
    .catch(e => console.error(e));
};

export const createBook = (req, res) => {
    const { name } = req.body;

    models.Book.create({name: name})
        .then( book => {
            res.send(book);
        })
        .catch( e => 
            res.send({"msg": "No se pudo crear"})
        );
};


export const updateBook = (req, res) => {

    const { name } = req.body;

    models.Book.update( {name: name}, {
        where: {
            id: req.params.id
        },
        returning: true
    })
    .then( (book) => {
        console.log(`update ${book}`);
        if(book[0] === 0 ){
            res.status(404).send({"msg": "Libro no existe"})
        }else{
            res.send(book[1][0]);
        }
    }).catch( e =>
        res.status(409).send({"msg": "No se pudo actualizar"})
    );};


export const deleteBook = (req, res) => {

    models.Book.destroy({
        where: {
            id: req.params.id
        },
        returning: true
    })
    .then( book => {
        console.log(`delete ${book}`);
        if(book === 0 ){
            res.status(404).send({"msg": "Libro no existe"})
        }else{
            res.send({"msg": "Libro eliminado correctamente", "id": req.params.id});
        }
    })
    .catch( e => { 
        res.status(404).send({"msg": "No se pudo eliminar"});
        console.log(e);
    });
};

