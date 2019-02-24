$(document).ready(function () {

    table = $('#tabel').DataTable({
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
                        data: data,
                    });
                },
                error: function (jqXhr, textStatus, errorThrown) {
                }
            });
        },
        'processing': true,
        'language': {
            "sSearch": "Cautare",
            "sLengthMenu": "Afiseaza _MENU_ inregistrari",
            'loadingRecords': '&nbsp;',
            'processing': '<span style="width:100%;"><img src="/assets/img/clarfon_loader.gif"></span>'
        },
        serverSide: false,
        "ordering": false,
        buttons: [
            { extend: 'excelHtml5', text: 'Exporta in Excel' }
        ],
        columns: [
            {
                data: "executant",
                "defaultContent": "<i>0</i>"
            },
            {
                data: "counter",
                "defaultContent": "<i>0</i>"
            },
        ],
    });


    $('#refresh').on('click', function () {
        $.ajax({

            url: "api/raportareTehnic",
            data: {
                dataFiltru: $("#filtru_luna").val(),
            },

            success: function () {
                table.ajax.reload();

            }
        });
    });
});

