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
					'<a class="stealth-a" href="/stream?k='+data[i]["name"]+'">'+
						'<li>'+
							'<div class="row">'+
								'<div class="seven columns">'+
									'<img class="u-max-full-width" src='+data[i]["thumbnail"] + "?" + new Date().getTime() +' onerror="this.src='+"'/thumbnail/default-thumb.png';"+'">'+
								'</div>'+
								'<div class="five columns">'+
									'<div class="title">'+data[i]["name"]+'</div>'+
									'<label class="titleViewer"><i class="fas fa-circle redText"></i> '+data[i]["viewers"]+'</label>'+
								'</div>'+
							'</div>'+
						'</li>'+
					'</a>'
				);
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
document.title = key + " - Thallium";

getStreams(app,"#streams");
	
if (key != false) {
	setInterval(function(){ getViewerCount(app,key,"#viewerCounter"); }, 10000);

	$("#GrindPlayerVars").attr("value","autoPlay=true&streamType=live&bufferTime=0&src=rtmp://"+host+"/"+app+"/"+key);
} else {
	$("#GrindPlayer").html("")
}

$("#GrindPlayer, .menu").height($("#GrindPlayer").width() * 0.5625);
$("#streamList").css("max-height", $("#GrindPlayer").width() * 0.5625 - 80);
$(window).resize(function() {
	$("#GrindPlayer, .menu").height($("#GrindPlayer").width() * 0.5625);
	$("#streamList").css("max-height", $("#GrindPlayer").width() * 0.5625 - 80);
});
