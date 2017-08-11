<template>
    <div>
        <div class="vux-demo">
            <img class="logo" src="../../assets/vux_logo.png">
            <h1>{{msg}}</h1>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: 'test'
        }
    },
    created: function () {
        this.$parent.$emit('radio-msg', 'test')
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
