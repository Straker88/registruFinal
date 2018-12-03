let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let moment = require('moment');

const PacientSchema = new Schema({

    cabinet: { type: String, required: true },
    nume: { type: String, required: true },
    telefon: { type: String, required: true },
    data_inregistrare: { type: String, default: () => new moment().format('DD/MM/YYYY') },
    varsta: { type: Number },
    adresa: { type: String },
    sex: { type: String },
    updated_at: { type: String },
    // sosit_cabinet: { type: String },

});

PacientSchema.pre('save', function (next) {
    now = new moment().format('DD/MM/YYYY');
    this.updated_at = now;
    next()
});


var Pacient = mongoose.model('Pacient', PacientSchema);
module.exports = Pacient;

