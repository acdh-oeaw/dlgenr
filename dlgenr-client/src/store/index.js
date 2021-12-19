import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    dictionaryEntriesAsDOMObjects : new Array(),
    greekEntriesToEntriesMapping : new Array(),
    hebrewEntriesToEntriesMapping : new Array(),
    greekEntriesHeaders : new Array(),
    hebrewEntriesHeaders : new Array(),
    greekEntriesDetails : new Array(),
    hebrewEntriesDetails : new Array(),
    loadingState : false,
    numberOfItems : 0,
    numberOfPages : 0,
    pageNumber : 0,
    firstPageURL : '',
    lastPageURL : '',
    nextPageURL : '',
    previousPageURL : '',
    actualPageURL : '',
    pageSize : 25,
    dictionaryEntryAsDOMObject : '',
    hebrewEntryHeader : undefined,
    hebrewEntryDetails : undefined,
    searchResultDictionaryEntriesAsDOMObject: new Array(),
    searchResultHebrewEntriesHeader: undefined,
    searchResultHebrewEntriesDetails: undefined,
    searchStringLemmaOrFullText: "ft_lem",
    searchResultErrorOccurred : false,
    searchResultErrorMessage : ''
  },
  mutations: {
    'SET_STORE'(state,entries){
      state.dictionaryEntriesAsDOMObjects = entries;
    },
    'SET_GREEK_ENTRIES_MAPPING'(state,mapping){
      state.greekEntriesToEntriesMapping = mapping;
    },
    'SET_HEBREW_ENTRIES_MAPPING'(state,mapping){
      state.hebrewEntriesToEntriesMapping = mapping;
    },
    'SET_GREEK_ENTRIES_HEADERS'(state,headers){
      state.greekEntriesHeaders = headers;
    },
    'SET_HEBREW_ENTRIES_HEADERS'(state,headers){
      state.hebrewEntriesHeaders = headers;
    },
    'SET_GREEK_ENTRIES_DETAILS'(state,details){
      state.greekEntriesDetails = details;
    },
    'SET_HEBREW_ENTRIES_DETAILS'(state,details){
      state.hebrewEntriesDetails = details;
    },
    'SET_LOADING_STATE'(state,loadingState){
      state.loadingState = loadingState;
    },
    'SET_NUMBER_OF_ITEMS'(state,numberOfItems){
      state.numberOfItems = numberOfItems;
    },
    'SET_NUMBER_OF_PAGES'(state,numberOfPages){
      state.numberOfPages = numberOfPages;
    },
    'SET_PAGE_NUMBER'(state,pageNumber){
      state.pageNumber = pageNumber;
    },
    'SET_FIRST_PAGE_URL'(state,first){
      state.firstPageURL = first;
    },
    'SET_LAST_PAGE_URL'(state,last){
      state.lastPageURL = last;
    },
    'SET_NEXT_PAGE_URL'(state,next){
      state.nextPageURL = next;
    },
    'SET_PREVIOUS_PAGE_URL'(state,previous){
      state.previousPageURL = previous;
    },
    'SET_ACTUAL_PAGE_URL'(state,actual){
      state.actualPageURL = actual;
    },
    'SET_DICTIONARY_ENTRY_AS_DOM_OBJECT'(state,dictionaryEntryAsDOMObject){
        state.dictionaryEntryAsDOMObject = dictionaryEntryAsDOMObject;
    },
    'SET_HEBREW_ENTRY_HEADER'(state,hebrewEntryHeader){
        state.hebrewEntryHeader = hebrewEntryHeader;
    },
    'SET_HEBREW_ENTRY_DETAILS'(state,hebrewEntryDetails){
        state.hebrewEntryDetails = hebrewEntryDetails;
    },
    'SET_SEARCH_RESULT_DICTIONARY_ENTRIES_AS_DOM_OBJECT'(state,searchResultDictionaryEntriesAsDOMObject){
        state.searchResultDictionaryEntriesAsDOMObject = searchResultDictionaryEntriesAsDOMObject;
    },
    'SET_SEARCH_RESULT_HEBREW_ENTRIES_HEADER'(state,searchResultHebrewEntriesHeader){
        state.searchResultHebrewEntriesHeader = searchResultHebrewEntriesHeader;
    },
    'SET_SEARCH_RESULT_HEBREW_ENTRIES_DETAILS'(state,searchResultHebrewEntriesDetails){
        state.searchResultHebrewEntriesDetails = searchResultHebrewEntriesDetails;
    },
    'SET_SEARCH_RESULT_ERROR_MESSAGE'(state,errorMessage){
        state.searchResultErrorMessage = errorMessage;
    },
    'SET_SEARCH_RESULT_ERROR_STATE'(state,errorState){
        state.searchResultErrorOccurred = errorState;
    },
    'SET_SEARCH_TYPE_LEMMATA'(state){
        state.searchStringLemmaOrFullText = "ft_lem";
    },
    'SET_SEARCH_TYPE_FULLTEXT'(state){
        state.searchStringLemmaOrFullText = "ft_all";
    }
  },
  actions: {
    initStore: (context) => {
        let promise = getFirstPageOfEntries();
        promise.then(function(payload){
          context.commit('SET_STORE',payload.listOfEntries);
          context.commit('SET_NUMBER_OF_ITEMS',payload.numberOfItems);
          context.commit('SET_NUMBER_OF_PAGES',parseInt(payload.numberOfPages));
          context.commit('SET_FIRST_PAGE_URL',payload.firstPage);
          context.commit('SET_LAST_PAGE_URL',payload.lastPage);
          context.commit('SET_NEXT_PAGE_URL',payload.nextPage);
          context.commit('SET_ACTUAL_PAGE_URL',payload.actualPage);
          context.commit('SET_PAGE_NUMBER',1);
          context.dispatch('initGreekEntries'); 
          context.dispatch('initHebrewEntries');
    });},
    reinitializeStore (context,pageNumber) {
      if (pageNumber != this.getters.getPageNumber && pageNumber >= 1 && pageNumber <= this.getters.getNumberOfPages &&  ((pageNumber - 1) === this.getters.getPageNumber || (pageNumber + 1) === this.getters.getPageNumber)){
        context.commit('SET_LOADING_STATE',false);
        if (pageNumber > this.getters.getPageNumber){
          let previousPageURL = this.getters.getActualPageURL;
          let nextPageURL = "https://vle-curation.acdh.oeaw.ac.at/restvle/dicts/dc_loans_genesis/entries?page=" + pageNumber + "&pageSize=" + this.getters.getPageSize;
          let promise = getNextPageOfEntries(nextPageURL);
          promise.then(function(payload){
            context.commit('SET_PREVIOUS_PAGE_URL',previousPageURL);
            context.commit('SET_ACTUAL_PAGE_URL',"https://vle-curation.acdh.oeaw.ac.at" + payload.actualPage);
            context.commit('SET_NEXT_PAGE_URL',"https://vle-curation.acdh.oeaw.ac.at" + payload.nextPage);
            context.commit('SET_STORE',payload.listOfEntries);
            context.commit('SET_PAGE_NUMBER',pageNumber);
            context.dispatch('initGreekEntries');
            context.dispatch('initHebrewEntries');
          });
        }
        else {
          let previousPageURL = "https://vle-curation.acdh.oeaw.ac.at/restvle/dicts/dc_loans_genesis/entries?page=" + pageNumber + "&pageSize=" + this.getters.getPageSize;
          let promise = getPreviousPageOfEntries(previousPageURL);
          promise.then(function(payload){
            context.commit('SET_NEXT_PAGE_URL',"https://vle-curation.acdh.oeaw.ac.at/restvle/dicts/dc_loans_genesis/entries?page=" + (pageNumber + 1) + "&pageSize=25");
            context.commit('SET_ACTUAL_PAGE_URL',"https://vle-curation.acdh.oeaw.ac.at" + payload.actualPage);
            let prevPage = '';
            if (pageNumber === 1) { prevPage = ''; }
            else {
              prevPage = "https://vle-curation.acdh.oeaw.ac.at/restvle/dicts/dc_loans_genesis/entries?page=" + (pageNumber - 1) + "&pageSize=25";
            }
            context.commit('SET_PREVIOUS_PAGE_URL',prevPage);
            context.commit('SET_STORE',payload.listOfEntries);
            context.commit('SET_PAGE_NUMBER',pageNumber);
            context.dispatch('initGreekEntries');
            context.dispatch('initHebrewEntries');
          });
        }
      }
    },
    initGreekEntries: (context) => {
      let greekEntries = new Array();
      let greekEntriesHeaders = new Array();
      let greekLemmataWithIndex = new Array();
      let greekEntriesDetails = new Array();
      for (var i = 0; i < context.state.dictionaryEntriesAsDOMObjects.length; i++){
        if (context.state.dictionaryEntriesAsDOMObjects[i].getElementsByTagName('entry')[0].getElementsByTagName('sense')[0] !== undefined){
            let numberOfCitNodes = context.state.dictionaryEntriesAsDOMObjects[i].getElementsByTagName('entry')[0].getElementsByTagName('sense')[0].getElementsByTagName('cit').length;
            let position = 0;
            for (var j = 0; j < numberOfCitNodes; j++){
                let attribute = context.state.dictionaryEntriesAsDOMObjects[i].getElementsByTagName('entry')[0].getElementsByTagName('sense')[0].getElementsByTagName('cit')[j].getAttribute('type');
                if(attribute === 'translationEquivalent'){ position = j; break; }
            }
            if (context.state.dictionaryEntriesAsDOMObjects[i].getElementsByTagName('entry')[0].getElementsByTagName('sense')[0].getElementsByTagName('cit')[position].getElementsByTagName('quote')[0] !== undefined
                && context.state.dictionaryEntriesAsDOMObjects[i].getElementsByTagName('entry')[0].getElementsByTagName('sense')[0].getElementsByTagName('cit')[position].getElementsByTagName('quote')[0].childNodes[0] !== undefined ){
                let greekLemma = context.state.dictionaryEntriesAsDOMObjects[i].getElementsByTagName('entry')[0].getElementsByTagName('sense')[0].getElementsByTagName('cit')[position].getElementsByTagName('quote')[0].childNodes[0].nodeValue;
                greekLemmataWithIndex.unshift({ 'index' : i , 'lemma' : greekLemma });
            }
        }
        }
        greekLemmataWithIndex.sort(comparegreek);
        for (var k = 0; k < greekLemmataWithIndex.length; k++){
          greekEntries.push(greekLemmataWithIndex[k].index);
          greekEntriesDetails.push({'lemma':greekLemmataWithIndex[k].lemma,'entry': context.state.dictionaryEntriesAsDOMObjects[greekLemmataWithIndex[k].index]});
          greekEntriesHeaders.push({'id':greekLemmataWithIndex[k].index,'lemma':greekLemmataWithIndex[k].lemma});
      }
      context.commit('SET_GREEK_ENTRIES_MAPPING',greekEntries);
      context.commit('SET_GREEK_ENTRIES_HEADERS',greekEntriesHeaders);
      context.commit('SET_GREEK_ENTRIES_DETAILS',greekEntriesDetails);
    },
    initHebrewEntries: (context) => {
      let hebrewEntries = new Array();
      let hebrewEntriesHeaders = new Array();
      let hebrewEntriesDetails = new Array();
      let hebrewLemmataWithIndex = new Array();
      for (var i = 0; i < context.state.dictionaryEntriesAsDOMObjects.length; i++){
        if (context.state.dictionaryEntriesAsDOMObjects[i].getElementsByTagName('entry')[0].getElementsByTagName('form')[0] !== undefined){
            let hebrewLemma = context.state.dictionaryEntriesAsDOMObjects[i].getElementsByTagName('entry')[0].getElementsByTagName('form')[0].getElementsByTagName('orth')[0].childNodes[0].nodeValue;
            hebrewLemmataWithIndex.unshift({ 'index' : i , 'lemma' : hebrewLemma });
        }}
        hebrewLemmataWithIndex.sort(comparehebrew);
        for (var j = 0; j < hebrewLemmataWithIndex.length; j++){
          hebrewEntries.push(hebrewLemmataWithIndex[j].index);
          hebrewEntriesDetails.push({'lemma' : hebrewLemmataWithIndex[j].lemma,'entry' : context.state.dictionaryEntriesAsDOMObjects[hebrewLemmataWithIndex[j].index]})
          hebrewEntriesHeaders.push({'id' : hebrewLemmataWithIndex[j].index,'lemma' : hebrewLemmataWithIndex[j].lemma});
          }
      context.commit('SET_HEBREW_ENTRIES_MAPPING',hebrewEntries);
      context.commit('SET_HEBREW_ENTRIES_DETAILS',hebrewEntriesDetails);
      context.commit('SET_HEBREW_ENTRIES_HEADERS',hebrewEntriesHeaders);
      context.commit('SET_LOADING_STATE',true);
  },
  initializeSingleEntry(context,lemma){
    let entryURL = "https://vle-curation.acdh.oeaw.ac.at/restvle/dicts/dc_loans_genesis/entries?id=" + lemma;
    let promise = getSingleEntry(entryURL);
    promise.then(function(payload){
        context.commit('SET_DICTIONARY_ENTRY_AS_DOM_OBJECT',payload.singleEntry);
        context.dispatch('initHebrewEntry');
    });
  },
  initHebrewEntry: (context) => {
    let hebrewEntryHeader = '';
    if (context.state.dictionaryEntryAsDOMObject.getElementsByTagName('entry')[0].getElementsByTagName('form')[0] !== undefined){
        hebrewEntryHeader = context.state.dictionaryEntryAsDOMObject.getElementsByTagName('entry')[0].getElementsByTagName('form')[0].getElementsByTagName('orth')[0].childNodes[0].nodeValue;
    }
    let hebrewEntryDetails = context.state.dictionaryEntryAsDOMObject;
    context.commit('SET_HEBREW_ENTRY_DETAILS',hebrewEntryDetails);
    context.commit('SET_HEBREW_ENTRY_HEADER',hebrewEntryHeader);
  },
  removeSingleEntry: (context) => {
    context.commit('SET_HEBREW_ENTRY_DETAILS',undefined);
    context.commit('SET_HEBREW_ENTRY_HEADER',undefined);
  },
  initializeSearchResult: (context,searchWord) => {
    let searchURL = "https://vle-curation.acdh.oeaw.ac.at/restvle/dicts/dc_loans_genesis/entries?q=" + context.state.searchStringLemmaOrFullText + "=" + searchWord;
    let promise = getSearchResultEntries(searchURL);
    promise.then(function(payload){
        if(payload.searchResultEntries === undefined){
            context.commit('SET_SEARCH_RESULT_ERROR_MESSAGE',payload.errorMessage);
            context.commit('SET_SEARCH_RESULT_ERROR_STATE',true);
        }
        else{
            context.commit('SET_SEARCH_RESULT_DICTIONARY_ENTRIES_AS_DOM_OBJECT',payload.searchResultEntries);
            context.commit('SET_SEARCH_RESULT_ERROR_STATE',false);
            context.dispatch('initSearchResultHebrewEntries');
        }
    });
  },
  initSearchResultHebrewEntries: (context) => {
        let hebrewEntriesHeaders = new Array();
        let hebrewEntriesDetails = new Array();
        let hebrewLemmataWithIndex = new Array();
        for (var i = 0; i < context.state.searchResultDictionaryEntriesAsDOMObject.length; i++){
          if (context.state.searchResultDictionaryEntriesAsDOMObject[i].getElementsByTagName('entry')[0].getElementsByTagName('form')[0] !== undefined){
              let hebrewLemma = context.state.searchResultDictionaryEntriesAsDOMObject[i].getElementsByTagName('entry')[0].getElementsByTagName('form')[0].getElementsByTagName('orth')[0].childNodes[0].nodeValue;
              hebrewLemmataWithIndex.unshift({ 'index' : i , 'lemma' : hebrewLemma });
          }}
          hebrewLemmataWithIndex.sort(comparehebrew);
          for (var j = 0; j < hebrewLemmataWithIndex.length; j++){
            hebrewEntriesDetails.push({'lemma' : hebrewLemmataWithIndex[j].lemma,'entry' : context.state.searchResultDictionaryEntriesAsDOMObject[hebrewLemmataWithIndex[j].index]})
            hebrewEntriesHeaders.push({'id' : hebrewLemmataWithIndex[j].index,'lemma' : hebrewLemmataWithIndex[j].lemma});
            }
        context.commit('SET_SEARCH_RESULT_HEBREW_ENTRIES_DETAILS',hebrewEntriesDetails);
        context.commit('SET_SEARCH_RESULT_HEBREW_ENTRIES_HEADER',hebrewEntriesHeaders);
    },
  removeSearchResult: (context) => {
    context.commit('SET_SEARCH_RESULT_HEBREW_ENTRIES_DETAILS',undefined);
    context.commit('SET_SEARCH_RESULT_HEBREW_ENTRIES_HEADER',undefined);
  },
  setSearchLemmataSelected: (context) => {
    context.commit('SET_SEARCH_TYPE_LEMMATA');
  },
  setSearchFullTextSelected: (context) => {
    context.commit('SET_SEARCH_TYPE_FULLTEXT');
  }
  },
  getters: {
    getDictionaryEntryById: (state) => (id) => {
      return state.dictionaryEntriesAsDOMObjects[id]
    },
    getDictionaryEntries: (state) => {
      return state.dictionaryEntriesAsDOMObjects
    },
    getGreekMapping: (state) => {
      return state.greekEntriesToEntriesMapping
    },
    getHebrewMapping: (state) => {
      return state.hebrewEntriesToEntriesMapping
    },
    getGreekEntriesHeaders: (state) => {
      return state.greekEntriesHeaders
    },
    getGreekEntriesDetails: (state) => {
      return state.greekEntriesDetails
    },
    getHebrewEntriesHeaders: (state) => {
      return state.hebrewEntriesHeaders
    },
    getHebrewEntriesDetails: (state) => {
      return state.hebrewEntriesDetails
    },
    isFirstPage: (state) => {
      let isFirstPage = true;
      if (state.pageNumber === 1){
        isFirstPage = true;
      }
      else {
        isFirstPage = false;
      }
      return isFirstPage;
    },
    isLastPage: (state) => {
      let isLastPage = false;
      if (state.pageNumber === state.numberOfPages){
        isLastPage = true;
      }
      else {
        isLastPage = false;
      }
      return isLastPage;
    },
    getPageNumber: (state) => {
      return state.pageNumber;
    },
    getPrevPageURL: (state) => {
      return state.previousPageURL;
    },
    getNextPageURL: (state) => {
      return state.nextPageURL;
    },
    getPageSize: (state) => {
      return state.pageSize;
    },
    getNumberOfPages: (state) => {
      return state.numberOfPages;
    },
    getActualPageURL: (state) => {
      return state.actualPageURL;
    },
    getHebrewEntryHeader: (state) => {
      return state.hebrewEntryHeader;
    },
    getHebrewEntryDetails: (state) => {
        return state.hebrewEntryDetails;
    },
    getSearchResultHebrewEntriesHeader: (state) => {
        return state.searchResultHebrewEntriesHeader;
    },
    getSearchResultHebrewEntriesDetails: (state) => {
        return state.searchResultHebrewEntriesDetails;
    },
    hasSearchErrorOccurred: (state) => {
        return state.searchResultErrorOccurred;
    },
    getSearchErrorMessage: (state) => {
        return state.searchResultErrorMessage;
    }
  }
})

