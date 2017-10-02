var myApp = angular.module("BirthListApp",[]);

myApp.controller('AppCtrl',['$scope','$http',function($scope,$http){
	console.log("Controller initialized");

vLimit=3;

	var refresh = function (){
		$http.get('../../../api/v1/spain-births?apikey=multiPlan_C4_sos-2016-03-arp_ag&limit='+vLimit).success(function (births){
			console.log('Data received successfully');
			url="../../../api/v1/spain-births";
			$scope.birthlist = births;
			$scope.myValue=false;
		});
	}


	refresh();

	$scope.addBirth = function(){
		console.log("Inserting birth...");
		$http.post('../../../api/v1/spain-births?apikey=multiPlan_C4_sos-2016-03-arp_ag',$scope.birth).then(successCallbackAU, errorCallbackAU);
	}

	$scope.updateBirth = function(region,year){
		console.log("Updating birth...");
		$http.put('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag',$scope.birth).then(successCallbackAU,errorCallbackAU);
	}

	$scope.deleteBirth = function(region,year){
		console.log("Deleting birth with "+region+" "+year);
		$http.delete('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag');
		refresh();
	}
	$scope.deleteAll = function(region,year){
		console.log("Deleting births");
		$http.delete('../../../api/v1/spain-births?apikey=multiPlan_C4_sos-2016-03-arp_ag');
		refresh();
	}
	$scope.loadBirth = function(){
		console.log("Loading initial list");
		$http.get('../../../api/v1/spain-births/loadInitialData?apikey=multiPlan_C4_sos-2016-03-arp_ag').success(function(){
			refresh();
		});
	}
	$scope.search = function(region,year,limit,offset,from,to){
		vOffset=parseInt((parseInt(offset)-parseInt(1)))*parseInt(vLimit);
		vOffset2=parseInt((parseInt(offset)-parseInt(1)))*parseInt(limit);
		//búsqueda de región
		if(region!=undefined && year==undefined && limit==undefined && offset==undefined && from==undefined && to==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&limit='+vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región y offset
		else if(region!=undefined && limit==undefined && year==undefined && from==undefined && to==undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&limit='+vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región y límite
		else if(region!=undefined && limit!=undefined && year==undefined && from==undefined && to==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, límite y offset
		else if(region!=undefined && limit!=undefined && year==undefined && from==undefined && to==undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región y from
		else if(region!=undefined && from!=undefined && year==undefined && limit==undefined && to==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&limit='+vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, from y offset
		else if(region!=undefined && from!=undefined && year==undefined && limit==undefined && to==undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&limit='+vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, from y límite
		else if(region!=undefined && from!=undefined && year==undefined && limit!=undefined && to==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, from, límite y offset
		else if(region!=undefined && from!=undefined && year==undefined && limit!=undefined && to==undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región y to
		else if(region!=undefined && to!=undefined && year==undefined && from==undefined && limit==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&to='+to+'&limit='+vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, to y offset
		else if(region!=undefined && to!=undefined && year==undefined && from==undefined && limit==undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&to='+to+'&limit='+vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, to y limit
		else if(region!=undefined && to!=undefined && year==undefined && from==undefined && limit!=undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&to='+to+'&limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, to, limit y offset
		else if(region!=undefined && to!=undefined && year==undefined && from==undefined && limit!=undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&to='+to+'&limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, from y to
		else if(region!=undefined && from!=undefined && to!=undefined && limit==undefined && year==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&to='+to+'&limit='+vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, from, to y offset
		else if(region!=undefined && from!=undefined && to!=undefined && limit==undefined && year==undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&to='+to+'&limit='+vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, from, to y limit
		else if(region!=undefined && from!=undefined && to!=undefined && limit!=undefined && year==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&to='+to+'&limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, from, to, limit y offset
		else if(region!=undefined && from!=undefined && to!=undefined && limit!=undefined && year==undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&to='+to+'&limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año
		else if(year!=undefined && region==undefined && limit==undefined && from==undefined && to==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&limit='+vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año y offset
		else if(year!=undefined && region==undefined && limit==undefined && from==undefined && to==undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births/'+region+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&limit='+vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año y límite
		else if(year!=undefined && limit!=undefined && region==undefined && from==undefined && to==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año, límite y offset
		else if(year!=undefined && limit!=undefined && region==undefined && from==undefined && to==undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año y from
		else if(year!=undefined && from!=undefined && region==undefined && limit==undefined && to==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&limit='+vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año, from y offset
		else if(year!=undefined && from!=undefined && region==undefined && limit==undefined && to==undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&limit='+vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año, from y limit
		else if(year!=undefined && from!=undefined && region==undefined && limit!=undefined && to==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año, from, limit y offset
		else if(year!=undefined && from!=undefined && region==undefined && limit!=undefined && to==undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año y to
		else if(year!=undefined && to!=undefined && region==undefined && from==undefined && limit==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&to='+to+'&limit='+vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año, to y offset
		else if(year!=undefined && to!=undefined && region==undefined && from==undefined && limit==undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&to='+to+'&limit='+vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año, to y limit
		else if(year!=undefined && to!=undefined && region==undefined && from==undefined && limit!=undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&to='+to+'&limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año, to, limit y offset
		else if(year!=undefined && to!=undefined && region==undefined && from==undefined && limit!=undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&to='+to+'&limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año, from y to
		else if(year!=undefined && from!=undefined && to!=undefined && limit==undefined && region==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&to='+to+'&limit='+vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año, from, to y offset
		else if(year!=undefined && from!=undefined && to!=undefined && limit==undefined && region==undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&to='+to+'&limit='+vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año, from, to y limit
		else if(year!=undefined && from!=undefined && to!=undefined && limit!=undefined && region==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&to='+to+'&limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de año, from, to, limit y offset
		else if(year!=undefined && from!=undefined && to!=undefined && limit!=undefined && region==undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&to='+to+'&limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región y año
		else if(region!=undefined && year!=undefined && limit==undefined && from==undefined && to==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&limit='+vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, año y offset
		else if(region!=undefined && year!=undefined && limit==undefined && from==undefined && to==undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&limit='+vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, año, límite
		else if(region!=undefined && year!=undefined && limit!=undefined && from==undefined && to==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, año, límite y offset
		else if(region!=undefined && year!=undefined && limit!=undefined && from==undefined && to==undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, año, from
		else if(region!=undefined && year!=undefined && limit==undefined && from!=undefined && to==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&limit='+vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, año, from y offset
		else if(region!=undefined && year!=undefined && limit==undefined && from!=undefined && to==undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&limit='+vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, año, from y limit
		else if(region!=undefined && year!=undefined && limit!=undefined && from!=undefined && to==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, año, from, limit y offset
		else if(region!=undefined && year!=undefined && limit!=undefined && from!=undefined && to==undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, año, to
		else if(region!=undefined && year!=undefined && limit==undefined && from==undefined && to!=undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&to='+to+'&limit='+vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, año, to y offset
		else if(region!=undefined && year!=undefined && limit==undefined && from==undefined && to!=undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&to='+to+'&limit='+vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, año, to y limit
		else if(region!=undefined && year!=undefined && limit!=undefined && from==undefined && to!=undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&to='+to+'&limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, año, to, limit y offset
		else if(region!=undefined && year!=undefined && limit!=undefined && from==undefined && to!=undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&to='+to+'&limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, año, from y to
		else if(region!=undefined && year!=undefined && limit==undefined && from!=undefined && to!=undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&to='+to+'&limit='+vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, año, from, to y offset
		else if(region!=undefined && year!=undefined && limit==undefined && from!=undefined && to!=undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&to='+to+'&limit='+vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, año, from, to y limit
		else if(region!=undefined && year!=undefined && limit!=undefined && from!=undefined && to!=undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&to='+to+'&limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda de región, año, from, to, limit y offset
		else if(region!=undefined && year!=undefined && limit!=undefined && from!=undefined && to!=undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births/'+region+'/'+year+'?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&to='+to+'&limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda con límite
		else if(limit!=undefined && region==undefined && year==undefined && from==undefined && to==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births?apikey=multiPlan_C4_sos-2016-03-arp_ag&limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda con límite y offset
		else if(limit!=undefined && region==undefined && year==undefined && from==undefined && to==undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births?apikey=multiPlan_C4_sos-2016-03-arp_ag&limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda con límite y from
		else if(limit!=undefined && region==undefined && year==undefined && from!=undefined && to==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda con límite, from y offset
		else if(limit!=undefined && region==undefined && year==undefined && from!=undefined && to==undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda con límite y to
		else if(limit!=undefined && region==undefined && year==undefined && from==undefined && to!=undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births?apikey=multiPlan_C4_sos-2016-03-arp_ag&to='+to+'&limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda con límite, to y offset
		else if(limit!=undefined && region==undefined && year==undefined && from==undefined && to!=undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births?apikey=multiPlan_C4_sos-2016-03-arp_ag&to='+to+'&limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda con límite, from y to
		else if(limit!=undefined && region==undefined && year==undefined && from!=undefined && to!=undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&to='+to+'&limit='+limit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda con límite, from, to y offset
		else if(limit!=undefined && region==undefined && year==undefined && from!=undefined && to!=undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&to='+to+'&limit='+limit+'&offset='+vOffset2).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda con from
		else if(from!=undefined && region==undefined && year==undefined && limit==undefined && to==undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&limit='+vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda con from y offset
		else if(from!=undefined && region==undefined && year==undefined && limit==undefined && to==undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&limit='+vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda con to
		else if(limit==undefined && region==undefined && year==undefined && from==undefined && to!=undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births?apikey=multiPlan_C4_sos-2016-03-arp_ag&to='+to+'&limit='+vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda con to y offset
		else if(limit==undefined && region==undefined && year==undefined && from==undefined && to!=undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births?apikey=multiPlan_C4_sos-2016-03-arp_ag&to='+to+'&limit='+vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda con from y to
		else if(limit==undefined && region==undefined && year==undefined && from!=undefined && to!=undefined && offset==undefined){
		$http.get('../../../api/v1/spain-births?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&to='+to+'&limit='+vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda con from, to y offset
		else if(limit==undefined && region==undefined && year==undefined && from!=undefined && to!=undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births?apikey=multiPlan_C4_sos-2016-03-arp_ag&from='+from+'&to='+to+'&limit='+vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//búsqueda con offset
		else if(limit==undefined && region==undefined && year==undefined && from==undefined && to==undefined && offset!=undefined){
		$http.get('../../../api/v1/spain-births?apikey=multiPlan_C4_sos-2016-03-arp_ag&limit='+vLimit+'&offset='+vOffset).then(successCallbackSearch,errorCallbackSearch);
		}
		//no hay búsqueda
		else if(limit==undefined && region==undefined && year==undefined && from==undefined && to==undefined && offset==undefined){
			$http.get('../../../api/v1/spain-births?apikey=multiPlan_C4_sos-2016-03-arp_ag&limit='+vLimit).then(successCallbackSearch,errorCallbackSearch);
		}
	}
	$scope.getAll = function(){
		refresh();
	}
	var successCallbackAU=function(){
			$scope.myValue=false;
			refresh();
	}
	var errorCallbackAU=function(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.error=response.status + " " + response.statusText;
	}
	var successCallbackSearch = function(response){
			console.log('Data received successfully');
			$scope.myValue=false;
			$scope.birthlist = response.data;
	}
	var errorCallbackSearch=function(response, data, status, headers, config){
			$scope.myValue=true;
			$scope.birthlist = [];
			$scope.error=response.status + " " + response.statusText;
	}
}]);
