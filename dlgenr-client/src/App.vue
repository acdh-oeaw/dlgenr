<template>
  <div id="app">
    <div>
      <dlgenr-client-search v-on:propagateEventSubmitClicked="runSearch" v-on:propagateEventLemmataSelected="lemmataSelected" v-on:propagateEventFullTextSelected="fulltextSelected"/>
      <h4 id="browseindices">Browse Indizes</h4>
      <p>It is possible to get an overview of all loanwords in the midrash Genesis Rabbah either the Greek forms of the words or the Aramaic transcriptions:</p>
      <p v-if="this.$store.state.loadingState === false" class="dlgenr-client-loading">Loading ...</p>
      <a id="aramaicindex"></a>
      <p v-if="this.$store.state.loadingState" class="dlgenr-client-language-selection" v-on:click="selectAramaicIndex">Browse Aramaic Index</p>
      <a id="greekindex"></a>
      <p v-if="this.$store.state.loadingState" class="dlgenr-client-language-selection" v-on:click="selectGreekIndex">Browse Latin and Greek Index</p>
      <div v-if="greekIndexEnabled">
        <div class="dlgenr-client-pagination-LR">
            <p class="dlgenr-client-pagination-back-LR float-start btn btn-outline-dark" v-if="isFirstPage === false" v-on:click="getPreviousPage">PREV</p>
            <p class="dlgenr-client-pagination-forward-LR float-right btn btn-outline-dark" v-if="isLastPage === false" v-on:click="getNextPage">NEXT</p>
        </div>
        <dlgenr-client-dictionary-entry-header-greek v-on:showLink="showLink" v-for="(greekEntry,greekId) in getGreekEntriesHeaders" v-bind:key="greekId" v-bind:greekEntryHeader="greekEntry.lemma"/>
      </div>
      <div v-if="aramaicIndexEnabled">
        <div class="dlgenr-client-pagination-RL">
            <p class="dlgenr-client-pagination-back-RL float-start btn btn-outline-dark" v-if="isFirstPage === false" v-on:click="getPreviousPage">PREV</p>
            <p class="dlgenr-client-pagination-forward-RL float-right btn btn-outline-dark" v-if="isLastPage === false" v-on:click="getNextPage">NEXT</p>
        </div>
        <div style="clear: both;"/>
        <dlgenr-client-dictionary-entry-header-hebrew v-on:showLink="showLink" v-for="(hebrewEntry,hebrewId) in getHebrewEntriesHeaders" v-bind:key="hebrewId" v-bind:hebrewEntryHeader="hebrewEntry.lemma"/>
      </div>
      <div v-if="getHebrewEntryHeader && getHebrewEntryDetails">
        <dlgenr-client-dictionary-link-entry-header-hebrew v-bind:hebrewEntryHeader="getHebrewEntryHeader" v-bind:hebrewEntryDetails="getHebrewEntryDetails"/>
      </div>
      <div v-if="getSearchResultHebrewEntriesHeader">
        <dlgenr-client-dictionary-search-entry-header-hebrew v-for="(hebrewSearchEntry,hebrewSearchEntryId) in getSearchResultHebrewEntriesHeader" v-bind:key="hebrewSearchEntryId" v-bind:hebrewEntryHeader="hebrewSearchEntry.lemma"/>
      </div>
      <div v-if="hasSearchErrorOccurred">
        <dlgenr-client-search-result-error v-bind:errorMessage="getSearchErrorMessage"/>
      </div>
    </div>
  </div>
</template>

<script>
import DlGenRClientEntryHeaderGreek from './components/dlgenr-client-dictionary-entry-header-greek';
import DlGenRClientEntryHeaderHebrew from './components/dlgenr-client-dictionary-entry-header-hebrew';
import DlGenRClientLinkEntryHeaderHebrew from './components/dlgenr-client-dictionary-link-entry-header-hebrew';
import DlGenRClientSearch from './components/dlgenr-client-search';
import DlGenRClientDictionarySearchEntryHeaderHebrew from './components/dlgenr-client-dictionary-search-entry-header-hebrew';
import DlGenRClientSearchResultError from './components/dlgenr-client-search-result-error';
import { mapGetters } from 'vuex';

