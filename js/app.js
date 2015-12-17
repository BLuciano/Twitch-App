(function(){
	var url, content, all =[], online =[], offline =[];
	var searchArry = [], finalSearch = [];
	var image, value, searching = false;
	var streamers = [
		"freecodecamp", "storbeck", "terakilobyte", 
		"habathcx", "RobotCaleb", "thomasballinger",
		"noobs2ninjas","beohoff", "medrybw", "brunofin"
	];

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
					info.display_name = "error";
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

	//Buttons selection
	$("button").on("click", function(){
		$("button").removeClass("selected");
		$(this).addClass("selected");
		$("#search-bar").val("");
		display(getArray($(this).html()));
	});

	/*Checks to see which button is selected and 
	returns array of users to display*/
	function getArray($button){
		if($button === "All"){
			array = all;
		} 
		if($button === "Online"){
			array = online;
		}
		if($button === "Offline"){
			array = offline;
		}
		return(array);
	}

	//Displays streamers according to button selection.
	function display(array){
		$("#display").html("");
		var keys = Object.keys(array);
		for(var i = 0; i < keys.length; i++){
			$("#display").append(array[keys[i]]);
		}
	}

	/*Search bar section. Checks which tab is selected and grabs the 
	acording streamer array. It then checks to see if there is a match 
	with the user input and displays all of the matches in a new array.*/
	$("#search-bar").on('keyup paste', function(){
    	value = $(this).val().toLowerCase();
    	finalSearch = [];

    	if(value === ""){
    		searchArry = [];
    		searching = false;
    		display(getArray($("button.selected").html()));
    	}
    	else{
    		searching = true;
    		$("#display").html(""); 
    		searchArry = getArray($("button.selected").html());
    		for(var i = 0; i < Object.keys(searchArry).length; i++){
    			if(Object.keys(searchArry)[i].match(value)){
    				finalSearch[Object.keys(searchArry)[i]] = searchArry[Object.keys(searchArry)[i]];
    			}
    		}
    		display(finalSearch);
    	}
    });
})();