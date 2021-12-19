<template>
    <li class="dlgenr-client-search-language-selection-button" v-on:click="sendLanguage">{{ languageText }}</li>
</template>
<script>
export default {
    name: 'dlgenr-client-search-language-selection-button',
    props: {
        language: String
    },
    data: function(){
        return {
            languageText: this.$props.language
        }
    },
    methods: {
       sendLanguage() {
           this.$emit('buttonClicked', this.languageText);
    }
}
}
</script>
<style scoped>
li.dlgenr-client-search-language-selection-button {
    display: inline;
    margin: 20pt;
    padding: 10pt;
    border-style: solid;
    border-color: black;
    border-width: 0.8pt;
    border-radius: 5pt;
    cursor: pointer;
}
</style>