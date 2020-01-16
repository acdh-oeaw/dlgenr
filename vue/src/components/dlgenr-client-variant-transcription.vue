<template>
    <span class="dlgenr-client-variant-transcription"> &#9001;{{ transcription }}&#9002;</span>
</template>
<script>
export default {
    name : 'dlgenr-client-variant-transcription',
    props : { transcription : { type : String }}
}
</script>
<style scoped>
    span.dlgenr-client-variant-transcription {
        font-family: 'Cormorant Garamond', serif;
        font-weight: normal;
        font-size: 12pt;
        text-align: left;
        color: black;
    }
</style>