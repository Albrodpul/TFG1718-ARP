var service = '../../api/v1/';
$(document).ready(function(){
	jQuery.support.cors=true;
	$.ajax({
		type:"GET",
		url:service + 'mort-sickness?apikey=multiPlan_C4_sos-2016-03-pgs_ag',
		data:"{}",
		contentType:"application/json; charset=utf-8",
		dataType:"json",
		cache:false,
		success: function(data){
			var trHTML = '';
			$.each(data, function(i,item){
				trHTML += '<tr><td>' + data[i].region + '</td><td>' + data[i].sickness + '</td><td>' + data[i].year + '</td><td>' + data[i].mortalityInMen + '</td><td>' + data[i].mortalityInWomen + '</td><td>' + data[i].totalMortality + '</td></tr>';
			});
			$('#sickness').append(trHTML);
			$('#sickness').jqxDataTable({
				altRows: true,
				theme: 'orange',
				columns: [
                  { text: 'Region', dataField: 'Region', width: 220},
                  { text: 'Sickness', dataField: 'Sickness', width: 220},
                  { text: 'Year', dataField: 'Year', width: 220},
                  { text: 'MortalityInMen', dataField: 'MortalityInMen',width: 220},
                  { text: 'MortalityInWomen', dataField: 'MortalityInWomen', width: 220},
                  { text: 'TotalMortality', dataField: 'TotalMortality', width: 220}
                ]
			})
		},
		error: function(msg){
			alert(msg.responseText);
		}
	})
});
$(document).ready(function(){
	$('#miBoton').jqxButton({
		theme: 'shinyblack'
	})
});
