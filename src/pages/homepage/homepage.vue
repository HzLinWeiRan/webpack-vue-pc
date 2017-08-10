<template>
  <div>
    <div class="vux-demo">
      <img  class="logo" src="../../assets/vux_logo.png">
      <h1>{{homepage.title}}</h1>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters,mapActions} from 'vuex'

export default {
  beforeCreate(){
  },
  created(){
  },
  components: {
  },
  created: function(){
  },
  computed: {
    ...mapState({
      homepage: state => state.homepage,
      isLoading: state => true
    })
  },
  methods: {
  },
  waitForData: true
}
</script>

<style lang="less">
@import './homepage.less';
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
