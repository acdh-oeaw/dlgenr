<template>
    <div class="dlgenr-client-sense-quotation-note">
        <span v-for="(pieceOfText,index) in piecesOfText" v-bind:key="index">
            <component v-if="pieceOfText.language == 'en' && pieceOfText.usage == 'text'" v-bind:is="dlGenRClientNoteLatinText" v-bind:content="pieceOfText.text"/>
            <component v-if="pieceOfText.language == 'jpa' && pieceOfText.usage == 'term'" v-bind:is="dlGenRClientNoteTermHebrew" v-bind:content="pieceOfText.text"/>
            <component v-if="pieceOfText.language == 'grc' && pieceOfText.usage == 'term'" v-bind:is="dlGenRClientNoteTermGreek" v-bind:content="pieceOfText.text"/>
            <component v-if="pieceOfText.language == 'syc' && pieceOfText.usage == 'term'" v-bind:is="dlGenRClientNoteTermSyriac" v-bind:content="pieceOfText.text"/>
            <component v-if="pieceOfText.language == 'fjb' && pieceOfText.usage == 'term'" v-bind:is="dlGenRClientNoteTermTranscription" v-bind:content="pieceOfText.text"/>
            <component v-if="pieceOfText.language == 'rabbinic' && pieceOfText.usage == 'term'" v-bind:is="dlGenRClientNoteTermRabbinic" v-bind:content="pieceOfText.text"/>
            <component v-if="pieceOfText.language == 'jpa' && pieceOfText.usage == 'ref'" v-bind:is="dlGenRClientNoteRefHebrew" v-bind:content="pieceOfText.text"/>
            <component v-if="pieceOfText.language == 'grc' && pieceOfText.usage == 'ref'" v-bind:is="dlGenRClientNoteRefGreek" v-bind:content="pieceOfText.text"/>
            <component v-if="pieceOfText.language == 'en' && pieceOfText.usage == 'ref'" v-bind:is="dlGenRClientNoteRefLatin" v-bind:content="pieceOfText.text"/>
            <component v-if="pieceOfText.language == 'en' && pieceOfText.usage == 'bibl-ancient'" v-bind:is="dlGenRClientNoteBiblAncient" v-bind:content="pieceOfText.text"/>
            <component v-if="pieceOfText.language == 'en' && pieceOfText.usage == 'bibl-modern'" v-bind:is="dlGenRClientNoteBiblModern" v-bind:content="pieceOfText.text"/>
        </span>
    </div>
</template>
<script>
import DlGenRClientNoteLatinText from './dlgenr-client-note-latin-text';
import DlGenRClientNoteTermHebrew from './dlgenr-client-note-term-hebrew';
import DlGenRClientNoteTermGreek from './dlgenr-client-note-term-greek';
import DlGenRClientNoteTermSyriac from './dlgenr-client-note-term-syriac';
import DlGenRClientNoteTermTranscription from './dlgenr-client-note-term-transcription';
import DlGenRClientNoteTermRabbinic from './dlgenr-client-note-term-rabbinic';
import DlGenRClientNoteRefHebrew from './dlgenr-client-note-ref-hebrew';
import DlGenRClientNoteRefGreek from './dlgenr-client-note-ref-greek';
import DlGenRClientNoteRefLatin from './dlgenr-client-note-ref-latin';
import DlGenRClientNoteBiblAncient from './dlgenr-client-note-bibl-ancient';
import DlGenRClientNoteBiblModern from './dlgenr-client-note-bibl-modern';

