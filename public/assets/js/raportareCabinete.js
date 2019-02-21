$(document).ready(function () {


    $('#tabel').DataTable({
        dom: "Bfrtip",
        pageLength: 100,
        ajax: function (data, callback, settings) {

            $.ajax({
                url: 'api/raportareCabinete',
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
                        data: data,

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
                data: "cabinet",
                "defaultContent": "<i>0</i>"
            },
            {
                data: "counterServ",
                "defaultContent": "<i>0</i>"
            },
            {
                data: "counterRec",
                "defaultContent": "<i>0</i>"
            },
            {
                data: "counterIte",
                "defaultContent": "<i>0</i>"
            },

            {
                data: "counterOliv",
                "defaultContent": "<i>0</i>"
            },
            {
                data: "counterElastica",
                "defaultContent": "<i>0</i>"
            },
            {
                data: "counterDura",
                "defaultContent": "<i>0</i>"
            },
        ],
    });

});

$('#refresh').on('click', function () {
    $.ajax({

        url: "api/raportareCabinete",
        data: {
            dataFiltru: $("#filtru_luna").val(),
            // RecordsStart: data.start,
            // PageSize: data.length
        },

        success: function (json) {
            //parse JSON data
            var data = json;

            //Get Datatable API
            var table = $('#tabel').DataTable();

            //Clear the table
            table.clear();

            //Row data array is in 'data' object
            //Add the data array 'data.data' and redraw the table
            table.rows.add(data).draw();



        }
    });
});

