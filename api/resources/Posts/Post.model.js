module.exports = (sequelize, type) => {
    return sequelize.define('post', {
        ID:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: type.STRING,
        content: type.STRING,
        imageURL: type.STRING,
        category: type.STRING,
        creation_date: type.DATE
    })
}

// titulo, contenido, imagen, categoria. fecha de creacion 