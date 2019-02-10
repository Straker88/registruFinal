angular.module('mainController', ['authServices', 'userServices'])

    .controller('mainCtrl', function ($http, Auth, $timeout, $location, $rootScope, $window, $interval, $route, User, AuthToken) {
        var app = this;

        app.loadme = false;

        var exit = function () {
            $timeout(function () {
                Auth.logout();
                $location.path('/login');
                app.isLoggedIn = false;
            }, 1000)

        };
        // app.checkSession = function () {
        //     if (Auth.isLoggedIn()) {
        //         app.checkingSession = true;
        //         var interval = $interval(function () {
        //             var token = $window.localStorage.getItem('token');
        //             if (token === null) {
        //                 $interval.cancel(interval);
        //             } else {
        //                 self.parseJwt = function (token) {
        //                     var base64Url = token.split('.')[1];
        //                     var base64 = base64Url.replace('-', '+').replace('_', '/');
        //                     return JSON.parse($window.atob(base64));
        //                 };
        //                 var expireTime = self.parseJwt(token);
        //                 var timeStamp = Math.floor(Date.now() / 1000);
        //                 var timeCheck = expireTime.exp - timeStamp;
        //                 if (timeCheck <= 1800) {
        //                     $interval.cancel(interval);
        //                 }
        //             }
        //         }, 28800000);
        //     }
        // };

        // app.checkSession();

        // app.renewSession = function () {
        //     app.choiceMade = true;
        //     User.renewSession(app.username).then(function (data) {
        //         if (data.data.success) {
        //             AuthToken.setToken(data.data.token);
        //         } else {
        //             app.modalBody = data.data.message;
        //         }
        //     });
        // };


        $rootScope.$on('$routeChangeStart', function () {

            if (Auth.isLoggedIn()) {
                Auth.getUser().then(function (data) {
                    if (data.data.username === undefined) {
                        app.isLoggedIn = false;
                        Auth.logout();
                        $location.path('/');
                    } else {
                        app.username = data.data.username;
                        app.isLoggedIn = true;
                        User.getPermission().then(function (data) {
                            if (data.data.permission === 'user') {
                                app.user = true;
                                app.loadme = true;
                            }
                            else if (data.data.permission === 'service') {
                                app.service = true;
                                app.loadme = true;
                            } else if (data.data.permission === 'plastie') {
                                app.plastie = true;
                                app.loadme = true;
                            } else if (data.data.permission === 'colete') {
                                app.colete = true;
                                app.loadme = true;
                            } else if (data.data.permission === 'asamblare') {
                                app.asamblare = true;
                                app.loadme = true;
                            } else if (data.data.permission === 'admin') {
                                app.authorized = true;
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
        });
        this.doLogin = function (loginData) {
            app.loading = true;
            app.errorMsg = false;

            Auth.login(app.loginData).then(function (data) {
                app.username = app.loginData.username;
                if (data.data.success) {
                    app.loading = false;
                    app.successMsg = data.data.message + '...Se incarca';
                    app.usernamePermission = data.data.username;
                    app.permission = data.data.permission;
                    console.log(app.usernamePermission + ' ' + '-' + 'Username')
                    console.log(app.permission + ' ' + '-' + 'Permission')

                    $timeout(function () {
                        location.reload();
                        $location.path('/');
                        app.loginData = '';
                        app.successMsg = false;
                        app.disabled = false;

                        // if (app.username === 'Ciacan Iosif' || app.username === 'Nedelcu Daniel') {
                        //     // location.reload();
                        //     $location.path('/registruService/');
                        //     app.loginData = {};
                        //     app.successMsg = '';

                        // }
                        // else if (app.usernamePermission === 'Logistic' && app.permission === 'logistic') {
                        //     // location.reload();
                        //     $location.path('/registruLogistic_service/');
                        //     app.loginData = {};
                        //     app.successMsg = '';

                        // }
                        // else if (app.username === 'Cristi Ghiburcea') {
                        //     // location.reload();
                        //     $location.path('/registruIte/');
                        //     app.loginData = {};
                        //     app.successMsg = '';

                        // }
                        // else if (app.username === 'Chiritoiu Iuliana' || app.username === 'Adrian Ionescu') {
                        //     // location.reload();
                        //     $location.path('/registruOlive/');
                        //     app.loginData = {};
                        //     app.successMsg = '';

                        // }
                        // else if (app.username === 'Madalin Ion' || app.username === 'muscallu') {
                        //     // location.reload();
                        //     $location.path('/registruService/');
                        //     app.loginData = {};
                        //     app.successMsg = '';

                        // }
                        // else {
                        //     location.reload();
                        //     $location.path('/profil/' + app.username);
                        //     app.loginData = {};
                        //     app.successMsg = '';

                        // }
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



