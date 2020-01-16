<template>
    <span class="dlgenr-client-sense-quotation-translation-term-hebrew"> {{ term }} </span>
</template>
<script>
export default {
    name : 'dlgenr-client-sense-quotation-translation-term-hebrew',
    computed : {
        term(){
            let term = this.$attrs.term;
            return term;
        }
    }
}
</script>
<style scoped>
    span.dlgenr-client-sense-quotation-translation-term-hebrew {
        font-family : 'Frank Ruhl Libre', serif;
        font-weight: medium;
        font-size: 12pt;
        color: black;
    }
</style>