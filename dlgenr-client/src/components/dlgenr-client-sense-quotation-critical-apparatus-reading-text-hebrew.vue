<template>
    <span class="dlgenr-client-sense-quotation-critical-apparatus-reading-text-hebrew"> {{ textHebrew }} </span>
</template>
<script>
export default {
    name : 'dlgenr-client-sense-quotation-critical-apparatus-reading-text-hebrew',
    computed : {
        textHebrew(){
            let textHebrew = this.$attrs.textHebrew;
            return textHebrew;
        }
    }
}
</script>
<style scoped>
    span.dlgenr-client-sense-quotation-critical-apparatus-reading-text-hebrew {
        font-family: 'Frank Ruhl Libre', serif;
        color: black;
        font-size: 12pt;
    }
</style>