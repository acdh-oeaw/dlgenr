<template>
    <ul class="dlgenr-client-search-language-selection">
        <dlgenr-client-search-language-selection-button @buttonClicked="propagateEventLanguageSelected" v-for="language in languages" v-bind:key="language" v-bind:language="language"></dlgenr-client-search-language-selection-button>
    </ul>
</template>
<script>
import DlGenRClientSearchLanguageSelectionButton from './dlgenr-client-search-language-selection-button';
export default {
  name: 'dlgenr-client-search-language-selection',
  components: {
    'dlgenr-client-search-language-selection-button' : DlGenRClientSearchLanguageSelectionButton
  },
  data: function(){
    return {
        languages: ['Latin','Aramaic','Greek','Coptic','Syriac']
    }
  },
  methods: {
      propagateEventLanguageSelected(selectedLanguage){
         this.$emit('propagateEventLanguageSelected',selectedLanguage);
  }
}
}
</script>
<style scoped>
ul.dlgenr-client-search-language-selection {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14pt;
    color: black;
    margin-top: 4em;
}
</style>