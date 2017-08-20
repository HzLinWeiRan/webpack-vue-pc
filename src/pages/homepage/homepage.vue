<template>
    <div>
        <div class="vux-demo" v-if="$route.path === '/h'">
            <img class="logo" src="../../assets/vux_logo.png">
            <h1>{{msg}}</h1>
           <input v-model="text" v-validate="'required'" name="name" data-vv-as="测试" type="text">
           <button @click="subAction">ceshi</button>
        </div>
        <router-view v-if="$route.path === '/h/test1'"></router-view>
    </div>
    
</template>


<script>
export default {
    data() {
        return {
            msg: 'test',
            text: ''
        }
    },
    created: function () {
        console.log(this.$route)
        this.$parent.$emit('radio-msg', 'test')
    },
    methods: {
        subAction() {
            this.$validator.validateAll().then((result) => {
                console.log(this.errors.all())
                console.log(this.errors.first('name'))
            })
        }
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
