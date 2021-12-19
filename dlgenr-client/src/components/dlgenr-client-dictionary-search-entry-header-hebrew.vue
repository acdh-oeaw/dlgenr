<template>
    <div>
        <p class="dictionary-search-entry-header-hebrew" v-on:click="toggleEnabled">{{ hebrewEntryHeader.lemma }}</p>
        <dlgenr-client-dictionary-entry-details v-on:showLink="showLink" v-show="enabled" v-bind:entry="hebrewEntry.entry"/>
    </div>
</template>
<script>
import DlGenRClientEntryDetails from './dlgenr-client-dictionary-entry-details.vue';

export default {
    name: 'dlgenr-client-dictionary-search-entry-header-hebrew',
    components: { 'dlgenr-client-dictionary-entry-details' : DlGenRClientEntryDetails },
    //props: { hebrewEntriesHeaders : { type: Array }, hebrewEntriesDetails : { type: Array } },
    data: function () { let enabled = false; return { enabled }},
    computed: {
        hebrewEntryHeader: function(){
            return this.$store.getters.getSearchResultHebrewEntriesHeader[this.$vnode.key];
        },
        hebrewEntry: function(){
            let position = 0;
            for (var i = 0; i < this.$store.getters.getSearchResultHebrewEntriesDetails.length; i++){
                if (this.hebrewEntryHeader.lemma == this.$store.getters.getSearchResultHebrewEntriesDetails[i].lemma){ position = i; }
            }
            return this.$store.getters.getSearchResultHebrewEntriesDetails[position]}
  },
  methods: {
        toggleEnabled: function() { if (this.enabled == true){this.enabled = false} else {this.enabled = true}},
        showLink: function(link){
            this.$emit('showLink',link);
        }
  }
}
</script>
<style scoped>
    p.dictionary-search-entry-header-hebrew {
        text-align: right;
        color: #fc9803;
        font-family: 'Frank Ruhl Libre', serif;
        font-weight: medium;
        font-size: 22pt;
        margin-right: 40pt;
        padding: 0pt;
        cursor: pointer;
    }
</style>