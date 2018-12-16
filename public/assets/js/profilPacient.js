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


    $('#tabel .filters .FilterinputSearch').each(function () {
        var title = $('#tabel thead .FilterinputSearch').eq($(this).index()).text();
        $(this).html('<input type="text" placeholder="cautare" />');
    });

    var table = $('#tabel').DataTable();

    table.columns([0, 1, 2, 3, 4, 5, 6, 7]).eq(0).each(function (colIdx) {
        $('input', $('.filters th')[colIdx]).on('keyup change', function () {
            table
                .column(colIdx)
                .search(this.value)
                .draw();
        });
    });
});

var endYear = new Date(new Date().getFullYear(), 11, 31);

$('#pickyDate, #pickyDate1, #pickyDate2, #pickyDate3, #pickyDate4').datepicker({
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
            { data: "serie_oliva" },
            { data: "data_inregistrare" },
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
                "targets": [10],
                "visible": false,
            },
            {
                "targets": [1],
                "orderable": false,
            },

            {
                "aTargets": [9],
                "width": "60px",
                "mRender": function (data, type, row) {
                    return '<a class="btn btn-primary btn-sm" href=/oliva/' + row._id + '>' + 'Detalii' + '</a>';
                }
            }],
        "order": [[2, 'desc']],
        "oLanguage": {
            "sSearch": "Cautare generala",
            "sLengthMenu": "Afiseaza _MENU_ inregistrari",
        }

    });


    $('#tabel_olive .filters1 .FilterinputSearch ').each(function () {
        var title = $('#tabel_olive thead .FilterinputSearch').eq($(this).index()).text();
        $(this).html('<input type="text" placeholder="cautare" />');
    });

    var table = $('#tabel_olive').DataTable();

    table.columns([0, 1, 2, 3, 4, 5, 6, 7, 8]).eq(0).each(function (colIdx) {
        $('input', $('.filters1 th')[colIdx]).on('keyup change', function () {
            table
                .column(colIdx)
                .search(this.value)
                .draw();
        });
    });
});



var endYear = new Date(new Date().getFullYear(), 11, 31);

$('#pickyDatea, #pickyDateb, #pickyDatec, #pickyDated, #pickyDatee').datepicker({
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


// Registru Ite
//-------------------------------------------------------------------------------------


$(document).ready(function () {
    var oTable = $('#tabel_ite').dataTable({
        "serverSide": false,
        "ajax": {
            "url": "api/profilPacient/" + id,
            headers: {
                'x-access-token': token

            },
            "dataType": "json",
            "contentType": "application/json; charset=utf-8",
            "type": "GET",
            "dataSrc": "ite",
        },
        "stateSave": false,
        "deferRender": true,
        "pageLength": 25,
        "searching": true,
        "autoWidth": false,
        columns: [
            { data: "nr_comanda_ite" },
            { data: "serie_ite" },
            { data: "data_inregistrare" },
            { data: "model_aparat" },
            { data: "carcasa_ite" },
            { data: "asamblare_sosit" },
            { data: "finalizat_ite" },
            { data: "asamblare_plecat" },
            { data: "predat_pacient" },
            { data: "" },
            { data: "_id" }
        ],
        columnDefs: [
            {
                "targets": [10],
                "visible": false,
            },
            {
                "targets": [1],
                "orderable": false,
            },

            {
                "aTargets": [9],
                "width": "60px",
                "mRender": function (data, type, row) {
                    return '<a class="btn btn-primary btn-sm" href=/ite/' + row._id + '>' + 'Detalii' + '</a>';
                }
            }],
        "order": [[2, 'desc']],
        "oLanguage": {
            "sSearch": "Cautare generala",
            "sLengthMenu": "Afiseaza _MENU_ inregistrari",
        }

    });

    $('#tabel_ite .filters2 .FilterinputSearch').each(function () {
        var title = $('#tabel_ite thead .FilterinputSearch').eq($(this).index()).text();
        $(this).html('<input type="text" placeholder="cautare" />');
    });

    var table = $('#tabel_ite').DataTable();

    table.columns([0, 1, 2, 3, 4, 5, 6, 7, 8]).eq(0).each(function (colIdx) {
        $('input', $('.filters2 th')[colIdx]).on('keyup change', function () {
            table
                .column(colIdx)
                .search(this.value)
                .draw();
        });
    });
});



//--------------------------------------------------------------------------------------
var endYear = new Date(new Date().getFullYear(), 11, 31);

$('#pickyDatef, #pickyDateg, #pickyDateh, #pickyDatei, #pickyDatej').datepicker({
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


// Registru Recarcasari
//-------------------------------------------------------------------------------------

$(document).ready(function () {
    var oTable = $('#tabel_recarcasari').dataTable({
        "serverSide": false,
        "ajax": {
            "url": "api/profilPacient/" + id,
            headers: {
                'x-access-token': token

            },
            "dataType": "json",
            "contentType": "application/json; charset=utf-8",
            "type": "GET",
            "dataSrc": "recarcasare",
        },
        "stateSave": false,
        "deferRender": true,
        "pageLength": 25,
        "searching": true,
        "autoWidth": false,
        columns: [
            { data: "nr_comanda_recarcasare" },
            { data: "data_inregistrare" },
            { data: "denumire_aparat" },
            { data: "defectiune_reclamata" },
            { data: "asamblare_sosit" },
            { data: "finalizat_recarcasare" },
            { data: "asamblare_plecat" },
            { data: "predat_pacient" },
            { data: "" },
            { data: "_id" }
        ],
        columnDefs: [
            {
                "targets": [9],
                "visible": false,
            },
            {
                "aTargets": [8],
                "width": "60px",
                "mRender": function (data, type, row) {
                    return '<a class="btn btn-primary btn-sm" href=/recarcasare/' + row._id + '>' + 'Detalii' + '</a>';
                }
            }],
        "order": [[1, 'desc']],
        "oLanguage": {
            "sSearch": "Cautare generala",
            "sLengthMenu": "Afiseaza _MENU_ inregistrari",
        }

    });


    $('#tabel_recarcasari .filters3 .FilterinputSearch').each(function () {
        var title = $('#tabel_recarcasari thead .FilterinputSearch').eq($(this).index()).text();
        $(this).html('<input type="text" placeholder="cautare" />');
    });

    var table = $('#tabel_recarcasari').DataTable();

    table.columns([0, 1, 2, 3, 4, 5, 6, 7]).eq(0).each(function (colIdx) {
        $('input', $('.filters3 th')[colIdx]).on('keyup change', function () {
            table
                .column(colIdx)
                .search(this.value)
                .draw();
        });
    });
});

var endYear = new Date(new Date().getFullYear(), 11, 31);

$('#pickyDatek, #pickyDatel, #pickyDatem, #pickyDaten, #pickyDateo').datepicker({
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
