<template>
<clinic-choice />
<render-table />
</template>

<script>
import RenderTable from "./components/RenderTable.vue";
import ClinicChoice from "./components/ClinicChoice.vue";

export default {
  name: "App",
  components: {
    RenderTable, ClinicChoice
  },
  data() {
  return {
    // selectedClinic: ''
  }
},
};

</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
/* @import '~mdb-ui-kit/css/mdb.min.css'; */
body {
  font-family: "Roboto", sans-serif;
}

#app {
  min-height: 100vh;
}
</style>
