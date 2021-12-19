<template>
    <div class="dlgenr-client-variant">
        <dlgenr-client-variant-header v-bind:header="header"/>
        <dlgenr-client-variant-hebrew v-bind:hebrew="hebrew"/>
        <dlgenr-client-variant-transcription v-if='transcription' v-bind:transcription="transcription"/>
        <dlgenr-client-variant-pronounciation v-if="pronounciation" v-bind:pronounciation="pronounciation"/>
        <dlgenr-client-variant-source v-if="source" v-bind:source="source"/>
    </div>
</template>
<script>
import DlGenRClientVariantHeader from './dlgenr-client-variant-header';
import DlGenRClientVariantHebrew from './dlgenr-client-variant-hebrew';
import DlGenRClientVariantPronounciation from './dlgenr-client-variant-pronounciation';
import DlGenRClientVariantTranscription from './dlgenr-client-variant-transcription';
import DlGenRClientVariantSource from './dlgenr-client-variant-source';

export default {
    name : 'dlgenr-client-variant',
    props : { entry : { type : XMLDocument }},
    components : {
        'dlgenr-client-variant-header' : DlGenRClientVariantHeader,
        'dlgenr-client-variant-hebrew' : DlGenRClientVariantHebrew,
        'dlgenr-client-variant-transcription' : DlGenRClientVariantTranscription,
        'dlgenr-client-variant-pronounciation' : DlGenRClientVariantPronounciation,
        'dlgenr-client-variant-source' : DlGenRClientVariantSource
    },
    data : function() { return { 'header' : 'Variant: '}},
    computed : {
        hebrew(){
            let position = this.$attrs.variantPosition;
            let numberOfOrthNodes = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[0].getElementsByTagName('form')[position].getElementsByTagName('orth').length;
            let positionOfHebrew = 0;
            for (let i = 0; i < numberOfOrthNodes; i++){
                let attribute = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[0].getElementsByTagName('form')[position].getElementsByTagName('orth')[i].getAttribute('xml:lang');
                if (attribute == 'jpa') { positionOfHebrew = i; }
            }
            let hebrewText = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[0].getElementsByTagName('form')[position].getElementsByTagName('orth')[positionOfHebrew].childNodes[0].nodeValue;
            return hebrewText;
        },
        transcription(){
            let position = this.$attrs.variantPosition;
            let numberOfOrthNodes = 0;
            if (this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[0].getElementsByTagName('form')[position].getElementsByTagName('orth') !== undefined){
                numberOfOrthNodes = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[0].getElementsByTagName('form')[position].getElementsByTagName('orth').length;
                let positionOfTranscription = 0;
                for (let i = 0; i < numberOfOrthNodes; i++){
                    let attribute = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[0].getElementsByTagName('form')[position].getElementsByTagName('orth')[i].getAttribute('type');
                    if (attribute == 'transliteration'){
                        positionOfTranscription = i;
                        let transcriptionText = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[0].getElementsByTagName('form')[position].getElementsByTagName('orth')[positionOfTranscription].childNodes[0].nodeValue;
                        return transcriptionText;
                    }
                }
                return null;
            } else { return null; }
        },
        pronounciation(){
            let position = this.$attrs.variantPosition;
            let pronounciationText = null;
            if (this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[0].getElementsByTagName('form')[position].getElementsByTagName('pron')[0] !== undefined){
                pronounciationText = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[0].getElementsByTagName('form')[position].getElementsByTagName('pron')[0].childNodes[0].nodeValue;
                }
            return pronounciationText;
        },
        source(){
            let position = this.$attrs.variantPosition;
            let sourceText = null;
            if (this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[0].getElementsByTagName('form')[position].getAttribute('source') !== undefined){
                sourceText = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('form')[0].getElementsByTagName('form')[position].getAttribute('source');
            }
            return sourceText;
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
        direction: ltr;
        unicode-bidi: bidi-override;
    }
</style>