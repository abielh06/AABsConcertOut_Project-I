// // Create Global variables
// Map Quest Basic URL
var mapQuestKey = 'RQ7XoE86cJwEAlzp98Ab2QXty8rv3JTc';
var baseURLmq = "http://www.mapquestapi.com/directions/v2/route?key=" + mapQuestKey;

// Global vars for Origin Address
var orgAddress1 = ' ';
var orgAddress2 = ' ';
var orgAddress3 = ' ';
var orgAddress4 = ' ';
var orgAddress = ' ';

// Global vars for Venue Address
var venAddress1 = ' ';
var venAddress2 = ' ';
var venAddress3 = ' ';
var venAddress4 = ' ';
var venAddress = ' ';

$("#submit-button").on('click', function (e) {
	e.preventDefault()
	var queryParams = {
		classificationName: $("#genre").val().trim(),
		city: $("#cityName").val().trim(),
		stateCode: $("#stateCode").val().trim(),
		apiKeyTM: "U2uyEsPGavnqxKAoaEf7KohDoHPNsEhV"
		// apiKeyMp: "wd58REXOMx1iWtM5reOp71waaBO1BxAc"
	};
	var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=" + queryParams.apiKeyTM + "&classificationName=" + queryParams.classificationName + "&city=" + queryParams.city + "&stateCode=" + queryParams.stateCode;
	console.log(queryURL)
	// Fill in Global Varibale for Origin Address
	orgAddress1 = $("#address").val().trim();
	orgAddress2 = $("#cityName").val().trim();
	orgAddress3 = $("#stateCode").val().trim();
	orgAddress4 = $("#userZip").val().trim();
	orgAddress = orgAddress1 + orgAddress2 + orgAddress3 + orgAddress4;

	//var orgAddress = orgAddress1 + city + stateCode + postalCode;
	console.log(orgAddress);

	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function (response) {
		//console.log(response);
		var events = response._embedded.events;

		//var address = events._embedded.venues;

		for (i = 0; i < events.length; i++) {
			// Fill in Global Variables for Venue address
			venAddress1 = events[i]._embedded.venues[0].address.line1;
			venAddress2 = events[i]._embedded.venues[0].city.name;
			venAddress3 = events[i]._embedded.venues[0].state.stateCode;
			venAddress4 = events[i]._embedded.venues[0].postalCode;
			venAddress = venAddress1 + venAddress2 + venAddress3 + venAddress4;
			//console.log(venAddress);
		}
		for (var i = 0; i < events.length; i++) {
			// Fill in Global Variables for Venue address
			venAddress1 = events[i]._embedded.venues[0].address.line1;
			venAddress2 = events[i]._embedded.venues[0].city.name;
			venAddress3 = events[i]._embedded.venues[0].state.stateCode;
			venAddress4 = events[i]._embedded.venues[0].postalCode;
			venAddress = venAddress1 + venAddress2 + venAddress3 + venAddress4;
			console.log(venAddress)
			// Create a button to trigger second ajax request
			var dirB = $("<button class='ajax2'>");
			dirB.attr("data-venAddress", venAddress)
			// Add a class to button to hold
			var buttonP = $("<p>").text('Directions');
		
			console.log(venAddress)
			// Append Venue address to Button
			dirB.append(buttonP);



			var col1 = $("<td>").text(events[i].name);
			var col2 = $("<td>").text(events[i]._embedded.venues[0].name);
			var col3 = $("<td>").text("$" + events[i].priceRanges[0].min + " - $" + events[i].priceRanges[0].max);
			var col4 = $("<td>").text(moment(events[i].dates.start.dateTime, "YYYYMMDD").format("LLLL"));
			var tr = $("<tr>").append(col1, col2, col3, col4, dirB);
			$("#concert-body").append(tr);
		}
		console.log(document);
		$('.ajax2').on('click', function (event) {

			console.log(venAddress1,venAddress2,venAddress3,venAddress4) 
			// venAddress2 = events[i]._embedded.venues[0].city.name;
			// venAddress3 = events[i]._embedded.venues[0].state.stateCode;
			// venAddress4 = events[i]._embedded.venues[0].postalCode;
			// venAddress = venAddress1 + venAddress2 + venAddress3 + venAddress4;


			console.log(orgAddress);
			//event.preventDefault();

			// venAddress = $(this).data();
			// Create local vars to capture hard test building URL

			venAddress=$(this).attr("data-venAddress")
			var queryURLmq = baseURLmq + "&from=" + orgAddress + "&to=" + venAddress;
			console.log(queryURLmq);
			$.ajax({
				url: queryURLmq,
				method: "GET"
			}).done(function (dataMQ) {
				$("#dirDisplay").empty();
				var shortCut = dataMQ.route.legs[0];

				$("#dirDisplay").append("<h2> DIRECTIONS:</h2>");
				$("#dirDisplay").append("<h3>FROM:  " + orgAddress + "</h3>");
				$("#dirDisplay").append("<h3>TO: " + venAddress + "</h3>");

				for (i = 0; i < shortCut.maneuvers[i].narrative.length; i++) {
					// Console.log directions
					console.log(shortCut.maneuvers[i].narrative);
					// Display the directions in a p element
					$("#dirDisplay").append("* " + shortCut.maneuvers[i].narrative + "<br>");

				};
			});
		});
	});
	//Empty form once it has been submitted
	$("#genre").val(' ');
	$("#address").val(' ');
	$("#cityName").val(' ');
	$("#stateCode").val(' ');
	$("#userZip").val(' ');
	// Empty the Previous Search
	$("#concert-body").val(' ');
	// MapQuest Ajax request for Directions

});