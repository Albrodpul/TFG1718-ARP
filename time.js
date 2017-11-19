module.exports.getTime=function(req,res){
	var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var months=[
  		"January", "February", "March",
		  "April", "May", "June", "July",
		  "August", "September", "October",
		  "November", "December"
		  ];
	var date = new Date();
    var hour = date.getHours()+2;
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
	var year=date.getFullYear();
	var month=date.getMonth();
	var weekday=date.getDay();
	var day=date.getDate();
	res.write("<html><head><title>Group 03 - My time</title><body>");
	if(hour<12){
		res.write("<h2>Good morning, today is "+days[weekday]+" "+day+" "+months[month]+" "+year+" and it is "+hour+":"+min+":"+sec+"</h2><br />");
	}else if(hour<20){
		res.write("<h2>Good afternoon, today is "+days[weekday]+" "+day+" "+months[month]+" "+year+" and it is "+hour+":"+min+":"+sec+"</h2><br />");
	}else{
		res.write("<h2>Good night, today is "+days[weekday]+" "+day+" "+months[month]+" "+year+" and it is "+hour+":"+min+":"+sec+"</h2><br />");
	}
	res.write("<a href='/about/'>« Previous</a></body></html>");
	res.end();
}