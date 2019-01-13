angular.module('mainController', ['authServices', 'userServices'])

    .controller('mainCtrl', function (Auth, $timeout, $location, $rootScope, $interval, $window, $route, User, AuthToken, $scope) {
        var app = this;

        app.loadme = false;

        var exit = function (option) {
            app.choiceMade = false;
            app.hideButton = false;


            ($timeout(function () {
                Auth.logout();
                $location.path('/login');
                $route.reload();
            }, 1000)
            )
        };

        app.renewSession = function () {
            app.choiceMade = true;
            User.renewSession(app.username).then(function (data) {
                if (data.data.success) {
                    AuthToken.setToken(data.data.token);
                } else {
                    app.modalBody = data.data.message;
                }
            });
        };

        $rootScope.$on('$routeChangeStart', function () {

            if (Auth.isLoggedIn()) {
                app.isLoggedIn = true;
                Auth.getUser().then(function (data) {
                    app.username = data.data.username;
                    // app.useremail = data.data.email;

                    User.getPermission().then(function (data) {

                        if (data.data.permission === 'admin') {
                            app.authorized = true;
                            app.loadme = true;
                        } else {
                            app.loadme = false;
                        }
                        if (data.data.permission === 'service') {
                            app.service = true;
                            app.loadme = true;
                        } else {
                            app.loadme = false;
                        }
                        if (data.data.permission === 'plastie') {
                            app.plastie = true;
                            app.loadme = true;
                        } else {
                            app.loadme = false;
                        }
                        if (data.data.permission === 'asamblare') {
                            app.asamblare = true;
                            app.loadme = true;
                        } else {
                            app.loadme = false;
                        }
                        if (data.data.permission === 'user') {
                            app.user = true;
                            app.loadme = true;
                        } else {
                            app.loadme = false;
                        }

                        if (data.data.permission === 'logistic') {
                            app.logistic = true;
                            app.loadme = true;
                        } else {
                            app.loadme = false;
                        }

                    });
                });
            } else {
                app.service = '';
                app.isLoggedIn = false;
                app.username = '';
                app.loadme = false;
            }
            if ($location.hash() == '_=_') $location.hash(null);

        });

        this.doLogin = function (loginData) {
            app.loading = true;
            app.errorMsg = false;

            Auth.login(app.loginData).then(function (data) {
                app.username = app.loginData.username;
                if (data.data.success) {
                    app.loading = false;
                    app.successMsg = data.data.message + '...Se incarca';
                    $timeout(function () {
                        if (app.username === 'Ciacan Iosif' || app.username === 'Nedelcu Daniel') {
                            $location.path('/registruService/');
                            app.loginData = {};
                            app.successMsg = '';

                        }
                        else if (app.username === 'Logistic') {
                            $location.path('/registruLogistic/');
                            app.loginData = {};
                            app.successMsg = '';

                        }
                        else if (app.username === 'Cristi Ghiburcea') {
                            $location.path('/registruIte/');
                            app.loginData = {};
                            app.successMsg = '';

                        }
                        else if (app.username === 'Chiritoiu Iuliana' || app.username === 'Adrian Ionescu') {
                            $location.path('/registruOlive/');
                            app.loginData = {};
                            app.successMsg = '';

                        }
                        else {
                            $location.path('/profil/' + app.username);
                            app.loginData = {};
                            app.successMsg = '';
                        }
                    }, 2000);
                } else {
                    app.loading = false;
                    app.errorMsg = data.data.message;
                }
            });
        };

        app.logout = function () {
            exit();
        };


    });



