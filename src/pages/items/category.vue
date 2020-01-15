<template>
  <div>
    <mp-guess :title="title"></mp-guess>
  </div>
</template>

<script>
import guess from '../../components/guess/guess'
  export default {
    name: 'category',
    data() {
      return {
        title: '',
      }
    },
    components: {
      'mp-guess': guess
    }
  }
</script>

<style lang="scss" scoped>

</style>