export default {
    name : 'dlgenr-client-sense-quotation-note',
    props : { entry : { type : XMLDocument }},
    data : function(){
        return {
            'dlGenRClientNoteLatinText' : DlGenRClientNoteLatinText,
            'dlGenRClientNoteTermHebrew' : DlGenRClientNoteTermHebrew,
            'dlGenRClientNoteTermGreek' : DlGenRClientNoteTermGreek,
            'dlGenRClientNoteTermSyriac' : DlGenRClientNoteTermSyriac,
            'dlGenRClientNoteTermTranscription' : DlGenRClientNoteTermTranscription,
            'dlGenRClientNoteTermRabbinic' : DlGenRClientNoteTermRabbinic,
            'dlGenRClientNoteRefHebrew' : DlGenRClientNoteRefHebrew,
            'dlGenRClientNoteRefGreek' : DlGenRClientNoteRefGreek,
            'dlGenRClientNoteRefLatin' : DlGenRClientNoteRefLatin,
            'dlGenRClientNoteBiblAncient' : DlGenRClientNoteBiblAncient,
            'dlGenRClientNoteBiblModern' : DlGenRClientNoteBiblModern
        }
    },
    computed : {
        piecesOfText(){
            let numberOfPieces = 0;
            if (this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[this.$attrs.position].getElementsByTagName('cit')[this.$attrs.positionOfQuotation] !== undefined
                && this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[this.$attrs.position].getElementsByTagName('cit')[this.$attrs.positionOfQuotation].getElementsByTagName('note')[0] !== undefined){
                numberOfPieces = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[this.$attrs.position].getElementsByTagName('cit')[this.$attrs.positionOfQuotation].getElementsByTagName('note')[0].childNodes.length;
            }
            let piecesOfText = new Array();
            for (let i = 0; i < numberOfPieces; i++){
                if(this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[this.$attrs.position].getElementsByTagName('cit')[this.$attrs.positionOfQuotation].getElementsByTagName('note')[0].childNodes[i] !== undefined){
                    if(this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[this.$attrs.position].getElementsByTagName('cit')[this.$attrs.positionOfQuotation].getElementsByTagName('note')[0].childNodes[i].nodeName == 'term'){
                        if(this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[this.$attrs.position].getElementsByTagName('cit')[this.$attrs.positionOfQuotation].getElementsByTagName('note')[0].childNodes[i].getAttribute('xml:lang') == 'jpa'){
                            let termHebrew = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[this.$attrs.position].getElementsByTagName('cit')[this.$attrs.positionOfQuotation].getElementsByTagName('note')[0].childNodes[i].childNodes[0].nodeValue;
                            let piece = { 'language' : 'jpa', 'text' : termHebrew, 'usage' : 'term'};
                            piecesOfText.push(piece);
                        }
                        if(this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[this.$attrs.position].getElementsByTagName('cit')[this.$attrs.positionOfQuotation].getElementsByTagName('note')[0].childNodes[i].getAttribute('xml:lang') == "grc"){
                            let greekTerm = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[this.$attrs.position].getElementsByTagName('cit')[this.$attrs.positionOfQuotation].getElementsByTagName('note')[0].childNodes[i].childNodes[0].nodeValue;
                            let piece = { 'language' : 'grc', 'text' : greekTerm, 'usage' : 'term' };
                            piecesOfText.push(piece);
                        }
                        if(this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[this.$attrs.position].getElementsByTagName('cit')[this.$attrs.positionOfQuotation].getElementsByTagName('note')[0].childNodes[i].getAttribute('xml:lang') == "syc"){
                            let syriacTerm = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[this.$attrs.position].getElementsByTagName('cit')[this.$attrs.positionOfQuotation].getElementsByTagName('note')[0].childNodes[i].childNodes[0].nodeValue;
                            let piece = { 'language' : 'syc', 'text' : syriacTerm, 'usage' : 'term' };
                            piecesOfText.push(piece);
                        }
                        if(this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[this.$attrs.position].getElementsByTagName('cit')[this.$attrs.positionOfQuotation].getElementsByTagName('note')[0].childNodes[i].getAttribute('xml:lang') == "fjb"){
                            let transcriptionTerm = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[this.$attrs.position].getElementsByTagName('cit')[this.$attrs.positionOfQuotation].getElementsByTagName('note')[0].childNodes[i].childNodes[0].nodeValue;
                            let piece = { 'language' : 'fjb', 'text' : transcriptionTerm, 'usage' : 'term' };
                            piecesOfText.push(piece);
                        }
                        if(this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[this.$attrs.position].getElementsByTagName('cit')[this.$attrs.positionOfQuotation].getElementsByTagName('note')[0].childNodes[i].getAttribute('xml:lang') == "rabbinic"){
                            let rabbinicTerm = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[this.$attrs.position].getElementsByTagName('cit')[this.$attrs.positionOfQuotation].getElementsByTagName('note')[0].childNodes[i].childNodes[0].nodeValue;
                            let piece = { 'language' : 'rabbinic', 'text' : rabbinicTerm, 'usage' : 'term' };
                            piecesOfText.push(piece);
                        }
                    }
                    else if(this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[this.$attrs.position].getElementsByTagName('cit')[this.$attrs.positionOfQuotation].getElementsByTagName('note')[0].childNodes[i].nodeName === 'bibl'){
                        if(this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[this.$attrs.position].getElementsByTagName('cit')[this.$attrs.positionOfQuotation].getElementsByTagName('note')[0].childNodes[i].getAttribute('type') === 'ancient'){
                            let bibl = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[this.$attrs.position].getElementsByTagName('cit')[this.$attrs.positionOfQuotation].getElementsByTagName('note')[0].childNodes[i].childNodes[0].nodeValue;
                            let piece = { 'language' : 'en', 'text' : bibl, 'usage' : 'bibl-ancient' };
                            piecesOfText.push(piece);
                        }
                        if(this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[this.$attrs.position].getElementsByTagName('cit')[this.$attrs.positionOfQuotation].getElementsByTagName('note')[0].childNodes[i].getAttribute('type') === 'modern'){
                            let bibl = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[this.$attrs.position].getElementsByTagName('cit')[this.$attrs.positionOfQuotation].getElementsByTagName('note')[0].childNodes[i].childNodes[0].nodeValue;
                            let piece = { 'language' : 'en', 'text' : bibl, 'usage' : 'bibl-modern' };
                            piecesOfText.push(piece);
                        }
                    }
                    else if(this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[this.$attrs.position].getElementsByTagName('cit')[this.$attrs.positionOfQuotation].getElementsByTagName('note')[0].childNodes[i].nodeName == 'ref'){
                        if(this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[this.$attrs.position].getElementsByTagName('cit')[this.$attrs.positionOfQuotation].getElementsByTagName('note')[0].childNodes[i].getAttribute('xml:lang') == 'jpa'){
                            let refHebrew = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[this.$attrs.position].getElementsByTagName('cit')[this.$attrs.positionOfQuotation].getElementsByTagName('note')[0].childNodes[i].childNodes[0].nodeValue;
                            let piece = { 'language' : 'jpa', 'text' : refHebrew, 'usage' : 'ref'};
                            piecesOfText.push(piece);
                        }
                        if(this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[this.$attrs.position].getElementsByTagName('cit')[this.$attrs.positionOfQuotation].getElementsByTagName('note')[0].childNodes[i].getAttribute('xml:lang') == 'grc'){
                            let refGreek = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[this.$attrs.position].getElementsByTagName('cit')[this.$attrs.positionOfQuotation].getElementsByTagName('note')[0].childNodes[i].childNodes[0].nodeValue;
                            let piece = { 'language' : 'grc', 'text' : refGreek, 'usage' : 'ref' };
                            piecesOfText.push(piece);
                        }
                        if(this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[this.$attrs.position].getElementsByTagName('cit')[this.$attrs.positionOfQuotation].getElementsByTagName('note')[0].childNodes[i].getAttribute('xml:lang') == 'fjb'){
                            let refLatin = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[this.$attrs.position].getElementsByTagName('cit')[this.$attrs.positionOfQuotation].getElementsByTagName('note')[0].childNodes[i].childNodes[0].nodeValue;
                            let piece = { 'language' : 'en', 'text' : refLatin, 'usage' : 'ref' };
                            piecesOfText.push(piece);
                        }
                    }
                    else {
                        let latinText = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[this.$attrs.position].getElementsByTagName('cit')[this.$attrs.positionOfQuotation].getElementsByTagName('note')[0].childNodes[i].nodeValue;
                        let piece = { 'language' : 'en', 'text' : latinText, 'usage' : 'text'};
                        piecesOfText.push(piece);
                    }
                }
            }
            return piecesOfText;
        }
    }
}
</script>
<style scoped>
    div.dlgenr-client-sense-quotation-note {
        text-align: left;
        margin-left: 40pt;
        margin-right: 40pt;
        margin-top: 10pt;
        margin-bottom: 20pt;
        line-height: 120%;
    }
</style>