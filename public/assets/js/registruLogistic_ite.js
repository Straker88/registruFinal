//--------------------- Registru Logistic
var token = window.localStorage.getItem('token');


$(document).ready(function () {
    var oTable = $('#tabel').dataTable({
        "ajax": {
            "url": "api/registruLogistic_ite/",
            headers: {
                'x-access-token': token
            },
            "dataType": "json",
            "contentType": "application/json; charset=utf-8",
            "type": "GET",
            "dataSrc": "ite",
        },
        "stateSave": false,
        "pageLength": 25,
        "searching": true,
        "pagination": true,
        columns: [
            { data: "nr_comanda_ite" },
            { data: "cabinet" },
            { data: "data_inregistrare" },
            { data: "log_sosit" },
            { data: "log_plecat" },
            { data: "log_preluat" },
            { data: "log_trimis" },
            { data: "ite_inregistrat_pacient" },
            { data: "model_aparat" },
            { data: "" },
            { data: "_id" }
        ],
        columnDefs: [
            {
                "targets": 1,
                "orderable": true,
                type: 'date-eu', targets: ([2]),
            },
            {
                "targets": [10],
                "visible": false,
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

    var startdate;
    var enddate;

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
        function (start, end, label) {
            var s = moment.utc(start.toISOString());
            var e = moment.utc(end.toISOString());
            startdate = s.format("YYYY-MM-DD");
            enddate = e.format("YYYY-MM-DD");
        });
    $('#reportrange').on('apply.daterangepicker', function (ev, picker) {
        startdate = picker.startDate.format('YYYY-MM-DD');
        enddate = picker.endDate.format('YYYY-MM-DD');

        $.fn.dataTableExt.afnFiltering.push(
            function (oSettings, aData, iDataIndex) {
                if (startdate != undefined) {
                    var coldate = aData[2].split("/");
                    var d = new Date(coldate[2], coldate[1] - 1, coldate[0]);
                    var date = moment(d.toISOString());
                    date = date.format("YYYY-MM-DD");
                    dateMin = startdate.replace(/-/g, "");
                    dateMax = enddate.replace(/-/g, "");
                    date = date.replace(/-/g, "");

                    if (dateMin == "" && date <= dateMax) {
                        return true;
                    }
                    else if (dateMin == "" && date <= dateMax) {
                        return true;
                    }
                    else if (dateMin <= date && "" == dateMax) {
                        return true;
                    }
                    else if (dateMin <= date && date <= dateMax) {
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

    table.columns([0, 1, 3, 4, 5, 6, 7, 8]).eq(0).each(function (colIdx) {
        $('input', $('.filters th')[colIdx]).on('keyup change', function () {
            table
                .column(colIdx)
                .search(this.value)
                .draw();
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

});


//--------------------- Registru Logistic
