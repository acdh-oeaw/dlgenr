<template>
  <div id="app">
    <div>
      <p v-if="this.$store.state.loadingState == false" class="dlgenr-client-loading">Loading ...</p>
      <p v-if="this.$store.state.loadingState" class="dlgenr-client-language-selection" v-on:click="selectAramaicIndex">Browse Aramaic Index</p>
      <p v-if="this.$store.state.loadingState" class="dlgenr-client-language-selection" v-on:click="selectGreekIndex">Browse Latin and Greek Index</p>
      <div v-if="greekIndexEnabled">
        <dlgenr-client-dictionary-entry-header-greek v-for="(greekEntry,greekId) in getGreekEntriesHeaders" v-bind:key="greekId" v-bind:greekEntryHeader="greekEntry.lemma"/> 
      </div>
      <div v-if="aramaicIndexEnabled">
        <dlgenr-client-dictionary-entry-header-hebrew v-for="(hebrewEntry,hebrewId) in getHebrewEntriesHeaders" v-bind:key="hebrewId" v-bind:hebrewEntryHeader="hebrewEntry.lemma"/>
      </div>
    </div>
  </div>
</template>

<script>
import DlGenRClientEntryHeaderGreek from './components/dlgenr-client-dictionary-entry-header-greek';
import DlGenRClientEntryHeaderHebrew from './components/dlgenr-client-dictionary-entry-header-hebrew';
import {mapGetters} from 'vuex';

export default {
  name: 'app',
  components: {
    'dlgenr-client-dictionary-entry-header-greek' : DlGenRClientEntryHeaderGreek,
    'dlgenr-client-dictionary-entry-header-hebrew' : DlGenRClientEntryHeaderHebrew
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
      'getHebrewEntriesHeaders'
    ])     
  },
  methods: {
    selectAramaicIndex: function(){ if (this.aramaicIndexEnabled == true){ this.aramaicIndexEnabled = false; }
                                    else {this.aramaicIndexEnabled = true; this.greekIndexEnabled = false; } },
    selectGreekIndex: function(){ if (this.greekIndexEnabled == true){ this.greekIndexEnabled = false; }
                                  else { this.greekIndexEnabled = true; this.aramaicIndexEnabled = false; }}
  }
}
</script>
<style scoped>
  p.dlgenr-client-language-selection {
    font-size: 18pt;
    color: #d8976f;;
    text-align: left;
  }
  p.dlgenr-client-loading {
    font-size: 18pt;
    color: black;
    text-align: center;
  }
</style>