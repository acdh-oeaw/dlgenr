<template>
    <div class="dlgenr-client-dictionary-entry-details">
        <dlgenr-client-header v-if="entry" v-bind:entry="entry"/>
        <dlgenr-client-grammatical-information v-if="entry" v-bind:entry="entry"/>
        <dlgenr-client-variant v-for="(variantPosition,index) in variants" v-bind:key="index" v-bind:entry="entry" v-bind:variantPosition="variantPosition"/>
        <dlgenr-client-inflected-form v-for="(inflectedFormPosition,index) in inflectedForms" v-bind:key="index" v-bind:entry="entry" v-bind:inflectedFormPosition="inflectedFormPosition"/>
        <dlgenr-client-equivalent v-for="(equivalentPosition,index) in equivalentForms" v-bind:key="index" v-bind:entry="entry" v-bind:equivalentPosition="equivalentPosition"/>
        <dlgenr-client-sense v-on:showLink="showLink" v-for="(sensePosition,index) in sensePositions" v-bind:key="index" v-bind:entry="entry" v-bind:sensePosition="sensePosition" v-bind:numberOfSenses="sensePositions.length"/>
        <dlgenr-client-etymology v-if="entry && isEtymologyAvailable" v-bind:entry="entry"/>
        <dlgenr-client-note v-if="entry" v-bind:entry="entry" v-bind:notePosition="notePosition"/>
        <dlgenr-client-ref-bibliography v-if="bibliographyPosition" v-bind:bibliographyPosition="bibliographyPosition" v-bind:entry="entry"/>
        <dlgenr-client-citation v-if="entry" v-bind:entry="entry"/>
    </div>
</template>
<script>
import DlGenRClientHeader from './dlgenr-client-header';
import DlGenRClientEtymology from './dlgenr-client-etymology';
import DlGenRClientGrammaticalInformation from './dlgenr-client-grammatical-information';
import DlGenRClientVariant from './dlgenr-client-variant';
import DlGenRClientInflectedForm from './dlgenr-client-inflected-form';
import DlGenRClientEquivalent from './dlgenr-client-equivalent';
import DlGenRClientSense from './dlgenr-client-sense';
import DlGenRClientNote from './dlgenr-client-note';
import DlGenRClientRefBibliography from './dlgenr-client-ref-bibliography';
import DlGenRClientCitation from './dlgenr-client-citation';

export default {
  name: 'dlgenr-client-dictionary-entry-details',
  components: {
    'dlgenr-client-header' : DlGenRClientHeader,
    'dlgenr-client-etymology' : DlGenRClientEtymology,
    'dlgenr-client-grammatical-information' : DlGenRClientGrammaticalInformation,
    'dlgenr-client-variant' : DlGenRClientVariant,
    'dlgenr-client-inflected-form' : DlGenRClientInflectedForm,
    'dlgenr-client-equivalent' : DlGenRClientEquivalent,
    'dlgenr-client-sense' : DlGenRClientSense,
    'dlgenr-client-note' : DlGenRClientNote,
    'dlgenr-client-ref-bibliography' : DlGenRClientRefBibliography,
    'dlgenr-client-citation' : DlGenRClientCitation
  },
  props: { entry: { type: XMLDocument }},
  computed : {
    variants(){
      let numberOfFormNodes = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[0].getElementsByTagName('form').length;
      let positionsOfVariants = new Array();
      for (let i = 0; i < numberOfFormNodes; i++){
        let attribute = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[0].getElementsByTagName('form')[i].getAttribute('type');
        if (attribute == 'variant') { positionsOfVariants.push(i); }
      }
      return positionsOfVariants;
    },
    inflectedForms(){
      let numberOfFormNodes = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form').length;
      let positionsOfInflectedForms = new Array();
      for (let i = 0; i < numberOfFormNodes; i++){
        let attribute = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[i].getAttribute('type');
        if (attribute == 'inflected') { positionsOfInflectedForms.push(i); }
      }
      return positionsOfInflectedForms;
    },
    equivalentForms(){
      let numberOfFormNodes = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form').length;
      let positionsOfEquivalentForms = new Array();
      for (let i = 0; i < numberOfFormNodes; i++){
        let attribute = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[i].getAttribute('type');
        if (attribute == 'equivalent') { positionsOfEquivalentForms.push(i); }
      }
      return positionsOfEquivalentForms;
    },
    sensePositions(){
      let numberOfSenses = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense').length;
      let sensePositions = new Array(numberOfSenses);
      for (let i = 0; i < numberOfSenses; i++){
        sensePositions[i] = i;
      }
      return sensePositions;
    },
    notePosition(){
        let numberOfNotes = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('note').length;
        let notePosition = numberOfNotes - 1;
        return notePosition;
    },
    bibliographyPosition(){
        let numberOfRefNodes = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('ref').length;
        let bibliographyPosition = null;
        for (let i = 0; i < numberOfRefNodes; i++){
            let attribute = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('ref')[i].getAttribute('type');
            if (attribute === 'bibliography'){
                bibliographyPosition = i;
            }
        }
        return bibliographyPosition;
    },
    isEtymologyAvailable(){
        if (this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('etym')[0] === undefined){
            return false;
        }
        else { return true; }
    }
  },
  methods : {
     showLink: function(link){
         this.$emit('showLink',link);
     }
  }
}
</script>

<style scoped>
div.dlgenr-client-dictionary-entry-details {
  border-style: solid;
  border-color: black;
  border-width: 0.1pt;
  border-radius: 1em;
}
</style>