<template>
    <p class="dlgenr-client-search-submit" v-on:click="submitEnteredText">{{ submitText }}</p>
</template>
<script>
export default {
    name: 'dlgenr-client-search-submit',
    data: function(){
        return { submitText : 'Search' }
    },
    methods: {
      submitEnteredText() {
         this.$emit('propagateEventSubmitClicked',event);
        }
    }
}
</script>
<style scoped>
p.dlgenr-client-search-submit {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 12pt;
    color: black;
    text-align: center;
    border-style: solid;
    border-width: 1.5pt;
    border-color: black;
    border-radius: 4pt;
    padding: 6pt;
    margin: 20pt;
    cursor: pointer;
}
</style>