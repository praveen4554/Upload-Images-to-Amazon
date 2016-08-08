var app = angular.module('myeditView', ['ngFileUpload','ngSanitize','ngMaterial','ngMessages','ui.bootstrap']);
app.controller('EditController',['$scope','$http','Upload','$window',function ($scope,$http,Upload,$window) {
 $http.get('/newdetails').then(function(req,res){
 	$scope.idval=[];
		$scope.tevents=req.data.details;
		for(var i=0;i<$scope.tevents.data.length;i++){
			console.log(i+":"+$scope.tevents.data.length);
			if($scope.tevents.data[i].heading!=undefined){
				$scope.idval[i]=$scope.tevents.data[i].heading;
			}
			else if($scope.tevents.data[i].para!=undefined){
				$scope.idval[i]=$scope.tevents.data[i].para;
			}
			else if($scope.tevents.data[i].url!=undefined){
				$scope.idval[i]=$scope.tevents.data[i].url;
				$scope.imgsrc=$scope.tevents.data[i].url;
			}
			if(i==$scope.tevents.data.length-1){
		$scope.events=$scope.tevents;
		console.log($scope.idval);
		$scope.len=$scope.events.data.length-1;
			}
		}
		console.log($scope.tevents.data.length);
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
		console.log(events.created_date+"1");
		for(var i=0;i<=len;i++){
			if(events.data[i].date!=undefined){
		updated.push({"date":events.data[i].date});
			}
			else if(events.data[i].heading!=undefined){
			    console.log("ok");
				updated.push({"heading":$scope.idval[i]});
			}
			else if(events.data[i].para!=undefined){
				updated.push({"para":$scope.idval[i]});
			}
			else if(events.data[i].url!=undefined){
				updated.push({"url":$scope.idval[i]})
			}
		}
		$http.post('/update',{"rand":events.rand,"data":updated,"created_date":events.created_date}).then(function(req,res){
			console.log("success");
			$scope.events=[];
		}).catch(function(error) {
  					console.log(error);
				});
	}
}]);