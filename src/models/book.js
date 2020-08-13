
const book = (sequelize, DataTypes, Model) => {
    class Book extends Model {};

    Book.init ({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
    
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        }
    }, {
        timestamps: false,
        sequelize,
        modelName: "Book"
    });

    Book.findById = async id => {

        let book = await Book.findOne({
            where: {id: id},
        });

        return book;
    }
   
    return Book;
  };
   
  export default book;