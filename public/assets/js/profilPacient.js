var token = window.localStorage.getItem('token');
var url = window.location.pathname;
var id = url.substr(url.lastIndexOf('/') + 1);


// Registru Service-uri
//-------------------------------------------------------------------------------------

$(document).ready(function () {
    var oTable = $('#tabel').dataTable({
        "serverSide": false,
        "ajax": {
            "url": "api/profilPacient/" + id,
            headers: {
                'x-access-token': token

            },
            "dataType": "json",
            "contentType": "application/json; charset=utf-8",
            "type": "GET",
            "dataSrc": "service",
        },
        "stateSave": false,
        "deferRender": true,
        "pageLength": 25,
        "searching": true,
        "autoWidth": false,
        columns: [
            { data: "nr_comanda_service" },
            { data: "data_inregistrare" },
            { data: "denumire_aparat" },
            { data: "defectiune_reclamata" },
            { data: "serv_sosit" },
            { data: "finalizat_reparatie" },
            { data: "serv_plecat" },
            { data: "predat_pacient" },
            { data: "" },
            { data: "_id" }
        ],
        columnDefs: [
            {

                "orderable": true,
                type: 'date-eu', targets: ([1]),
            },
            {
                "targets": [9],
                "visible": false,
            },
            {
                "aTargets": [8],
                "width": "60px",
                "mRender": function (data, type, row) {
                    return '<a class="btn btn-primary btn-sm" href=/service/' + row._id + '>' + 'Detalii' + '</a>';
                }
            }],
        "order": [[1, 'desc']],
        "oLanguage": {
            "sSearch": "Cautare generala",
            "sLengthMenu": "Afiseaza _MENU_ inregistrari",
        }

    });

    var startdate1;
    var enddate1;

    $('#reportrange').daterangepicker({
        ranges: {
            "Astazi": [moment(), moment()],
            'Ieri': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Ultimele 7 zile': [moment().subtract(6, 'days'), moment()],
            'Luna curenta': [moment().startOf('month'), moment().endOf('month')],
            'Luna trecuta': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            'Ultimele 3 luni': [moment().subtract(3, 'month').startOf('month'), moment().endOf('month').endOf('month')],
            'Ultimele 6 luni': [moment().subtract(6, 'month').startOf('month'), moment().endOf('month').endOf('month')],
            'Tot anul': [moment().startOf('year'), moment().endOf('year')],
            'Toate': [moment().subtract(20, 'years'), moment().endOf('year')]


        },
        opens: "right",
        format: 'DD/MM/YYYY',
        dateLimit: { days: 365 },
        locale: {
            "format": "DD/MM/YYYY",
            "separator": " - ",
            "applyLabel": "Aplica",
            "cancelLabel": "Anuleaza",
            "fromLabel": "De la",
            "toLabel": "Pana la",
            "customRangeLabel": "Alege interval",
            "daysOfWeek": [
                "Dum",
                "Luni",
                "Mar",
                "Mie",
                "Joi",
                "Vin",
                "Sam"
            ],
            "monthNames": [
                "Ianuarie",
                "Februarie",
                "Martie",
                "Aprilie",
                "Mai",
                "Iunie",
                "Iulie",
                "August",
                "Septembrie",
                "Octombrie",
                "Noiembrie",
                "Decembrie"
            ],
            "firstDay": 1
        },

    },
        function (start1, end1, label) {
            var s1 = moment.utc(start1.toISOString());
            var e1 = moment.utc(end1.toISOString());
            startdate1 = s1.format("YYYY-MM-DD");
            enddate1 = e1.format("YYYY-MM-DD");
            console.log(start1)
            console.log(end1)
        });
    $('#reportrange').on('apply.daterangepicker', function (ev, picker1) {

        startdate1 = picker1.startDate.format('YYYY-MM-DD');
        enddate1 = picker1.endDate.format('YYYY-MM-DD');
        oTable.fnDraw();

        $.fn.dataTableExt.afnFiltering.push(
            function (oSettings, aData1, iDataIndex) {

                console.log(aData1)

                if (startdate1 != undefined) {

                    var coldate1 = aData1[1].split("/");
                    var d1 = new Date(coldate1[2], coldate1[1] - 1, coldate1[0]);
                    var date1 = moment(d1.toISOString());
                    date1 = date1.format("YYYY-MM-DD");
                    dateMin1 = startdate1.replace(/-/g, "");
                    dateMax1 = enddate1.replace(/-/g, "");
                    date1 = date1.replace(/-/g, "");

                    if (dateMin1 == "" && date1 <= dateMax1) {
                        return true;
                    }
                    else if (dateMin1 == "" && date1 <= dateMax1) {
                        return true;
                    }
                    else if (dateMin1 <= date1 && "" == dateMax1) {
                        return true;
                    }
                    else if (dateMin1 <= date1 && date1 <= dateMax1) {
                        return true;
                    }

                    return false;
                }
            }
        );
        oTable.fnDraw();
    });


    $('#tabel .filters .FilterinputSearch').each(function () {
        var title = $('#tabel thead .FilterinputSearch').eq($(this).index()).text();
        $(this).html('<input type="text" placeholder="cautare" />');
    });

    var table = $('#tabel').DataTable();

    table.columns([0, 2, 3, 4, 5, 6, 7]).eq(0).each(function (colIdx) {
        $('input', $('.filters th')[colIdx]).on('keyup change', function () {
            table
                .column(colIdx)
                .search(this.value)
                .draw();
        });
    });
});

