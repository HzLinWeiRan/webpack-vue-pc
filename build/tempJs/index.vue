<template>
    <div class="{{name}}">
        page {{fileName}}
    </div>
</template>

<script>
export default {
    name: 'hello',
    components: {
    },
    methods: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '{{name}}.less';
</style>