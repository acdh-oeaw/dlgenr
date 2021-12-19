<template>
    <p class="dlgenr-client-search-result-error">{{ errorMessage }}</p>
</template>
<script>
export default {
  name: 'dlgenr-client-search-result-error',
  props: {
     errorMessage : String
  }
}
</script>
<style scoped>
p.dlgenr-client-search-result-error {
    font-size: 18pt;
    color: black;
    text-align: center;
}
</style>