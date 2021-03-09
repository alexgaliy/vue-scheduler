<template>
  <div class="cell" :style="{ backgroundColor: order.colorCell, height: cellHeight }">
    <p class="pet-owner">{{ order.owner }}</p>
    <div class="pet">
      <p class="manipulation">{{ order.serviceName }}</p>
      <p class="pet-type">{{ order.petType }}</p>
    </div>
  </div>

</template>

<script>
export default {
  name: "OrderCell",
  props: ["order"],
  methods: {
   
  },
  data() {
    return {
      cellHeight: this.order.serviceInfo.duration - 1 + "px"
    }
  },
};
</script>

<style>
.pet-owner,
.pet {
  flex-basis: 100%;
}

.pet {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
