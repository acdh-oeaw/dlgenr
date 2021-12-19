<template>
    <span>
        <dlgenr-client-sense-quotation-critical-apparatus-reading-witness v-bind:witness="reading.witness"/>
        <dlgenr-client-sense-quotation-critical-apparatus-reading-text-latin v-if="reading.readingText == 'om.'" v-bind:textLatin="reading.readingText"/>
        <dlgenr-client-sense-quotation-critical-apparatus-reading-text-hebrew v-else v-bind:textHebrew="reading.readingText"/>
    </span>
</template>
<script>
import DlGenRClientSenseQuotationCriticalApparatusReadingWitness from './dlgenr-client-sense-quotation-critical-apparatus-reading-witness';
import DlGenRClientSenseQuotationCriticalApparatusReadingTextHebrew from './dlgenr-client-sense-quotation-critical-apparatus-reading-text-hebrew';
import DlGenRClientSenseQuotationCriticalApparatusReadingTextLatin from './dlgenr-client-sense-quotation-critical-apparatus-reading-text-latin';

export default {
    name : 'dlgenr-client-sense-quotation-critical-apparatus-reading'    ,
    components : {
        'dlgenr-client-sense-quotation-critical-apparatus-reading-witness' : DlGenRClientSenseQuotationCriticalApparatusReadingWitness,
        'dlgenr-client-sense-quotation-critical-apparatus-reading-text-hebrew' : DlGenRClientSenseQuotationCriticalApparatusReadingTextHebrew,
        'dlgenr-client-sense-quotation-critical-apparatus-reading-text-latin' : DlGenRClientSenseQuotationCriticalApparatusReadingTextLatin
    },
    computed : {
        reading(){
            let reading = this.$attrs.reading;
            return reading;
        }
    }
}
</script>