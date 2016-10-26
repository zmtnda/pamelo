app.controller('registerController', ['$scope', '$state', 'goToServices','logService', '$http', 'notifyDlg', function(scope, state, goSer, logSer, http, noDlg) {
    scope.user = {};
    scope.submitted = 0;

    scope.postUser = function(){
        console.log(JSON.stringify(scope.user));
        //Do a post caToll
        http.post('Ssns/', {"email":"Admin@11.com", "password":"password"})
        .then(function(){
          scope.submitted = 1;
          http.post('User/', scope.user);
        })
        .catch(function(err){noDlg.show(scope, err, "Error")});
    }

}])
