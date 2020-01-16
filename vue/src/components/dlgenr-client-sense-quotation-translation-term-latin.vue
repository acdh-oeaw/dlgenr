<template>
    <span class="dlgenr-client-sense-quotation-translation-term-latin"> {{ term }} </span>
</template>
<script>
export default {
    name : 'dlgenr-client-sense-quotation-translation-term-latin',
    computed : {
        term(){
            let term = this.$attrs.term;
            return term;
        }
    }
}
</script>
<style scoped>
    span.dlgenr-client-sense-quotation-translation-term-latin {
        font-family : 'Cormorant Garamond', serif;
        font-weight: medium;
        font-size: 12pt;
        color: black;
    }
</style>