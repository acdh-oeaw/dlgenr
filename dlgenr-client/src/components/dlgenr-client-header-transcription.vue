<template>
    <span class="dlgenr-client-header-transcription">&#9001;{{ headerTranscription }}&#9002; </span>
</template>
<script>
export default {
    name : 'dlgenr-client-header-transcription',
    props : { headerTranscription : { type : String }}
}
</script>
<style scoped>
    span.dlgenr-client-header-transcription {
        font-family: 'Cormorant Garamond', serif;
        font-weight: normal;
        font-size: 14pt;
        color: black;
    }
</style>