var endYear = new Date(new Date().getFullYear(), 11, 31);

$('#pickyDate, #pickyDate1, #pickyDate2, #pickyDate3').datepicker({
    clearBtn: true,
    todayHighlight: true,
    toggleActive: true,
    endDate: endYear,
    language: 'ro',
    format: "mm/yyyy",
    startView: "months",
    minViewMode: "months",
    maxViewMode: "years",
});

$("#fromdate").datepicker({
    minViewMode: 1,

}).on('changeDate', function (ev) {
    $("#todate").datepicker("option", "minDate", ev.date.setMonth(ev.date.getMonth() + 1));
});


// Registru Olive
//-------------------------------------------------------------------------------------


$(document).ready(function () {
    var oTable = $('#tabel_olive').dataTable({
        "serverSide": false,
        "ajax": {
            "url": "api/profilPacient/" + id,
            headers: {
                'x-access-token': token

            },
            "dataType": "json",
            "contentType": "application/json; charset=utf-8",
            "type": "GET",
            "dataSrc": "oliva",
        },
        "stateSave": false,
        "deferRender": true,
        "pageLength": 25,
        "searching": true,
        "autoWidth": false,
        columns: [
            { data: "nr_comanda_oliva" },
            { data: "data_inregistrare" },
            { data: "serie_oliva" },
            { data: "material_oliva" },
            { data: "tip_oliva" },
            { data: "plastie_sosit" },
            { data: "finalizat_oliva" },
            { data: "plastie_plecat" },
            { data: "predat_pacient" },
            { data: "" },
            { data: "_id" }
        ],
        columnDefs: [
            {

                "orderable": true,
                type: 'date-eu', targets: ([1]),
            },
            {
                "targets": [10],
                "visible": false,
            },
            {
                "targets": [2],
                "orderable": false,
            },

            {
                "aTargets": [9],
                "width": "60px",
                "mRender": function (data, type, row) {
                    return '<a class="btn btn-primary btn-sm" href=/oliva/' + row._id + '>' + 'Detalii' + '</a>';
                }
            }],
        "order": [[1, 'desc']],
        "oLanguage": {
            "sSearch": "Cautare generala",
            "sLengthMenu": "Afiseaza _MENU_ inregistrari",
        }

    });

    var startdate2;
    var enddate2;

    $('#reportrange1').daterangepicker({
        ranges: {
            "Astazi": [moment(), moment()],
            'Ieri': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Ultimele 7 zile': [moment().subtract(6, 'days'), moment()],
            'Luna curenta': [moment().startOf('month'), moment().endOf('month')],
            'Luna trecuta': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            'Ultimele 3 luni': [moment().subtract(3, 'month').startOf('month'), moment().endOf('month').endOf('month')],
            'Ultimele 6 luni': [moment().subtract(6, 'month').startOf('month'), moment().endOf('month').endOf('month')],
            'Tot anul': [moment().startOf('year'), moment().endOf('year')],
            'Toate': [moment().subtract(20, 'years'), moment().endOf('year')]


        },
        opens: "right",
        format: 'DD/MM/YYYY',
        dateLimit: { days: 365 },
        locale: {
            "format": "DD/MM/YYYY",
            "separator": " - ",
            "applyLabel": "Aplica",
            "cancelLabel": "Anuleaza",
            "fromLabel": "De la",
            "toLabel": "Pana la",
            "customRangeLabel": "Alege interval",
            "daysOfWeek": [
                "Dum",
                "Luni",
                "Mar",
                "Mie",
                "Joi",
                "Vin",
                "Sam"
            ],
            "monthNames": [
                "Ianuarie",
                "Februarie",
                "Martie",
                "Aprilie",
                "Mai",
                "Iunie",
                "Iulie",
                "August",
                "Septembrie",
                "Octombrie",
                "Noiembrie",
                "Decembrie"
            ],
            "firstDay": 1
        },

    },
        function (start2, end2, label) {
            var s2 = moment.utc(start2.toISOString());
            var e2 = moment.utc(end2.toISOString());
            startdate2 = s2.format("YYYY-MM-DD");
            enddate2 = e2.format("YYYY-MM-DD");

        });
    $('#reportrange1').on('apply.daterangepicker', function (ev, picker2) {
        startdate2 = picker2.startDate.format('YYYY-MM-DD');
        enddate2 = picker2.endDate.format('YYYY-MM-DD');

        $.fn.dataTableExt.afnFiltering.push(
            function (oSettings, aData2, iDataIndex) {
                console.log(aData2)
                if (startdate2 != undefined) {
                    var coldate2 = aData2[1].split("/");
                    var d2 = new Date(coldate2[2], coldate2[1] - 1, coldate2[0]);
                    var date2 = moment(d2.toISOString());
                    date2 = date2.format("YYYY-MM-DD");
                    dateMin2 = startdate2.replace(/-/g, "");
                    dateMax2 = enddate2.replace(/-/g, "");
                    date2 = date2.replace(/-/g, "");

                    if (dateMin2 == "" && date2 <= dateMax2) {
                        return true;
                    }
                    else if (dateMin2 == "" && date2 <= dateMax2) {
                        return true;
                    }
                    else if (dateMin2 <= date2 && "" == dateMax2) {
                        return true;
                    }
                    else if (dateMin2 <= date2 && date2 <= dateMax2) {
                        return true;
                    }

                    return false;
                }
            }
        );
        oTable.fnDraw();
    });


    $('#tabel_olive .filters .FilterinputSearch ').each(function () {
        var title = $('#tabel_olive thead .FilterinputSearch').eq($(this).index()).text();
        $(this).html('<input type="text" placeholder="cautare" />');
    });

    var table = $('#tabel_olive').DataTable();

    table.columns([0, 2, 3, 4, 5, 6, 7, 8]).eq(0).each(function (colIdx) {
        $('input', $('.filters th')[colIdx]).on('keyup change', function () {
            table
                .column(colIdx)
                .search(this.value)
                .draw();
        });
    });
});



