<template>
    <div>
        <p class="dictionary-entry-header-hebrew" v-on:click="toggleEnabled">{{ hebrewEntryHeader.lemma }}</p>
        <dlgenr-client-dictionary-entry-details v-show="enabled" v-bind:entry="hebrewEntry.entry"/>
    </div>
</template>
<script>
import DlGenRClientEntryDetails from './dlgenr-client-dictionary-entry-details.vue';

export default {
    name: 'dlgenr-client-dictionary-entry-header-hebrew',
    components: { 'dlgenr-client-dictionary-entry-details' : DlGenRClientEntryDetails },
    //props: { hebrewEntriesHeaders : { type: Array }, hebrewEntriesDetails : { type: Array } },
    data: function () { let enabled = false; return { enabled }},
    computed: {
        hebrewEntryHeader: function(){
            return this.$store.getters.getHebrewEntriesHeaders[this.$vnode.key];
        },
        hebrewEntry: function(){
            let position = 0;
            for (var i = 0; i < this.$store.getters.getHebrewEntriesDetails.length; i++){
                if (this.hebrewEntryHeader.lemma == this.$store.getters.getHebrewEntriesDetails[i].lemma){ position = i; }
            }
            return this.$store.getters.getHebrewEntriesDetails[position]}
  },
  methods: {
        toggleEnabled: function() { if (this.enabled == true){this.enabled = false} else {this.enabled = true}}}
}
</script>
<style scoped>
    p.dictionary-entry-header-hebrew {
        text-align: right;
        color: #fc9803;
        font-family: 'Frank Ruhl Libre', serif;
        font-weight: medium;
        font-size: 22pt;
        margin-right: 40pt;
        padding: 0pt;
    }
</style>