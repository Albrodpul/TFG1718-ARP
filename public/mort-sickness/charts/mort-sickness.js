google.charts.load("current", {packages: ["corechart"]});
google.charts.setOnLoadCallback(drawVisualization);

function drawVisualization(){
	$(document).ready(function(){
		var request=$.ajax({
			type:"GET",
			url:"../../api/v1/mort-sickness/" + $("#yearF").val() + "?apikey=multiPlan_C4_sos-2016-03-pgs_ag",
			data: "{}",
	        contentType: "application/json; charset=utf-8",
	        dataType: "json"
		})
		request.done(function(data, status){
				var datos = [["Region","Total Mortality", "Mortality in men", "Mortality in women"]];
				for(i=0;i<data.length;i++){
					if(data[i].year==$("#yearF").val()){
						graf=data[i];
						var grafForWidget=[graf.region,Number(graf.totalMortality),
						Number(graf.mortalityInMen), Number(graf.mortalityInWomen)];
						datos.push(grafForWidget);
					}else{
						graf=data[i];
						var grafForWidget=[graf.region, Number(graf.totalMortality),
						Number(graf.mortalityInMen), Number(graf.mortalityInWomen)];
						datos.push(grafForWidget);
					}
				}
				var datosRecogidos = google.visualization.arrayToDataTable(datos);
				var options = {
	      			title : 'Mortality by Region and Year',
	      			vAxis: {title: 'Mortality'},
	      			hAxis: {title: 'Region'},
	      			seriesType: 'bars',
	     		    series: {5: {type: 'line'}}
	   			 };
	   			var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
	   		    chart.draw(datosRecogidos, options);

		})
	})
}

$(document).ready(function(){
	$('#select').jqxButton({
		theme:'darkblue'
	})
});

$(document).ready(function(){
	$('#miBoton').jqxButton({
		theme:'darkblue'
	})
});
