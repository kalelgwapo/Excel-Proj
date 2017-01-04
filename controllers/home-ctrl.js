angular.module('Excel.Home.Ctrl', ['ngResource']).
controller('homeController', function ($scope) {
    $scope.entry = {};
    entryArray = [];
   // $scope.resibos = [];
   // var resibosArray = [];
    $scope.resibos = JSON.parse(localStorage.getItem("resibos"));
    var resibosArray = JSON.parse(localStorage.getItem("resibosArray"));
    console.log(resibosArray);
    var csvContent = "data:text/csv;charset=utf-8,";
    
    $scope.downloadCSV = function () {
        console.log($scope.resibos);
        resibosArray.forEach(function(infoArray, index){

        dataString = infoArray.join(",");
        csvContent += index < resibosArray.length ? dataString+ "\n" : dataString;

        });  
        
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "my_resibo.csv");
        document.body.appendChild(link); // Required for FF

        link.click(); // This will download the data file named "my_data.csv".
    }

    
    $scope.addEntry = function () {
        console.log('test');
        if ($scope.entry != {})
            {
                var date = new Date($scope.entry.date);
                //entryArray.push((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
                entryArray.push($scope.entry.date);
                entryArray.push($scope.entry.supplier);
                entryArray.push($scope.entry.OR);
                entryArray.push($scope.entry.TIN);
                entryArray.push($scope.entry.amount);
                entryArray.push($scope.entry.rep);
                entryArray.push($scope.entry.transpo);
                $scope.resibos.push($scope.entry);
                if(resibosArray == null)
                    resibosArray = [];
                resibosArray.push(entryArray);
                localStorage.setItem("resibos", JSON.stringify($scope.resibos));
                localStorage.setItem("resibosArray", JSON.stringify(resibosArray));
            }
        entryArray = [];
        $scope.entry = {};
    };
    
    $scope.remove = function (idx) {
        $scope.resibos.splice(idx, 1);
        resibosArray.splice(idx, 1);
            localStorage.setItem("resibos", JSON.stringify($scope.resibos));
                localStorage.setItem("resibosArray", JSON.stringify(resibosArray));
    }
});