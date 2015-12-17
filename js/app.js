(function(){
	var url, content, all ="", online ="", offline ="";
	var image;
	var streamers = [
		"freecodecamp", "storbeck", "terakilobyte", 
		"habathcx", "RobotCaleb", "thomasballinger",
		"noobs2ninjas","beohoff", "medrybw", "brunofin"
	];

	//Buttons Section
	$("button").on("click", function(){
		$("button").removeClass("selected");
		$(this).addClass("selected");

		if($(this).html() === "All"){
			$("#display").html(all);
		} 
		if($(this).html() === "Online"){
			$("#display").html(online);
		}
		if($(this).html() === "Offline"){
			$("#display").html(offline);
		}
	});

	//Json API calls section
	for(var i = 0; i < streamers.length; i++){
		/*Get channel information for each streamer.*/
		url = "https://api.twitch.tv/kraken/channels/" + streamers[i] + "?callback=?";
		$.getJSON(url)
		.done(function(data){
			var info = data; 
			
			/*Check to see if streamer is online or offline. Done by different call.
			add different data according to online status.*/
			$.getJSON("https://api.twitch.tv/kraken/streams/" + data.display_name + "?callback=?",
			function(data){
				content = "";
				if(info.logo){
					image = info.logo;
				} else {
					image = "error.png";
				}

				if(info.error){
					content+= "<img class='left' src='" + image + "'>";
					content+= "<h4 class='left'> Error </h4>";
					content+= "<h4 class='right offline'><i class='fa fa-thumbs-down'></i></h4>";		
					content+="<p>" + info.message + "</p>";

				} else {
					content+= "<a target='_blank' href='" + info.url + "'>";
					content+= "<img class='left' src='" + image + "'>";
					content+= "<h4 class='left'>" + info.display_name + "</h4>";

					if(data.stream){
						content+= "<h4 class='right online'><i class='fa fa-thumbs-up'></i></h4>";
						content+= "<p>" + data.stream.channel.status + "</p></a>";
						online+= content;		
					} else {
						content+= "<h4 class='right offline'><i class='fa fa-thumbs-down'></i></h4>";		
						content+="<p></p></a>";
						offline+= content;
					}
				}
				all+= content;
				$("#display").append(content);
			});
		});
	}

	//Search bar section


})();