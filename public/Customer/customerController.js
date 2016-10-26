app.controller('customerController', ['$scope', '$state','registerPopService', '$http', 'notifyDlg', '$rootScope', 'logService',function(scope, state, regPopSer, http, noDlg, rscope, logSer) {
    scope.user = {};
    scope.isShowPersonalField = 0;
    scope.isShowListServices = 0;
    scope.isShowOrderHistory = 0;
    scope.listServices = [];
    scope.field = {};
    scope.hists = [];

    scope.showListServices = function(){scope.isShowListServices = 1;}
    scope.ShowOrderHistory = function(){scope.isShowOrderHistory = 1;}
    scope.modifyCustomer = function(){scope.isShowPersonalField = 1;}
    scope.cancelListServices = function(){scope.isShowListServices = 0;}
    scope.cancelOrderHistory = function(){scope.isShowOrderHistory = 0;}
    scope.cancelModify = function(){scope.isShowPersonalField = 0;}

    scope.showOrderHistory = function(){
        scope.isShowOrderHistory = 1;
        http.get('User/serviceHistory/all')
        .then(function(res){
              scope.hists = res.data;
        })
        .catch(function(err){noDlg.show(scope, err, "Error")});
    }

    scope.postModify = function(){
        //modify!!
        scope.isShowPersonalField = 0;
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

      http.delete("User/" + rscope.loggedUser.id)
      .then(function(){
          state.go('home');
          logSer.logout();
      })
      .catch(function(err){noDlg.show(scope, err, "Error")});
    }

    scope.showListServices = function(){
      scope.isShowListServices = 1;
      http.get('Serv/')
      .then(function(response) {
         scope.listServices = response.data;
      })
      .catch(function(err){noDlg.show(scope, err, "Error")});

    }
}])