function getFirstPageOfEntries(){
  let listOfEntries = new Array();
  let pageSize = store.getters.getPageSize;
  let numberOfItems = 0;
  let numberOfPages = 0;
  let firstPage = '';
  let lastPage = '';
  let nextPage = '';
  let actualPage = ''
  return new Promise(function(resolve){
    axios({
      method: 'get',
      url: 'https://vle-curation.acdh.oeaw.ac.at/restvle/dicts/dc_loans_genesis/entries?pageSize=' + pageSize,
      responseType: 'application/vnd.wde.v2+json',
      withCredentials: 'false' })
      .then(function(response){
        numberOfItems = response.data.total_items;
        numberOfPages = response.data.page_count;
        firstPage = "https://vle-curation.acdh.oeaw.ac.at" + response.data._links.first.href;
        lastPage = "https://vle-curation.acdh.oeaw.ac.at" + response.data._links.last.href;
        nextPage = "https://vle-curation.acdh.oeaw.ac.at" + response.data._links.next.href;
        actualPage = "https://vle-curaction.acdh.oeaw.ac.at" + response.data._links.self.href;
        let parser = new DOMParser();
        for(let i = 0; i < response.data._embedded.entries.length; i++){
          let item = response.data._embedded.entries[i];
          if(!(item.id === 'test') && !(item.id === 'd') && !(item.id === 'test3') && !(item.id === 'dictProfile') && !(item.id === 'dictHeader')){
            let entryParsed = parser.parseFromString(item.entry,'text/xml');
            listOfEntries.unshift(entryParsed);
          }}
      resolve({
        "listOfEntries" : listOfEntries,
        "numberOfItems" : numberOfItems,
        "numberOfPages" : numberOfPages,
        "firstPage" : firstPage,
        "lastPage" : lastPage,
        "nextPage" : nextPage,
        "actualPage" : actualPage});});
  });
}

