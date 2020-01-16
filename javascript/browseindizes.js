jQuery(document).ready(function($){
var entriesOfDictionary = new allEntries();
loadDataFromServer(entriesOfDictionary);
$("#browsegreekindex").on('click',function(event){ $('.browseindicescontent').remove(); $('#indices').append('<p class="browseindicescontent">Greek / Latin index</p>'); entriesOfDictionary.showAllEntriesGreek(); });
$("#browsearamaicindex").on('click',function(event){ $('.browseindicescontent').remove(); $('#indices').append('<p class="browseindicescontent">Aramaic index</p>'); entriesOfDictionary.showAllEntriesAramaic(); });

$("#browsegreekindex").on('mouseover',function(event){ $(this).css('background-color','#f7e9c3'); });
$("#browsegreekindex").on('mouseleave',function(event){ $(this).css('background-color','white'); });

$("#browsearamaicindex").on('mouseover',function(event){ $(this).css('background-color','#f7e9c3'); });
$("#browsearamaicindex").on('mouseleave',function(event){ $(this).css('background-color','white'); });

function loadDataFromServer(entriesObject) {
	var address = "https://vle-curation.acdh.oeaw.ac.at/restvle/dicts/dc_loans_genesis/entries?pageSize=100";
	var jqxhr = $.ajax({ url: address, xhrFields: {withCredentials:true}})
  .done(function() {
    var entries = processDictionaryData(jqxhr,entriesObject);
	entries.then(function(result){ return result; });
  })
  .fail(function() {
    reportError("Could not load entries.");
  });
}

function reportError(error) {
	$('#indices').append("<p class='errormessage'>An error occurred: " + error + "</p>");
}

async function processDictionaryData(jqxhr,entriesObject) {
	let listOfEntriesAsJSON = JSON.parse(jqxhr.responseText);
	let numberOfItems = listOfEntriesAsJSON.total_items;
	let listOfEntries = new Array();
	for (var i = 0; i < numberOfItems; i++){
		let id = listOfEntriesAsJSON._embedded.entries[i].id;
		if (id == 'test' || id == 'd' || id == 'test3' || id == 'dictProfile' || id == 'dictHeader' || id == 'androgynos_001') { console.log("Skipping entry: " + id); }
		else { listOfEntries.unshift(id); }
	}
	var entries = await getAllEntriesFromServer(listOfEntries,entriesObject);
	return new Promise(function(resolve,reject){ resolve(entries); }); //entries.then(function(response){ return response; },function(Error){ console.log(Error); }); 
}

function getEntryFromServer(id) {
	var addressOfEntry = "https://vle-curation.acdh.oeaw.ac.at/restvle/dicts/dc_loans_genesis/entries/" + id;
	return new Promise(function(resolve, reject) {
		var jqxhrForEntry = $.ajax({ url: addressOfEntry, xhrFields: {withCredentials:false}})
		.done(function() { resolve(JSON.parse(jqxhrForEntry.responseText).entry); })
		.fail(function() { reject(Error('An error occurred when reading entries from server. Id is: ' + id)); });
	});
}

function getAllEntriesFromServer(listOfEntries,entriesObject){
	var entries = new Array();
	let promises = new Array();
	for (var j = 0; j < listOfEntries.length; j++){
		let id = listOfEntries[j];
		let promise = getEntryFromServer(id);
		promises.unshift(promise);
		promise.then(function(response){ entries.unshift(response); },function(Error){ reportError("Please reload the page."); });
	}
	Promise.all(promises).then(function(response){ entriesObject.setEntries(entries); return entries; }, function(Error){ console.log("Error! Please reload the page."); });
}

function allEntries(){
	this.setEntries = function(entries){ this.entries = entries; }
	this.showAllEntriesAramaic = function(){
		let lemmata = new Array();
		let entriesAsDOM = new Array();
		for (var j = 0; j < this.entries.length; j++){
			let entry = this.entries[j];
			let parser = new DOMParser();
			let entryParsed = parser.parseFromString(entry,"text/xml");
			entriesAsDOM[j] = entryParsed;
			let lemma = entryParsed.getElementsByTagName('entry')[0].getElementsByTagName('form')[0].getElementsByTagName('orth')[0].childNodes[0].nodeValue;
			lemmata[j] = lemma;
		}
		lemmata.sort();
		$('.browseindicescontententrygreek').remove();
		for (var k = 0; k < lemmata.length; k++)
		{
			let idOfLemma = 'aramaicLemma-' + k;
			$('#indices').append("<p class='browseindicescontententryaramaic' id='" + idOfLemma + "'>" + lemmata[k] + "</p>");
			$("#" + idOfLemma).on('click',function(event){ showParticularAramaicEntry(this,lemmata,entriesAsDOM); });
			$("#" + idOfLemma).on('mouseover',function(event){ $(this).css('color','#a15203'); });
			$("#" + idOfLemma).on('mouseleave',function(event){ $(this).css('color','#fc9803'); });
		}
	}
	this.showAllEntriesGreek = function(){
		let lemmata = new Array();
		let entriesAsDOM = new Array();
		for (var j = 0; j < this.entries.length; j++){
			let entry = this.entries[j];
			let parser = new DOMParser();
			let entryParsed = parser.parseFromString(entry,"text/xml");
			entriesAsDOM[j] = entryParsed;
			let formNodes = entryParsed.getElementsByTagName('entry')[0].getElementsByTagName('form');
			let position = 0;
			for (var l = 0; l < formNodes.length; l++){
				let attribute = entryParsed.getElementsByTagName('entry')[0].getElementsByTagName('form')[l].getAttribute('type');
				if(attribute == 'equivalent'){ position = l; }
			}
			if (entryParsed.getElementsByTagName('entry')[0].getElementsByTagName('form')[position].getElementsByTagName('quote')[0].childNodes[0] != undefined)
			{
				let lemma = entryParsed.getElementsByTagName('entry')[0].getElementsByTagName('form')[position].getElementsByTagName('quote')[0].childNodes[0].nodeValue;
				lemmata[j] = lemma;
			}
		}
		lemmata.sort();
		lemmataFiltered = lemmata.filter(lemma => lemma != 'undefined');
		$('.browseindicescontententryaramaic').remove();
		for (var k = 0; k < lemmataFiltered.length; k++)
		{
			let idOfLemma = 'greekLemma-' + k;
			$('#indices').append("<p class='browseindicescontententrygreek' id='" + idOfLemma + "'>" + lemmataFiltered[k] + "</p>");
			$("#" + idOfLemma).on('click',function(event){ showParticularGreekEntry(this,lemmataFiltered,entriesAsDOM); });
			$("#" + idOfLemma).on('mouseover',function(event){ $(this).css('color','#a15203'); });
			$("#" + idOfLemma).on('mouseleave',function(event){ $(this).css('color','#fc9803'); });
		}
	}
	
	function showParticularAramaicEntry(pointerToElement,lemmata,entriesAsDOM){
		let idOfLemma = pointerToElement.getAttribute('id');
		let index = idOfLemma.substring(13);
		let aramaicLemma = lemmata[index];
		let position = 0;
		for (var n = 0; n < entriesAsDOM.length; n++)
		{
			let lemma = entriesAsDOM[n].getElementsByTagName('entry')[0].getElementsByTagName('form')[0].getElementsByTagName('orth')[0].childNodes[0].nodeValue;
			if (lemma == aramaicLemma) { position = n; }
		}
		
		renderLemmaDetails(entriesAsDOM,position,idOfLemma);
	}
	
	function showParticularGreekEntry(pointerToElement,greekLemmata,entriesAsDOM){
		let idOfLemma = pointerToElement.getAttribute('id');
		let index = idOfLemma.substring(11);
		let greekLemma = greekLemmata[index];
		let position = 0;
		for (var k = 0; k < entriesAsDOM.length; k++)
		{
			let formNodes = entriesAsDOM[k].getElementsByTagName('entry')[0].getElementsByTagName('form');
			let positionOfGreekLemma = 0;
			for (var l = 0; l < formNodes.length; l++)
			{
				let attribute = entriesAsDOM[k].getElementsByTagName('entry')[0].getElementsByTagName('form')[l].getAttribute('type');
				if (attribute == 'equivalent'){ positionOfGreekLemma = l; }
			}
			if (entriesAsDOM[k].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfGreekLemma].getElementsByTagName('quote')[0].childNodes[0] != undefined)
			{
				let lemma = entriesAsDOM[k].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfGreekLemma].getElementsByTagName('quote')[0].childNodes[0].nodeValue;
				if (lemma == greekLemma) { position = k; }
			}
		}
		
		renderLemmaDetails(entriesAsDOM,position,idOfLemma);
	}

function renderLemmaDetails(entriesAsDOM,position,idOfLemma){
	// entry/form@type=lemma/orth
	let formNodes = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form');
	let numberOfFormNodes = formNodes.length;
	let positionOfLemma = 0;
	for (var i = 0; i < numberOfFormNodes; i++)
	{
		let attribute = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[i].getAttribute('type');
		if (attribute == 'lemma') { positionOfLemma = i; }
	}
	let orthNodes = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfLemma].getElementsByTagName('orth');
	let positionOfAramaicLemma = 0;
	for (var j = 0; j < orthNodes.length; j++)
	{
		let attribute = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfLemma].getElementsByTagName('orth')[j].getAttribute('xml:lang');
		if (attribute == 'hbo') { positionOfAramaicLemma = j; }
	}
	let lemmaAramaic = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfLemma].getElementsByTagName('orth')[positionOfAramaicLemma].childNodes[0].nodeValue;
	let lemmaAramaicWithMarkup = "<span class='aramaicLemma'>" + lemmaAramaic + "</span>";
	let positionOfTranskription = 0;
	for (var m = 0; m < orthNodes.length; m++)
	{
		let attribute = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfLemma].getElementsByTagName('orth')[m].getAttribute('xml:lang');
		if (attribute == 'hbo-SHL') { positionOfTranskription = m; }
	}
	let lemmaTranskription = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfLemma].getElementsByTagName('orth')[positionOfTranskription].childNodes[0].nodeValue;
	let lemmaTranskriptionWithMarkup = "&#9001;<span class='transcriptionLemma'>" + lemmaTranskription + "</span>&#9002;"
	// entry/form@type=lemma/pron
	let lemmaIPA = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfLemma].getElementsByTagName('pron')[0].childNodes[0].nodeValue;
	let lemmaIPAWithMarkup = "|<span class='transcriptionLemma'>" + lemmaIPA + "</span>|";
	$('.divaroundentry').remove();
	$("#" + idOfLemma).append("<div class='divaroundentry' id='divaroundentrydetails'><p class='showgreekentrycontent' id='formlemma'>" + lemmaAramaicWithMarkup + " " + lemmaTranskriptionWithMarkup + " " + lemmaIPAWithMarkup + "</p></div>");
	// gramGrp of lemma - entry/form@type=lemma/gramGrp/pos - subc - gram or gram - gram - gram
	let gramGrpPos = '';
	if ( entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfLemma].getElementsByTagName('gramGrp')[0].getElementsByTagName('pos')[0] != undefined )
	{
		gramGrpPos = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfLemma].getElementsByTagName('gramGrp')[0].getElementsByTagName('pos')[0].childNodes[0].nodeValue;
	}
	let gramGrpSubc = '';
	if ( entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfLemma].getElementsByTagName('gramGrp')[0].getElementsByTagName('subc')[0] != undefined )
	{
		gramGrpSubc = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfLemma].getElementsByTagName('gramGrp')[0].getElementsByTagName('subc')[0].childNodes[0].nodeValue;
	}
	let gramGrpGram = '';
	if ( entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfLemma].getElementsByTagName('gramGrp')[0].getElementsByTagName('gram')[0] != undefined)
	{
		let numberOfGramElements = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfLemma].getElementsByTagName('gramGrp')[0].getElementsByTagName('gram').length;
		for (var k = 0; k < numberOfGramElements; k++)
		{
			let gram = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfLemma].getElementsByTagName('gramGrp')[0].getElementsByTagName('gram')[k].childNodes[0].nodeValue;
			if (k == 0) { gramGrpGram = gram; }
			else { gramGrpGram = gramGrpGram + " " + gram; }
		}
	}
	let resultOfGramGrp = '';
	if (gramGrpPos == '' && gramGrpSubc == ''){ resultOfGramGrp = gramGrpGram; }
	else { resultOfGramGrp = gramGrpPos + " " + gramGrpSubc + " " + gramGrpGram; }
	$("#divaroundentrydetails").append("<p class='entrygraminfo' id='gramlemma'><span class='entrymaintext'>Grammatical information: " + resultOfGramGrp + "</span></p>");
	// variants of a lemma
	let positionsOfVariants = new Array();
	for (var l = 0; l < numberOfFormNodes; l++)
	{
		let attribute = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[l].getAttribute('type');
		if (attribute == 'variant'){ positionsOfVariants.push(l); }
	}
	for (var n = 0; n < positionsOfVariants.length; n++)
	{
		let positionOfVariant = 0;
		let orthNodes = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionsOfVariants[n]].getElementsByTagName('orth');
		for (var o = 0; o < orthNodes.length; o++)
		{
			let attribute = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionsOfVariants[n]].getElementsByTagName('orth')[o].getAttribute('xml:lang');
			if (attribute == 'hbo'){ positionOfVariant = o; }
		}
		let positionOfTranscription = 0;
		for (var p = 0; p < orthNodes.length; p++)
		{	
			let attribute = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionsOfVariants[n]].getElementsByTagName('orth')[p].getAttribute('type');
			if (attribute == 'transliteration'){ positionOfTranscription = p; }
		}
		let variantAramaic = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionsOfVariants[n]].getElementsByTagName('orth')[positionOfVariant].childNodes[0].nodeValue;
		let variantTranscription = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionsOfVariants[n]].getElementsByTagName('orth')[positionOfTranscription].childNodes[0].nodeValue;
		let variantIPA = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionsOfVariants[n]].getElementsByTagName('pron')[0].childNodes[0].nodeValue;
		$('#divaroundentrydetails').append("<p class='entryvariant'><span class='entrymaintext'>Variant: </span><span class='aramaicLemmaVariant'>" + variantAramaic + " <span class='entrymaintext'>&#9001;" + variantTranscription + "&#9002;</span><span class='entrymaintext'> |" + variantIPA + "|</span></p>");
	}
	// form @type = inflected
	let positionsOfInflectedForms = new Array();
	for (var q = 0; q < numberOfFormNodes; q++)
	{
		let attribute = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[q].getAttribute('type');
		if (attribute == 'inflected'){ positionsOfInflectedForms.push(q); }
	}
	for (var r = 0; r < positionsOfInflectedForms.length; r++)
	{
		let positionOfInflectedForm = 0;
		let orthNodes = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionsOfInflectedForms[r]].getElementsByTagName('orth');
		for (var s = 0; s < orthNodes.length; s++)
		{
		let attribute = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionsOfInflectedForms[r]].getElementsByTagName('orth')[s].getAttribute('xml:lang');
			if (attribute == 'hbo'){ positionOfInflectedForm = s; }
		}
		let positionOfInflectedFormTranscription = 0;
		for (var t = 0; t < orthNodes.length; t++)
		{
			let attribute = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionsOfInflectedForms[r]].getElementsByTagName('orth')[t].getAttribute('type');
			if (attribute == 'transliteration'){ positionOfInflectedFormTranscription = t; }
		}
		let inflectedFormGramGrpPos = '';
		let inflectedFormGramGrpGram = '';
		if (entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionsOfInflectedForms[r]].getElementsByTagName('gramGrp')[0] != undefined)
		{
			if (entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionsOfInflectedForms[r]].getElementsByTagName('gramGrp')[0].getElementsByTagName('pos')[0] != undefined)
			{
				inflectedFormGramGrpPos = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionsOfInflectedForms[r]].getElementsByTagName('gramGrp')[0].getElementsByTagName('pos')[0].childNodes[0].nodeValue + " ";
			}
			let numberOfGramGrpGram = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionsOfInflectedForms[r]].getElementsByTagName('gramGrp')[0].getElementsByTagName('gram').length;
			for (var i = 0; i < numberOfGramGrpGram; i++)
			{
				if (i == 0) { inflectedFormGramGrpGram = inflectedFormGramGrpGram + entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionsOfInflectedForms[r]].getElementsByTagName('gramGrp')[0].getElementsByTagName('gram')[i].childNodes[0].nodeValue; }
				else { inflectedFormGramGrpGram = inflectedFormGramGrpGram + " " + entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionsOfInflectedForms[r]].getElementsByTagName('gramGrp')[0].getElementsByTagName('gram')[i].childNodes[0].nodeValue; }
			}
		}
		let inflectedFormAramaic = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionsOfInflectedForms[r]].getElementsByTagName('orth')[positionOfInflectedForm].childNodes[0].nodeValue;
		let inflectedFormTranscription = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionsOfInflectedForms[r]].getElementsByTagName('orth')[positionOfInflectedFormTranscription].childNodes[0].nodeValue;
		let inflectedFormIPA = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionsOfInflectedForms[r]].getElementsByTagName('pron')[0].childNodes[0].nodeValue;
		$('#divaroundentrydetails').append("<p class='entryvariant'><span class='entrymaintext'>Inflected Form: </span><span class='aramaicLemmaVariant'>" 
			+ inflectedFormAramaic + "</span><span class='entrymaintext'> &#9001;" 
			+ inflectedFormTranscription + "&#9002;</span><span class='entrymaintext'> |" 
			+ inflectedFormIPA + "|</span><span class='entrymaintext'> (" + inflectedFormGramGrpPos + inflectedFormGramGrpGram + ")</span></p>");
	}
	// form @type = equivalent
	let positionsOfEquivalentForms = new Array();
	for (var u = 0; u < numberOfFormNodes; u++)
	{
		let attribute = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[u].getAttribute('type');
		if (attribute == 'equivalent'){ positionsOfEquivalentForms.push(u); }
	}
	for (var v = 0; v < positionsOfEquivalentForms.length; v++)
	{
		let equivalentForm = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('form')[positionsOfEquivalentForms[v]].getElementsByTagName('quote')[0].childNodes[0].nodeValue;
		$('#divaroundentrydetails').append("<p class='entryequivalent'>Equivalent: <span class='greekequivalent'>" + equivalentForm + "</span></p>");
	}
	// usg - lbl - etym
	if (entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('usg')[0] != undefined)
	{
		let usageRegister = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('usg')[0].getAttribute('register');
		let usageContent = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('usg')[0].childNodes[0].nodeValue;
		$('#divaroundentrydetails').append("<p class='entryusage'>Usage: " + usageContent + " - Register: " + usageRegister + "</p>");
	}
	if (entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('lbl')[0] != undefined)
	{
		let labelContent = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('lbl')[0].childNodes[0].nodeValue;
		$('#divaroundentrydetails').append("<p class='entrylabel'>Label: " + labelContent + "</p>");
	}
	if (entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('etym')[0] != undefined)
	{
		let numberOfSegments = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('etym')[0].getElementsByTagName('seg').length;
		let segmentsContent = 'Etymology: ';
		for (var i = 0; i < numberOfSegments; i++)
		{
			if (i == 0) { segmentsContent = segmentsContent + "<span class='examplehebrew'>" + entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('etym')[0].getElementsByTagName('seg')[i].childNodes[0].nodeValue + "</span>"; }
			else { segmentsContent = segmentsContent + " - " + "<span class='examplehebrew'>" + entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('etym')[0].getElementsByTagName('seg')[i].childNodes[0].nodeValue + "</span>"; }
		}
		$('#divaroundentrydetails').append("<p class='entryetymology'>" + segmentsContent + "</p>");
	}
	// sense
	let numberOfSenses = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense').length;
	for (var w = 0; w < numberOfSenses; w++)
	{
		if (entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[0].getAttribute('type') == 'translation')
		{
			let senseInformation = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[0].getElementsByTagName('quote')[0].childNodes[0].nodeValue;
			let indexOfSenses = ''; 
			if (numberOfSenses > 1){ indexOfSenses = w + 1; $('#divaroundentrydetails').append("<p class='entrysense'>" + indexOfSenses + ".) Translation: " + senseInformation + "</p>"); }
			else { $('#divaroundentrydetails').append("<p class='entrysense'> Translation: " + senseInformation + "</p>"); }
		}
		// sense/cit @type = example /quote ...
		let positionsOfExamples = new Array();
		for (var x = 0; x < entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit').length; x++)
		{
			let attribute = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[x].getAttribute('type')
			if (attribute == 'example'){ positionsOfExamples.push(x); }
		}
		for (var z = 0; z < positionsOfExamples.length; z++)
		{
			let numberOfChildNodes = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[positionsOfExamples[z]].getElementsByTagName('quote')[0].childNodes.length;
			let textContentOfQuotation = "";
			for (var a = 0; a < numberOfChildNodes; a++)
			{
				// console.log(entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[positionsOfExamples[z]].getElementsByTagName('quote')[0].childNodes[a]);
				if (entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[positionsOfExamples[z]].getElementsByTagName('quote')[0].childNodes[a] != undefined && entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[positionsOfExamples[z]].getElementsByTagName('quote')[0].childNodes[a].nodeName == "app")
				{
					textContentOfQuotation = textContentOfQuotation + " [" + entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[positionsOfExamples[z]].getElementsByTagName('quote')[0].childNodes[a].getElementsByTagName('lem')[0].childNodes[0].nodeValue + "]";
				}
				else if (entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[positionsOfExamples[z]].getElementsByTagName('quote')[0].childNodes[a] != undefined
				         && entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[positionsOfExamples[z]].getElementsByTagName('quote')[0].childNodes[a].nodeName == 'ref')
						 { textContentOfQuotation = textContentOfQuotation + "<span class='linkentry'>" + entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[positionsOfExamples[z]].getElementsByTagName('quote')[0].childNodes[a].childNodes[0].nodeValue + "</span>"; }
				else if (entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[positionsOfExamples[z]].getElementsByTagName('quote')[0].childNodes[a] != undefined) { textContentOfQuotation = textContentOfQuotation + " " + entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[positionsOfExamples[z]].getElementsByTagName('quote')[0].childNodes[a].nodeValue.trim(); }
			}
			let criticalApparatus = new Array();
			for (var a = 0; a < numberOfChildNodes; a++)
			{
				if (entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[positionsOfExamples[z]].getElementsByTagName('quote')[0].childNodes[a] != undefined && entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[positionsOfExamples[z]].getElementsByTagName('quote')[0].childNodes[a].nodeName == "app")
				{
					let criticalApparatusEntry = "[" + entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[positionsOfExamples[z]].getElementsByTagName('quote')[0].childNodes[a].getElementsByTagName('lem')[0].childNodes[0].nodeValue + "]";
					let numberOfReadings = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[positionsOfExamples[z]].getElementsByTagName('quote')[0].childNodes[a].getElementsByTagName('rdg').length;
					for (var b = 0; b < numberOfReadings; b++)
					{
						if (entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[positionsOfExamples[z]].getElementsByTagName('quote')[0].childNodes[a].getElementsByTagName('rdg')[b].childNodes[0] != undefined)
						{
							let reading = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[positionsOfExamples[z]].getElementsByTagName('quote')[0].childNodes[a].getElementsByTagName('rdg')[b].childNodes[0].nodeValue;
							let witness = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[positionsOfExamples[z]].getElementsByTagName('quote')[0].childNodes[a].getElementsByTagName('rdg')[b].getAttribute('wit');
							criticalApparatusEntry = criticalApparatusEntry + " " + "<span class='entrymaintext'>" + witness.substring(1,witness.length) + ":</span> " + reading;
						}
						else
						{
							let reading = "om";
							let witness = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[positionsOfExamples[z]].getElementsByTagName('quote')[0].childNodes[a].getElementsByTagName('rdg')[b].getAttribute('wit');
							criticalApparatusEntry = criticalApparatusEntry + " " + "<span class='entrymaintext'>" + witness.substring(1,witness.length) + ": " + reading + "</span>";
						}						
					}
					criticalApparatus.push(criticalApparatusEntry);
				}
			}
			let bibliographySource = ''
			for (var a = 0; a < entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[positionsOfExamples[z]].getElementsByTagName('bibl')[0].getElementsByTagName('ref').length; a++)
			{
				let bibliographySourceEntry = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[positionsOfExamples[z]].getElementsByTagName('bibl')[0].getElementsByTagName('ref')[a].childNodes[0].nodeValue;
				if (a == 0) { bibliographySource = bibliographySourceEntry; }
				else { bibliographySource = bibliographySource + " " + bibliographySourceEntry; }
			}
			$('#divaroundentrydetails').append("<p class='examplehebrew'>" + textContentOfQuotation + "<span class='entrybibliography'> (" + bibliographySource + ")</span></p>");
			for (var a = 0; a < criticalApparatus.length; a++)
			{
				$('#divaroundentrydetails').append("<p class='criticalapparatus'>" + criticalApparatus[a] + "</p>");
			}
			let numberOfChildNodesOfTranslation = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[positionsOfExamples[z]].getElementsByTagName('cit')[0].getElementsByTagName('quote')[0].childNodes.length;
			let exampleTranslation = '';
			for (var a = 0; a < numberOfChildNodesOfTranslation; a++)
			{
				if (entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[positionsOfExamples[z]].getElementsByTagName('cit')[0].getElementsByTagName('quote')[0].childNodes[a] != undefined)
				{
					// term
					if (entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[positionsOfExamples[z]].getElementsByTagName('cit')[0].getElementsByTagName('quote')[0].childNodes[a].nodeName == 'term')
					{
						let languageOfTerm = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[positionsOfExamples[z]].getElementsByTagName('cit')[0].getElementsByTagName('quote')[0].childNodes[a].getAttribute('xml:lang');
						let contentOfTerm = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[positionsOfExamples[z]].getElementsByTagName('cit')[0].getElementsByTagName('quote')[0].childNodes[a].childNodes[0].nodeValue;
						switch (languageOfTerm){
							case 'hbo' : exampleTranslation += " <span class='entrymaintexthebrew'>" + contentOfTerm + " </span>"; break;
							case 'grc' : exampleTranslation += " <span class='entrymaintextgreek'>" + contentOfTerm + " </span>"; break;
							case 'hbo-SHL' : exampleTranslation += " <span class='entrymaintext'>" + contentOfTerm + " </span>"; break;
							default: exampleTranslation += " <span class='entrymaintext'>" + contentOfTerm + " </span>";
						}
					}
					// ref
					else if (entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[positionsOfExamples[z]].getElementsByTagName('cit')[0].getElementsByTagName('quote')[0].childNodes[a].nodeName == 'ref')
					{
						exampleTranslation = exampleTranslation + " <span class='linkentry'>" + entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[positionsOfExamples[z]].getElementsByTagName('cit')[0].getElementsByTagName('quote')[0].childNodes[a].childNodes[0].nodeValue + " </span>";
					}
					// text only
					else
					{
						exampleTranslation = exampleTranslation + entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('sense')[w].getElementsByTagName('cit')[positionsOfExamples[z]].getElementsByTagName('cit')[0].getElementsByTagName('quote')[0].childNodes[a].nodeValue.trim();
					}
				}
			}
			$('#divaroundentrydetails').append("<p class='translationexample'>" + exampleTranslation + "</p>");
		}
	}
	// note
	let entryNote = '';
	let numberOfChildNodesOfNote = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('note')[0].childNodes.length;
	for (var a = 0; a < numberOfChildNodesOfNote; a++)
	{
		if (entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('note')[0].childNodes[a] != undefined)
		{
			// term
			if (entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('note')[0].childNodes[a].nodeName == 'term')
			{
				let languageOfTerm = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('note')[0].childNodes[a].getAttribute('xml:lang');
				let contentOfTerm = entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('note')[0].childNodes[a].childNodes[0].nodeValue;
				switch (languageOfTerm){
					case 'hbo' : entryNote += " <span class='entrymaintexthebrew'>" + contentOfTerm + " </span>"; break;
					case 'grc' : entryNote += " <span class='entrymaintextgreek'>" + contentOfTerm + " </span>"; break;
					case 'hbo-SHL' : entryNote += " <span class='entrymaintext'>" + contentOfTerm + " </span>"; break;
					default: entryNote += " <span class='entrymaintext'>" + contentOfTerm + " </span>";
				}
			}
			// ref
			else if (entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('note')[0].childNodes[a].nodeName == 'ref')
			{
				entryNote = entryNote + " <span class='linkentry'>" + entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('note')[0].childNodes[a].childNodes[0].nodeValue + " </span>";
			}
			// text only
			else
			{
				entryNote = entryNote + entriesAsDOM[position].getElementsByTagName('entry')[0].getElementsByTagName('note')[0].childNodes[a].nodeValue.trim();
			}
		}
	}
	$('#divaroundentrydetails').append("<p class='entrynote'>" + entryNote + "</p>");
}
}
});