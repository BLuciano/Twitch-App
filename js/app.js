(function(){
	var url, content, all, online, offline;

	$("button").on("click", function(){
		$("button").removeClass("selected");
		$(this).addClass("selected");
	});

	var streamers = [
		"freecodecamp", "storbeck", "terakilobyte", 
		"habathcx", "RobotCaleb", "thomasballinger",
		"noobs2ninjas","beohoff"
	];
	
	for(var i = 0; i < streamers.length; i++){
		/*Get channel information for each streamer.*/
		url = "https://api.twitch.tv/kraken/channels/" + streamers[i] + "?callback=?";
		$.getJSON(url).done(function(data){
			content = "";
			content+= "<a href='" + data.url + "'>";
			content+= "<img class='left' src='" + data.logo + "'>";
			content+= "<h4 class='left'>" + data.display_name + "</h4>";
			console.log(content);
			/*Check to see if streamer is online or offline. Done by different call.
			add different data according to online status.*/
			$.getJSON("https://api.twitch.tv/kraken/streams/" + streamers[i] + "?callback=?").
			done(function(data){
				if(data.stream){
					content+= "<h4 class='right online'><i class='fa fa-thumbs-up'></i></h4>";
					content+= "<p>" + data.stream.channel.status + "</p></a>";
					online+= content; 		
				} else {
					content+= "<h4 class='right offline'><i class='fa fa-thumbs-down'></i></h4>";		
					content+="<p></p></a>";
					offline+= content;
				}
			}); 
		});
		all+= content;
		console.log(content);
	}
})();