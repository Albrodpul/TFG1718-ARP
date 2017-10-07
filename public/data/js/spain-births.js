var service = '../../api/v1/';

$(document).ready(function(){

    jQuery.support.cors = true;

    $.ajax({
        type: "GET",
        url: service + 'spain-births?apikey=multiPlan_C4_sos-2016-03-arp_ag',
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        success: function(data) {
        var trHTML = '<tbody>';
            $.each(data, function(i,item){
                trHTML += '<tr><td class="center-align">' +
                data[i].region + '</td><td class="center-align">' +
                data[i].year + '</td><td class="center-align">' +
                data[i].men + '</td><td class="center-align">' +
                data[i].women + '</td><td class="center-align">' +
                data[i].totalbirth + '</td></tr>';
            });
            trHTML += '</tbody>';
            $('#births').append(trHTML);
    	}
    });

})
