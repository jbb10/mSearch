//TODO: abstracta leitarföllin í sameiginlegt leitarfall
//sem kallar á t.d. getName(), getLink()... fyrir hverja síðu fyrir sig
var sites = []

//Zippyshare
zippyshare = new Object()
zippyshare.id = 0
zippyshare.processResult = searchZippyshare
function searchZippyshare(results) {
	//Sækjum hlekk niðurstöðunnar
	var link = "http://"+$(results).find('div > cite').text()

	//Sækjum nafn niðurstöðunnar
	var name = $(results).find('div.s').text()
	name = name.match(/Name: .*(?= Size)/).toString()
	name = name.substring(6)
	
	//Sækjum stærðina
	var size = $(results).find('div.s').text()
	size = size.match(/Size: .*/)
	if(size == null) {
		size = -1
	} else {
		size = size.toString()
		
		//Fjarlægi aftan af stærðinni
		size = size.replace(/ MB.*/,"")
		
		//Fjarlægi framan af stærðinni
		size = size.substring(6)
		
		//breyti úr streng í tölu
		size = parseFloat(size,10)
	}

	//Skellum nú niðurstöðunni í results fylkið
	var result = [name,link,size]
	return result
}
sites.push(zippyshare)

//Mediafire
mediafire = new Object()
mediafire.id = 1
mediafire.processResult = searchMediafire
function searchMediafire(results) {
	//Sækjum hlekk niðurstöðunnar
	var link = "http://"+$(results).find('div > cite').text()

	//Sækjum nafn niðurstöðunnar
	var name = $(results).find('h3.r > a').text()

	//Sækjum stærðina
	var size = $(results).find('div.s').text()
	size = size.match(/\([0-9]*\.[0-9]* MB\)/)
	if(size == null) {
		size = -1
	} else {
		size = size.toString()
		
		//Fjarlægi aftan af stærðinni
		size = size.replace(/ MB\)/,"")
		
		//Fjarlægi framan af stærðinni
		size = size.substring(1)
		
		//breyti úr streng í tölu
		size = parseFloat(size,10)
	}

	//Skellum nú niðurstöðunni í results fylkið
	var result = [name,link,size]
	return result
}
sites.push(mediafire)