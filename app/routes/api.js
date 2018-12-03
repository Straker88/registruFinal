var User = require('../models/user');
var Pacient = require('../models/pacient');
var Service = require('../models/service');
var Oliva = require('../models/oliva');
var Ite = require('../models/ite');
var jwt = require('jsonwebtoken');
var secret = 'harrypotter';
var moment = require('moment-business-days');

module.exports = function (router) {

    // Pacient Reg. Route 
    // -------------------------------------------------------------------------------------------------

    router.post('/pacienti', function (req, res) {
        var token = req.body.token || req.body.query || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    res.json({ success: false, message: 'Token invalid' });
                } else {
                    var pacient = new Pacient();
                    pacient.cabinet = decoded.username;
                    pacient.nume = req.body.nume;
                    pacient.telefon = req.body.telefon;
                    pacient.data_inregistrare = new moment().format('DD/MM/YYYY');
                    pacient.varsta = req.body.varsta;
                    pacient.adresa = req.body.adresa;
                    pacient.sex = req.body.sex;

                    if (req.body.nume == null || req.body.nume == '') {
                        res.json({ success: false, message: 'Completeaza Numele' });
                    }

                    else if (req.body.telefon == null || req.body.telefon == '') {
                        res.json({ success: false, message: 'Completeaza Telefon' });
                    }

                    else {
                        pacient.save(function (err) {

                            if (err) {
                                res.json({ succes: false, message: err });
                            } else {

                                res.json({ success: true, message: 'Pacient adaugat cu succes.' });
                            }

                        });
                    }

                }
            });
        }


    });


    // Service Reg. Route 
    // -------------------------------------------------------------------------------------------------

    router.post('/service', function (req, res) {
        Service.findOne({}, {}, { sort: { 'nr_comanda_service': -1 } }, function (err, comanda_service) {

            var token = req.body.token || req.body.query || req.headers['x-access-token'];
            if (token) {
                jwt.verify(token, secret, function (err, decoded) {
                    if (err) {
                        res.json({ success: false, message: 'Token invalid' });
                    } else {
                        var service = new Service();
                        service.pacient_id = req.body.service_pacient_id;
                        service.cabinet = decoded.username;
                        service.nume = req.body.nume;
                        service.telefon = req.body.telefon;
                        service.service_inregistrat_pacient = req.body.service_inregistrat_pacient;
                        service.denumire_aparat = req.body.denumire_aparat;
                        service.serie_aparat = req.body.serie_aparat;
                        service.defectiune_reclamata = req.body.defectiune_reclamata;
                        service.constatare_cabinet = req.body.constatare_cabinet;
                        service.completare_cabinet = '-';
                        service.u_stanga = req.body.u_stanga;
                        service.u_dreapta = req.body.u_dreapta;
                        service.garantie = req.body.garantie;
                        service.cutie = req.body.cutie;
                        service.baterie = req.body.baterie;
                        service.mulaj = req.body.mulaj;
                        service.oliva = req.body.oliva;
                        service.observatii_cabinet = req.body.observatii_cabinet;
                        service.observatii_pacient = req.body.observatii_pacient;
                        service.iesit_cabinet = '-';
                        service.intrat_cabinet = '-';
                        service.predat_pacient = '-';
                        service.taxa_urgenta_cabinet = req.body.taxa_urgenta_cabinet;


                        service.log_sosit = '-';
                        service.log_plecat = '-';
                        service.log_preluat = '-';
                        service.log_trimis = '-';


                        service.serv_sosit = '-';
                        service.serv_plecat = '-';
                        service.finalizat_reparatie = '-';
                        service.executant_reparatie = '-';
                        service.piese_inlocuite = '-';
                        service.cod_componente = '-';
                        service.garantie_serv = req.body.garantie_serv;
                        service.observatii_service = req.body.observatii_service;
                        service.constatare_service = '-';
                        service.operatiuni_efectuate = '-';
                        service.cost_reparatie = '-';
                        service.observatii_service = '-';
                        service.garantie_serv = '-';

                        if (req.body.denumire_aparat == null || req.body.denumire_aparat == '') {
                            res.json({ success: false, message: 'Completeaza Denumire Aparat' });
                        }

                        else if (req.body.serie_aparat == null || req.body.serie_aparat == '') {
                            res.json({ success: false, message: 'Completeaza Serie Aparat' });
                        }

                        else if (req.body.defectiune_reclamata == null || req.body.defectiune_reclamata == '') {
                            res.json({ success: false, message: 'Completeaza Defectiune Reclamata' });
                        }

                        else if (req.body.constatare_cabinet == null || req.body.constatare_cabinet == '') {
                            res.json({ success: false, message: 'Completeaza Constatare Cabinet' });
                        }

                        else if (req.body.garantie == null || req.body.garantie == '') {
                            res.json({ success: false, message: 'Alege optiune Garantie' });
                        }

                        else if (req.body.cutie == null || req.body.cutie == '') {
                            res.json({ success: false, message: 'Alege optiune Cutie' });
                        }

                        else if (req.body.baterie == null || req.body.baterie == '') {
                            res.json({ success: false, message: 'Alege optiune Baterie' });
                        }

                        else if (req.body.mulaj == null || req.body.mulaj == '') {
                            res.json({ success: false, message: 'Alege optiune Mulaj' });
                        }

                        else if (req.body.oliva == null || req.body.oliva == '') {
                            res.json({ success: false, message: 'Alege optiune Oliva' });
                        }

                        else if (req.body.u_stanga == null || req.body.u_stanga == '') {
                            res.json({ success: false, message: 'Alege optiune Urechea Stanga' });
                        }

                        else if (req.body.u_dreapta == null || req.body.u_dreapta == '') {
                            res.json({ success: false, message: 'Alege optiune Urechea Dreapta' });
                        }
                        else {

                            service.save(function (err) {
                                if (err) {
                                    res.json({ succes: false, message: err });
                                } else {
                                    res.json({ success: true, message: 'Service adaugat cu succes.', comanda_service: comanda_service.nr_comanda_service });
                                }
                            });

                        }
                    }

                });
            }
        });

    });

    // Oliva Reg. Route 
    // -------------------------------------------------------------------------------------------------

    router.post('/oliva', function (req, res) {
        Oliva.findOne({}, {}, { sort: { 'nr_comanda_oliva': -1 } }, function (err, comanda_oliva) {

            var token = req.body.token || req.body.query || req.headers['x-access-token'];
            if (token) {
                jwt.verify(token, secret, function (err, decoded) {
                    if (err) {
                        res.json({ success: false, message: 'Token invalid' });
                    } else {
                        var oliva = new Oliva();
                        oliva.cabinet = decoded.username;
                        oliva.pacient_id = req.body.oliva_pacient_id;
                        oliva.nume = req.body.nume;
                        oliva.telefon = req.body.telefon;
                        oliva.oliva_inregistrat_pacient = req.body.oliva_inregistrat_pacient;
                        oliva.model_aparat = req.body.model_aparat;
                        oliva.ureche_protezata = req.body.ureche_protezata;
                        oliva.material_oliva = req.body.material_oliva;
                        oliva.tip_oliva = req.body.tip_oliva;
                        oliva.vent_oliva = req.body.vent_oliva;
                        oliva.pret_lista = req.body.pret_lista;
                        oliva.pret_final = req.body.pret_final;
                        oliva.avans = req.body.avans;
                        oliva.data_avans = new moment().format('DD/MM/YYYY');
                        oliva.rest_plata = req.body.rest_plata;
                        oliva.observatii_oliva = req.body.observatii_oliva;
                        oliva.oliva_taxa_urgenta = req.body.oliva_taxa_urgenta;
                        oliva.predat_pacient = '-';
                        oliva.iesit_cabinet = '-';
                        oliva.intrat_cabinet = '-';
                        oliva.completare_cabinet = '-';


                        oliva.log_sosit = '-';
                        oliva.log_plecat = '-';
                        oliva.log_preluat = '-';
                        oliva.log_trimis = '-';

                        oliva.plastie_sosit = '-';
                        oliva.plastie_plecat = '-';
                        oliva.finalizat_oliva = '-';
                        oliva.observatii_plastie = req.body.observatii_plastie;;


                        if (req.body.model_aparat == null || req.body.model_aparat == '') {
                            res.json({ success: false, message: 'Completeaza Model Aparat' });
                        }

                        else if (req.body.ureche_protezata == null || req.body.ureche_protezata == '') {
                            res.json({ success: false, message: 'Completeaza Ureche Protezata' });
                        }

                        else if (req.body.material_oliva == null || req.body.material_oliva == '') {
                            res.json({ success: false, message: 'Completeaza Material Oliva' });
                        }

                        else if (req.body.tip_oliva == null || req.body.tip_oliva == '') {
                            res.json({ success: false, message: 'Completeaza Tip Oliva' });
                        }

                        else if (req.body.vent_oliva == null || req.body.vent_oliva == '') {
                            res.json({ success: false, message: 'Completeaza Vent' });
                        }

                        else if (req.body.pret_final == null || req.body.pret_final == '') {
                            res.json({ success: false, message: 'Completeaza Pret Final' });
                        }


                        else {

                            oliva.save(function (err) {
                                if (err) {
                                    res.json({ succes: false, message: err });
                                } else {
                                    res.json({ success: true, message: 'Comanda Oliva adaugata cu succes.', comanda_oliva: comanda_oliva.nr_comanda_oliva });
                                }
                            });

                        }
                    }

                });
            }
        });

    });

    // ITE Reg. Route 
    // -------------------------------------------------------------------------------------------------

    router.post('/ite', function (req, res) {
        Ite.findOne({}, {}, { sort: { 'nr_comanda_ite': -1 } }, function (err, comanda_ite) {
            var token = req.body.token || req.body.query || req.headers['x-access-token'];
            if (token) {
                jwt.verify(token, secret, function (err, decoded) {
                    if (err) {
                        res.json({ success: false, message: 'Token invalid' });
                    } else {
                        var ite = new Ite();
                        ite.cabinet = decoded.username;
                        ite.pacient_id = req.body.ite_pacient_id;
                        ite.nume = req.body.nume;
                        ite.telefon = req.body.telefon;
                        ite.ite_inregistrat_pacient = req.body.ite_inregistrat_pacient;
                        ite.model_aparat = req.body.model_aparat;
                        ite.ureche_protezata = req.body.ureche_protezata;
                        ite.carcasa_ite = req.body.carcasa_ite;
                        ite.culoare_carcasa = req.body.culoare_carcasa;
                        ite.vent_ite = req.body.vent_ite;
                        ite.pret_lista = req.body.pret_lista;
                        ite.pret_final = req.body.pret_final;
                        ite.avans = req.body.avans;
                        ite.data_avans = new moment().format('DD/MM/YYYY');
                        ite.rest_plata = req.body.rest_plata;
                        ite.observatii_ite = req.body.observatii_ite;
                        ite.ite_taxa_urgenta = req.body.ite_taxa_urgenta;
                        ite.predat_pacient = '-';
                        ite.iesit_cabinet = '-';
                        ite.intrat_cabinet = '-';
                        ite.completare_cabinet = '-';


                        ite.log_sosit = '-';
                        ite.log_plecat = '-';
                        ite.log_preluat = '-';
                        ite.log_trimis = '-';

                        ite.asamblare_sosit = '-';
                        ite.asamblare_plecat = '-';
                        ite.finalizat_ite = '-';
                        ite.observatii_plastie = req.body.observatii_plastie;;


                        if (req.body.model_aparat == null || req.body.model_aparat == '') {
                            res.json({ success: false, message: 'Completeaza Model Aparat' });
                        }

                        else if (req.body.ureche_protezata == null || req.body.ureche_protezata == '') {
                            res.json({ success: false, message: 'Completeaza Ureche Protezata' });
                        }

                        else if (req.body.carcasa_ite == null || req.body.carcasa_ite == '') {
                            res.json({ success: false, message: 'Completeaza Carcasa ITE' });
                        }

                        else if (req.body.vent_ite == null || req.body.vent_ite == '') {
                            res.json({ success: false, message: 'Completeaza Vent' });
                        }

                        else if (req.body.pret_final == null || req.body.pret_final == '') {
                            res.json({ success: false, message: 'Completeaza Pret Final' });
                        }


                        else {

                            ite.save(function (err) {
                                if (err) {
                                    res.json({ succes: false, message: err });
                                } else {
                                    res.json({ success: true, message: 'Comanda ITE adaugata cu succes.', comanda_ite: comanda_ite.nr_comanda_ite });
                                }
                            });

                        }
                    }

                });
            }
        });

    });


    // User Reg. Route
    // -------------------------------------------------------------------------------------------------

    router.post('/users', function (req, res) {
        var user = new User();

        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user.name = req.body.name;
        user.temporarytoken = jwt.sign({ username: user.username, email: user.email }, secret);

        if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '' || req.body.name == null || req.body.name == '') {
            res.json({ success: false, message: 'Campurile username, email si parola sunt obligatorii' });

        } else {
            user.save(function (err) {
                if (err) {

                    if (err.errors != null) {
                        if (err.errors.name) {
                            res.json({ success: false, message: err.errors.name.message });
                        } else if (err.errors.email) {
                            res.json({ success: false, message: err.errors.email.message });
                        } else if (err.errors.username) {
                            res.json({ success: false, message: err.errors.username.message });
                        } if (err.errors.password) {
                            res.json({ success: false, message: err.errors.password.message });
                        } else {
                            res.json({ success: false, message: err });
                        }
                    } else if (err) {
                        if (err.code == 11000) {
                            if (err.errmsg[61] == "u") {
                                res.json({ success: false, message: 'Username deja exista' });
                            } else if (err.errmsg[61] == "e") {
                                res.json({ success: false, message: 'Adresa email deja exista' });
                            }
                        } else {
                            res.json({ succes: false, message: err });
                        }
                    }
                } else {
                    res.json({ success: true, message: 'Utilizator Adaugat!' });
                }
            });
        }
    });

    // User Login Route ----------------------------------------------
    router.post('/authenticate', function (req, res) {
        User.findOne({ username: req.body.username }).select('email username password').exec(function (err, user) {
            if (err) {
                throw err;
            } else {
                if (!user) {
                    res.json({ success: false, message: 'Nu s-a putut autentifica utilizatorul' });
                } else if (user) {
                    if (!req.body.password) {
                        res.json({ success: false, message: 'Parola trebuie introdusa' });
                    } else {
                        var validPassword = user.comparePassword(req.body.password);
                        if (!validPassword) {
                            res.json({ success: false, message: 'Parola introdusa nu este corecta' });
                        } else {
                            var token = jwt.sign({ username: user.username, email: user.email }, secret);
                            res.json({ success: true, message: 'Utilizator autentificat', token: token });
                        }
                    }
                }
            }
        });

    });
    router.use(function (req, res, next) {

        var token = req.body.token || req.body.query || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    res.json({ success: false, message: 'Token invalid' });
                } else {
                    req.decoded = decoded;

                    next();
                }
            });
        } else {
            res.json({ success: false, message: 'No token provided' });
        }

    });


    router.post('/me', function (req, res) {
        res.send(req.decoded);
    });


    router.put('/api/management/:user', function (req, res, next) {
        var token = req.headers['x-access-token'] || req.session.token;

        User.findById(req.params._id, function (err, user) {
            if (err) {
                res.send(err);
            } else if (user.token != token) {
                res.json({ sucess: false, message: 'User not same as authenticated user.' });
            } else {

                if (req.body.name) user.name = req.body.name;
                if (req.body.username) user.username = req.body.username;

                user.save(function (err) {
                    if (err) res.send(err);

                    res.json({ message: 'User updated.' });
                });
            }
        });
    });

    //Renew Token ----------------------------------------------
    router.get('/renewToken/:username', function (req, res) {
        User.findOne({ username: req.params.username }).select().exec(function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: 'No user was found' });
            } else {
                var newToken = jwt.sign({ username: user.username, email: user.email, name: user.name }, secret, { expiresIn: '24H' });
                res.json({ success: true, token: newToken });
            }
        });
    });

    //Permissions ----------------------------------------------
    router.get('/permission', function (req, res) {
        User.findOne({ username: req.decoded.username }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: 'No user was found' });
            } else {
                res.json({ success: true, permission: user.permission });
            }

        });
    });

    //Users ----------------------------------------------
    router.get('/manangement', function (req, res) {
        User.find({}, function (err, users) {
            if (err) throw err;
            User.findOne({ username: req.decoded.username }, function (err, mainUser) {
                if (err) throw err;
                if (!mainUser) {
                    res.json({ success: false, message: 'No user found' });
                } else {
                    if (mainUser.permission === 'admin' || mainUser.permission === 'moderator' || mainUser.permission === 'user' || mainUser.permission === 'logistic' || mainUser.permission === 'service') {
                        if (!users) {
                            res.json({ success: false, message: 'Users not found' });
                        } else {
                            res.json({ success: true, users: users, permission: mainUser.permission, currentUser: mainUser });
                        }
                    } else {
                        res.json({ success: false, message: 'Insufficient Permissions' });
                    }
                }
            });
        });
    });

    router.get('/profilCabinet/:username', function (req, res) {
        User.findOne({ username: req.decoded.username }, function (err, mainUser) {
            if (err) throw err;
            if (!mainUser) {
                res.json({ success: false, message: 'No user was found' });
            } else {
                Pacient.find({ "cabinet": { "$regex": mainUser.username } }).select('data_inregistrare nume denumire_aparat defectiune_reclamata iesit_cabinet finalizat_reparatie intrat_cabinet predat_pacient').exec(function (err, pacienti) {
                    if (err) throw err;
                    if (!pacienti) {
                        res.json({ success: false, message: 'Nu s-au gasit pacienti' });
                    } else {
                        res.json({ success: true, pacienti: pacienti });

                    }

                });
            }
        });
    });

    router.get('/registruServiceCabinet/:username', function (req, res) {
        User.findOne({ username: req.decoded.username }, function (err, mainUser) {
            if (err) throw err;
            if (!mainUser) {
                res.json({ success: false, message: 'No user was found' });
            } else {
                Service.find({ "cabinet": { "$regex": mainUser.username } }).select('nr_comanda_service data_inregistrare service_inregistrat_pacient denumire_aparat defectiune_reclamata iesit_cabinet serv_sosit serv_plecat predat_pacient').exec(function (err, service) {
                    if (err) throw err;
                    if (!service) {
                        res.json({ success: false, message: 'Nu s-au gasit pacienti' });
                    } else {
                        res.json({ success: true, service: service });
                    }

                });
            }
        });
    });

    router.get('/registruOliveCabinet/:username', function (req, res) {
        User.findOne({ username: req.decoded.username }, function (err, mainUser) {
            if (err) throw err;
            if (!mainUser) {
                res.json({ success: false, message: 'No user was found' });
            } else {
                Oliva.find({ "cabinet": { "$regex": mainUser.username } }).select('nr_comanda_oliva data_inregistrare oliva_inregistrat_pacient material_oliva tip_oliva iesit_cabinet plastie_sosit plastie_plecat predat_pacient').exec(function (err, olive) {
                    if (err) throw err;
                    if (!olive) {
                        res.json({ success: false, message: 'Nu s-au gasit olive' });
                    } else {
                        res.json({ success: true, olive: olive });
                    }

                });
            }
        });
    });

    router.get('/registruIteCabinet/:username', function (req, res) {
        User.findOne({ username: req.decoded.username }, function (err, mainUser) {
            if (err) throw err;
            if (!mainUser) {
                res.json({ success: false, message: 'No user was found' });
            } else {
                Ite.find({ "cabinet": { "$regex": mainUser.username } }).select('nr_comanda_ite data_inregistrare ite_inregistrat_pacient model_aparat carcasa_ite iesit_cabinet asamblare_sosit asamblare_plecat predat_pacient').exec(function (err, ite) {
                    if (err) throw err;
                    if (!ite) {
                        res.json({ success: false, message: 'Nu s-au gasit olive' });
                    } else {
                        res.json({ success: true, ite: ite });
                    }

                });
            }
        });
    });


    router.get('/profilService/:username', function (req, res) {
        User.findOne({ username: req.decoded.username }, function (err, mainUser) {

            if (err) throw err;
            if (!mainUser) {
                res.json({ success: false, message: 'No user was found' });
            } else {
                Service.find({ "cabinet": { "$regex": mainUser.username } }).select('nr_comanda_service data_inregistrare service_inregistrat_pacient denumire_aparat defectiune_reclamata serv_sosit finalizat_reparatie serv_plecat').exec(function (err, service) {
                    if (err) throw err;
                    if (!service) {
                        res.json({ success: false, message: 'Nu s-au gasit service-uri' });
                    } else {
                        res.json({ success: true, service: service });
                    }

                });
            }
        });
    });

    router.get('/registruPiese', function (req, res) {
        Service.find({}).select('finalizat_reparatie cabinet piese_inlocuite cod_componente').exec(function (err, service) {
            if (err) throw err;
            if (!service) {
                res.json({ success: false, message: 'Nu s-au gasit service-uri' });
            } else {
                res.json({ success: true, service: service });
            }

        });
    });

    router.get('/registruLogistic_service', function (req, res) {
        Service.find({}).select('nr_comanda_service cabinet data_inregistrare log_sosit log_plecat log_preluat log_trimis service_inregistrat_pacient denumire_aparat').exec(function (err, service) {
            if (err) throw err;
            if (!service) {
                res.json({ success: false, message: 'Nu s-au gasit service-uri' });
            } else {
                res.json({ success: true, service: service });
            }

        });
    });

    router.get('/registruLogistic_olive', function (req, res) {
        Oliva.find({}).select('nr_comanda_oliva cabinet data_inregistrare oliva_inregistrat_pacient log_sosit log_plecat log_preluat log_trimis material_oliva').exec(function (err, oliva) {
            if (err) throw err;
            if (!oliva) {
                res.json({ success: false, message: 'Nu s-au gasit comenzi olive' });
            } else {
                res.json({ success: true, oliva: oliva });
            }

        });
    });

    router.get('/registruLogistic_ite', function (req, res) {
        Ite.find({}).select('nr_comanda_ite cabinet data_inregistrare log_sosit log_plecat log_preluat log_trimis ite_inregistrat_pacient model_aparat').exec(function (err, ite) {
            if (err) throw err;
            if (!ite) {
                res.json({ success: false, message: 'Nu s-au gasit comenzi ITE' });
            } else {
                res.json({ success: true, ite: ite });
            }

        });
    });


    router.get('/profilPacient/:id', function (req, res) {
        var pacID = req.params.id;
        var username = req.decoded.username;

        Pacient.findById({ _id: pacID }).select('_id nume').exec(function (err, pacient) {
            if (err) throw err;
            Oliva.find({ "pacient_id": { "$regex": pacient._id }, "cabinet": { "$regex": username } }, function (err, oliva) {
                if (err) throw err;
                Ite.find({ "pacient_id": { "$regex": pacient._id }, "cabinet": { "$regex": username } }, function (err, ite) {
                    if (err) throw err;

                    Service.find({ "pacient_id": { "$regex": pacient._id }, "cabinet": { "$regex": username } }).select('nr_comanda_service data_inregistrare denumire_aparat defectiune_reclamata serv_sosit finalizat_reparatie serv_plecat predat_pacient').exec(function (err, service) {
                        if (err) throw err;
                        if (!service || !oliva) {
                            res.json({ success: false, message: 'Nu s-au gasit service-uri sau olive' });
                        }
                        else {

                            res.json({ success: true, service: service, oliva: oliva, ite: ite });
                        }
                    });

                });
            });
        });
    });


    router.get('/registruService', function (req, res) {
        Service.find({}).select('nr_comanda_service cabinet data_inregistrare service_inregistrat_pacient denumire_aparat defectiune_reclamata serv_sosit finalizat_reparatie serv_plecat').exec(function (err, service) {
            if (err) throw err;
            if (!service) {
                res.json({ success: false, message: 'Nu s-au gasit service-uri' });
            } else {
                res.json({ success: true, service: service });
            }
        });
    });

    router.get('/registruOlive', function (req, res) {
        Oliva.find({}).select('nr_comanda_oliva cabinet data_inregistrare oliva_inregistrat_pacient material_oliva tip_oliva plastie_sosit finalizat_oliva plastie_plecat').exec(function (err, oliva) {
            if (err) throw err;
            if (!oliva) {
                res.json({ success: false, message: 'Nu s-au gasit comenzi olive' });
            } else {
                res.json({ success: true, oliva: oliva });
            }
        });
    });

    router.get('/registruIte', function (req, res) {
        Ite.find({}).select('nr_comanda_ite cabinet data_inregistrare ite_inregistrat_pacient model_aparat carcasa_ite asamblare_sosit finalizat_ite asamblare_plecat').exec(function (err, ite) {
            if (err) throw err;
            if (!ite) {
                res.json({ success: false, message: 'Nu s-au gasit comenzi ITE' });
            } else {
                res.json({ success: true, ite: ite });
            }
        });
    });


    // Get Pacient for Update ----------------------------------------------   
    router.get('/editPacient/:id', function (req, res) {
        var editPacient = req.params.id;
        Pacient.findOne({ _id: editPacient }, function (err, pacient) {
            if (err) throw err;
            if (!pacient) {
                res.json({ success: false, message: 'No pacient found' });

            } else {
                res.json({ success: true, pacient: pacient });
            }
        });
    });
    router.get('/service/:id', function (req, res) {
        var idService = req.params.id;
        Service.findOne({ _id: idService }, function (err, service) {
            if (err) throw err;
            if (!service) {
                res.json({ success: false, message: 'No service found' });

            } else {
                res.json({ success: true, service: service });

            }
        });
    });

    router.get('/oliva/:id', function (req, res) {
        var idOliva = req.params.id;
        Oliva.findOne({ _id: idOliva }, function (err, oliva) {
            if (err) throw err;
            if (!oliva) {
                res.json({ success: false, message: 'No oliva found' });

            } else {
                res.json({ success: true, oliva: oliva });

            }
        });
    });

    router.get('/ite/:id', function (req, res) {
        var idIte = req.params.id;
        Ite.findOne({ _id: idIte }, function (err, ite) {
            if (err) throw err;
            if (!ite) {
                res.json({ success: false, message: 'No ite found' });

            } else {
                res.json({ success: true, ite: ite });

            }
        });
    });


    // Update Pacient 
    //--------------------------------------------------------------------------------
    router.put('/editPacient', function (req, res) {
        var editPacient = req.body._id;

        if (req.body.telefon) var newPacient_Telefon = req.body.telefon;
        if (req.body.varsta) var newPacient_Varsta = req.body.varsta;
        if (req.body.adresa) var newPacient_Adresa = req.body.adresa;

        User.findOne({ username: req.decoded.username }, function (err, mainUser) {


            if (newPacient_Adresa) {
                Pacient.findOne({ _id: editPacient }, function (err, pacient) {
                    if (err) throw err;
                    if (pacient.cabinet !== mainUser.username) {
                        res.json({ success: false, message: 'Nu esti utilizatorul care a inregistrat acest service.' });
                    } else {
                        pacient.adresa = newPacient_Adresa;
                        pacient.save(function (err) {
                            if (err) {
                                res.json({ success: false, message: 'Nu s-a putut salva' });
                            } else {
                                res.json({ success: true, message: 'Adresa modificata cu succes. Se incarca...' });
                            }
                        });
                    }
                });
            }

            if (newPacient_Telefon) {
                Pacient.findOne({ _id: editPacient }, function (err, pacient) {
                    if (err) throw err;
                    if (pacient.cabinet !== mainUser.username) {
                        res.json({ success: false, message: 'Nu esti utilizatorul care a inregistrat acest service.' });
                    } else {
                        pacient.telefon = newPacient_Telefon;
                        pacient.save(function (err) {
                            if (err) {
                                res.json({ success: false, message: 'Nu s-a putut salva' });
                            } else {
                                res.json({ success: true, message: 'Telefon modificat cu succes. Se incarca...' });
                            }
                        });
                    }
                });
            }

            if (newPacient_Varsta) {
                Pacient.findOne({ _id: editPacient }, function (err, pacient) {
                    if (err) throw err;
                    if (pacient.cabinet !== mainUser.username) {
                        res.json({ success: false, message: 'Nu esti utilizatorul care a inregistrat acest service.' });
                    } else {
                        pacient.varsta = newPacient_Varsta;
                        pacient.save(function (err) {
                            if (err) {
                                res.json({ success: false, message: 'Nu s-a putut salva' });
                            } else {
                                res.json({ success: true, message: 'Varsta modificata cu succes. Se incarca...' });
                            }
                        });
                    }
                });
            }

        });

    });


    // Update Service 
    //--------------------------------------------------------------------------------

    router.put('/editService', function (req, res) {
        var editService = req.body._id;
        User.findOne({ username: req.decoded.username }, function (err, mainUser) {

            //      Cabinet 
            //-----------------------------------------------------------------------------------
            if (req.body.completare_cabinet) var newCompletare_Cabinet = req.body.completare_cabinet;
            if (req.body.iesit_cabinet) var newIesit_Cabinet = new moment().format('DD/MM/YYYY');
            if (req.body.intrat_cabinet) var newIntrat_Cabinet = new moment().format('DD/MM/YYYY');
            if (req.body.predat_pacient) var newPredat_Pacient = new moment().format('DD/MM/YYYY');

            //      Logistic 
            //-----------------------------------------------------------------------------------

            if (req.body.log_sosit) var newLog_Sosit = new moment().format('DD/MM/YYYY');
            if (req.body.log_plecat) var newLog_Plecat = new moment().format('DD/MM/YYYY');
            if (req.body.log_preluat) var newLog_Preluat = new moment().format('DD/MM/YYYY');
            if (req.body.log_trimis) var newLog_Trimis = new moment().format('DD/MM/YYYY');

            //      Service
            //-----------------------------------------------------------------------------------

            if (req.body.serv_sosit) var newServ_Sosit = new moment().format('DD/MM/YYYY');
            if (req.body.serv_plecat) var newServ_Plecat = new moment().format('DD/MM/YYYY');
            if (req.body.observatii_service) var newObservatii_Service = req.body.observatii_service;
            if (req.body.constatare_service) var newConstatare_Service = req.body.constatare_service;
            if (req.body.operatiuni_efectuate) var newOperatiuni_Efectuate = req.body.operatiuni_efectuate;
            if (req.body.piese_inlocuite) var newPiese_Inlocuite = req.body.piese_inlocuite;
            if (req.body.cod_componente) var newCod_Componente = req.body.cod_componente;
            if (req.body.cost_reparatie) var newCost_Reparatie = req.body.cost_reparatie;
            if (req.body.executant_reparatie) var newExecutant_Reparatie = req.body.executant_reparatie;
            if (req.body.taxa_constatare) var newTaxa_Constatare = req.body.taxa_constatare;
            if (req.body.taxa_urgenta) var newTaxa_Urgenta = req.body.taxa_urgenta;
            if (req.body.garantie_serv) var newGarantie_Serv = req.body.garantie_serv;
            if (req.body.finalizat_reparatie) var newFinalizat_Reparatie = new moment().format('DD/MM/YYYY');


            //      1.Cabinet ----------------------------------------------
            if (newIesit_Cabinet) {
                Service.findOne({ _id: editService }, function (err, service) {
                    if (err) throw err;
                    if (service.cabinet !== mainUser.username) {
                        res.json({ success: false, message: 'Nu esti utilizatorul care a inregistrat acest service.' });
                    } else {

                        if (!service || service.iesit_cabinet !== '-') {
                            res.json({ success: false, message: 'Data a fost deja adaugata, modificarile nu sunt salvate' });
                        }
                        else {
                            service.iesit_cabinet = newIesit_Cabinet;
                            service.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                } else {
                                    res.json({ success: true, message: 'Data adaugata cu succes' });
                                }
                            });
                        }
                    }
                });
            }

            if (newIntrat_Cabinet) {
                Service.findOne({ _id: editService }, function (err, service) {
                    if (err) throw err;
                    if (service.cabinet !== mainUser.username) {
                        res.json({ success: false, message: 'Nu esti utilizatorul care a inregistrat acest service.' });
                    } else {

                        if (!service || service.intrat_cabinet !== '-') {
                            res.json({ success: false, message: 'Data a fost deja adaugata, modificarile nu sunt salvate' });
                        }
                        else {
                            service.intrat_cabinet = newIntrat_Cabinet;
                            service.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                } else {
                                    res.json({ success: true, message: 'Data adaugata cu succes' });
                                }
                            });
                        }
                    }
                });
            }

            if (newPredat_Pacient) {
                Service.findOne({ _id: editService }, function (err, service) {
                    if (err) throw err;
                    if (service.cabinet !== mainUser.username) {
                        res.json({ success: false, message: 'Nu esti utilizatorul care a inregistrat acest service.' });
                    } else {

                        if (!service || service.predat_pacient !== '-') {
                            res.json({ success: false, message: 'Data a fost deja adaugata, modificarile nu sunt salvate' });
                        }
                        else {
                            service.predat_pacient = newPredat_Pacient;
                            service.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                } else {
                                    res.json({ success: true, message: 'Data adaugata cu succes' });
                                }
                            });
                        }
                    }
                });
            }


            if (newCompletare_Cabinet) {
                Service.findOne({ _id: editService }, function (err, service) {
                    if (err) throw err;
                    if (service.cabinet !== mainUser.username) {
                        res.json({ success: false, message: 'Nu esti utilizatorul care a inregistrat acest service.' });
                    }
                    else {
                        service.completare_cabinet = newCompletare_Cabinet;
                        service.save(function (err) {
                            if (err) {
                                res.json({ success: false, message: 'Nu s-a putut salva' });
                            } else {
                                res.json({ success: true, message: 'Completare adaugata cu succes' });
                            }
                        });
                    }
                });
            }



            // //      2.Logistic ----------------------------------------------

            if (newLog_Sosit) {
                Service.findOne({ _id: editService }, function (err, service) {
                    if (err) throw err;
                    if (mainUser.permission !== 'logistic') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Logistic.' });
                    } else {

                        if (!service || service.log_sosit !== '-') {
                            res.json({ success: false, message: 'Data a fost deja adaugata, modificarile nu sunt salvate' });
                        }
                        else {
                            service.log_sosit = newLog_Sosit;
                            service.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                } else {
                                    res.json({ success: true, message: 'Data adaugata cu succes' });
                                }
                            });
                        }
                    }
                });
            }

            if (newLog_Plecat) {
                Service.findOne({ _id: editService }, function (err, service) {
                    if (err) throw err;
                    if (mainUser.permission !== 'logistic') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Logistic.' });
                    } else {

                        if (!service || service.log_plecat !== '-') {
                            res.json({ success: false, message: 'Data a fost deja adaugata, modificarile nu sunt salvate' });
                        }
                        else {
                            service.log_plecat = newLog_Plecat;
                            service.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                } else {
                                    res.json({ success: true, message: 'Data adaugata cu succes' });
                                }
                            });
                        }
                    }
                });
            }

            if (newLog_Preluat) {
                Service.findOne({ _id: editService }, function (err, service) {
                    if (err) throw err;
                    if (mainUser.permission !== 'logistic') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Logistic.' });
                    } else {

                        if (!service || service.log_preluat !== '-') {
                            res.json({ success: false, message: 'Data a fost deja adaugata, modificarile nu sunt salvate' });
                        }
                        else {
                            service.log_preluat = newLog_Preluat;
                            service.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                } else {
                                    res.json({ success: true, message: 'Data adaugata cu succes' });
                                }
                            });
                        }
                    }
                });
            }

            if (newLog_Trimis) {
                Service.findOne({ _id: editService }, function (err, service) {
                    if (err) throw err;
                    if (mainUser.permission !== 'logistic') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Logistic.' });
                    } else {

                        if (!service || service.log_trimis !== '-') {
                            res.json({ success: false, message: 'Data a fost deja adaugata, modificarile nu sunt salvate' });
                        }
                        else {
                            service.log_trimis = newLog_Trimis;
                            service.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                } else {
                                    res.json({ success: true, message: 'Data adaugata cu succes' });
                                }
                            });
                        }
                    }
                });
            }


            // //      3.Service ----------------------------------------------

            if (newFinalizat_Reparatie) {
                Service.findOne({ _id: editService }, function (err, service) {
                    if (err) throw err;
                    if (mainUser.permission !== 'service') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Service.' });
                    } else {

                        if (!service || service.finalizat_reparatie !== '-') {
                            res.json({ success: false, message: 'Data a fost deja adaugata, modificarile nu sunt salvate' });
                        }
                        else {
                            service.finalizat_reparatie = newFinalizat_Reparatie;
                            service.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                } else {
                                    res.json({ success: true, message: 'Data adaugata cu succes' });
                                }
                            });
                        }
                    }
                });
            }

            if (newServ_Plecat) {
                Service.findOne({ _id: editService }, function (err, service) {
                    if (err) throw err;
                    if (mainUser.permission !== 'service') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Service.' });
                    } else {

                        if (!service || service.serv_plecat !== '-') {
                            res.json({ success: false, message: 'Data a fost deja adaugata, modificarile nu sunt salvate' });
                        }
                        else {
                            service.serv_plecat = newServ_Plecat;
                            service.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                } else {
                                    res.json({ success: true, message: 'Data adaugata cu succes' });
                                }
                            });
                        }
                    }
                });
            }

            if (newServ_Sosit) {
                Service.findOne({ _id: editService }, function (err, service) {
                    if (err) throw err;
                    if (mainUser.permission !== 'service') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Service.' });
                    } else {

                        if (!service || service.serv_sosit !== '-') {
                            res.json({ success: false, message: 'Data a fost deja adaugata, modificarile nu sunt salvate' });
                        }
                        else {
                            service.serv_sosit = newServ_Sosit;
                            service.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                } else {
                                    res.json({ success: true, message: 'Data adaugata cu succes' });
                                }
                            });
                        }
                    }
                });
            }

            if (newConstatare_Service) {
                Service.findOne({ _id: editService }, function (err, service) {
                    if (err) throw err;
                    if (mainUser.permission !== 'service') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Service.' });
                    }
                    else {
                        service.constatare_service = newConstatare_Service;
                        service.save(function (err) {
                            if (err) {
                                res.json({ success: false, message: 'Nu s-a putut salva' });
                            } else {
                                res.json({ success: true, message: 'Completare adaugata cu succes' });
                            }
                        });
                    }
                });
            }

            if (newOperatiuni_Efectuate) {
                Service.findOne({ _id: editService }, function (err, service) {
                    if (err) throw err;
                    if (mainUser.permission !== 'service') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Service.' });
                    }
                    else {
                        service.operatiuni_efectuate = newOperatiuni_Efectuate;
                        service.save(function (err) {
                            if (err) {
                                res.json({ success: false, message: 'Nu s-a putut salva' });
                            } else {
                                res.json({ success: true, message: 'Completare adaugata cu succes' });
                            }
                        });
                    }
                });
            }

            if (newPiese_Inlocuite) {
                Service.findOne({ _id: editService }, function (err, service) {
                    if (err) throw err;
                    if (mainUser.permission !== 'service') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Service.' });
                    }
                    else {
                        service.piese_inlocuite = newPiese_Inlocuite;
                        service.save(function (err) {
                            if (err) {
                                res.json({ success: false, message: 'Nu s-a putut salva' });
                            } else {
                                res.json({ success: true, message: 'Completare adaugata cu succes' });
                            }
                        });
                    }
                });
            }

            if (newCod_Componente) {
                Service.findOne({ _id: editService }, function (err, service) {
                    if (err) throw err;
                    if (mainUser.permission !== 'service') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Service.' });
                    }
                    else {
                        service.cod_componente = newCod_Componente;
                        service.save(function (err) {
                            if (err) {
                                res.json({ success: false, message: 'Nu s-a putut salva' });
                            } else {
                                res.json({ success: true, message: 'Completare adaugata cu succes' });
                            }
                        });
                    }
                });
            }

            if (newCost_Reparatie) {
                Service.findOne({ _id: editService }, function (err, service) {
                    if (err) throw err;
                    if (mainUser.permission !== 'service') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Service.' });
                    }
                    else {
                        service.cost_reparatie = newCost_Reparatie;
                        service.save(function (err) {
                            if (err) {
                                res.json({ success: false, message: 'Nu s-a putut salva' });
                            } else {
                                res.json({ success: true, message: 'Completare adaugata cu succes' });
                            }
                        });
                    }
                });
            }

            if (newExecutant_Reparatie) {
                Service.findOne({ _id: editService }, function (err, service) {
                    if (err) throw err;
                    if (mainUser.permission !== 'service') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Service.' });
                    }
                    else {
                        service.executant_reparatie = newExecutant_Reparatie;
                        service.save(function (err) {
                            if (err) {
                                res.json({ success: false, message: 'Nu s-a putut salva' });
                            } else {
                                res.json({ success: true, message: 'Completare adaugata cu succes' });
                            }
                        });
                    }
                });
            }

            if (newObservatii_Service) {
                Service.findOne({ _id: editService }, function (err, service) {
                    if (err) throw err;
                    if (mainUser.permission !== 'service') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Service.' });
                    }
                    else {
                        service.observatii_service = newObservatii_Service;
                        service.save(function (err) {
                            if (err) {
                                res.json({ success: false, message: 'Nu s-a putut salva' });
                            } else {
                                res.json({ success: true, message: 'Completare adaugata cu succes' });
                            }
                        });
                    }
                });
            }

            if (newTaxa_Constatare) {
                Service.findOne({ _id: editService }, function (err, service) {
                    if (err) throw err;
                    if (mainUser.permission !== 'service') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Service.' });
                    }
                    else {
                        service.taxa_constatare = newTaxa_Constatare;
                        service.save(function (err) {
                            if (err) {
                                res.json({ success: false, message: 'Nu s-a putut salva' });
                            } else {
                                res.json({ success: true, message: 'Completare adaugata cu succes' });
                            }
                        });
                    }
                });
            }

            if (newGarantie_Serv) {
                Service.findOne({ _id: editService }, function (err, service) {
                    if (err) throw err;
                    if (mainUser.permission !== 'service') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Service.' });
                    }
                    else {
                        service.garantie_serv = newGarantie_Serv;
                        service.save(function (err) {
                            if (err) {
                                res.json({ success: false, message: 'Nu s-a putut salva' });
                            } else {
                                res.json({ success: true, message: 'Completare adaugata cu succes' });
                            }
                        });
                    }
                });
            }

            if (newTaxa_Urgenta) {
                Service.findOne({ _id: editService }, function (err, service) {
                    if (err) throw err;
                    if (mainUser.permission !== 'service') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Service.' });
                    }
                    else {
                        service.taxa_urgenta = newTaxa_Urgenta;
                        service.save(function (err) {
                            if (err) {
                                res.json({ success: false, message: 'Nu s-a putut salva' });
                            } else {
                                res.json({ success: true, message: 'Completare adaugata cu succes' });
                            }
                        });
                    }
                });
            }

        });

    });



    // Update Oliva 
    //--------------------------------------------------------------------------------

    router.put('/editOliva', function (req, res) {
        var editOliva = req.body._id;
        User.findOne({ username: req.decoded.username }, function (err, mainUser) {

            //      Cabinet 
            //-----------------------------------------------------------------------------------
            if (req.body.completare_cabinet) var newCompletare_Cabinet = req.body.completare_cabinet;
            if (req.body.iesit_cabinet) var newIesit_Cabinet = new moment().format('DD/MM/YYYY');
            if (req.body.intrat_cabinet) var newIntrat_Cabinet = new moment().format('DD/MM/YYYY');
            if (req.body.predat_pacient) var newPredat_Pacient = new moment().format('DD/MM/YYYY');

            //      Logistic 
            //-----------------------------------------------------------------------------------

            if (req.body.log_sosit) var newLog_Sosit = new moment().format('DD/MM/YYYY');
            if (req.body.log_plecat) var newLog_Plecat = new moment().format('DD/MM/YYYY');
            if (req.body.log_preluat) var newLog_Preluat = new moment().format('DD/MM/YYYY');
            if (req.body.log_trimis) var newLog_Trimis = new moment().format('DD/MM/YYYY');

            //      Plastie
            //-----------------------------------------------------------------------------------

            if (req.body.plastie_sosit) var newPlastie_Sosit = new moment().format('DD/MM/YYYY');
            if (req.body.plastie_plecat) var newPlastie_Plecat = new moment().format('DD/MM/YYYY');
            if (req.body.observatii_plastie) var newObservatii_Plastie = req.body.observatii_plastie;
            if (req.body.taxa_urgenta) var newTaxa_Urgenta = req.body.taxa_urgenta;
            if (req.body.finalizat_oliva) var newFinalizat_Oliva = new moment().format('DD/MM/YYYY');


            //      1.Cabinet ----------------------------------------------
            if (newIesit_Cabinet) {
                Oliva.findOne({ _id: editOliva }, function (err, oliva) {
                    if (err) throw err;
                    if (oliva.cabinet !== mainUser.username) {
                        res.json({ success: false, message: 'Nu esti utilizatorul care a inregistrat acest service.' });
                    } else {

                        if (!oliva || oliva.iesit_cabinet !== '-') {
                            res.json({ success: false, message: 'Data a fost deja adaugata, modificarile nu sunt salvate' });
                        }
                        else {
                            oliva.iesit_cabinet = newIesit_Cabinet;
                            oliva.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                } else {
                                    res.json({ success: true, message: 'Data adaugata cu succes' });
                                }
                            });
                        }
                    }
                });
            }

            if (newIntrat_Cabinet) {
                Oliva.findOne({ _id: editOliva }, function (err, oliva) {
                    if (err) throw err;
                    if (oliva.cabinet !== mainUser.username) {
                        res.json({ success: false, message: 'Nu esti utilizatorul care a inregistrat acest service.' });
                    } else {

                        if (!oliva || oliva.intrat_cabinet !== '-') {
                            res.json({ success: false, message: 'Data a fost deja adaugata, modificarile nu sunt salvate' });
                        }
                        else {
                            oliva.intrat_cabinet = newIntrat_Cabinet;
                            oliva.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                } else {
                                    res.json({ success: true, message: 'Data adaugata cu succes' });
                                }
                            });
                        }
                    }
                });
            }

            if (newPredat_Pacient) {
                Oliva.findOne({ _id: editOliva }, function (err, oliva) {
                    if (err) throw err;
                    if (oliva.cabinet !== mainUser.username) {
                        res.json({ success: false, message: 'Nu esti utilizatorul care a inregistrat acest service.' });
                    } else {

                        if (!oliva || oliva.predat_pacient !== '-') {
                            res.json({ success: false, message: 'Data a fost deja adaugata, modificarile nu sunt salvate' });
                        }
                        else {
                            oliva.predat_pacient = newPredat_Pacient;
                            oliva.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                } else {
                                    res.json({ success: true, message: 'Data adaugata cu succes' });
                                }
                            });
                        }
                    }
                });
            }

            if (newCompletare_Cabinet) {
                Oliva.findOne({ _id: editOliva }, function (err, oliva) {
                    if (err) throw err;
                    if (oliva.cabinet !== mainUser.username) {
                        res.json({ success: false, message: 'Nu esti utilizatorul care a inregistrat aceasta comanda.' });
                    }
                    else {
                        oliva.completare_cabinet = newCompletare_Cabinet;
                        oliva.save(function (err) {
                            if (err) {
                                res.json({ success: false, message: 'Nu s-a putut salva' });
                            } else {
                                res.json({ success: true, message: 'Completare adaugata cu succes' });
                            }
                        });
                    }
                });
            }



            // //      2.Logistic ----------------------------------------------

            if (newLog_Sosit) {
                Oliva.findOne({ _id: editOliva }, function (err, oliva) {
                    if (err) throw err;
                    if (mainUser.permission !== 'logistic') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Logistic.' });
                    } else {

                        if (!oliva || oliva.log_sosit !== '-') {
                            res.json({ success: false, message: 'Data a fost deja adaugata, modificarile nu sunt salvate' });
                        }
                        else {
                            oliva.log_sosit = newLog_Sosit;
                            oliva.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                } else {
                                    res.json({ success: true, message: 'Data adaugata cu succes' });
                                }
                            });
                        }
                    }
                });
            }

            if (newLog_Plecat) {
                Oliva.findOne({ _id: editOliva }, function (err, oliva) {
                    if (err) throw err;
                    if (mainUser.permission !== 'logistic') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Logistic.' });
                    } else {

                        if (!oliva || oliva.log_plecat !== '-') {
                            res.json({ success: false, message: 'Data a fost deja adaugata, modificarile nu sunt salvate' });
                        }
                        else {
                            oliva.log_plecat = newLog_Plecat;
                            oliva.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                } else {
                                    res.json({ success: true, message: 'Data adaugata cu succes' });
                                }
                            });
                        }
                    }
                });
            }

            if (newLog_Preluat) {
                Oliva.findOne({ _id: editOliva }, function (err, oliva) {
                    if (err) throw err;
                    if (mainUser.permission !== 'logistic') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Logistic.' });
                    } else {

                        if (!oliva || oliva.log_preluat !== '-') {
                            res.json({ success: false, message: 'Data a fost deja adaugata, modificarile nu sunt salvate' });
                        }
                        else {
                            oliva.log_preluat = newLog_Preluat;
                            oliva.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                } else {
                                    res.json({ success: true, message: 'Data adaugata cu succes' });
                                }
                            });
                        }
                    }
                });
            }

            if (newLog_Trimis) {
                Oliva.findOne({ _id: editOliva }, function (err, oliva) {
                    if (err) throw err;
                    if (mainUser.permission !== 'logistic') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Logistic.' });
                    } else {

                        if (!oliva || oliva.log_trimis !== '-') {
                            res.json({ success: false, message: 'Data a fost deja adaugata, modificarile nu sunt salvate' });
                        }
                        else {
                            oliva.log_trimis = newLog_Trimis;
                            oliva.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                } else {
                                    res.json({ success: true, message: 'Data adaugata cu succes' });
                                }
                            });
                        }
                    }
                });
            }


            // //      3.Plastie ----------------------------------------------

            if (newFinalizat_Oliva) {
                Oliva.findOne({ _id: editOliva }, function (err, oliva) {
                    if (err) throw err;
                    if (mainUser.permission !== 'plastie') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Plastie.' });
                    } else {

                        if (!oliva || oliva.finalizat_oliva !== '-') {
                            res.json({ success: false, message: 'Data a fost deja adaugata, modificarile nu sunt salvate' });
                        }
                        else {
                            oliva.finalizat_oliva = newFinalizat_Oliva;
                            oliva.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                } else {
                                    res.json({ success: true, message: 'Data adaugata cu succes' });
                                }
                            });
                        }
                    }
                });
            }

            if (newPlastie_Plecat) {
                Oliva.findOne({ _id: editOliva }, function (err, oliva) {
                    if (err) throw err;
                    if (mainUser.permission !== 'plastie') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Plastie.' });
                    } else {

                        if (!oliva || oliva.plastie_plecat !== '-') {
                            res.json({ success: false, message: 'Data a fost deja adaugata, modificarile nu sunt salvate' });
                        }
                        else {
                            oliva.plastie_plecat = newPlastie_Plecat;
                            oliva.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                } else {
                                    res.json({ success: true, message: 'Data adaugata cu succes' });
                                }
                            });
                        }
                    }
                });
            }

            if (newPlastie_Sosit) {
                Oliva.findOne({ _id: editOliva }, function (err, oliva) {
                    if (err) throw err;
                    if (mainUser.permission !== 'plastie') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Plastie.' });
                    } else {

                        if (!oliva || oliva.plastie_sosit !== '-') {
                            res.json({ success: false, message: 'Data a fost deja adaugata, modificarile nu sunt salvate' });
                        }
                        else {
                            oliva.plastie_sosit = newPlastie_Sosit;
                            oliva.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                } else {
                                    res.json({ success: true, message: 'Data adaugata cu succes' });
                                }
                            });
                        }
                    }
                });
            }

            if (newObservatii_Plastie) {
                Oliva.findOne({ _id: editOliva }, function (err, oliva) {
                    if (err) throw err;
                    if (mainUser.permission !== 'plastie') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Plastie.' });
                    }
                    else {
                        oliva.observatii_plastie = newObservatii_Plastie;
                        oliva.save(function (err) {
                            if (err) {
                                res.json({ success: false, message: 'Nu s-a putut salva' });
                            } else {
                                res.json({ success: true, message: 'Completare adaugata cu succes' });
                            }
                        });
                    }
                });
            }


        });

    });

    // Update ITE 
    //--------------------------------------------------------------------------------

    router.put('/editIte', function (req, res) {
        var editIte = req.body._id;
        User.findOne({ username: req.decoded.username }, function (err, mainUser) {

            //      Cabinet 
            //-----------------------------------------------------------------------------------
            if (req.body.iesit_cabinet) var newIesit_Cabinet = new moment().format('DD/MM/YYYY');
            if (req.body.intrat_cabinet) var newIntrat_Cabinet = new moment().format('DD/MM/YYYY');
            if (req.body.predat_pacient) var newPredat_Pacient = new moment().format('DD/MM/YYYY');
            if (req.body.completare_cabinet) var newCompletare_Cabinet = req.body.completare_cabinet;

            //      Logistic 
            //-----------------------------------------------------------------------------------

            if (req.body.log_sosit) var newLog_Sosit = new moment().format('DD/MM/YYYY');
            if (req.body.log_plecat) var newLog_Plecat = new moment().format('DD/MM/YYYY');
            if (req.body.log_preluat) var newLog_Preluat = new moment().format('DD/MM/YYYY');
            if (req.body.log_trimis) var newLog_Trimis = new moment().format('DD/MM/YYYY');

            //      Plastie
            //-----------------------------------------------------------------------------------

            if (req.body.asamblare_sosit) var newAsamblare_Sosit = new moment().format('DD/MM/YYYY');
            if (req.body.asamblare_plecat) var newAsamblare_Plecat = new moment().format('DD/MM/YYYY');
            if (req.body.observatii_asamblare) var newObservatii_Asamblare = req.body.observatii_asamblare;
            if (req.body.finalizat_ite) var newFinalizat_Ite = new moment().format('DD/MM/YYYY');


            //      1.Cabinet ----------------------------------------------
            if (newIesit_Cabinet) {
                Ite.findOne({ _id: editIte }, function (err, ite) {
                    if (err) throw err;
                    if (ite.cabinet !== mainUser.username) {
                        res.json({ success: false, message: 'Nu esti utilizatorul care a inregistrat aceasta comanda.' });
                    } else {

                        if (!ite || ite.iesit_cabinet !== '-') {
                            res.json({ success: false, message: 'Data a fost deja adaugata, modificarile nu sunt salvate' });
                        }
                        else {
                            ite.iesit_cabinet = newIesit_Cabinet;
                            ite.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                } else {
                                    res.json({ success: true, message: 'Data adaugata cu succes' });
                                }
                            });
                        }
                    }
                });
            }

            if (newIntrat_Cabinet) {
                Ite.findOne({ _id: editIte }, function (err, ite) {
                    if (err) throw err;
                    if (ite.cabinet !== mainUser.username) {
                        res.json({ success: false, message: 'Nu esti utilizatorul care a inregistrat aceasta comanda.' });
                    } else {

                        if (!ite || ite.intrat_cabinet !== '-') {
                            res.json({ success: false, message: 'Data a fost deja adaugata, modificarile nu sunt salvate' });
                        }
                        else {
                            ite.intrat_cabinet = newIntrat_Cabinet;
                            ite.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                } else {
                                    res.json({ success: true, message: 'Data adaugata cu succes' });
                                }
                            });
                        }
                    }
                });
            }

            if (newPredat_Pacient) {
                Ite.findOne({ _id: editIte }, function (err, ite) {
                    if (err) throw err;
                    if (ite.cabinet !== mainUser.username) {
                        res.json({ success: false, message: 'Nu esti utilizatorul care a inregistrat aceasta comanda.' });
                    } else {

                        if (!ite || ite.predat_pacient !== '-') {
                            res.json({ success: false, message: 'Data a fost deja adaugata, modificarile nu sunt salvate' });
                        }
                        else {
                            ite.predat_pacient = newPredat_Pacient;
                            ite.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                } else {
                                    res.json({ success: true, message: 'Data adaugata cu succes' });
                                }
                            });
                        }
                    }
                });
            }

            if (newCompletare_Cabinet) {
                Ite.findOne({ _id: editIte }, function (err, ite) {
                    if (err) throw err;
                    if (ite.cabinet !== mainUser.username) {
                        res.json({ success: false, message: 'Nu esti utilizatorul care a inregistrat aceasta comanda.' });
                    }
                    else {
                        ite.completare_cabinet = newCompletare_Cabinet;
                        ite.save(function (err) {
                            if (err) {
                                res.json({ success: false, message: 'Nu s-a putut salva' });
                            } else {
                                res.json({ success: true, message: 'Completare adaugata cu succes' });
                            }
                        });
                    }
                });
            }



            // // //      2.Logistic ----------------------------------------------

            if (newLog_Sosit) {
                Ite.findOne({ _id: editIte }, function (err, ite) {
                    if (err) throw err;
                    if (mainUser.permission !== 'logistic') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Logistic.' });
                    } else {

                        if (!ite || ite.log_sosit !== '-') {
                            res.json({ success: false, message: 'Data a fost deja adaugata, modificarile nu sunt salvate' });
                        }
                        else {
                            ite.log_sosit = newLog_Sosit;
                            ite.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                } else {
                                    res.json({ success: true, message: 'Data adaugata cu succes' });
                                }
                            });
                        }
                    }
                });
            }

            if (newLog_Plecat) {
                Ite.findOne({ _id: editIte }, function (err, ite) {
                    if (err) throw err;
                    if (mainUser.permission !== 'logistic') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Logistic.' });
                    } else {

                        if (!ite || ite.log_plecat !== '-') {
                            res.json({ success: false, message: 'Data a fost deja adaugata, modificarile nu sunt salvate' });
                        }
                        else {
                            ite.log_plecat = newLog_Plecat;
                            ite.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                } else {
                                    res.json({ success: true, message: 'Data adaugata cu succes' });
                                }
                            });
                        }
                    }
                });
            }

            if (newLog_Preluat) {
                Ite.findOne({ _id: editIte }, function (err, ite) {
                    if (err) throw err;
                    if (mainUser.permission !== 'logistic') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Logistic.' });
                    } else {

                        if (!ite || ite.log_preluat !== '-') {
                            res.json({ success: false, message: 'Data a fost deja adaugata, modificarile nu sunt salvate' });
                        }
                        else {
                            ite.log_preluat = newLog_Preluat;
                            ite.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                } else {
                                    res.json({ success: true, message: 'Data adaugata cu succes' });
                                }
                            });
                        }
                    }
                });
            }

            if (newLog_Trimis) {
                Ite.findOne({ _id: editIte }, function (err, ite) {
                    if (err) throw err;
                    if (mainUser.permission !== 'logistic') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Logistic.' });
                    } else {

                        if (!ite || ite.log_trimis !== '-') {
                            res.json({ success: false, message: 'Data a fost deja adaugata, modificarile nu sunt salvate' });
                        }
                        else {
                            ite.log_trimis = newLog_Trimis;
                            ite.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                } else {
                                    res.json({ success: true, message: 'Cod Componente a fost modificat' });
                                }
                            });
                        }
                    }
                });
            }


            // //      3.Asamblare ----------------------------------------------

            if (newFinalizat_Ite) {
                Ite.findOne({ _id: editIte }, function (err, ite) {
                    if (err) throw err;
                    if (mainUser.permission !== 'asamblare') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Asamblare.' });
                    } else {

                        if (!ite || ite.finalizat_ite !== '-') {
                            res.json({ success: false, message: 'Data a fost deja adaugata, modificarile nu sunt salvate' });
                        }
                        else {
                            ite.finalizat_ite = newFinalizat_Ite;
                            ite.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                } else {
                                    res.json({ success: true, message: 'Piese Inlocuite a fost modificat' });
                                }
                            });
                        }
                    }
                });
            }

            if (newAsamblare_Plecat) {
                Ite.findOne({ _id: editIte }, function (err, ite) {
                    if (err) throw err;
                    if (mainUser.permission !== 'asamblare') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Asamblare.' });
                    } else {

                        if (!ite || ite.asamblare_plecat !== '-') {
                            res.json({ success: false, message: 'Data a fost deja adaugata, modificarile nu sunt salvate' });
                        }
                        else {
                            ite.asamblare_plecat = newAsamblare_Plecat;
                            ite.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                } else {
                                    res.json({ success: true, message: 'Data adaugata cu succes' });
                                }
                            });
                        }
                    }
                });
            }

            if (newAsamblare_Sosit) {
                Ite.findOne({ _id: editIte }, function (err, ite) {
                    if (err) throw err;
                    if (mainUser.permission !== 'asamblare') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Asamblare.' });
                    } else {

                        if (!ite || ite.asamblare_sosit !== '-') {
                            res.json({ success: false, message: 'Data a fost deja adaugata, modificarile nu sunt salvate' });
                        }
                        else {
                            ite.asamblare_sosit = newAsamblare_Sosit;
                            ite.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                } else {
                                    res.json({ success: true, message: 'Data adaugata cu succes' });
                                }
                            });
                        }
                    }
                });
            }

            if (newObservatii_Asamblare) {
                Ite.findOne({ _id: editIte }, function (err, ite) {
                    if (err) throw err;
                    if (mainUser.permission !== 'asamblare') {
                        res.json({ success: false, message: 'Se completeaza de catre Dep. Asamblare.' });
                    }
                    else {
                        ite.observatii_asamblare = newObservatii_Asamblare;
                        ite.save(function (err) {
                            if (err) {
                                res.json({ success: false, message: 'Nu s-a putut salva' });
                            } else {
                                res.json({ success: true, message: 'Completare adaugata cu succes' });
                            }
                        });
                    }
                });
            }


        });

    });


    //      User Delete ----------------------------------------------
    router.delete('/management/:username', function (req, res) {
        var deletedUser = req.params.username;
        User.findOne({ username: req.decoded.username }, function (err, mainUser) {
            if (err) throw err;
            if (!mainUser) {
                res.json({ success: false, message: 'No user was found' });
            } else {
                if (mainUser.permission !== 'admin') {
                    res.json({ success: false, message: 'Insufficient Permissions' });
                } else {
                    User.findOneAndRemove({ username: deletedUser }, function (err, user) {
                        if (err) throw err;
                        res.json({ success: true });
                    });
                }
            }
        });
    });


    //      Get User for Update ----------------------------------------------
    router.get('/edit/:id', function (req, res) {
        var editUser = req.params.id;
        User.findOne({ username: req.decoded.username }, function (err, mainUser) {
            if (err) throw err;
            if (!mainUser) {
                res.json({ success: false, message: 'No user found' });
            } else {
                if (mainUser.permission === 'admin' || mainUser.permission === 'moderator') {
                    User.findOne({ _id: editUser }, function (err, user) {
                        if (err) throw err;
                        if (!user) {
                            res.json({ success: false, message: 'No user found' });
                        } else {
                            res.json({ success: true, user: user });
                        }
                    });
                } else {
                    res.json({ success: false, message: 'Insufficient Permissions' });
                }
            }
        });
    });

    //       User Update ----------------------------------------------
    router.put('/edit', function (req, res) {
        var editUser = req.body._id;
        if (req.body.name) var newName = req.body.name;
        if (req.body.username) var newUsername = req.body.username;
        if (req.body.email) var newEmail = req.body.email;
        if (req.body.permission) var newPermission = req.body.permission;

        User.findOne({ username: req.decoded.username }, function (err, mainUser) {
            if (err) throw err;
            if (!mainUser) {
                res.json({ success: false, message: 'No user found' });
            } else {
                if (newName) {
                    if (mainUser.permission === 'admin' || mainUser.permission === 'moderator') {
                        User.findOne({ _id: editUser }, function (err, user) {
                            if (err) throw err;
                            if (!user) {
                                res.json({ success: false, message: 'No user found' });
                            } else {
                                user.name = newName;
                                user.save(function (err) {
                                    if (err) {
                                        res.json({ success: false, message: 'Nu s-a putut salva' });
                                    } else {
                                        res.json({ success: true, message: 'Name has been updated!' });
                                    }
                                });
                            }
                        });
                    } else {
                        res.json({ success: false, message: 'Insufficient Permissions' });
                    }
                }

                if (newUsername) {
                    if (mainUser.permission === 'admin' || mainUser.permission === 'moderator') {
                        User.findOne({ _id: editUser }, function (err, user) {
                            if (err) throw err;
                            if (!user) {
                                res.json({ success: false, message: 'No user found' });
                            } else {
                                user.username = newUsername;
                                user.save(function (err) {
                                    if (err) {
                                        res.json({ success: false, message: 'Nu s-a putut salva' });
                                    } else {
                                        res.json({ success: true, message: 'Username has been updated!' });
                                    }
                                });
                            }
                        });

                    } else {
                        res.json({ success: false, message: 'Insufficient Permissions' });
                    }
                }

                if (newEmail) {
                    if (mainUser.permission === 'admin' || mainUser.permission === 'moderator') {
                        User.findOne({ _id: editUser }, function (err, user) {
                            if (err) throw err;
                            if (!user) {
                                res.json({ success: false, message: 'No user found' });
                            } else {
                                user.email = newEmail;
                                user.save(function (err) {
                                    if (err) {
                                        res.json({ success: false, message: 'Nu s-a putut salva' });
                                    } else {
                                        res.json({ success: true, message: 'Email has been updated!' });
                                    }
                                });
                            }
                        });

                    } else {
                        res.json({ success: false, message: 'Insufficient Permissions' });
                    }
                }
                if (newPermission) {
                    if (mainUser.permission === 'admin' || mainUser.permission === 'moderator') {
                        User.findOne({ _id: editUser }, function (err, user) {
                            if (err) throw err;
                            if (!user) {
                                res.json({ success: false, message: 'No user found' });
                            } else {
                                if (newPermission === 'user') {
                                    if (user.permission === 'admin') {
                                        if (mainUser.permission !== 'admin') {
                                            res.json({ success: false, message: 'Insufficient Permissions. You must be an admin to downgrade another admin' });
                                        } else {
                                            user.permission = newPermission;
                                            user.save(function (err) {
                                                if (err) {
                                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                                } else {
                                                    res.json({ success: true, message: 'Permissions updated!' });
                                                }
                                            });
                                        }
                                    } else {
                                        user.permission = newPermission;
                                        user.save(function (err) {
                                            if (err) {
                                                res.json({ success: false, message: 'Nu s-a putut salva' });
                                            } else {
                                                res.json({ success: true, message: 'Permissions updated!' });
                                            }
                                        });
                                    }
                                }
                                if (newPermission === 'moderator') {
                                    if (user.permission === 'admin') {
                                        if (mainUser.permission !== 'admin') {
                                            res.json({ success: false, message: 'Insufficient Permissions. You must be an admin to downgrade another admin' });
                                        } else {
                                            user.permission = newPermission;
                                            user.save(function (err) {
                                                if (err) {
                                                    res.json({ success: false, message: 'Nu s-a putut salva' });
                                                } else {
                                                    res.json({ success: true, message: 'Permissions updated!' });
                                                }
                                            });
                                        }
                                    } else {
                                        user.permission = newPermission;
                                        user.save(function (err) {
                                            if (err) {
                                                res.json({ success: false, message: 'Nu s-a putut salva' });
                                            } else {
                                                res.json({ success: true, message: 'Permissions updated!' });
                                            }
                                        });
                                    }
                                }
                                if (newPermission === 'admin') {
                                    if (mainUser.permission === 'admin') {
                                        user.permission = newPermission;
                                        user.save(function (err) {
                                            if (err) {
                                                res.json({ success: false, message: 'Nu s-a putut salva' });
                                            } else {
                                                res.json({ success: true, message: 'Permissions have been updated!' });
                                            }
                                        });
                                    } else {
                                        res.json({ success: false, message: 'Insufficient permissions. You must be an admin to upgrade someone to admin level' });
                                    }
                                }
                            }
                        });

                    } else {
                        res.json({ success: false, message: 'Insufficient Permissions' });
                    }
                }
            }
        });
    });

    return router;

};
