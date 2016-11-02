app.controller('technicianController', ['$scope', '$state','logService', '$http', '$rootScope', 'notifyDlg',function(scope, state, logSer, http, rscope, noDlg) {
    scope.user = {};
    scope.viewEnum = {
      NONE: 0,
      PROVIDE: 1,
      SERVICES: 2,
      PERSONAL: 3
    };

    scope.isShowProvide = 0;
    scope.isShowListServices = 0;
    scope.isShowPersonalField = 0;
    scope.listServices = [];
    scope.field = {};

    scope.switchView = function(newView) {
      switch (newView) {
        case scope.viewEnum.NONE:
          scope.isShowPersonalField = 0;
          scope.isShowListServices = 0;
          scope.isShowProvide = 0;
          break;
        case scope.viewEnum.PERSONAL:
          scope.isShowPersonalField = 1;
          scope.isShowListServices = 0;
          scope.isShowProvide = 0;
          break;
        case scope.viewEnum.SERVICES:
          scope.isShowListServices = 1;
          scope.isShowPersonalField = 0;
          scope.isShowProvide = 0;
          break;
        case scope.viewEnum.PROVIDE:
          scope.isShowProvide = 1;
          scope.isShowListServices = 0;
          scope.isShowPersonalField = 0;
          break;
      }
    }

    // Toggle view for viewing provided services
    scope.showProvide = function(){
      if (scope.isShowProvide == 0) {
        scope.switchView(scope.viewEnum.PROVIDE);
      } else {
        scope.switchView(scope.viewEnum.NONE);
      }
    }

    // Toggle view for modifying personal info
    scope.modifyTechnician = function(){
      if (scope.isShowPersonalField == 0) {
        scope.switchView(scope.viewEnum.PERSONAL);
      } else {
        scope.switchView(scope.viewEnum.NONE);
      }
    }

    //Toggle a list of services by a http call
    scope.showListServices = function()
    {
      if (scope.isShowOrderHistory == 1) {
        scope.switchView(scope.viewEnum.NONE);
      } else {
        http.get("Serv/" + rscope.loggedUser.id)
        .then(function(response){
          console.log("response.data: " + JSON.stringify(response));
          scope.listServices = response.data;
          scope.switchView(scope.viewEnum.SERVICES);
        }).
        catch(function(err){noDlg.show(scope, err, "Error")});
      }
    }

    scope.postModify = function()
    {
        scope.switchView(scope.viewEnum.NONE);
        http.put("User/"+rscope.loggedUser.id, scope.user)
        .then(function(){
          noDlg.show(scope, "Please re-login to see the changes", "NOTE!!!");
          //state.reload();
        })
        .catch(function(err){noDlg.show(scope, err, "Error")});
    }

    scope.deleteService = function(id){
      http.delete("Serv/" + id)
      .then(function(){
          console.log("reloading");
          //state.reload();
          scope.isShowListServices = 0;
          scope.showListServices();
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
