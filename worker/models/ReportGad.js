const mongoose = require('mongoose')

const { Schema } = mongoose

const ReportGadSchema = new Schema({
  idTable     : String,
  numRegister : String,
  registered  : String,
  configRegister : String,
}, { timestamps: true })

ReportGadSchema.methods.toJSON = function () {
  return {
    _id         : this._id,
    idTable     : this.idTable,
    numRegister : this.numRegister,
    registered  : this.registered,
    configRegister : this.configRegister,
    date        : this.createdAt
  }
}

mongoose.model('ReportGad', ReportGadSchema)
