<template>
    <span class="dlgenr-client-sense-quotation-apparatus-reading-witness">{{ witness }}: </span>
</template>
<script>
export default {
    name : 'dlgenr-client-sense-quotation-apparatus-reading-witness',
    computed: {
        witness(){
            let witness = this.$attrs.witness;
            return witness;
        }
    }
}
</script>
<style scoped>
    span.dlgenr-client-sense-quotation-apparatus-reading-witness {
        font-family: "Cormorant Garamond", serif;
        font-size: 12pt;
        color: black;
        font-weight: medium;
    }
</style>