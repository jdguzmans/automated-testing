const mongoose = require('mongoose');

const { Schema } = mongoose;

const ApplicationSchema = new Schema({
    name        : String,
    url         : String,
    type        : String,
    description : String,
    host        : String,
    nameDb      : String,
    userDb      : String,
    passwordDB  : String
}, { timestamps: true });

ApplicationSchema.methods.toJSON = function() {
    return {
        _id         : this._id,
        name        : this.name,
        url         : this.url,
        type        : this.type,
        description : this.description,
        host        : this.host,
        nameDb      : this.nameDb,
        userDb      : this.userDb,
        passwordDB  : this.passwordDB,
        createdAt   : this.createdAt,
        updatedAt   : this.updatedAt,
    };
};

mongoose.model('Application', ApplicationSchema);