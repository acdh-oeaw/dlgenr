<template>
    <span class="dlgenr-client-sense-quotation-bibliographic-reference">({{ bibliographicReference }})</span>
</template>
<script>
export default {
    name : 'dlgenr-client-sense-quotation-bibliographic-reference',
    computed : {
        bibliographicReference(){
            let bibliographicReference = this.$attrs.bibliographicReference;
            return bibliographicReference;
        }
    }
}
</script>
<style scoped>
    span.dlgenr-client-sense-quotation-bibliographic-reference {
        font-family: 'Cormorant Garamond', serif;
        font-weight: medium;
        font-size: 12pt;
        color: black;
    }
</style>