var endYear = new Date(new Date().getFullYear(), 11, 31);

$('#pickyDatea, #pickyDateb, #pickyDatec, #pickyDated').datepicker({
    clearBtn: true,
    todayHighlight: true,
    toggleActive: true,
    endDate: endYear,
    language: 'ro',
    format: "mm/yyyy",
    startView: "months",
    minViewMode: "months",
    maxViewMode: "years",
});

$("#fromdate").datepicker({
    minViewMode: 1,

}).on('changeDate', function (ev) {
    $("#todate").datepicker("option", "minDate", ev.date.setMonth(ev.date.getMonth() + 1));
});


// // Registru Ite
// //-------------------------------------------------------------------------------------


// $(document).ready(function () {
//     var oTable = $('#tabel_ite').dataTable({
//         "serverSide": false,
//         "ajax": {
//             "url": "api/profilPacient/" + id,
//             headers: {
//                 'x-access-token': token

//             },
//             "dataType": "json",
//             "contentType": "application/json; charset=utf-8",
//             "type": "GET",
//             "dataSrc": "ite",
//         },
//         "stateSave": false,
//         "deferRender": true,
//         "pageLength": 25,
//         "searching": true,
//         "autoWidth": false,
//         columns: [
//             { data: "nr_comanda_ite" },
//             { data: "data_inregistrare" },
//             { data: "serie_ite" },
//             { data: "model_aparat" },
//             { data: "carcasa_ite" },
//             { data: "asamblare_sosit" },
//             { data: "finalizat_ite" },
//             { data: "asamblare_plecat" },
//             { data: "predat_pacient" },
//             { data: "" },
//             { data: "_id" }
//         ],
//         columnDefs: [
//             {

