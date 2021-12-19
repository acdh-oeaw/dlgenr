<template>
    <div class="dlgenr-client-ref-bibliography">
        <p class="dlgenr-client-ref-bibliography-header">{{ header }}</p>
        <dlgenr-client-ref-bibliography-entry v-for="(numberOfEntry,index) in numberOfEntries" v-bind:key="index" v-bind:entry="entry" v-bind:numberOfEntry="numberOfEntry" v-bind:bibliographyPosition="bibliographyPosition"/>
    </div>
</template>
<script>
import DlGenRClientRefBibliographyEntry from './dlgenr-client-ref-bibliography-entry';

export default {
    name : 'dlgenr-client-ref-bibliography',
    components : {
        'dlgenr-client-ref-bibliography-entry' : DlGenRClientRefBibliographyEntry
    },
    props : { entry : { type : XMLDocument },
              bibliographyPosition: { type : Number }},
    data : function() { return { 'header' : 'Bibliography:'}},
    computed : {
        numberOfEntries(){
            let numberOfEntries = new Array();
            let length = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('ref')[this.$props.bibliographyPosition].getElementsByTagName('bibl').length;
            for (let i = 0; i < length; i++){
                numberOfEntries.push(i);
            }
            return numberOfEntries;
        }
    }
}
</script>
<style scoped>
    div.dlgenr-client-ref-bibliography {
        text-align: left;
        margin-left: 40pt;
        margin-bottom: 10pt;
        color : black;
        font-family : 'Cormorant Garamond', serif;
    }
    p.dlgenr-client-ref-bibliography-header {
        text-align: left;
        color: black;
        margin-bottom : 0pt;
        font-family: 'Cormorant Garamond', serif;
    }
</style>