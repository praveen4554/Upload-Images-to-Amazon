app.controller('detailsController',function ($scope,$http) {
	$http.get('/newdetails').then(function(req,res){
		$scope.tevents=req.data.details;
		console.log($scope.tevents);
	});
});