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
                    console.log(data.data.pacient);
                    if (data.data.success) {
                        var id_pac = data.data.pacient;
                        app.loading = false;
                        app.successMsg = data.data.message
                        $timeout(function () {

                            $location.path('/profilPacient/' + id_pac);
                            app.disabled = true;
                        }, 3000)

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


