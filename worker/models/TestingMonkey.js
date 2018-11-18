const mongoose = require('mongoose')

const { Schema } = mongoose

const TestingMonkeySchema = new Schema({
  name: String,
  application: String,
  fileTest: String,
  description: String
}, { timestamps: true })

TestingMonkeySchema.methods.toJSON = function () {
  return {
    _id: this._id,
    name: this.name,
    application: this.application,
    fileTest: this.fileTest,
    description: this.description,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  }
}

mongoose.model('TestingMonkey', TestingMonkeySchema)
