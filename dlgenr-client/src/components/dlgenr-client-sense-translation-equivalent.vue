<template>
    <div class="dlgenr-client-sense-translation-equivalent">
        <dlgenr-client-sense-translation-header v-bind:header="header"/>
        <dlgenr-client-sense-translation-equivalent-text-latin v-for="(translationEquivalent,index) in translationEquivalents" v-bind:key="index" v-bind:translationEquivalent="translationEquivalent"/>
    </div>
</template>
<script>
import DlGenRClientSenseTranslationHeader from './dlgenr-client-sense-translation-header';
import DlGenRClientSenseTranslationEquivalentTextLatin from './dlgenr-client-sense-translation-equivalent-text-latin';

export default {
    name : 'dlgenr-client-sense-translation-equivalent',
    components : {
        'dlgenr-client-sense-translation-header' : DlGenRClientSenseTranslationHeader,
        'dlgenr-client-sense-translation-equivalent-text-latin' : DlGenRClientSenseTranslationEquivalentTextLatin
    },
    props : { entry : { type : XMLDocument }},
    computed : {
        header(){
            let header = 'Translation equivalent: ';
            return header;
        },
        translationEquivalents(){
            let position = this.$attrs.position;
            let translations = new Array();
            let numberOfCitations = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit').length;
            let numberOfEquivalents = new Array;
            for (let i = 0; i < numberOfCitations; i++){
                if (this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[i].getAttribute('type') === 'translationEquivalent'){
                    numberOfEquivalents.push(i);
                }
            }
            for (let j = 0; j < numberOfEquivalents.length; j++){
                let translation = '';
                let language = '';
                if ( this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[numberOfEquivalents[j]].getAttribute('type') == 'translationEquivalent'
                    && this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[numberOfEquivalents[j]].getElementsByTagName('quote')[0].childNodes[0] !== undefined){
                    translation = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[numberOfEquivalents[j]].getElementsByTagName('quote')[0].childNodes[0].nodeValue;
                    if (this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[numberOfEquivalents[j]].getElementsByTagName('lang')[0] !== undefined){
                        let languageTEI = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[numberOfEquivalents[j]].getElementsByTagName('lang')[0].childNodes[0].nodeValue;
                        switch (languageTEI){
                            case 'Post Classical Greek': language = 'Post Classical Greek'; break;
                            case 'post classical greek': language = 'Post Classical Greek'; break;
                            case 'Classical Greek': language = 'Classical Greek'; break;
                            case 'classical greek': language = 'Classical Greek'; break;
                            case 'Latin': language = 'Latin'; break;
                            case 'latin': language = 'Latin'; break;
                            default: language = languageTEI;
                        }
                    }
                    translation = {"translation" : translation, "language" : language};
                }
                translations.push(translation);
            }
            return translations;
        }
    }
}
</script>
<style scoped>
    div.dlgenr-client-sense-translation-equivalent {
        font-family: 'Cormorant Garamond', serif;
        font-weight: medium;
        text-align: left;
        margin-left: 40pt;
    }
</style>