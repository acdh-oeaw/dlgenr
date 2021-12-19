<template>
    <span class="dlgenr-client-sense-quotation-critical-apparatus-reading-text-latin"> {{ textLatin }} </span>
</template>
<script>
export default {
    name : 'dlgenr-client-sense-quotation-critical-apparatus-reading-text-latin',
    computed : {
        textLatin(){
            let textLatin = this.$attrs.textLatin;
            return textLatin;
        }
    }
}
</script>
<style scoped>
    span.dlgenr-client-sense-quotation-critical-apparatus-reading-text-latin {
        font-family: 'Cormorant Garamond', serif;
        color: black;
        font-size: 12pt;
        font-weight: medium;
    }
</style>