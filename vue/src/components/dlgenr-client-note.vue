<template>
    <div class="dlgenr-client-note">
        <span v-for="(pieceOfText,index) in piecesOfText" v-bind:key="index">
            <component v-if="pieceOfText.language == 'en' && pieceOfText.usage == 'text'" v-bind:is="dlGenRClientNoteLatinText" v-bind:content="pieceOfText.text"/>
            <component v-if="pieceOfText.language == 'hbo' && pieceOfText.usage == 'term'" v-bind:is="dlGenRClientNoteTermHebrew" v-bind:content="pieceOfText.text"/>
            <component v-if="pieceOfText.language == 'grc' && pieceOfText.usage == 'term'" v-bind:is="dlGenRClientNoteTermGreek" v-bind:content="pieceOfText.text"/>
            <component v-if="pieceOfText.language == 'hbo' && pieceOfText.usage == 'ref'" v-bind:is="dlGenRClientNoteRefHebrew" v-bind:content="pieceOfText.text"/>
            <component v-if="pieceOfText.language == 'grc' && pieceOfText.usage == 'ref'" v-bind:is="dlGenRClientNoteRefGreek" v-bind:content="pieceOfText.text"/>
            <component v-if="pieceOfText.language == 'en' && pieceOfText.usage == 'ref'" v-bind:is="dlGenRClientNoteRefLatin" v-bind:content="pieceOfText.text"/>
        </span>
    </div>
</template>
<script>
import DlGenRClientNoteLatinText from './dlgenr-client-note-latin-text';
import DlGenRClientNoteTermHebrew from './dlgenr-client-note-term-hebrew';
import DlGenRClientNoteTermGreek from './dlgenr-client-note-term-greek';
import DlGenRClientNoteRefHebrew from './dlgenr-client-note-ref-hebrew';
import DlGenRClientNoteRefGreek from './dlgenr-client-note-ref-greek';
import DlGenRClientNoteRefLatin from './dlgenr-client-note-ref-latin';

export default {
    name : 'dlgenr-client-note',
    props : { entry : { type : XMLDocument }},
    data : function(){
        return {
            'dlGenRClientNoteLatinText' : DlGenRClientNoteLatinText,
            'dlGenRClientNoteTermHebrew' : DlGenRClientNoteTermHebrew,
            'dlGenRClientNoteTermGreek' : DlGenRClientNoteTermGreek,
            'dlGenRClientNoteRefHebrew' : DlGenRClientNoteRefHebrew,
            'dlGenRClientNoteRefGreek' : DlGenRClientNoteRefGreek,
            'dlGenRClientNoteRefLatin' : DlGenRClientNoteRefLatin
        }
    },
    computed : {
        piecesOfText(){
            let numberOfPieces = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('note')[0].childNodes.length;
            let piecesOfText = new Array();
            for (let i = 0; i < numberOfPieces; i++){
                if(this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('note')[0].childNodes[i] != undefined){
                    if(this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('note')[0].childNodes[i].nodeName == 'term'){
                        if(this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('note')[0].childNodes[i].getAttribute('xml:lang') == 'hbo'){
                            let termHebrew = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('note')[0].childNodes[i].childNodes[0].nodeValue;
                            let piece = { 'language' : 'hbo', 'text' : termHebrew, 'usage' : 'term'};
                            piecesOfText.push(piece);
                        }
                        if(this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('note')[0].childNodes[i].getAttribute('xml:lang') == "grc"){
                            let greekTerm = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('note')[0].childNodes[i].childNodes[0].nodeValue;
                            let piece = { 'language' : 'grc', 'text' : greekTerm, 'usage' : 'term' };
                            piecesOfText.push(piece);
                        }
                    }
                    else if(this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('note')[0].childNodes[i].nodeName == 'ref'){
                        if(this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('note')[0].childNodes[i].getAttribute('xml:lang') == 'hbo'){
                            let refHebrew = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('note')[0].childNodes[i].childNodes[0].nodeValue;
                            let piece = { 'language' : 'hbo', 'text' : refHebrew, 'usage' : 'ref'};
                            piecesOfText.push(piece);
                        }
                        if(this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('note')[0].childNodes[i].getAttribute('xml:lang') == 'grc'){
                            let refGreek = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('note')[0].childNodes[i].childNodes[0].nodeValue;
                            let piece = { 'language' : 'grc', 'text' : refGreek, 'usage' : 'ref' };
                            piecesOfText.push(piece);
                        }
                        if(this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('note')[0].childNodes[i].getAttribute('xml:lang') == 'hbo-SHL'){
                            let refLatin = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('note')[0].childNodes[i].childNodes[0].nodeValue;
                            let piece = { 'language' : 'en', 'text' : refLatin, 'usage' : 'ref' };
                            piecesOfText.push(piece);
                        }
                    }
                    else {
                        let latinText = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('note')[0].childNodes[i].nodeValue;
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
    div.dlgenr-client-note {
        text-align: left;
        margin-left: 40pt;
        margin-right: 40pt;
        margin-top: 10pt;
        margin-bottom: 20pt;
        line-height: 120%;
    }
</style>