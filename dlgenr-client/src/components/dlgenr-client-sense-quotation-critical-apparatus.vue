<template>
    <div class="dlgenr-client-sense-quotation-critical-apparatus">
        <dlgenr-client-sense-quotation-critical-apparatus-lemma v-bind:lemma="lemma" v-bind:footnoteNumber="indexOfLemma"/>
        <dlgenr-client-sense-quotation-critical-apparatus-reading v-for="(reading,index) in readings" v-bind:key="index" v-bind:reading="reading"/>
    </div>
</template>
<script>
import DlGenRClientSenseQuotationCriticalApparatusLemma from './dlgenr-client-sense-quotation-critical-apparatus-lemma';
import DlGenRClientSenseQuotationCriticalApparatusReading from './dlgenr-client-sense-quotation-critical-apparatus-reading';

export default {
    name : 'dlgenr-client-sense-quotation-critical-apparatus',
    props : { entry : { type : XMLDocument }},
    components : {
        'dlgenr-client-sense-quotation-critical-apparatus-lemma' : DlGenRClientSenseQuotationCriticalApparatusLemma,
        'dlgenr-client-sense-quotation-critical-apparatus-reading' : DlGenRClientSenseQuotationCriticalApparatusReading
    },
    computed : {
        readings(){
            let position = this.$attrs.position;
            let positionOfQuotation = this.$attrs.positionOfQuotation;
            let positionOfApparatus = this.$attrs.positionOfApparatus;
            let readings = new Array();
            let numberOfReadings = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('quote')[0].getElementsByTagName('app')[positionOfApparatus].getElementsByTagName('rdg').length;
            for (let i = 0; i < numberOfReadings; i++){
                let witness = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('quote')[0].getElementsByTagName('app')[positionOfApparatus].getElementsByTagName('rdg')[i].getAttribute('wit');
                witness = witness.substring(1,witness.length);
                let readingText = '';
                if(this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('quote')[0].getElementsByTagName('app')[positionOfApparatus].getElementsByTagName('rdg')[i].childNodes[0] != undefined){
                    readingText = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('quote')[0].getElementsByTagName('app')[positionOfApparatus].getElementsByTagName('rdg')[i].childNodes[0].nodeValue;
                }
                else { readingText = 'om.'}
                let reading = { 'witness' : witness,'readingText' : readingText };
                readings.push(reading);
            }
            return readings;
        },
        lemma(){
            let position = this.$attrs.position;
            let positionOfQuotation = this.$attrs.positionOfQuotation;
            let positionOfApparatus = this.$attrs.positionOfApparatus;
            let lemma = '';
            if(this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('quote')[0].getElementsByTagName('app')[positionOfApparatus].getElementsByTagName('lem')[0].childNodes[0] != undefined){
                lemma = this.$props.entry.getElementsByTagName('entry')[0].getElementsByTagName('sense')[position].getElementsByTagName('cit')[positionOfQuotation].getElementsByTagName('quote')[0].getElementsByTagName('app')[positionOfApparatus].getElementsByTagName('lem')[0].childNodes[0].nodeValue;
            }
            return lemma;
        },
        indexOfLemma(){
            let index = this.$attrs.positionOfApparatus;
            return index;
        }
    }
}
</script>
<style scoped>
    div.dlgenr-client-sense-quotation-critical-apparatus {
        text-align: left;
        margin-left: 20pt;
    }
</style>