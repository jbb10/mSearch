var results = []
function printResults() {
	//Röður fylkinu í minnkandi röð
	results.sort(function(a,b) {
		return a[2] - b[2]
	})
	//Þurrkum út gamlar niðurstöður
	$('div#content').text("")
	for(var i = 0; i != results.length; i++) {
		$('div#content')
		.prepend($('<div>').addClass('row')
			.append($('<div><a href="'+results[i][1]+'">'+results[i][0]+'</a></div>').addClass('left'))
			.append($('<div>'+results[i][2]+' MB</div>').addClass('right'))
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
	var key = "AIzaSyD56onpPJN8adNaKnaryho1Gja9v4oBDGg"
	var engineID = "002725803996467447504:joxbn3mcdpg"
	
	//Athugum hversu oft þarf að sækja niðurstöður
	repeat = $('select#count').val()
	
	var finished = false
	for(var i = 0; i < repeat; i = i+10) {
		//leita hérna á google
		$.get("p.php?query="+query+"&resultpage="+i, function (data) {
			if(finished) {
				//Höfum í huga að þetta callback er líklegast keyrt löngu
				//eftir að for-lykkjan klárar allar sínar umferðir. Neyðumst
				//því til að láta öll callback-in keyra og stoppa þau þá svona
				return false
			}
			var result = $(data) //result er nú DOM tré google síðunnar
			$.each(result.find('div.s'), function(key, object) {
				//Sækjum hlekk niðurstöðunnar
				var link = "http://"+$(object).find('div > cite').text()

				//Sækjum nafn niðurstöðunnar
				var name = $(object).text()
				name = name.match(/Name: .*(?= Size)/).toString()
				name = name.substring(6)
				

				//Sækjum stærðina
				var size = $(object).text()
				size = size.match(/Size: .*/)
				if(size == null) {
					size = -1
				} else {
					size = size.toString()
					//Fjarlægi aftan af stærðinni
					size = size.replace(/ MB.*/,"")
					//Fjarlægi framan af stærðinni
					size = size.substring(6)
					size = parseFloat(size,10)
				}

				//Skellum nú niðurstöðunni í results fylkið
				var result = [name,link,size]
				results.push(result)
			})
			//prentum niðurstöðurnar
			printResults()
			if(results.length % 10 != 0) {
				//allar niðurstöður eru komnar
				finished = true
			}
		})
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