export default {
  name: 'app',
  components: {
    'dlgenr-client-dictionary-entry-header-greek' : DlGenRClientEntryHeaderGreek,
    'dlgenr-client-dictionary-entry-header-hebrew' : DlGenRClientEntryHeaderHebrew,
    'dlgenr-client-dictionary-link-entry-header-hebrew' : DlGenRClientLinkEntryHeaderHebrew,
    'dlgenr-client-search' : DlGenRClientSearch,
    'dlgenr-client-dictionary-search-entry-header-hebrew' : DlGenRClientDictionarySearchEntryHeaderHebrew,
    'dlgenr-client-search-result-error' : DlGenRClientSearchResultError
  },
  data: function(){
    return {
      aramaicIndexEnabled : false,
      greekIndexEnabled : false
    }
  },
  computed: { 
    ...mapGetters([
      'getGreekEntriesHeaders',
      'getHebrewEntriesHeaders',
      'isFirstPage',
      'isLastPage',
      'getPageNumber',
      'getHebrewEntryHeader',
      'getHebrewEntryDetails',
      'getSearchResultHebrewEntriesHeader',
      'hasSearchErrorOccurred',
      'getSearchErrorMessage'
    ])
  },
  methods: {
    selectAramaicIndex: function(){ if (this.aramaicIndexEnabled === true){ this.aramaicIndexEnabled = false; }
                                    else {this.aramaicIndexEnabled = true; this.greekIndexEnabled = false; this.$store.dispatch('removeSingleEntry'); this.$store.dispatch('removeSearchResult'); }},
    selectGreekIndex: function(){ if (this.greekIndexEnabled === true){ this.greekIndexEnabled = false; }
                                  else { this.greekIndexEnabled = true; this.aramaicIndexEnabled = false; this.$store.dispatch('removeSingleEntry'); this.$store.dispatch('removeSearchResult'); }},
    getPreviousPage: function(){ this.$store.dispatch('reinitializeStore',this.getPageNumber - 1); },
    getNextPage: function(){ this.$store.dispatch('reinitializeStore',this.getPageNumber + 1); },
    showLink: function(link){ this.$store.dispatch('initializeSingleEntry',link); this.greekIndexEnabled = false; this.aramaicIndexEnabled = false; this.$store.dispatch('removeSearchResult')},
    runSearch: function(searchWord){ this.$store.dispatch('initializeSearchResult',searchWord); this.greekIndexEnabled = false; this.aramaicIndexEnabled = false; this.$store.dispatch('removeSingleEntry'); },
    lemmataSelected: function(){ this.$store.dispatch('setSearchLemmataSelected'); },
    fulltextSelected: function(){ this.$store.dispatch('setSearchFullTextSelected'); }
  }
}
</script>
<style scoped>
  p.dlgenr-client-language-selection {
    font-size: 18pt;
    color: #d8976f;
    text-align: left;
    cursor: pointer;
  }
  p.dlgenr-client-loading {
    font-size: 18pt;
    color: black;
    text-align: center;
  }
  div.dlgenr-client-pagination-back-LR {
    font-size: 18pt;
    color: #d8976f;
    cursor: pointer;
  }
  div.dlgenr-client-pagination-forward-LR {
    font-size: 18pt;
    color: #d8976f;
    cursor: pointer;
  }
  div.dlgenr-client-pagination-back-RL {
    font-size: 18pt;
    color: #d8976f;
    cursor: pointer;
  }
  div.dlgenr-client-pagination-forward-RL {
    font-size: 18pt;
    color: #d8976f;
    cursor: pointer;
  }
</style>