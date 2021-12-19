<template>
    <div class="dlgenr-client-sense-quotation-translation">
        <span v-for="(pieceOfText,index) in piecesOfText" v-bind:key="index">
            <component v-if="pieceOfText.type == 'text'" v-bind:is="dlGenRClientSenseQuotationTranslationLatinText" v-bind:latinText="pieceOfText.text"/>
            <component v-if="pieceOfText.type == 'term' && pieceOfText.language == 'hbo'" v-bind:is="dlGenRClientSenseQuotationTranslationTermHebrew" v-bind:term="pieceOfText.text"/>
            <component v-if="pieceOfText.type == 'term' && pieceOfText.language != 'hbo'" v-bind:is="dlGenRClientSenseQuotationTranslationTermLatin" v-bind:term="pieceOfText.text"/>
        </span>
    </div>
</template>
<script>
import DlGenRClientSenseQuotationTranslationLatinText from './dlgenr-client-sense-quotation-translation-latin-text';
import DlGenRClientSenseQuotationTranslationTermHebrew from './dlgenr-client-sense-quotation-translation-term-hebrew';
import DlGenRClientSenseQuotationTranslationTermLatin from './dlgenr-client-sense-quotation-translation-term-latin';
export default {
    name : 'dlgenr-client-sense-quotation-translation',
    props : { entry : { type : XMLDocument }},
    data : function(){ 
        return {
            'dlGenRClientSenseQuotationTranslationLatinText' : DlGenRClientSenseQuotationTranslationLatinText,
            'dlGenRClientSenseQuotationTranslationTermHebrew' : DlGenRClientSenseQuotationTranslationTermHebrew,
            'dlGenRClientSenseQuotationTranslationTermLatin' : DlGenRClientSenseQuotationTranslationTermLatin
        }
    },
    computed : {
        piecesOfText(){
            let position = this.$attrs.position;
            let positionOfQuotation = this.$attrs.positionOfQuotation;
            let piecesOfText = new Array();
            let numberOfNodes = 0;
            if (this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('cit')[0] !== undefined){
                numberOfNodes = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('cit')[0].getElementsByTagName('quote')[0].childNodes.length;
            }
            for(let i = 0; i < numberOfNodes; i++){
                if(this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('cit')[0].getElementsByTagName('quote')[0].childNodes[i] != undefined
                    && this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('cit')[0].getElementsByTagName('quote')[0].childNodes[i].nodeName == 'term'){
                        let term = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('cit')[0].getElementsByTagName('quote')[0].childNodes[i].childNodes[0].nodeValue;
                        let language = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('cit')[0].getElementsByTagName('quote')[0].childNodes[i].getAttribute('xml:lang');
                        let piece = { 'type' : 'term', 'text' : term, 'language' : language };
                        piecesOfText.push(piece);
                }
                if(this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('cit')[0].getElementsByTagName('quote')[0].childNodes[i] != undefined
                    && this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('cit')[0].getElementsByTagName('quote')[0].childNodes[i].nodeType == 3){
                    let latinText = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('cit')[0].getElementsByTagName('quote')[0].childNodes[i].nodeValue;
                    let piece = { 'type' : 'text', 'text' : latinText, 'language' : 'en' };
                    piecesOfText.push(piece);
                }
            }
            return piecesOfText;
        }
    }
}
</script>
<style scoped>
    div.dlgenr-client-sense-quotation-translation {
        text-align: left;
        margin-left: 0pt;
        line-height: 120%;
        margin-bottom: 10pt;
    }
</style>