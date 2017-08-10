<template>
    <div id="app">
        <transition name="move" mode="out-in" appear>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapState({
      isLoading: state => state.appModule.isLoading,
      title: state => state.appModule.title,
      isHomePage: state => state.appModule.isHomePage
    })
  },
  components: {
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './App.less';

</style>
