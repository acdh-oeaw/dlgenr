<template>
    <div class="dlgenr-client-search-keymap-hebrew">
        <dlgenr-client-search-key @buttonClicked="propagateEventKeyClicked" v-for="[transcription,transcribed] of hebrewKeyMap.entries()" v-bind:key="transcription" v-bind:transcription="transcription" v-bind:transcribed="transcribed"/>
    </div>
</template>
<script>
import DlGenRClientSearchKey from './dlgenr-client-search-key';

export default {
    name: 'dlgenr-client-search-keymap-hebrew',
    components: {
        'dlgenr-client-search-key' : DlGenRClientSearchKey
    },
    props: {
        hebrewKeyMap : Map
    },
    methods: {
        propagateEventKeyClicked(keyValue){
            this.$emit('propagateEventKeyClicked',keyValue);
        }
    }
}
</script>