<template>
    <div class="dlgenr-client-search-search-type-selection">
        <div>
            <input type="radio" id="lemmata" name="lemmataSearch" value="lemmata" :checked="lemmataEnabled" class="dlgenr-client-search-search-type-selection-input" v-on:change="lemmataSelected"/>
            <label for="lemmata">Lemmata</label>
        </div>
        <div>
            <input type="radio" id="fulltext" name="fulltextSearch" value="fulltext" :checked="fulltextEnabled" class="dlgenr-client-search-search-type-selection-input" v-on:change="fulltextSelected"/>
            <label for="fulltext">Full text</label>
        </div>
    </div>
</template>
<script>
export default {
  name: 'dlgenr-client-search-search-type-selection',
  data: function(){
    return {
        lemmataEnabled : true,
        fulltextEnabled : false
  }
  },
  methods: {
    lemmataSelected(){
        this.$emit('propagateEventLemmataSelected');
        this.lemmataEnabled = true;
        this.fulltextEnabled = false;
    },
    fulltextSelected(){
        this.$emit('propagateEventFullTextSelected');
        this.lemmataEnabled = false;
        this.fulltextEnabled = true;
    }
  }
  }
</script>
<style scoped>
div.dlgenr-client-search-search-type-selection {
    padding-left: 40pt;
    padding-top: 10pt;
}
input[type='radio']:checked {
    color: black;
}
</style>