function getPreviousPageOfEntries(previousPageURL){
  let listOfEntries = new Array();
  let actualPage = '';
  return new Promise(function(resolve){
    axios({
      method: 'get',
      url: previousPageURL,
      responseType: 'application/vnd.wde.v2+json',
      withCredentials: 'false'})
      .then(function(response){
        actualPage = response.data._links.self.href;
        let parser = new DOMParser();
        for (let i = 0; i < response.data._embedded.entries.length; i++){
          let item = response.data._embedded.entries[i];
          if(!(item.id === 'test') && !(item.id === 'd') && !(item.id === 'test3') && !(item.id === 'dictProfile') && !(item.id === 'dictHeader')){
            let entryParsed = parser.parseFromString(item.entry,'text/xml');
            listOfEntries.unshift(entryParsed);
          }
        }
        resolve({"listOfEntries" : listOfEntries,"actualPage" : actualPage});
      })
  });
}

function getNextPageOfEntries(nextPageURL){
  let listOfEntries = new Array();
  let actualPage = '';
  let nextPage = '';
  return new Promise(function(resolve){
    axios({
      method: 'get',
      url: nextPageURL,
      responseType: 'application/vnd.wde.v2+json',
      withCredentials: 'false'})
      .then(function(response){
        actualPage = response.data._links.self.href;
        if (response.data._links.next != null){
          nextPage = response.data._links.next.href;
        }
        let parser = new DOMParser();
        for (let i = 0; i < response.data._embedded.entries.length; i++){
          let item = response.data._embedded.entries[i];
          if(!(item.id === 'test') && !(item.id === 'd') && !(item.id === 'test3') && !(item.id === 'dictProfile') && !(item.id === 'dictHeader')){
            let entryParsed = parser.parseFromString(item.entry,'text/xml');
            listOfEntries.unshift(entryParsed);
          }
        }
      resolve({"listOfEntries" : listOfEntries,"nextPage" : nextPage,"actualPage" : actualPage});
      })
  });
}

