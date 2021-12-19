<template>
    <div class="dlgenr-client-search-keymap-greek">
        <dlgenr-client-search-key @buttonClicked="propagateEventKeyClicked" v-for="[transcription,transcribed] of greekKeyMap.entries()" v-bind:key="transcription" v-bind:transcription="transcription" v-bind:transcribed="transcribed"/>
    </div>
</template>
<script>
import DlGenRClientSearchKey from './dlgenr-client-search-key';

export default {
    name: 'dlgenr-client-search-keymap-greekj',
    components: {
        'dlgenr-client-search-key' : DlGenRClientSearchKey
    },
    props: {
        greekKeyMap : Map
    },
    methods: {
        propagateEventKeyClicked(keyValue){
            this.$emit('propagateEventKeyClicked',keyValue);
        }
    }
}
</script>