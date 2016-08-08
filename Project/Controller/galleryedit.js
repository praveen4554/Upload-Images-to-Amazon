var app = angular.module('mygalleryeditView', ['ngFileUpload','ngSanitize','ngMaterial','ngMessages','ui.bootstrap']);
app.controller('galleryController',['$scope','$http','Upload','$window',function ($scope,$http,Upload,$window) {
 $http.get('/newdetails').then(function(req,res){
 	$scope.idval=[];
 	var i=0;
		$scope.tevents=req.data.details;
		console.log($scope.tevents);
			if($scope.tevents.data.Heading!=undefined){
				$scope.idval[i]=$scope.tevents.data.Heading;
				i++;
			}
			if($scope.tevents.data.url!=undefined){
				$scope.idval[i]=$scope.tevents.data.url;
				$scope.imgsrc=$scope.tevents.data.url;
				i++;
			}
			$scope.len=$scope.idval.length-1;
		console.log($scope.idval.length);
	});
 $scope.submit=function(file,index){
 	$scope.data=file;
 	$scope.index=index;
       $scope.uploadNow($scope.data,$scope.index);
 }
 $scope.img=function(index){
		$http.post('/getimages',{"a":"a"}).then(function(req,res){
			$scope.imgsrc="https://s3-ap-southeast-1.amazonaws.com/photogridsanjay/"+req.data.Images;
			$scope.idval[index]=$scope.imgsrc;
			console.log($scope.imgsrc);
		});
	}
 $scope.uploadNow = function (file,index) {
        $scope.index=index;
    	var uploadurl='/upload';
    	var uploadPic=file;
    	var form=new FormData();
    	console.log(uploadPic);
        Upload.upload({
            url: '/imgupload', //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                $scope.img($scope.index);
            } else {
                $window.alert('an error occured');
            }
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function (evt) { 
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
    };
    $scope.update=function(events,len){
		var updated=[];
		var j=2;
		var i=0;
		while(j>0){
			if(events.data.Heading!=undefined){
			    console.log("ok");
				updated.push({"Heading":$scope.idval[i]});
				i++;j--;
			}
			if(events.data.url!=undefined){
				updated.push({"url":$scope.idval[i]});
				i++;j--;
			}
			}
		$http.post('/updateimg',{"rand":events.rand,"data":updated,"created_date":events.created_date}).then(function(req,res){
			console.log("success");
			$scope.tevents=[];
		}).catch(function(error) {
  					console.log(error);
				});
	}
}]);