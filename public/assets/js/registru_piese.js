//--------------------- Registru Profil Service
var token = window.localStorage.getItem('token');

$(document).ready(function () {
    $('#tabel_piese').dataTable({
        "ajax": {
            "url": "api/registruPiese/",
            "dataType": "json",
            "contentType": "application/json; charset=utf-8",
            "type": "GET",
            "dataSrc": "service",
            headers: {
                'x-access-token': token,
            },
        },
        "stateSave": false,
        "pageLength": 100,
        "searching": true,
        "pagination": true,
        "autoWidth": false,
        columns: [
            { data: "finalizat_reparatie" },
            { data: "cabinet" },
            { data: "piese_inlocuite" },
            { data: "cod_componente" },
        ],

        "order": [[0, 'desc']],
        "oLanguage": {
            "sSearch": "Cautare generala",
            "sLengthMenu": "Afiseaza _MENU_ inregistrari",
        }
    });

    $('#tabel_piese .filters .FilterinputSearch').each(function () {
        var title = $('#tabel_piese thead .FilterinputSearch').eq($(this).index()).text();
        $(this).html('<input type="text" placeholder="cautare" />');
    });

    var table = $('#tabel_piese').DataTable();

    table.columns([0, 1, 2, 3]).eq(0).each(function (colIdx) {
        $('input', $('.filters th')[colIdx]).on('keyup change', function () {
            table
                .column(colIdx)
                .search(this.value)
                .draw();
        });
    });

    var endYear = new Date(new Date().getFullYear(), 11, 31);

    $('#pickyDate').datepicker({
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

});


//--------------------- Registru Profil Service
