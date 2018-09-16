const mongoose = require('mongoose');

const { Schema } = mongoose;

const TestingE2ESchema = new Schema({
    name        : String,
    application : String,
    fileTest    : String,
    description : String,
}, { timestamps: true });

TestingE2ESchema.methods.toJSON = function() {
    return {
        _id         : this._id,
        name        : this.name,
        application : this.application,
        fileTest    : this.fileTest,
        description : this.description,
        createdAt   : this.createdAt,
        updatedAt   : this.updatedAt,
    };
};

mongoose.model('TestingE2E', TestingE2ESchema);