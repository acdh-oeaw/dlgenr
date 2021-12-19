<template>
    <span class="dlgenr-client-inflected-form-transcription"> &#9001;{{ transcription }}&#9002;</span>
</template>
<script>
export default {
    name : 'dlgenr-client-inflected-form-transcription',
    props : { transcription : { type : String }}
}
</script>
<style scoped>
    span.dlgenr-client-inflected-form-transcription {
        font-family: 'Cormorant Garamond', serif;
        font-weight: normal;
        font-size: 12pt;
        text-align: left;
        color: black;
    }
</style>