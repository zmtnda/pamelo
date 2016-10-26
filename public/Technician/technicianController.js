app.controller('technicianController', ['$scope', '$state','logService', '$http', '$rootScope', 'notifyDlg',function(scope, state, logSer, http, rscope, noDlg) {
    scope.user = {};
    scope.isShowField = 0;
    scope.isShowListServices = 0;
    scope.isShowPersonalField = 0;
    scope.listServices = [];
    scope.field = {};

    //Togglers:
    scope.showField = function(){scope.isShowField = 1;}
    scope.modifyTechnician = function(){scope.isShowPersonalField = 1;}
    scope.cancelField = function(){scope.isShowField = 0;}
    scope.cancelListServices = function(){scope.isShowListServices = 0;}
    scope.cancelModify = function(){scope.isShowPersonalField = 0;}
    //Toggle a list of services by a http call
    scope.showListServices = function()
    {
        http.get("Serv/" + rscope.loggedUser.id)
        .then(function(response){
          console.log("response.data: " + JSON.stringify(response));
          scope.listServices = response.data;
          scope.isShowListServices = 1;
        }).
        catch(function(err){noDlg.show(scope, err, "Error")});
    }

    scope.postModify = function()
    {
        scope.isShowPersonalField = 0;
        http.put("User/"+rscope.loggedUser.id, scope.user)
        .then(function(){
          noDlg.show(scope, "Please re-login to see the changes", "NOTE!!!");
          //state.reload();
        })
        .catch(function(err){noDlg.show(scope, err, "Error")});
    }
    //Delete a Technician
    scope.deleteTechnician = function(){

        http.delete("User/" + rscope.loggedUser.id)
        .then(function(){
            state.go('home');
            logSer.logout();
        })
        .catch(function(err){noDlg.show(scope, err, "Error")});
    }
    //Write a call to do post service
    scope.postService = function()
    {
        http.post("User/" + rscope.loggedUser.id + "/Serv", scope.field)
        .then(function(){state.reload()})
        .catch(function(err){noDlg.show(scope, err, "Error")});
    }

}]);
