const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReportRandomSchema = new Schema({
    idAppliRandom : String,
    navegador     : String,
    pantalla      : String,
    mode          : String,
    event         : String,
}, { timestamps: true });

ReportRandomSchema.methods.toJSON = function() {
    return {
        _id           : this._id,
        idAppliRandom : this.idAppliRandom,
        navegador     : this.navegador,
        pantalla      : this.pantalla,
        mode          : this.mode,
        event         : this.event,
        date          : this.createdAt
    };
};

mongoose.model('ReportRandom', ReportRandomSchema);