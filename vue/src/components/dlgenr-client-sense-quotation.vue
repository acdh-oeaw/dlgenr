<template>
    <div class="dlgenr-client-sense-quotation">
        <span v-for="(pieceOfHebrewText,index) in piecesOfHebrewText" v-bind:key="index">
            <component v-if="pieceOfHebrewText.type == 'hebrew'" v-bind:is="dlGenRClientSenseQuotationTextHebrew" v-bind:hebrewText="pieceOfHebrewText.text"/>
            <component v-if="pieceOfHebrewText.type == 'hebrewLemma'" v-bind:is="dlGenRClientSenseQuotationLemmaHebrew" v-bind:hebrewText="pieceOfHebrewText.text" v-bind:footnoteNumber="pieceOfHebrewText.number"/>
            <component v-if="pieceOfHebrewText.type == 'reference'" v-bind:is="dlGenRClientSenseQuotationDictionaryReference" v-bind:hebrewText="pieceOfHebrewText.text"/>
        </span>
        <dlgenr-client-sense-quotation-bibliographic-reference v-bind:bibliographicReference="bibliographicReference"/>
        <dlgenr-client-sense-quotation-critical-apparatus v-for="(apparatus,index) in apparata" v-bind:key="index" v-bind:entry="entry" v-bind:positionOfApparatus="apparatus" v-bind:position="position" v-bind:positionOfQuotation="positionOfQuotation"/>
        <dlgenr-client-sense-quotation-translation v-bind:entry="entry" v-bind:position="position" v-bind:positionOfQuotation="positionOfQuotation"/>
    </div>
</template>
<script>
import DlGenRClientSenseQuotationTextHebrew from './dlgenr-client-sense-quotation-text-hebrew';
import DlGenRClientSenseQuotationLemmaHebrew from './dlgenr-client-sense-quotation-lemma-hebrew';
import DlGenRClientSenseQuotationDictionaryReference from './dlgenr-client-sense-quotation-dictionary-reference';
import DlGenRClientSenseQuotationBibliographicReference from './dlgenr-client-sense-quotation-bibliographic-reference';
import DlGenRClientSenseQuotationCriticalApparatus from './dlgenr-client-sense-quotation-critical-apparatus';
import DlGenRClientSenseQuotationTranslation from './dlgenr-client-sense-quotation-translation';

export default {
    name : 'dlgenr-client-sense-quotation',
    components : {
        'dlgenr-client-sense-quotation-text-hebrew' : DlGenRClientSenseQuotationTextHebrew,
        'dlgenr-client-sense-quotation-lemma-hebrew' : DlGenRClientSenseQuotationLemmaHebrew,
        'dlgenr-client-sense-quotation-dictionary-reference' : DlGenRClientSenseQuotationDictionaryReference,
        'dlgenr-client-sense-quotation-bibliographic-reference' : DlGenRClientSenseQuotationBibliographicReference,
        'dlgenr-client-sense-quotation-critical-apparatus' : DlGenRClientSenseQuotationCriticalApparatus,
        'dlgenr-client-sense-quotation-translation' : DlGenRClientSenseQuotationTranslation
    },
    props : { entry : { type : XMLDocument }},
    data: function(){ 
        return {
            'dlGenRClientSenseQuotationTextHebrew' : DlGenRClientSenseQuotationTextHebrew,
            'dlGenRClientSenseQuotationLemmaHebrew' : DlGenRClientSenseQuotationLemmaHebrew,
            'dlGenRClientSenseQuotationDictionaryReference' : DlGenRClientSenseQuotationDictionaryReference
        }
    },
    computed : {
        piecesOfHebrewText(){
            let position = this.$attrs.position;
            let positionOfQuotation = this.$attrs.positionOfQuotation;
            let numberOfPieces = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('quote')[0].childNodes.length;
            let piecesOfHebrewText = new Array();
            let numberOfLemmata = 0;
            for (let i = 0; i < numberOfPieces; i++){
                if (this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('quote')[0].childNodes[i] != undefined
                    && this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('quote')[0].childNodes[i].nodeName == "app"){
                        if (this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('quote')[0].childNodes[i].getElementsByTagName('lem')[0] != undefined
                            && this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('quote')[0].childNodes[i].getElementsByTagName('lem')[0].childNodes[0] != undefined){
                            let lemma = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('quote')[0].childNodes[i].getElementsByTagName('lem')[0].childNodes[0].nodeValue;
                            numberOfLemmata++;
                            piecesOfHebrewText.push({ 'type' : 'hebrewLemma','text' : lemma, 'number' : numberOfLemmata });
                        }
                    }
                else if (this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('quote')[0].childNodes[i] != undefined
                    && this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('quote')[0].childNodes[i].nodeName == "ref"){
                        if(this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('quote')[0].childNodes[i].childNodes[0] != undefined){
                            let reference = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('quote')[0].childNodes[i].childNodes[0].nodeValue;
                            piecesOfHebrewText.push({ 'type' : 'reference', 'text' : reference });
                        }
                    }
                else if (this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('quote')[0].childNodes[i] != undefined
                    && this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('quote')[0].childNodes[i].nodeValue != null){
                        let hebrew = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('quote')[0].childNodes[i].nodeValue.trim();
                        piecesOfHebrewText.push({ 'type' : 'hebrew', 'text' : hebrew });
                }                    
            }
            return piecesOfHebrewText;
        },
        bibliographicReference(){
            let position = this.$attrs.position;
            let positionOfQuotation = this.$attrs.positionOfQuotation;
            let bibliographicReference = '';
            let numberOfReferences = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('bibl')[0].getElementsByTagName('ref').length;
            for (let i = 0; i < numberOfReferences; i++){
                let reference = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('bibl')[0].getElementsByTagName('ref')[i].childNodes[0].nodeValue;
                if (i == 0){ bibliographicReference = bibliographicReference + reference; }
                else { bibliographicReference = bibliographicReference + " [" + reference + "]"; }
            }
            return bibliographicReference;
        },
        apparata(){
            let position = this.$attrs.position;
            let positionOfQuotation = this.$attrs.positionOfQuotation;
            let apparata = new Array();
            let numberOfApparataInSpecificQuotation = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('quote')[0].getElementsByTagName('app').length;
            for (let i = 0; i < numberOfApparataInSpecificQuotation; i++){
                apparata.push(i);
            }
            return apparata;
        },
        position(){
            let position = this.$attrs.position;
            return position;
        },
        positionOfQuotation(){
            let positionOfQuotation = this.$attrs.positionOfQuotation;
            return positionOfQuotation;
        }
    }
}
</script>
<style scoped>
    div.dlgenr-client-sense-quotation {
        text-align: left;
        margin-left: 60pt;
        margin-right: 40pt;
    }
</style>