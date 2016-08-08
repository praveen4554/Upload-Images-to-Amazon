var app = angular.module('myApp', ['ngFileUpload','ngSanitize','ngMaterial','ngMessages','ui.bootstrap']);
app.controller('MainController',['$scope','$http','Upload','$window',function ($scope,$http,Upload,$window) {
	$scope.num=-1;
	$scope.number=-1;
	$scope.admin={
"Adminpage": [{"id":"0","name":"Home"},{"id":"1","name":"Events","Subpage":[{"name":"AttachEvents"},{"name":"ManageEvents"}]},{"id":"2","name":"Company"},{"id":"3","name":"Students"},{"id":"4","name":"Employees"},{"id":"5","name":"Gallery","Subpage":[{"name":"AttachGallery"},{"name":"ManageGallery"}]}]};
$scope.Company={"CompanyDetails":[{"id":"1","cname":"Evontex","ename":"praveen","phone":"9848022338","address":"Hyd"},{"id":"2","cname":"Evontex","ename":"sanjai","phone":"9849028538","address":"Hyd"}]};
$scope.Student={"StudentInfo":[{"id":"1","sname":"Praveen","Qualification":"M.Tech","phone":"9848022338","address":"Hyd"},{"id":"2","sname":"Sanjai","Qualification":"M.Tech","phone":"9849028538","address":"Hyd"}]};
$scope.Employee={"EmployeeDetails":[{"id":"1","ename":"praveen","Qualification":"M.Tech","phone":"9848022338","address":"Hyd"},{"id":"2","ename":"sanjai","Qualification":"M.Tech","phone":"9849028538","address":"Hyd"}]};
	$scope.attachevent=false;
	$scope.manageevent=false;
	$scope.myInterval = 3000;
	$scope.changeShow=function(index){
			$scope.attachevent=false;
			$scope.attachgal=false;
			$scope.managegal=false;
			$scope.manageevent=false;
			$scope.CompnayDetails=false;
			$scope.StudentDetails=false;
			$scope.EmployeeData=false;
		if(index!=1)
		{
			$scope.num=-1;
		}
		else
		{
		$scope.num=index;
		}
		if(index==2){
			$scope.CompnayDetails=true;
			$scope.StudentDetails=false;
			$scope.EmployeeData=false;
		}else if(index==3){
			$scope.CompnayDetails=false;
			$scope.StudentDetails=true;
			$scope.EmployeeData=false;
		}else if(index==4){
			$scope.CompnayDetails=false;
			$scope.StudentDetails=false;
			$scope.EmployeeData=true;
		}else if(index==5){
			$scope.num=index;
			$scope.EmployeeData=false;
			$scope.CompnayDetails=false;
			$scope.StudentDetails=false;
		}else{
			$scope.EmployeeData=false;
			$scope.CompnayDetails=false;
			$scope.StudentDetails=false;
		}
	}
	$scope.del=function(rand){
		console.log(rand+"1");
		$http.delete('/delete'+rand).then(function(responce){
                            console.log(responce);
                            $window.location.reload();
                        });
		}
	$scope.delimage=function(rand){
		console.log(rand+"1");
		$http.delete('/delimg'+rand).then(function(responce){
                            console.log(responce);
                            $window.location.reload();
                        });
		}
	$scope.manageEventJson={"ManageData":[{"id":"1","firstname":"praveen","lastname":"kumar","Age":"24","city":"vizag"},{"id":"2","firstname":"sanjai","lastname":"kumar","Age":"24","city":"hyderabad"}]};
	var count=0;
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
				updated.push({"url":events.data[i].url})
			}
		}
		$http.post('/update',{"rand":events.rand,"data":updated,"created_date":events.created_date}).then(function(req,res){
			console.log("success");
			$scope.events=[];
		}).catch(function(error) {
  					console.log(error);
				});
	}
	$scope.showEdit=function(index,data){
		//$scope.idval=[];
		console.log(data.data[1].heading);
		/*for(var i=0;i<data.data.length;i++){
			console.log(i+":"+data.data.length);
			if(data.data[i].heading!=undefined){
				$scope.idval[i]=data.data[i].heading;
			}
			else if(data.data[i].para!=undefined){
				$scope.idval[i]=data.data[i].para;
			}
			if(i==data.data.length-1){
				$scope.number=index;
		$scope.events=data;
		console.log($scope.idval);
		$scope.len=$scope.events.data.length-1;
			}
		}*/
		$scope.events=data;
		$scope.number=index;
		$http.post('/newtab',{"data":$scope.events}).then(function(req,res){
			console.log("success");
		window.open('/detailedView','_blank');
		}).catch(function(error) {
  					console.log(error);
		});
	}
	$scope.showgalEdit=function(index,data){
		//$scope.idval=[];
		//console.log(data.data[1].heading);
		/*for(var i=0;i<data.data.length;i++){
			console.log(i+":"+data.data.length);
			if(data.data[i].heading!=undefined){
				$scope.idval[i]=data.data[i].heading;
			}
			else if(data.data[i].para!=undefined){
				$scope.idval[i]=data.data[i].para;
			}
			if(i==data.data.length-1){
				$scope.number=index;
		$scope.events=data;
		console.log($scope.idval);
		$scope.len=$scope.events.data.length-1;
			}
		}*/
		$scope.events=data;
		//$scope.number=index;
		$http.post('/newgaltab',{"data":$scope.events}).then(function(req,res){
			console.log("success");
		window.open('/detailedgalView','_blank');
		}).catch(function(error) {
  					console.log(error);
		});
	}
	$scope.showEvent=function(model){
	var tevents=[];		
			//$scope.CompnayDetails=false;
		if(model.name=="AttachEvents"){
			$scope.attachevent=true;
		    $scope.manageevent=false;
		}
		else if(model.name=="ManageEvents"){
			$http.get('/getDatafromDb').then(function(req,res){
						for(var i=0;i<req.data.length;i++){
							tevents.push(req.data);
						}
						console.log(tevents);
						$scope.tevents=tevents[0];
					}).catch(function(error) {
  					console.log(error);
				});
			$scope.attachevent=false;
			$scope.manageevent=true;
		}
		else if(model.name=="AttachGallery"){
			$scope.attachgal=true;
			$scope.managegal=false;
		}
		else if(model.name=="ManageGallery"){
				$http.get('/getGallery').then(function(req,res){
		var gal=[];
			for(var i=req.data.length-1;i>req.data.length-6&&i>=0;i--){
				gal.push(req.data[i]);
				}
			$scope.gallery=gal;
		}).catch(function(error){
		console.log(error);
		});
		   $scope.attachgal=false;
			$scope.managegal=true;	
		}
	}
	function removeImage(imgsrc){
		console.log(imgsrc);
			var element = document.getElementById("form");
			$http.post('/removeImage',{"imageName":imgsrc}).then(function(req,res){
		
	}).catch(function(error) {
  console.log(error);
});
	for(var j=0;j<$scope.count;j++){
		if($scope.imgArray[j]==imgsrc){
			delete $scope.imgArray[j];
		}
	}
	var x=document.getElementById(imgsrc);
	var y=document.getElementById(imgsrc+"br");
    //var z=y.parentNode;
		x.parentNode.removeChild(x);
		y.parentNode.removeChild(y);
	//document.getElementById(imgsrc+"sign").style.display="none";
       //z.style.display="none";
       //z.parentNode.removeChild(z);
	}
	$scope.imgArray=[];
	$scope.img=function(imgdata){
		$http.post('/getimages',{"a":"a"}).then(function(req,res){
			$scope.imgsrc="https://s3-ap-southeast-1.amazonaws.com/photogridsanjay/"+req.data.Images;
			$scope.imagesrc=req.data.Images;
			var element;
			console.log("qwe"+$scope.imagesrc);
			var x = document.createElement("IMG");
    		x.setAttribute("width", 100);
    		x.setAttribute("id",$scope.imagesrc);
    		x.setAttribute("style","display:inline")
    		x.setAttribute("src",$scope.imgsrc);
    		x.setAttribute("alt", "The Pulpit Rock");
    		if(imgdata=="imggal"){
              element = document.getElementById("ghead"+$scope.gall);
              //console.log("ghead"+(--$scope.gall));
              //$scope.gall++;
    		}else{
    		$scope.count--;		
			element = document.getElementById("img"+$scope.count);
			$scope.imgArray[$scope.count]=$scope.imgsrc;
			$scope.count++;
    		$scope.remove($scope.imagesrc,"img");
			}
			element.appendChild(x);
		});
	}
	$scope.remove=function(idstr,idnew){
       var y=document.createElement("SPAN");
    		y.setAttribute("id",idstr+"sign");
    		$scope.count--;
    		if(idstr=="as"||idstr=="para"){
    			idstr+=$scope.count;
    		}
    		y.setAttribute("class","glyphicon glyphicon-remove-sign");
    		y.addEventListener("click", function(event) {
    				removeImage(idstr);
    		});
    		var z=document.createElement("BR");
    		z.setAttribute("id",idstr+"br");
    		console.log($scope.count);		
			var element = document.getElementById(idnew+$scope.count);
			$scope.count++;
			element.appendChild(y);
			element.appendChild(z);	
	}
	//image upload function
    var vm = this;
    vm.submit = function(imgdata){ //function to call on form submit
    	var filedata=vm.file;
    	console.log(filedata);
        if (filedata) { //check if from is valid
    	console.log("checking"+vm.file);
            vm.uploadNow(filedata,imgdata); //call upload function
        }
    }
    var myData=[];
    $scope.postData=function(){
    	if($scope.myDate==undefined)
    	{
    		alert("Please select date of event");
    	}
    	else{
    	console.log($scope.myDate);
       myData.push({"date":$scope.myDate});
       for(var i=0;i<$scope.count;i++){
       	var str="as"+i;
       	var str1="para"+i;
       	if(document.getElementById(str)!=null){
       	if($scope[str]!=undefined && $scope[str]!=null){
       		if($scope[str]==" "){

       		}else{
       		myData.push({"heading":$scope[str]});
       		document.getElementById(str).style.display="none";
       		}
       	}
       }
       else if(document.getElementById(str1)!=null){
       	if($scope[str1]!=undefined && $scope[str1]!=null){
       		if($scope[str1]==" "){

       		}else{
       		myData.push({"para":$scope[str1]});
       		}
       		document.getElementById(str1).style.display="none";
       	}
       }
       	else if($scope.imgArray[i]!=undefined){
       		myData.push({"url":$scope.imgArray[i]});
       		document.getElementById("img"+i).style.display="none";
       	}
       	else{
            	document.getElementById("img"+i).style.display="none";
       	}
       }
       console.log(myData);
       $http.post('/sendData',{"data":myData}).then(function(req,res){
       	console.log("Success");
       }).catch(function(error) {
  		console.log(error);
		});
       myData=myData.slice(myData.length,myData.length);
       $scope.myDate=null;
     }
    }
    $scope.galarray=[];
    $scope.getGallryimages=function(){
    	$http.get('/getGallery').then(function(req,res){
		var gal=[];
		for(var i=req.data.length-1;i>req.data.length-6&&i>=0;i--){
		gal.push(req.data[i].data);
		}
		$scope.galarray=gal;
		console.log($scope.galarray);
	}).catch(function(error){
		console.log(error);
	});
    }
       		$scope.getGallryimages();
    $scope.data=function(){
    	var updated=[];
    	var val=--$scope.gall;
    	var hdn="head"+val;
    	var ghdn="ghead"+(++$scope.gall);
    	updated.push({"Heading":$scope[hdn]});
    	updated.push({"url":$scope.imgsrc});
    	$http.post('/Gallery',{"data":updated}).then(function(req,res){		
       		document.getElementById(ghdn).style.display="none";
       		$scope.getGallryimages();
    	console.log($scope.galarray);
    	}).catch(function(error){
    		console.log(error);
    	});
    }
    vm.uploadNow = function (file,imgdata) {
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
                $scope.img(imgdata);
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
            vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
    };
}]);
//adding dynamic buttons and paragraphs
app.directive("addbuttonsbutton", function(){
	return {
		restrict: "E",
		template: "<button addbuttons class='btn btn-default'>Add Heading</button>"
	}
});
app.directive("addparagraph", function(){
	return {
		restrict: "E",
		template: "<button addtextarea class='btn btn-default'>Add Paragraph</button>"
	}
});

