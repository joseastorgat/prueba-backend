
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

    Book.findById = id => {

        return  Book.findOne({
            where: {id: id},
        });
    }
   
    return Book;
  };
   
  export default book;