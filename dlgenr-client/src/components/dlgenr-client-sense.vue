<template>
    <div>
        <dlgenr-client-sense-translation v-bind:entry="entry" v-bind:position="position" v-bind:isNumbered="isNumbered"/>
        <dlgenr-client-sense-translation-equivalent v-bind:entry="entry" v-bind:position="position"/>
        <dlgenr-client-usage v-bind:entry="entry" v-bind:position="position"/>
        <dlgenr-client-sense-quotation v-on:showLink="showLink" v-bind:entry="entry" v-for="(quotation,index) in quotations" v-bind:key="index" v-bind:positionOfQuotation="quotation" v-bind:position="position"/>
    </div>
</template>
<script>
import DlGenRClientSenseTranslation from './dlgenr-client-sense-translation';
import DlGenRClientSenseTranslationEquivalent from './dlgenr-client-sense-translation-equivalent';
import DlGenRClientUsage from './dlgenr-client-usage';
import DlGenRClientSenseQuotation from './dlgenr-client-sense-quotation';

export default {
    name : 'dlgenr-client-sense',
    components : {
        'dlgenr-client-sense-translation' : DlGenRClientSenseTranslation,
        'dlgenr-client-sense-translation-equivalent' : DlGenRClientSenseTranslationEquivalent,
        'dlgenr-client-usage' : DlGenRClientUsage,
        'dlgenr-client-sense-quotation' : DlGenRClientSenseQuotation
    },
    props : { entry : { type : XMLDocument }},
    computed : {
        isNumbered(){
            let numberOfSenses = this.$attrs.numberOfSenses;
            let isNumbered = false;
            if (numberOfSenses > 1) { isNumbered = true; }
            return isNumbered;
        },
        position(){
            let position = this.$attrs.sensePosition;
            return position;
        },
        quotations(){
            let position = this.$attrs.sensePosition;
            let numberOfCitations = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit').length;
            let quotations = new Array();
            for (let i = 0; i < numberOfCitations; i++){
                let attribute = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[i].getAttribute('type');
                if (attribute == 'example'){ quotations.push(i) }
            }
            return quotations;
        }
    },
    methods : {
        showLink: function(link){
            this.$emit('showLink',link);
        }
    }
}
</script>