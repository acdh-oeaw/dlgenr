<template>
    <div>
        <p class="dictionary-link-entry-header-hebrew" v-on:click="toggleEnabled">{{ hebrewEntryHeader }}</p>
        <dlgenr-client-dictionary-entry-details v-show="enabled" v-bind:entry="hebrewEntryDetails"/>
    </div>
</template>
<script>
import DlGenRClientEntryDetails from './dlgenr-client-dictionary-entry-details.vue';

export default {
    name: 'dlgenr-client-dictionary-link-entry-header-hebrew',
    components: { 'dlgenr-client-dictionary-entry-details' : DlGenRClientEntryDetails },
    props: { hebrewEntryHeader : { type: String }, hebrewEntryDetails : { type: XMLDocument }},
    data: function () { let enabled = false; return { enabled }},
    methods: {
        toggleEnabled: function() { if (this.enabled == true){this.enabled = false} else {this.enabled = true}}}
}
</script>
<style scoped>
    p.dictionary-link-entry-header-hebrew {
        text-align: right;
        color: #fc9803;
        font-family: 'Frank Ruhl Libre', serif;
        font-weight: medium;
        font-size: 22pt;
        margin-right: 40pt;
        padding: 0pt;
    }
</style>