function getSearchResultEntries(searchURL){
    let listOfEntries = new Array();
    return new Promise(function(resolve){
        axios({
            method: 'get',
            url: searchURL,
            responseType: 'application/vnd.wde.v2+json',
            withCredentials: 'false'
        }).then(function(response){
            let parser = new DOMParser();
            for (let i = 0; i < response.data._embedded.entries.length; i++){
                let item = response.data._embedded.entries[i];
                if(!(item.id === 'test') && !(item.id === 'd') && !(item.id === 'test3') && !(item.id === 'dictProfile') && !(item.id === 'dictHeader')){
                            let entryParsed = parser.parseFromString(item.entry,'text/xml');
                            listOfEntries.unshift(entryParsed);
                }
            }
            resolve({'searchResultEntries' : listOfEntries});
        }).catch(function (error) {
               if (error.response) {
                    let errorText = error.response.data.detail;
                    resolve({'errorMessage' : errorText});
               }
               else {
                    resolve({'errorMessage' : 'Unknown error'});
               }
           });
    });
}

function getSingleEntry(entryURL){
    return new Promise(function(resolve){
        axios({
            method: 'get',
            url: entryURL,
            responseType: 'application/vnd.wde.v2+json',
            withCredentials: 'false'
        }).then(function(response){
            let parser = new DOMParser();
            let entry = response.data._embedded.entries[0];
            let entryParsed = parser.parseFromString(entry.entry,'text/xml');
            resolve({"singleEntry" : entryParsed});
        })
    });
}

