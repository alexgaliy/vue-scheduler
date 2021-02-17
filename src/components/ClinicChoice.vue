<template>
   <select name="selectClinic" v-model="selectedClinic" class="form-control clinic-select" @change="chooseClinic(selectedClinic)">
       <option value="" disabled hidden class="form-control">Выберите клинику</option>
       <option v-for="clinic in clinics" :key="clinic.id" :value="clinic" placeholder="sad">
   {{ clinic.name }}
       </option>
   </select>
</template>

<script>
export default {
    data() {
        return {
            selectedClinic: ""
        }
    },
    methods:{
        chooseClinic(payload) {
            this.$store.commit("CHOOSE_CLINIC", payload);
        }
    },
    computed: {
        clinics() {
            return this.$store.getters.GET_CLINICS;
        },
       
    }
}
</script>

<style>
.clinic-select {
    margin-top: 20px;
}
</style>