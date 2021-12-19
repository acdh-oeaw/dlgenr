<template>
    <div class="dlgenr-client-header">
        <dlgenr-client-header-hebrew v-bind:headerHebrew="headerHebrew"/>
        <dlgenr-client-header-transcription v-bind:headerTranscription="headerTranscription"/>
        <dlgenr-client-header-pronounciation v-bind:headerPronounciation="headerPronounciation"/>
    </div>
</template>
<script>
import DlGenRClientHeaderHebrew from './dlgenr-client-header-hebrew';
import DlGenRClientHeaderTranscription from './dlgenr-client-header-transcription';
import DlGenRClientHeaderPronounciation from './dlgenr-client-header-pronounciation';

export default {
    name : 'dlgenr-client-header',    
    components : {
        'dlgenr-client-header-hebrew' : DlGenRClientHeaderHebrew,
        'dlgenr-client-header-transcription' : DlGenRClientHeaderTranscription,
        'dlgenr-client-header-pronounciation' : DlGenRClientHeaderPronounciation
    },
    props : { entry : { type: XMLDocument }},
    computed : {
        headerHebrew(){
            let headerHebrew = '';
            if (this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[0] != undefined){
                let numberOfFormNodes = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form').length;
                let positionOfLemma = 0;
                for (let i = 0; i < numberOfFormNodes; i++){
                    let type = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[i].getAttribute('type');
                    if (type == 'lemma'){ positionOfLemma = i; }
                }
                headerHebrew = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfLemma].getElementsByTagName('orth')[0].childNodes[0].nodeValue;
            }
            return headerHebrew;
        },
        headerTranscription(){
            let headerPronounciation = '';
            if (this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[0] != undefined){
                let numberOfFormNodes = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form').length;
                let positionOfLemma = 0;
                for (let i = 0; i < numberOfFormNodes; i++){
                    let type = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[i].getAttribute('type');
                    if (type == "lemma"){ positionOfLemma = i; }
                }
                let positionOfTranscription = 0;
                if (this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfLemma].getElementsByTagName('orth')[0] != undefined){
                    let numberOfOrthNodes = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfLemma].getElementsByTagName('orth').length;
                    for (let i = 0; i < numberOfOrthNodes; i++){
                        let language = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfLemma].getElementsByTagName('orth')[i].getAttribute('xml:lang');
                        if (language == "fjb" || language == "jpa-fjb"){ positionOfTranscription = i; }
                    }
                    headerPronounciation = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfLemma].getElementsByTagName('orth')[positionOfTranscription].childNodes[0].nodeValue;
                }
            }
            return headerPronounciation;
        },
        headerPronounciation(){
            let headerTranscription = '';
            if (this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[0] != undefined){
                let numberOfFormNodes = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form').length;
                let positionOfLemma = 0;
                for (let i = 0; i < numberOfFormNodes; i++){
                    let type = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[i].getAttribute('type');
                    if (type == 'lemma'){ positionOfLemma = i; }
                }
                if (this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfLemma].getElementsByTagName('pron')[0] != undefined){
                    headerTranscription = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[positionOfLemma].getElementsByTagName('pron')[0].childNodes[0].nodeValue;
                }
            }
            return headerTranscription;
        }
    }
}
</script>
<style scoped>
    div.dlgenr-client-header {
        text-align : left;
        margin-top : 10pt;
        margin-left : 20pt;
        margin-bottom: 10pt; 
        color: black;
    }
</style>