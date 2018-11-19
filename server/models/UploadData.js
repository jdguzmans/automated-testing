const mongoose = require('mongoose')

const { Schema } = mongoose

const UploadDataSchema = new Schema({
  nameTable: String,
  application: String,
  numRegister: String,
  dataJson: Object
}, { timestamps: true })

UploadDataSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    nameTable: this.nameTable,
    application: this.application,
    numRegister: this.numRegister,
    dataJson: this.dataJson,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  }
}

mongoose.model('UploadData', UploadDataSchema)
