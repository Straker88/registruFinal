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

                    if (data.data.username === undefined) {
                        app.isLoggedIn = false;
                        Auth.logout();
                        $location.path('/');
                    } else {
                        app.isLoggedIn = true;
                        app.username = data.data.username;

                        User.getPermission().then(function (data) {
                            if (data.data.permission === 'admin') {
                                app.authorized = true;
                                app.loadme = true;
                            } else if (data.data.permission === 'service') {
                                app.service = true;
                                app.loadme = true;
                            } else if (data.data.permission === 'plastie') {
                                app.plastie = true;
                                app.loadme = true;
                            } else if (data.data.permission === 'asamblare') {
                                app.asamblare = true;
                                app.loadme = true;
                            } else if (data.data.permission === 'user' && data.data.usernamePermission !== 'Logistic' && data.data.permission !== 'logistic') {
                                console.log(data.data.permission + ' ' + 'data permission --- user')
                                console.log(data.data.usernamePermission + ' ' + 'data UsernamePermission ---- user username')
                                app.user = true;
                                app.loadme = true;
                            } else if (data.data.usernamePermission === 'Logistic' && data.data.permission === 'logistic') {
                                console.log(data.data.permission + ' ' + 'data permission --- logistic user')
                                console.log(data.data.usernamePermission + ' ' + 'data UsernamePermission ---- logistic user username')

                                app.logistic = true;
                                app.loadme = true;

                            } else {
                                app.loadme = false;
                            }
                        });
                    }
                });

            } else {
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
                    app.usernamePermission = data.data.user.username;
                    app.permission = data.data.user.permission;
                    console.log(app.usernamePermission)
                    console.log(app.permission)

                    $timeout(function () {
                        if (app.username === 'Ciacan Iosif' || app.username === 'Nedelcu Daniel' && app.permission !== 'logistic') {
                            location.reload();
                            $location.path('/registruService/');
                            app.loginData = {};
                            app.successMsg = '';

                        }
                        else if (app.usernamePermission === 'Logistic' || app.permission === 'logistic') {
                            location.reload();
                            $location.path('/registruLogistic_service/');
                            app.loginData = {};
                            app.successMsg = '';

                        }
                        else if (app.username === 'Cristi Ghiburcea' && app.permission !== 'logistic') {
                            location.reload();
                            $location.path('/registruIte/');
                            app.loginData = {};
                            app.successMsg = '';

                        }
                        else if (app.username === 'Chiritoiu Iuliana' || app.username === 'Adrian Ionescu' && app.permission !== 'logistic') {
                            location.reload();
                            $location.path('/registruOlive/');
                            app.loginData = {};
                            app.successMsg = '';

                        }
                        else if (app.username === 'Madalin Ion' || app.username === 'muscallu' && app.permission !== 'logistic') {
                            location.reload();
                            $location.path('/registruService/');
                            app.loginData = {};
                            app.successMsg = '';

                        }

                        else {
                            location.reload();
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



