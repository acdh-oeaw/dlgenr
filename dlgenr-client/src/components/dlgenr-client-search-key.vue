<template>
    <div class="dlgenr-client-search-key" v-on:click="sendKeyStroke" @mouseover="hover=true" @mouseleave="hover=false" :class="{'dlgenr-input-field-key-active': hover}">{{transcription}} &DoubleRightArrow; {{transcribed}}</div>
</template>
<script>
export default {
    name : 'dlgenr-client-search-key',
    data : function(){ return { transcription : this.$attrs.transcription, transcribed : this.$attrs.transcribed, hover: false }},
    methods: {
      sendKeyStroke() {
         this.$emit('buttonClicked', this.transcribed);
  }
}
}
</script>
<style scoped>
div.dlgenr-client-search-key {
    display: block;
    float: left;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14pt;
    color: black;
    padding: 6pt;
    border-style: solid;
    border-color: black;
    border-width: 0.8pt;
    border-radius: 4pt;
    margin: 10pt;
    cursor: pointer;
}
.dlgenr-client-search-key-active {
    display: block;
    float: left;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14pt;
    color: black;
    background-color: burlywood;
    padding: 6pt;
    border-style: solid;
    border-color: black;
    border-width: 0.8pt;
    border-radius: 4pt;
    margin: 10pt;
    cursor: pointer;
}
</style>