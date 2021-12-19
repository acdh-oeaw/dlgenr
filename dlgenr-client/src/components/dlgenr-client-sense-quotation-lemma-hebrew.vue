<template>
    <span class="dlgenr-client-sense-quotation-lemma-hebrew"> {{ hebrewText }}<sup class="dlgenr-client-sense-quotation-lemma-hebrew-footnote">{{ footnoteNumber }}</sup></span>
</template>
<script>
export default {
    name : 'dlgenr-client-sense-quotation-lemma-hebrew',
    computed : {
        hebrewText(){
            let hebrewText = this.$attrs.hebrewText;
            return hebrewText;
        },
        footnoteNumber(){
            let footnoteNumber = this.$attrs.footnoteNumber;
            return footnoteNumber;
        }
    }
}
</script>
<style scoped>
    span.dlgenr-client-sense-quotation-lemma-hebrew {
        font-family: 'Frank Ruhl Libre', serif;
        font-size: 14pt;
        color: black;
    }
    sup.dlgenr-client-sense-quotation-lemma-hebrew-footnote {
        font-family: 'Cormorant Garamond', serif;
        font-size: 8pt;
        color: black;
    }
</style>