//                 "orderable": true,
//                 type: 'date-eu', targets: ([1]),
//             },
//             {
//                 "targets": [10],
//                 "visible": false,
//             },
//             {
//                 "targets": [2],
//                 "orderable": false,
//             },

//             {
//                 "aTargets": [9],
//                 "width": "60px",
//                 "mRender": function (data, type, row) {
//                     return '<a class="btn btn-primary btn-sm" href=/ite/' + row._id + '>' + 'Detalii' + '</a>';
//                 }
//             }],
//         "order": [[1, 'desc']],
//         "oLanguage": {
//             "sSearch": "Cautare generala",
//             "sLengthMenu": "Afiseaza _MENU_ inregistrari",
//         }

//     });

//     var startdate;
//     var enddate;

//     $('#reportrange2').daterangepicker({
//         ranges: {
//             "Astazi": [moment(), moment()],
//             'Ieri': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
//             'Ultimele 7 zile': [moment().subtract(6, 'days'), moment()],
//             'Luna curenta': [moment().startOf('month'), moment().endOf('month')],
//             'Luna trecuta': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
//             'Ultimele 3 luni': [moment().subtract(3, 'month').startOf('month'), moment().endOf('month').endOf('month')],
//             'Ultimele 6 luni': [moment().subtract(6, 'month').startOf('month'), moment().endOf('month').endOf('month')],
//             'Tot anul': [moment().startOf('year'), moment().endOf('year')],
//             'Toate': [moment().subtract(20, 'years'), moment().endOf('year')]


//         },
//         opens: "right",
//         format: 'DD/MM/YYYY',
//         dateLimit: { days: 365 },
//         locale: {
//             "format": "DD/MM/YYYY",
//             "separator": " - ",
//             "applyLabel": "Aplica",
//             "cancelLabel": "Anuleaza",
//             "fromLabel": "De la",
//             "toLabel": "Pana la",
//             "customRangeLabel": "Alege interval",
//             "daysOfWeek": [
//                 "Dum",
//                 "Luni",
//                 "Mar",
//                 "Mie",
//                 "Joi",
//                 "Vin",
//                 "Sam"
//             ],
//             "monthNames": [
//                 "Ianuarie",
//                 "Februarie",
//                 "Martie",
//                 "Aprilie",
//                 "Mai",
//                 "Iunie",
//                 "Iulie",
//                 "August",
//                 "Septembrie",
//                 "Octombrie",
//                 "Noiembrie",
//                 "Decembrie"
//             ],
//             "firstDay": 1
//         },

//     },
//         function (start, end, label) {
//             var s = moment.utc(start.toISOString());
//             var e = moment.utc(end.toISOString());
//             startdate = s.format("YYYY-MM-DD");
//             enddate = e.format("YYYY-MM-DD");
//         });
//     $('#reportrange2').on('apply.daterangepicker', function (ev, picker) {
//         startdate = picker.startDate.format('YYYY-MM-DD');
//         enddate = picker.endDate.format('YYYY-MM-DD');

//         $.fn.dataTableExt.afnFiltering.push(
//             function (oSettings, aData, iDataIndex) {
//                 if (startdate != undefined) {
//                     var coldate = aData[1].split("/");
//                     var d = new Date(coldate[2], coldate[1] - 1, coldate[0]);
//                     var date = moment(d.toISOString());
//                     date = date.format("YYYY-MM-DD");
//                     dateMin = startdate.replace(/-/g, "");
//                     dateMax = enddate.replace(/-/g, "");
//                     date = date.replace(/-/g, "");

