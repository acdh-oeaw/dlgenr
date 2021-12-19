<template>
    <div v-on:keydown="propagateKeyEventDown">
        <textarea id="search_field" rows="1" cols="50" autofocus="autofocus" wrap="soft"/>
    </div>
</template>
<script>
export default {
    name: 'dlgenr-client-search-text-input',
    methods: {
        propagateKeyEventDown(event){
            this.$emit('keyDown',event);
        }
    }
}
</script>