app.directive("addimage", function(){
	return {
		restrict: "E",
		template: "<button imageupload class='btn btn-default'>Imageupload</button>"
	}
});
app.directive("addgallery", function(){
	return {
		restrict: "E",
		template: "<button galleryupload class='btn btn-default'>AddImage</button>"
	}
});
app.directive("addbuttons", function($compile){
	return function(scope, element, attrs){
		scope.count=0;
		element.bind("click", function(){
      scope.model="as"+scope.count++;
      scope.head="as";
			angular.element(document.getElementById('form')).append($compile("<div style='display:inline' id="+scope.model+"><input type='text' style='border:1px solid gray;margin:1%;width:50%;' placeholder='Heading' ng-model="+scope.model+"></div>")(scope));
		});
	};
});

app.directive("addtextarea", function($compile){
	return function(scope, element, attrs){
		element.bind("click", function(){
      scope.paramodel="para"+scope.count++;
			angular.element(document.getElementById('form')).append($compile("<div style='display:inline' id="+scope.paramodel+"><textarea rows="+4+"cols="+50+" placeholder='Paragraph' style='border:1px solid gray;margin:1%;width:50%;' ng-model="+scope.paramodel+"></textarea></div>")(scope));
		});
	};
});

app.directive("imageupload", function($compile){
	return function(scope, element, attrs){
		element.bind("click", function(){
			scope.imgmodel="img"+scope.count++;
			scope.imgeve="imgeve";
			angular.element(document.getElementById('form')).append($compile("<br><div style='display:inline' id="+scope.imgmodel+"><input type='file' style='display:inline;margin:15px 0px 15px 10px;' ngf-select ng-model='up.file' ng-change='up.submit("+scope.imgeve+")' name='file' ngf-pattern='image'"+"/*"+"></div>")(scope));
		});
	};
});
app.directive("galleryupload", function($compile){
	return function(scope, element, attrs){
		scope.gall=0;
		element.bind("click", function(){
			scope.head="head"+scope.gall++;
			scope.ghead="ghead"+scope.gall;
			scope.imggal="imggal";
			if(scope.gall>5){
				alert("it allows only 5");
			}else{
			angular.element(document.getElementById('form1')).append($compile("<br><div style='display:inline' id="+scope.ghead+"><input type='text' placeholder='heading' ng-model="+scope.head+"><br><input type='file' style='display:inline;margin:15px 0px 15px 10px;' ngf-select ng-model='up.file' ng-change='up.submit("+scope.imggal+")'' name='file' ngf-pattern='image'"+"/*"+"><br><button ng-click='data()'>Submit</button></div>")(scope));
		}
		});
	};
});