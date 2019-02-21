
function service_loader() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'api/raportareTehnic',
        data: {
            dataFiltru: $("#filtru_luna").val(),
            // RecordsStart: data.start,
            // PageSize: data.length
        },

        "dataSrc": "raportService",
        success: function (data) {
            var table = $('#tabel').DataTable();
            table.clear().draw();
            table.rows.add(data.raportService).draw();

        }
    });
}

$('#tabelService').DataTable({
    dom: "Bfrtip",
    pageLength: 100,
    ajax: function (data, callback, settings) {

        $.ajax({
            url: 'api/raportareTehnic',
            // dataType: 'text',
            type: 'get',
            "dataSrc": "",
            contentType: 'application/x-www-form-urlencoded',
            data: {
                dataFiltru: $("#filtru_luna").val(),
                // RecordsStart: data.start,
                // PageSize: data.length
            },
            success: function (data, textStatus, jQxhr) {
                // var data1 = data.serviceTotal;
                callback({
                    data: data.raportService,

                    // draw: data.draw,

                    // recordsTotal: data.TotalRecords,
                    // recordsFiltered: data.RecordsFiltered
                });
                // console.log(data)
            },
            error: function (jqXhr, textStatus, errorThrown) {
            }
        });
    },
    serverSide: false,
    "ordering": false,
    columns: [
        {
            data: "executant",
            "defaultContent": "<i>0</i>"
        },
        {
            data: "counterServ",
            "defaultContent": "<i>0</i>"
        },
    ],
});


$('#refreshService').on('click', function () {
    $.ajax({

        url: "api/raportareTehnic",
        data: {
            dataFiltru: $("#filtru_luna").val(),
        },

        success: function (json) {
            var data = json.raportService;
            var table = $('#tabelService').DataTable();
            table.clear();
            table.rows.add(data).draw();
        }
    });
});

// Raport Plastie ------------------------------------------------------------------------------


function plastie_loader() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'api/raportareTehnic',
        data: {
            dataFiltru: $("#filtru_luna").val(),
        },

        "dataSrc": "raportPlastie",
        success: function (data) {
            var table = $('#tabel').DataTable();
            table.clear().draw();
            table.rows.add(data.raportPlastie).draw();

        }
    });
}

$('#tabelPlastie').DataTable({
    dom: "Bfrtip",
    pageLength: 100,
    ajax: function (data, callback, settings) {

        $.ajax({
            url: 'api/raportareTehnic',
            type: 'get',
            "dataSrc": "",
            contentType: 'application/x-www-form-urlencoded',
            data: {
                dataFiltru: $("#filtru_luna").val(),
            },
            success: function (data, textStatus, jQxhr) {
                callback({
                    data: data.raportPlastie,
                });
            },
            error: function (jqXhr, textStatus, errorThrown) {
            }
        });
    },
    serverSide: false,
    "ordering": false,
    columns: [
        {
            data: "executant",
            "defaultContent": "<i>0</i>"
        },
        {
            data: "counterOliv",
            "defaultContent": "<i>0</i>"
        },
    ],
});


$('#refreshPlastie').on('click', function () {
    $.ajax({
        url: "api/raportareTehnic",
        data: {
            dataFiltru: $("#filtru_luna").val(),
        },

        success: function (json) {
            var data = json.raportPlastie;
            var table = $('#tabelPlastie').DataTable();
            table.clear();
            table.rows.add(data).draw();
        }
    });
});