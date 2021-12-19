<template>
    <div class="dlgenr-client-sense-translation">
        <dlgenr-client-sense-translation-header v-bind:header="header"/>
        <dlgenr-client-sense-translation-text-latin v-bind:translation="translation"/>
    </div>
</template>
<script>
import DlGenRClientSenseTranslationHeader from './dlgenr-client-sense-translation-header';
import DlGenRClientSenseTranslationTextLatin from './dlgenr-client-sense-translation-text-latin';

export default {
    name : 'dlgenr-client-sense-translation',
    components : {
        'dlgenr-client-sense-translation-header' : DlGenRClientSenseTranslationHeader,
        'dlgenr-client-sense-translation-text-latin' : DlGenRClientSenseTranslationTextLatin
    },
    props : { entry : { type : XMLDocument }},
    computed : {
        header(){
            let isNumbered = this.$attrs.isNumbered;
            let position = this.$attrs.position;
            let header = '';
            if (isNumbered == true){ header = (position + 1) + ".) Translation: "; }
            else { header = "Translation: "; }
            return header;
        },
        translation(){
            let position = this.$attrs.position;
            let translations = '';
            let numberOfCitations = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit').length;
            let numberOfTranslationOfSense = 0;
            for (let i = 0; i < numberOfCitations; i++){
                if (this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[i].getAttribute('subtype') !== undefined){
                    if (this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[i].getAttribute('subtype') === 'sense'){
                    numberOfTranslationOfSense++;
                   }
                }
            }
            for (let j = 0; j < numberOfTranslationOfSense; j++){
                let translation = '';
                if ( this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[j].getAttribute('type') === 'translation'
                    && this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[j].getAttribute('subtype') === 'sense'
                    && this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[j].getElementsByTagName('quote')[0].childNodes[0] !== undefined){
                    translation = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[j].getElementsByTagName('quote')[0].childNodes[0].nodeValue;
                    if (j === 0){
                        translations = translation;
                    }
                    else{
                        translations = translations + ', ' + translation;
                    }
                }
            }
            return translations;
        }
    }
}
</script>
<style scoped>
    div.dlgenr-client-sense-translation {
        font-family: 'Cormorant Garamond', serif;
        font-weight: bold;
        text-align: left;
        margin-left: 40pt;
    }
</style>