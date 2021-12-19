<template>
    <span>
        <sup class="dlgenr-client-sense-quotation-critical-apparatus-lemma-footnote">{{ footnoteNumber }}</sup>
        <span class="dlgenr-client-sense-quotation-critical-apparatus-lemma">{{ lemma }} &ndash; </span>
    </span>
</template>
<script>
export default {
    name : 'dlgenr-client-sense-quotation-critcal-apparatus-lemma',
    computed : {
        lemma(){
            let lemma = this.$attrs.lemma;
            return lemma;
        },
        footnoteNumber(){
            let footnoteNumber = this.$attrs.footnoteNumber + 1;
            return footnoteNumber;
        }
    }
}
</script>
<style scoped>
    span.dlgenr-client-sense-quotation-critical-apparatus-lemma {
        color: black;
        font-size: 12pt;
        font-family: 'Frank Ruhl Libre', serif;
    }
    sup.dlgenr-client-sense-quotation-critical-apparatus-lemma-footnote {
        color: black;
        font-size: 8pt;
        font-family: 'Cormorant Garamond', serif;
        font-weight: medium;
    }
</style>