angular.module('pacientControllers', ['userServices'])

    .controller('regPacientCtrl', function ($http, $location, $timeout, Pacient, $scope) {
        $scope.data_inregistrare = new moment().format('DD/MM/YYYY');

        var app = this;
        this.regPacient = function (regData, valid) {
            app.loading = true;
            app.errorMsg = false;
            app.disabled = false;


            if (valid) {
                Pacient.create(app.regData).then(function (data) {
                    if (data.data.success) {
                        app.loading = false;
                        app.successMsg = data.data.message
                        app.disabled = true;

                    } else {
                        app.loading = false;
                        app.errorMsg = data.data.message;
                        $timeout(function () {
                            app.errorMsg = false;
                        }, 3000)
                    }
                });
            } else {
                app.loading = false;
                app.errorMsg = 'Completeaza corect Formularul';

            }

        };
    });


