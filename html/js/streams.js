function getStreams(app, id) {
	var url = "/api/liveChannels?app="+app;
	$.get(url, function(data){
		if (data.length > 0) {
			$(id).html("");
			var rowLimit = data.length < 4 ? data.length : 4;
			var rows = Math.floor(data.length/4);

			var row = 1;
			var count = 0;
			for (var n = 0; n <= rows; n++) {
				$(id).append('<div id="row'+row+'" class="row"></div>');
				for (var i=0; i < rowLimit; i++) {
					$("#row"+row).append(
						'<a href="/stream?k='+data[count]["name"]+'" class="three columns stealth-a">'+
							'<img class="u-full-width" src='+data[count]["thumbnail"] + "?" + new Date().getTime() +' onerror="this.src='+"'/thumbnail/default-thumb.png';"+'">'+
							'<div class="title u-pull-left" style="width: 90%;">'+data[count]["name"]+'</div>'+
							'<label class="titleViewer u-pull-right"><i class="fas fa-circle redText"></i> '+data[i]["viewers"]+'</label>'+
						'</a>'
					);
					count++;
				}
				row++;
			}
		}
	}, "json");
}

//--------------------------------------------------------------------
var app = "live";
getStreams(app,"#streams");