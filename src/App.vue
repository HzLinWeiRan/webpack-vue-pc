<template>
    <div id="app">
        <el-radio-group v-model="radio" @change="change">
            <el-radio class="radio" label="1">{{msg}}</el-radio>
            <el-radio class="radio" label="2">{{msg}}</el-radio>
        </el-radio-group>
        <router-view></router-view>
        <!-- <transition name="move" mode="out-in" appear>
            <keep-alive>
            </keep-alive>
        </transition> -->
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { radio, radioGroup, messageBox } from 'element-ui'

export default {
    mounted() {
        this.$on('radio-msg', function(msg) {
            this.msg = msg
        })
    },
    created() {
        const action = 'test'
        messageBox({
            type: 'info',
            message: `action: ${action}`
        })
    },
    data() {
        return {
            radio: '1',
            msg: '首页'
        }
    },
    name: 'app',
    computed: {
        ...mapState({
            // radio: state => state.radio
        })
    },
    components: {
        elRadio: radio,
        elRadioGroup: radioGroup
    },
    methods: {
        change(val) {
            console.log(val)
        }
    }

}
</script>

<style lang="less">
@import './App.less';
</style>
