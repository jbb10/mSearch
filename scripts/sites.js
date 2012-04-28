//TODO: abstracta leitarföllin í sameiginlegt leitarfall
//sem kallar á t.d. getName(), getLink()... fyrir hverja síðu fyrir sig
var sites = []

//Zippyshare
zippyshare = new Object()
zippyshare.id = 0
zippyshare.processResult = searchZippyshare
function searchZippyshare(results) {
	//Pick out the search result's link
	var link = "http://"+$(results).find('div > cite').text()

	//Pick out the search result's name
	var name = $(results).find('div.s').text()
	name = name.match(/Name: .*(?= Size)/).toString()
	name = name.substring(6)
	
	//Pick out the search result's size
	var size = $(results).find('div.s').text()
	size = size.match(/Size: .*/)
	if(size == null) {
		size = -1
	} else {
		size = size.toString()
		
		//Remove text behind the size
		size = size.replace(/ MB.*/,"")
		
		//Remove text in front of the size
		size = size.substring(6)
		
		//cast to float
		size = parseFloat(size,10)
	}

	var result = [name,link,size]
	return result
}
sites.push(zippyshare)

//Mediafire

//This site is not giving good search results

mediafire = new Object()
mediafire.id = 1
mediafire.processResult = searchMediafire
function searchMediafire(results) {
	//Pick out the search result's link
	var link = "http://"+$(results).find('div > cite').text()

	//Pick out the search result's name
	var name = $(results).find('h3.r > a').text()

	//Pick out the search result's size
	var size = $(results).find('div.s').text()
	size = size.match(/\([0-9]*\.[0-9]* MB\)/)
	if(size == null) {
		size = -1
	} else {
		size = size.toString()
		
		//Remove text behind the size
		size = size.replace(/ MB\)/,"")
		
		//Remove text in front of the size
		size = size.substring(1)
		
		//cast to float
		size = parseFloat(size,10)
	}

	var result = [name,link,size]
	return result
}
sites.push(mediafire)