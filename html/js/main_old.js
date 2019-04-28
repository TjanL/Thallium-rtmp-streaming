function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable){return pair[1];}
	}
	return(false);
}

function getStreams(app, id) {
	var url = "/api/liveChannels?app="+app;
	$.get(url, function(data){
		if (data.length > 0) {
			$(id).html("");
			for (var i=0; i < data.length; i++) {
			$(id).append(
				'<a href="/?k='+data[i]["name"]+'" style="text-decoration: none;">'+
					'<li class="channel">'+
						'<img class="thumbnail" src='+data[i]["thumbnail"]+' onerror="this.src='+"'/thumbnail/default-thumb.png';"+'">'+
						'<div class="title">'+data[i]["name"]+'</div>'+
						'<div class="titleViewer">'+
							'<div style="padding-left: 5px">'+
								'<label>Viewers: '+data[i]["viewers"]+'</label>'+
							'</div>'+
						'</div>'+
					'</li>'+
				'</a>');
			}
		}			
	}, "json");
}

function getViewerCount(app, name, id) {
	var url = "/api/channelViewers?app="+app+"&name="+name;
	$.get(url, function(data){
		$(id).text(data);
	}, "text");
}

//--------------------------------------------------------------------

var key = getQueryVariable("k");
var app = "live";
var host = window.location.hostname;

getStreams(app,"#streams");
	
if (key != false) {
	setInterval(function(){ getViewerCount(app,key,"#viewerCounter"); }, 10000);

	$("#GrindPlayerVars").attr("value","autoPlay=true&streamType=live&bufferTime=0&src=rtmp://"+host+"/"+app+"/"+key);
} else {
	$("#GrindPlayer").html("")
}

$("#streamList").css("max-height", $("#menu").height()-96+"px");
$(window).resize(function(){ $("#streamList").css("max-height", $("#menu").height()-96+"px"); });