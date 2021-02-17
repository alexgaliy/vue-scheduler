<template>
    <div class="app-table-grid-heading" :style="tableHeadGrid">
        <div class="app-table-grid__item-head" v-for="(specialist,index) in specialistsRender" :key="index">
            {{ specialist.name }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'RenderTableHead',
        methods: {},
        computed: {
            specialistsRender() {
                return this.$store.state.specialists
            },
            tableHeadGrid() {
                return {
                    'grid-template-columns': `30px repeat(${ this.$store.state.specialists.length - 1 }, minmax(120px, 1fr))`
                }
            }
        }
    }
</script>

<style>

</style>