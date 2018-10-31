const mongoose = require('mongoose')

const { Schema } = mongoose

const ReportE2ESchema = new Schema({
  idTest: String,
  navegador: String,
  pantalla: String,
  mode: String
}, { timestamps: true })

ReportE2ESchema.methods.toJSON = function () {
  return {
    _id: this._id,
    idTest: this.idTest,
    navegador: this.navegador,
    pantalla: this.pantalla,
    mode: this.mode,
    date: this.createdAt
  }
}

mongoose.model('ReportsE2E', ReportE2ESchema)
