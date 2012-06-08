var results = []
function printResults() {
	//Sort the array in decreasing order
	results.sort(function(a,b) {
		return a[2] - b[2]
	})
	//Erase old text in the div
	$('div#content').text("")
	for(var i = 0; i != results.length; i++) {
		$('div#content')
		.prepend($('<div>').addClass('row')
			.append($('<div><a href="'+results[i][1]+'">'+results[i][0]+'</a></div>').addClass('left'))
			.append($('<div>'+((results[i][2] == -1) ? 'n/a</div>' : results[i][2]+' MB</div>')).addClass('right'))
		)
	}
	
	//Show the results
	$('div#searchResults').slideDown("fast")
}

function search() {
	//Erase old results
	results = []
	
	//Build query
	var query = $('input#query').val()
	
	//Check how often results need to be fetched.
	//This is determined by the number of iterations
	//the user wants.
	repeat = $('select#count').val()
	
	for(var site in sites) {
		//The finished variable is used to cancel callbacks if
		//they arrive after execution of the next loop is finished
		var finished = false
		for(var i = 0; i < repeat; i++) {
			//To make the site variable accessable in the get
			//request's callback, a closure is created around
			//the get request.
			(function(siteID) {
				$.get("p.php?query="+query+"&resultpage="+i*10+"&site="+siteID, function (data) {
					if(finished) {
						//If this particular callback is not required we'll drop it
						return false
					}
					var result = $(data) //The DOM tree of the response page is now in result
					$.each(result.find('li.g'), function(key, object) {
						processedResults = sites[siteID].processResult(object)
						results.push(processedResults)
					})
					//print the results
					printResults()

					//If the number of results currently in the results array
					//is not a multiple of 10, the search is over.
					if(results.length % 10 != 0) {
						finished = true
					}
				})
			})(site)
		}
	}
}
var closeHover;
$(document).ready(function() {
	$('div#blanket').hide()
	
	//Attach click events to buttons
	$('input#query').keypress(function(event) {
		if(event.which == 13 && $('input#query').val() != "") {
			search()
		}
	})
	$('button#searchBtn').on('click', function() {
		if($('input#query').val() != "") {
			search()
		}
	})
	$('svg#aboutButton').on('mouseup', function() {
		$('div#popup').fadeIn("fast")
		$('div#blanket').fadeIn("fast")
	})
	
	//Hide the popup if user clicks on the close
	//button or outside the popup
	$('html').on('mousedown', function() {
		$('div#popup').fadeOut("fast")
		$('div#blanket').fadeOut("fast")
	})
	$('svg#closeButton').hover(function() {
		closeHover = true
	}, function() {
		closeHover = false
	})
	$('div#popup').on('mousedown', function(e) {
		if(!closeHover) {
			e.stopPropagation()
		}
	})
})