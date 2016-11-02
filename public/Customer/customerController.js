app.controller('customerController', ['$scope', '$state','registerPopService', '$http', 'notifyDlg', '$rootScope', 'logService',function(scope, state, regPopSer, http, noDlg, rscope, logSer) {
    scope.user = {};
    scope.viewEnum = {
      NONE: 0,
      PERSONAL: 1,
      SERVICES: 2,
      HISTORY: 3
    };

    scope.isShowPersonalField = 0;
    scope.isShowListServices = 0;
    scope.isShowOrderHistory = 0;
    scope.listServices = [];
    scope.field = {};
    scope.hists = [];

    scope.switchView = function(newView) {
      switch (newView) {
        case scope.viewEnum.NONE:
          scope.isShowPersonalField = 0;
          scope.isShowListServices = 0;
          scope.isShowOrderHistory = 0;
          break;
        case scope.viewEnum.PERSONAL:
          scope.isShowPersonalField = 1;
          scope.isShowListServices = 0;
          scope.isShowOrderHistory = 0;
          break;
        case scope.viewEnum.SERVICES:
          scope.isShowListServices = 1;
          scope.isShowPersonalField = 0;
          scope.isShowOrderHistory = 0;
          break;
        case scope.viewEnum.HISTORY:
          scope.isShowOrderHistory = 1;
          scope.isShowListServices = 0;
          scope.isShowPersonalField = 0;
          break;
      }
    }

    scope.modifyCustomer = function(){
      if (scope.isShowPersonalField == 0) {
        scope.switchView(scope.viewEnum.PERSONAL);
      } else {
        scope.switchView(scope.viewEnum.NONE);
      }
    }

    scope.showOrderHistory = function(){
        if (scope.isShowOrderHistory == 1) {
          scope.switchView(scope.viewEnum.NONE);
        } else {
          scope.switchView(scope.viewEnum.HISTORY);
          http.get('User/serviceHistory/all')
          .then(function(res){
                scope.hists = res.data;
          })
          .catch(function(err){noDlg.show(scope, err, "Error")});
      }
    }

    scope.postModify = function(){
        //modify!!
        scope.switchView(scope.viewEnum.NONE);
        http.put("User/"+rscope.loggedUser.id, scope.user)
        .then(function(){
          scope.user = {};
          noDlg.show(scope, "Please re-login to see the changes", "NOTE!!!","Message");
          //state.();
        })
        .catch(function(err){noDlg.show(scope, err, "Error")});
    }

    scope.order = function(id){
        http.put('Serv/' + id + '/Order')
        .then(function(){
          state.reload();
        })
        .catch(function(err){noDlg.show(scope, err, "Error")});
    }

    scope.deleteCustomer = function(){
        if (window.confirm("Are you sure you want to delete your account?"))
        {
            http.delete("User/" + rscope.loggedUser.id)
            .then(function () {
                state.go('home');
                logSer.logout();
            })
            .catch(function (err) { noDlg.show(scope, err, "Error") });
        }
    }

    scope.showListServices = function(){
      if (scope.isShowListServices == 1) {
        scope.switchView(scope.viewEnum.NONE);
      } else {
        scope.switchView(scope.viewEnum.SERVICES);
        http.get('Serv/')
        .then(function(response) {
           scope.listServices = response.data;
        })
        .catch(function(err){noDlg.show(scope, err, "Error")});
      }
    }
}])
