let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let moment = require('moment');

const PacientSchema = Schema({
    _id: Schema.Types.ObjectId,
    cabinet: { type: String, required: true },
    nume: { type: String, required: true },
    telefon: { type: String, required: true },
    data_inregistrare: { type: String, default: () => new moment().format('DD/MM/YYYY') },
    updated_at: { type: String },
    service: [{ type: Schema.Types.ObjectId, ref: 'Service' }]


});

PacientSchema.pre('save', function (next) {
    now = new moment().format('DD/MM/YYYY');
    this.updated_at = now;
    next()
});


const ServiceSchema = Schema({
    pacient: { type: Schema.Types.ObjectId, ref: 'Pacient' },

});

var Pacient = mongoose.model('Pacient', PacientSchema);
var Service = mongoose.model('Service', ServiceSchema);
module.exports = Pacient;
module.exports = Service;