/**
function getAllEntries(){
  let listOfEntries = new Array();
  return new Promise(function(resolve){
  axios({ method: 'get',
          url: 'https://vle-curation.acdh.oeaw.ac.at/restvle/dicts/dc_loans_genesis/entries?pageSize=100',
          responseType: 'json',
          withCredentials: 'true'})
  .then(function(response){
      let numberOfItems = response.data.total_items;
      for (var i = 0; i < numberOfItems; i++){
      let item = response.data._embedded.entries[i].id;
        if (!(item == 'test') && !(item == 'd') && !(item == 'test3') && !(item == 'dictProfile') && !(item == 'dictHeader'))
        { listOfEntries.unshift(item); }
      }
    resolve( listOfEntries );});});
}

function getEntry(id){
  let addressOfEntry = 'https://vle-curation.acdh.oeaw.ac.at/restvle/dicts/dc_loans_genesis/entries/' + id;
  return new Promise(function(resolve){
      axios({ method: 'get',
              url: addressOfEntry,
              responseType: 'json',
              withCredentials: 'false'})
      .then(function(response){
          let parser = new DOMParser();
          let entryParsed = parser.parseFromString(response.data.entry,"text/xml");
        resolve(entryParsed);
      });
})
}
*/

function comparegreek(a,b){
  if(a.lemma.toLowerCase() < b.lemma.toLowerCase()) return -1;
  if(a.lemma.toLowerCase() > b.lemma.toLowerCase()) return 1;
  else return 0;
}

function comparehebrew(a,b){
  if(a.lemma < b.lemma) return -1;
  if(a.lemma > b.lemma) return 1;
  else return 0;
}