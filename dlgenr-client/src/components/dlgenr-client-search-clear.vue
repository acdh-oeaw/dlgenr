<template>
    <p class="dlgenr-client-search-clear" v-on:click="clearInputField">{{ clearText }}</p>
</template>
<script>
export default {
    name: 'dlgenr-client-search-clear',
    data: function(){
        return { clearText : 'Clear' }
    },
    methods: {
      clearInputField() {
         this.$emit('propagateEventClearClicked',event);
  }
    }
}
</script>
<style scoped>
p.dlgenr-client-search-clear {
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