//                     if (dateMin == "" && date <= dateMax) {
//                         return true;
//                     }
//                     else if (dateMin == "" && date <= dateMax) {
//                         return true;
//                     }
//                     else if (dateMin <= date && "" == dateMax) {
//                         return true;
//                     }
//                     else if (dateMin <= date && date <= dateMax) {
//                         return true;
//                     }

//                     return false;
//                 }
//             }
//         );
//         oTable.fnDraw();
//     });


//     $('#tabel_ite .filters .FilterinputSearch').each(function () {
//         var title = $('#tabel_ite thead .FilterinputSearch').eq($(this).index()).text();
//         $(this).html('<input type="text" placeholder="cautare" />');
//     });

//     var table = $('#tabel_ite').DataTable();

//     table.columns([0, 2, 3, 4, 5, 6, 7, 8]).eq(0).each(function (colIdx) {
//         $('input', $('.filters th')[colIdx]).on('keyup change', function () {
//             table
//                 .column(colIdx)
//                 .search(this.value)
//                 .draw();
//         });
//     });
// });



// //--------------------------------------------------------------------------------------
// var endYear = new Date(new Date().getFullYear(), 11, 31);

// $('#pickyDatee, #pickyDatef, #pickyDateg, #pickyDateh').datepicker({
//     clearBtn: true,
//     todayHighlight: true,
//     toggleActive: true,
//     endDate: endYear,
//     language: 'ro',
//     format: "mm/yyyy",
//     startView: "months",
//     minViewMode: "months",
//     maxViewMode: "years",
// });

// $("#fromdate").datepicker({
//     minViewMode: 1,

// }).on('changeDate', function (ev) {
//     $("#todate").datepicker("option", "minDate", ev.date.setMonth(ev.date.getMonth() + 1));
// });


// // Registru Recarcasari
// //-------------------------------------------------------------------------------------

// $(document).ready(function () {
//     var oTable = $('#tabel_recarcasari').dataTable({
//         "serverSide": false,
//         "ajax": {
//             "url": "api/profilPacient/" + id,
//             headers: {
//                 'x-access-token': token

//             },
//             "dataType": "json",
//             "contentType": "application/json; charset=utf-8",
//             "type": "GET",
//             "dataSrc": "recarcasare",
//         },
//         "stateSave": false,
//         "deferRender": true,
//         "pageLength": 25,
//         "searching": true,
//         "autoWidth": false,
//         columns: [
//             { data: "nr_comanda_recarcasare" },
//             { data: "data_inregistrare" },
//             { data: "denumire_aparat" },
//             { data: "defectiune_reclamata" },
//             { data: "asamblare_sosit" },
//             { data: "finalizat_recarcasare" },
//             { data: "asamblare_plecat" },
//             { data: "predat_pacient" },
//             { data: "" },
//             { data: "_id" }
//         ],
//         columnDefs: [
//             {

//                 "orderable": true,
//                 type: 'date-eu', targets: ([1]),
//             },
//             {
//                 "targets": [9],
//                 "visible": false,
//             },
//             {
//                 "aTargets": [8],
//                 "width": "60px",
//                 "mRender": function (data, type, row) {
//                     return '<a class="btn btn-primary btn-sm" href=/recarcasare/' + row._id + '>' + 'Detalii' + '</a>';
//                 }
//             }],
//         "order": [[1, 'desc']],
//         "oLanguage": {
//             "sSearch": "Cautare generala",
//             "sLengthMenu": "Afiseaza _MENU_ inregistrari",
//         }

//     });

//     var startdate;
//     var enddate;

//     $('#reportrange3').daterangepicker({
//         ranges: {
//             "Astazi": [moment(), moment()],
//             'Ieri': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
//             'Ultimele 7 zile': [moment().subtract(6, 'days'), moment()],
//             'Luna curenta': [moment().startOf('month'), moment().endOf('month')],
//             'Luna trecuta': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
//             'Ultimele 3 luni': [moment().subtract(3, 'month').startOf('month'), moment().endOf('month').endOf('month')],
//             'Ultimele 6 luni': [moment().subtract(6, 'month').startOf('month'), moment().endOf('month').endOf('month')],
//             'Tot anul': [moment().startOf('year'), moment().endOf('year')],
//             'Toate': [moment().subtract(20, 'years'), moment().endOf('year')]


