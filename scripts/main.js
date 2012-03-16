var results = []
function printResults() {
	//Röðum fylkinu í minnkandi röð
	results.sort(function(a,b) {
		return a[2] - b[2]
	})
	//Þurrkum út gamlar niðurstöður
	$('div#content').text("")
	for(var i = 0; i != results.length; i++) {
		$('div#content')
		.prepend($('<div>').addClass('row')
			.append($('<div><a href="'+results[i][1]+'">'+results[i][0]+'</a></div>').addClass('left'))
			.append($('<div>'+((results[i][2] == -1) ? 'n/a</div>' : results[i][2]+' MB</div>')).addClass('right'))
		)
	}
	
	//Birtum niðrustöður
	$('div#searchResults').slideDown("fast")
}

function search() {
	//Hreinsum gamlar niðurstöður úr fylkinu
	results = []
	
	//Smíðum leitarstreng
	var query = $('input#query').val()
	
	//Athugum hversu oft þarf að sækja niðurstöður
	repeat = $('select#count').val()
	
	for(var site in sites) {
		//Þessi breyta er notuð til að hætta við callbacks ef þau
		//koma eftir að keyrslu er lokið
		var finished = false
		for(var i = 0; i < repeat; i++) {
			//Búum til lokun utan um get requestið svo að site breytan
			//sé nothæf í callbackinu
			(function(siteID) {
				$.get("p.php?query="+query+"&resultpage="+i*10+"&site="+siteID, function (data) {
					if(finished) {
						//Höfum í huga að þetta callback er líklegast keyrt löngu
						//eftir að for-lykkjan klárar allar sínar umferðir. Neyðumst
						//því til að láta öll callback-in keyra og stoppa þau þá á
						//þennan hátt ef ekki er þörf á þeim
						return false
					}
					var result = $(data) //result er nú DOM tré google síðunnar
					$.each(result.find('li.g'), function(key, object) {
						processedResults = sites[siteID].processResult(object)
						results.push(processedResults)
					})
					//prentum niðurstöðurnar
					printResults()
					
					//Athugum hvort niðurstöður í results séu margfeldi
					//af 10. ef svo er ekki pottþétt allar niðurstöður komnar
					if(results.length % 10 != 0) {
						//allar niðurstöður eru komnar
						finished = true
					}
				})
			})(site)
		}
	}
}
$(document).ready(function() {
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
})