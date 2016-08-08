app.controller('ClientController',function ($scope,$http) {
  var tupevents=[],tpasevents=[];
  $scope.num=-1;
	$scope.pastevents=false;
	$scope.upevents=false;
	$scope.myInterval=3000;
	/*$scope.totalevents=function(index){
       if(index==0){
       	$scope.sendData($scope.tpasevents);
       }
       else if(index==1){
       	$scope.sendData($scope.tupevents);
       }
	}*/
	$scope.Details=function(index,val){
		console.log(index+":"+val);
		$scope.num=index;
		if(val=="past"){
			$scope.sendDetails($scope.tpasevents[index].data);
		}
		else if(val=="up"){
			$scope.sendDetails($scope.tupevents[index].data);
		}
	}
	$scope.sendDetails=function(sdata){
		$http.post('/completeDetails',{"data": sdata}).then(function(req,res){
             console.log("success");
		});
	}
	$scope.sendData=function(sdata){
		console.log("hi");
		$http.post('/newtab',{"data": sdata}).then(function(req,res){
             window.open('/detailedView','_blank');
		});
	}
	$scope.getEvents=function(tevents){
	var hir=[];
	for(var i=0;i<tevents.length;i++)
					{
						var pa=0,k=0,p,url=undefined,para=undefined,h=0;
						for(var l=0;l<tevents[i].data.length;l++){
							if((tevents[i].data[l].heading!=undefined)&&(h==0)){
								p=tevents[i].data[l].heading;
								h++;
							}
							else if((tevents[i].data[l].url!=undefined)&&(k==0)){
								url=tevents[i].data[l].url;
								k++;	
							}else if((tevents[i].data[l].para!=undefined)&&(pa==0))
							  para=tevents[i].data[l].para;
							  pa++;
						}
						hir.push({"heading":p,"url":url,"para":para,"date":new Date(tevents[i].data[0].date),"rand":tevents[i].rand});		
					}
					return hir
	}
	$scope.getData=function(){
	$http.get('/getDatafromDb').then(function(req,res){
						for(var i=0;i<req.data.length;i++){
							if(new Date(req.data[i].data[0].date)>new Date()){
								tupevents.push(req.data[i]);
							}else{
								tpasevents.push(req.data[i]);
							}
						}
						$scope.tupevents=tupevents;
						$scope.tpasevents=tpasevents;
						$scope.pevents=$scope.getEvents($scope.tpasevents);
						$scope.uevents=$scope.getEvents($scope.tupevents);
						console.log($scope.tupevents);
				/*for(var i=0;i<$scope.tevents.length;i++)
					{
						var j=0,k=0,p,url=undefined;
						for(var l=0;l<$scope.tevents[i].data.length;l++){
							if(($scope.tevents[i].data[l].heading!=undefined)&&(j==0)){
								p=$scope.tevents[i].data[l].heading;
								j++;
							}
							else if(($scope.tevents[i].data[l].url!=undefined)&&(k==0)){
								url=$scope.tevents[i].data[l].url;
								k++;	
							}
						}
						hir.push({"heading":p,"url":url,"rand":$scope.tevents[i].rand});		
					}
					$scope.events=hir;*/
					}).catch(function(error) {
  					console.log(error);
				});
					}
	$http.get('/getGallery').then(function(req,res){
		var gal=[];
		for(var i=req.data.length-1;i>req.data.length-6&&i>=0;i--){
		gal.push(req.data[i].data);
		}
		$scope.gallery=gal;
	}).catch(function(error){
		console.log(error);
	});
		$scope.getData();
});