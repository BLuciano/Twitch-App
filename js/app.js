(function(){
	var url, content, all =[], online =[], offline =[];
	var image, value;
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
			display(all)
		} 
		if($(this).html() === "Online"){
			display(online);
		}
		if($(this).html() === "Offline"){
			display(offline);
		}
	});

	//Displays streamers according to button selection.
	function display(array){
		$("#display").html("");
		var keys = Object.keys(array);
		for(var i = 0; i < keys.length; i++){
			$("#display").append(array[keys[i]]);
		}
	}

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
						online[info.display_name.toLowerCase()] = content;		
					} else {
						content+= "<h4 class='right offline'><i class='fa fa-thumbs-down'></i></h4>";		
						content+="<p></p></a>";
						offline[info.display_name.toLowerCase()] = content;
					}
				}
				all[info.display_name.toLowerCase()] = content;
				$("#display").append(content);
			});
		});
	}

	//Search bar section
	$("#search-bar").on('keyup paste', function(){
    	value = $(this).val().toLowerCase();
    	if(value === ""){
    		display(all);
    	}
    	else{
    		$("#display").html(""); 
    		index = Object.keys(all).indexOf(value);
    		if(index !== -1){	
    			console.log(all[Object.keys(all)[index]]);
    			$("#display").append(all[Object.keys(all)[index]]);
    		}
    	}
    });


})();