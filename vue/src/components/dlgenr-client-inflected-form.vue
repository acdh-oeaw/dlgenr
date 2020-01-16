<template>
    <div class="dlgenr-client-inflected-form">
        <dlgenr-client-inflected-form-header v-bind:header="header"/>
        <dlgenr-client-inflected-form-hebrew v-bind:hebrew="hebrew"/>
        <dlgenr-client-inflected-form-transcription v-bind:transcription="transcription"/>
        <dlgenr-client-inflected-form-pronounciation v-bind:pronounciation="pronounciation"/>
        <dlgenr-client-inflected-form-grammatical-information v-bind:grammaticalInformation="grammaticalInformation"/>
    </div>
</template>
<script>
import DlGenRClientInflectedFormHeader from './dlgenr-client-inflected-form-header';
import DlGenRClientInflectedFormHebrew from './dlgenr-client-inflected-form-hebrew';
import DlGenRClientInflectedFormTranscription from './dlgenr-client-inflected-form-transcription';
import DlGenRClientInflectedFormPronounciation from './dlgenr-client-inflected-form-pronounciation';
import DlGenRClientInflectedFormGrammaticalInformation from './dlgenr-client-inflected-form-grammatical-information';

export default {
    name : 'dlgenr-client-inflected-form',
    components : {
        'dlgenr-client-inflected-form-header' : DlGenRClientInflectedFormHeader,
        'dlgenr-client-inflected-form-hebrew' : DlGenRClientInflectedFormHebrew,
        'dlgenr-client-inflected-form-transcription' : DlGenRClientInflectedFormTranscription,
        'dlgenr-client-inflected-form-pronounciation' : DlGenRClientInflectedFormPronounciation,
        'dlgenr-client-inflected-form-grammatical-information' : DlGenRClientInflectedFormGrammaticalInformation
    },
    props : { entry : { type : XMLDocument }},
    data : function() { return { 'header' : 'Inflected form: '}},
    computed : {
        hebrew(){
            let position = this.$attrs.inflectedFormPosition;
            let numberOfOrthNodes = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[position].getElementsByTagName('orth').length;
            let positionOfHebrewText = 0;
            for (let i = 0; i < numberOfOrthNodes; i++){
                let attribute = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[position].getElementsByTagName('orth')[i].getAttribute('xml:lang');
                if (attribute == 'hbo'){ positionOfHebrewText = i; }
            }
            let hebrewText = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[position].getElementsByTagName('orth')[positionOfHebrewText].childNodes[0].nodeValue;
            return hebrewText;

        },
        transcription(){
            let position = this.$attrs.inflectedFormPosition;
            let numberOfOrthNodes = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[position].getElementsByTagName('orth').length;
            let positionOfTranscription = 0;
            for (let i = 0; i < numberOfOrthNodes; i++){
                let attribute = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[position].getElementsByTagName('orth')[i].getAttribute('type');
                if (attribute == 'transliteration'){ positionOfTranscription = i; }
            }
            let transcription = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[position].getElementsByTagName('orth')[positionOfTranscription].childNodes[0].nodeValue;
            return transcription;
        },
        pronounciation(){
            let position = this.$attrs.inflectedFormPosition;
            let pronounciation = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[position].getElementsByTagName('pron')[0].childNodes[0].nodeValue;
            return pronounciation;
        },
        grammaticalInformation(){
            let position = this.$attrs.inflectedFormPosition;
            let grammaticalInformation = '';
            let pos = '';
            if (this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[position].getElementsByTagName('gramGrp')[0].getElementsByTagName('pos')[0] != undefined){
                pos = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[position].getElementsByTagName('gramGrp')[0].getElementsByTagName('pos')[0].childNodes[0].nodeValue;
            }
            let gram = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[position].getElementsByTagName('gramGrp')[0].getElementsByTagName('gram')[0].childNodes[0].nodeValue;
            grammaticalInformation = pos + " " + gram;
            return grammaticalInformation;
        }
    }
}
</script>
<style scoped>
    div.dlgenr-client-inflected-form {
        text-align: left;
        margin-left: 40pt;
        color : black;
        font-family : 'Cormorant Garamond', serif;
    }
</style>