angular.module('registruApp', ['appRoutes', 'userControllers', 'pacientControllers', 'serviceControllers', 'olivaControllers', 'iteControllers', 'userServices', 'mainController', 'authServices', 'managementController'])

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptors');
    });


