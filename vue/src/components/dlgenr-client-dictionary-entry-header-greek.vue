<template>
    <div>
        <p class="dictionary-entry-header-greek" v-on:click="toggleEnabled">{{ greekEntryHeader.lemma }}</p>
        <dlgenr-client-dictionary-entry-details v-show="enabled" v-bind:entry="greekEntry.entry"/>
    </div>
</template>
<script>
import DlGenRClientEntryDetails from './dlgenr-client-dictionary-entry-details.vue';

export default {
    name: 'dlgenr-client-dictionary-entry-header-greek',
    components: { 'dlgenr-client-dictionary-entry-details' : DlGenRClientEntryDetails },
    //props: { greekEntryHeader : { type: String, required: true }, greekEntriesHeaders : { type: Array, required: true }, greekEntriesDetails : { type: Array, required: true } },
    //props: { greekEntriesHeaders : { type: Array, required: true }, greekEntriesDetails : { type: Array, required: true } },
    data: function () { let enabled = false; return { enabled }},
    computed: {
        greekEntryHeader: function(){
            //return this.$props.greekEntriesHeaders[this.$vnode.key]
            return this.$store.getters.getGreekEntriesHeaders[this.$vnode.key]
        },
        greekEntry: function(){
            let position = 0;
            let lemma = this.greekEntryHeader.lemma;
            for (var i = 0; i < this.$store.getters.getGreekEntriesDetails.length; i++){
                if (lemma == this.$store.getters.getGreekEntriesDetails[i].lemma){ position = i; }
            }
            return this.$store.getters.getGreekEntriesDetails[position]}
  },
  methods: {
        toggleEnabled: function() { if (this.enabled == true){this.enabled = false} else {this.enabled = true}}}
}
</script>
<style scoped>
    p.dictionary-entry-header-greek {
        text-align: left;
        color: #fc9803;
        font-family: 'Cormorant Garamond', serif;
        font-weight: medium;
        font-size: 22pt;
        margin-left: 40pt;
        padding: 0pt;
    }
</style>