//         },
//         opens: "right",
//         format: 'DD/MM/YYYY',
//         dateLimit: { days: 365 },
//         locale: {
//             "format": "DD/MM/YYYY",
//             "separator": " - ",
//             "applyLabel": "Aplica",
//             "cancelLabel": "Anuleaza",
//             "fromLabel": "De la",
//             "toLabel": "Pana la",
//             "customRangeLabel": "Alege interval",
//             "daysOfWeek": [
//                 "Dum",
//                 "Luni",
//                 "Mar",
//                 "Mie",
//                 "Joi",
//                 "Vin",
//                 "Sam"
//             ],
//             "monthNames": [
//                 "Ianuarie",
//                 "Februarie",
//                 "Martie",
//                 "Aprilie",
//                 "Mai",
//                 "Iunie",
//                 "Iulie",
//                 "August",
//                 "Septembrie",
//                 "Octombrie",
//                 "Noiembrie",
//                 "Decembrie"
//             ],
//             "firstDay": 1
//         },

//     },
//         function (start, end, label) {
//             var s = moment.utc(start.toISOString());
//             var e = moment.utc(end.toISOString());
//             startdate = s.format("YYYY-MM-DD");
//             enddate = e.format("YYYY-MM-DD");
//         });
//     $('#reportrange3').on('apply.daterangepicker', function (ev, picker) {
//         startdate = picker.startDate.format('YYYY-MM-DD');
//         enddate = picker.endDate.format('YYYY-MM-DD');

//         $.fn.dataTableExt.afnFiltering.push(
//             function (oSettings, aData, iDataIndex) {
//                 if (startdate != undefined) {
//                     var coldate = aData[1].split("/");
//                     var d = new Date(coldate[2], coldate[1] - 1, coldate[0]);
//                     var date = moment(d.toISOString());
//                     date = date.format("YYYY-MM-DD");
//                     dateMin = startdate.replace(/-/g, "");
//                     dateMax = enddate.replace(/-/g, "");
//                     date = date.replace(/-/g, "");

//                     if (dateMin == "" && date <= dateMax) {
//                         return true;
//                     }
//                     else if (dateMin == "" && date <= dateMax) {
//                         return true;
//                     }
//                     else if (dateMin <= date && "" == dateMax) {
//                         return true;
//                     }
//                     else if (dateMin <= date && date <= dateMax) {
//                         return true;
//                     }

//                     return false;
//                 }
//             }
//         );
//         oTable.fnDraw();
//     });


//     $('#tabel_recarcasari .filters .FilterinputSearch').each(function () {
//         var title = $('#tabel_recarcasari thead .FilterinputSearch').eq($(this).index()).text();
//         $(this).html('<input type="text" placeholder="cautare" />');
//     });

//     var table = $('#tabel_recarcasari').DataTable();

//     table.columns([0, 2, 3, 4, 5, 6, 7]).eq(0).each(function (colIdx) {
//         $('input', $('.filters th')[colIdx]).on('keyup change', function () {
//             table
//                 .column(colIdx)
//                 .search(this.value)
//                 .draw();
//         });
//     });
// });

// var endYear = new Date(new Date().getFullYear(), 11, 31);

// $('#pickyDatei, #pickyDatej, #pickyDatek, #pickyDatel').datepicker({
//     clearBtn: true,
//     todayHighlight: true,
//     toggleActive: true,
//     endDate: endYear,
//     language: 'ro',
//     format: "mm/yyyy",
//     startView: "months",
//     minViewMode: "months",
//     maxViewMode: "years",
// });

// $("#fromdate").datepicker({
//     minViewMode: 1,

// }).on('changeDate', function (ev) {
//     $("#todate").datepicker("option", "minDate", ev.date.setMonth(ev.date.getMonth() + 1));
// });
