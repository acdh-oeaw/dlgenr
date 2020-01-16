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
    loadingState : false
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
    }
  },
  actions: {
    initStore: (context) => {
        let promise = getAllEntries();
        promise.then(function(listOfEntries){
        let dictionaryEntries = new Array();
        let promises = new Array();
        for (var j = 0; j < listOfEntries.length; j++){
          let promise = getEntry(listOfEntries[j]);
          promises.unshift(promise);
          promise.then(function(entryParsed){
            dictionaryEntries.unshift(entryParsed);
          });}
        Promise.all(promises).then(function(){
          context.commit('SET_STORE',dictionaryEntries);
          context.dispatch('initGreekEntries'); context.dispatch('initHebrewEntries');
        });
    });},
    initGreekEntries: (context) => {
      let greekEntries = new Array();
      let greekEntriesHeaders = new Array();
      let greekLemmataWithIndex = new Array();
      let greekEntriesDetails = new Array();
      for (var i = 0; i < context.state.dictionaryEntriesAsDOMObjects.length; i++){
        let numberOfFormNodes = context.state.dictionaryEntriesAsDOMObjects[i].getElementsByTagName('entry')[0].getElementsByTagName('form').length;
        let position = 0;
        for (var j = 0; j < numberOfFormNodes; j++){
          let attribute = context.state.dictionaryEntriesAsDOMObjects[i].getElementsByTagName('entry')[0].getElementsByTagName('form')[j].getAttribute('type');
          if(attribute == 'equivalent'){ position = j; }
        }
        if (context.state.dictionaryEntriesAsDOMObjects[i].getElementsByTagName('entry')[0].getElementsByTagName('form')[position].getElementsByTagName('quote')[0] != undefined
            && context.state.dictionaryEntriesAsDOMObjects[i].getElementsByTagName('entry')[0].getElementsByTagName('form')[position].getElementsByTagName('quote')[0].childNodes[0] != undefined ){
          let greekLemma = context.state.dictionaryEntriesAsDOMObjects[i].getElementsByTagName('entry')[0].getElementsByTagName('form')[position].getElementsByTagName('quote')[0].childNodes[0].nodeValue;
          greekLemmataWithIndex.unshift({ 'index' : i , 'lemma' : greekLemma });
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
        let hebrewLemma = context.state.dictionaryEntriesAsDOMObjects[i].getElementsByTagName('entry')[0].getElementsByTagName('form')[0].getElementsByTagName('orth')[0].childNodes[0].nodeValue;
        hebrewLemmataWithIndex.unshift({ 'index' : i , 'lemma' : hebrewLemma });
        }
      hebrewLemmataWithIndex.sort(comparehebrew);
        for (var j = 0; j < hebrewLemmataWithIndex.length; j++){
          hebrewEntries.push(hebrewLemmataWithIndex[j].index);
          hebrewEntriesDetails.push({'lemma' : hebrewLemmataWithIndex[j].lemma,'entry': context.state.dictionaryEntriesAsDOMObjects[hebrewLemmataWithIndex[j].index]})
          hebrewEntriesHeaders.push({'id':hebrewLemmataWithIndex[j].index,'lemma':hebrewLemmataWithIndex[j].lemma});
      context.commit('SET_HEBREW_ENTRIES_MAPPING',hebrewEntries);
      context.commit('SET_HEBREW_ENTRIES_DETAILS',hebrewEntriesDetails);
      context.commit('SET_HEBREW_ENTRIES_HEADERS',hebrewEntriesHeaders);
      context.commit('SET_LOADING_STATE',true);
    }
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
    }
  },
  modules: {
  }
})

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