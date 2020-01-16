<template>
    <div class="dlgenr-client-variant">
        <dlgenr-client-variant-header v-bind:header="header"/>
        <dlgenr-client-variant-hebrew v-bind:hebrew="hebrew"/>
        <dlgenr-client-variant-transcription v-bind:transcription="transcription"/>
        <dlgenr-client-variant-pronounciation v-bind:pronounciation="pronounciation"/>
    </div>
</template>
<script>
import DlGenRClientVariantHeader from './dlgenr-client-variant-header';
import DlGenRClientVariantHebrew from './dlgenr-client-variant-hebrew';
import DlGenRClientVariantPronounciation from './dlgenr-client-variant-pronounciation';
import DlGenRClientVariantTranscription from './dlgenr-client-variant-transcription';

export default {
    name : 'dlgenr-client-variant',
    props : { entry : { type : XMLDocument }},
    components : {
        'dlgenr-client-variant-header' : DlGenRClientVariantHeader,
        'dlgenr-client-variant-hebrew' : DlGenRClientVariantHebrew,
        'dlgenr-client-variant-transcription' : DlGenRClientVariantTranscription,
        'dlgenr-client-variant-pronounciation' : DlGenRClientVariantPronounciation
    },
    data : function() { return { 'header' : 'Variant: '}},
    computed : {
        hebrew(){
            let position = this.$attrs.variantPosition;
            let numberOfOrthNodes = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[position].getElementsByTagName('orth').length;
            let positionOfHebrew = 0;
            for (let i = 0; i < numberOfOrthNodes; i++){
                let attribute = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[position].getElementsByTagName('orth')[i].getAttribute('xml:lang');
                if (attribute == 'hbo') { positionOfHebrew = i; }
            }
            let hebrewText = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[position].getElementsByTagName('orth')[positionOfHebrew].childNodes[0].nodeValue;
            return hebrewText;
        },
        transcription(){
            let position = this.$attrs.variantPosition;
            let numberOfOrthNodes = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[position].getElementsByTagName('orth').length;
            let positionOfTranscription = 0;
            for (let i = 0; i < numberOfOrthNodes; i++){
                let attribute = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[position].getElementsByTagName('orth')[i].getAttribute('type');
                if (attribute == 'transliteration'){ positionOfTranscription = i; }
            }
            let transcriptionText = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[position].getElementsByTagName('orth')[positionOfTranscription].childNodes[0].nodeValue;
            return transcriptionText;
        },
        pronounciation(){
            let position = this.$attrs.variantPosition;
            let pronounciationText = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[position].getElementsByTagName('pron')[0].childNodes[0].nodeValue;
            return pronounciationText;
        }
    }
}
</script>
<style scoped>
    div.dlgenr-client-variant {
        margin-left : 40pt;
        color : black;
        font-family : 'Cormorant Garamond', serif;
        text-align : left;
    }
</style>