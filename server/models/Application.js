const mongoose = require('mongoose');

const { Schema } = mongoose;

const ApplicationSchema = new Schema({
    name        : String,
    url         : String,
    type        : String,
    description : String,
}, { timestamps: true });

ApplicationSchema.methods.toJSON = function() {
    return {
        _id       : this._id,
        name      : this.name,
        url       : this.url,
        type      : this.type,
        createdAt : this.createdAt,
        updatedAt : this.updatedAt,
    };
};

mongoose.model('Application', ApplicationSchema);