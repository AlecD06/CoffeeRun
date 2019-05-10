'use strict';
var FORM_SELECTOR = '[data-coffee-order="form"]';
var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
var SERVER_URL = 'http://coffeerun-v2-rest-api.gerokuapp.com/ap/coffeeorders';
var App = window.App;
var Truck = App.Truck;
var DataStore = App.DataStore;
var RemoteDataStore = App.RemoteDataStore;
var FormHandler = App.FormHandler;
var Validation = App.Validation;
var CheckList = App.CheckList;
var remoteDS = new RemoteDataStore(SERVER_URL);
var myTruck = new Truck('ncc-1701', remoteDS);
var checkList = new CheckList(CHECKLIST_SELECTOR);
checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
window.myTruck = myTruck;
var formHandler = new FormHandler(FORM_SELECTOR);

formHandler.addSubmitHandler(function (data)
{
   return myTruck.createOrder(data)
        .then(function(){
            checkList.addRow(data);
        },
        function(){
            alert('Server unreachable. Try again later.');
        });
});

formHandler.addInputHandler(Validation.isCompanyEmail);

myTruck.printOrders(checkList.addRow.bind(checkList));
console.log(formHandler);