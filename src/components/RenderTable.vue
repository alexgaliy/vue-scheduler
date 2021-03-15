<template>

  <template  v-if="selectedClinic">
  <div class="date">
    Выбраная дата: <vue-flat-pickr v-model="date" :config="config" placeholder="Выберите дату" />
  </div>
    <div class="table-wrapper">
      <render-table-head />

      <div class="app-table-grid-body" :style="tableBodyGrid">
        <div
          class="app-table-grid__item-contents"
          v-for="(specialist, index) in specialistsRender"
          :key="index"
        >
          <template v-if="index != 0">
            <template v-for="(time, index) in timings" :key="index">
              <div
                class="app-table-grid__item-body"
                @click="getCellData(time, specialist)"
                @mouseover="highlightRow(index)"
                @mouseleave="this.indexCell = null"
                :class="{ hovered: index === this.indexCell }"
              >
                <template v-for="(order, index) in orders" :key="index">
                  <order-cell
                    v-if="specialist.id === order.specialistID && time === order.orderTime && date === order.orderDate && selectedClinic.id === order.clinicID"
                    :order="order"
                    @click.stop="if (order.isOrdered) getOrderData(order);" />
                </template>
              </div>
            </template>
          </template>
          <template v-else>
            <div
              class="app-table-grid__item-body"
              v-for="(time, index) in timings"
              :key="index"
              @mouseover="highlightRow(index)"
              @mouseleave="this.indexCell = null"
              :class="{ hovered: index === this.indexCell }"
            >
              {{ time }}
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="form-row">
      <app-form
        :specialist="selectedSpecialist"
        :time="selectedTime"
        :orderData="clickedOrder"
        :date="date"
      ></app-form>
    </div>
  </template>
  <template v-else><h3 class="choose_clinic_text">Выберите клинику для отображения</h3></template>
</template>
<script>
import AppForm from "./AppForm.vue";
import RenderTableHead from "./RenderTableHead.vue";
import OrderCell from "./OrderCell.vue";
import moment from "moment";
import VueFlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { Russian } from "flatpickr/dist/l10n/ru.js";


export default {
  name: "RenderTable",
  components: {
    AppForm,
    RenderTableHead,
    OrderCell, VueFlatPickr
  },
  data() {
    return {
      // showShowmodal: true,
      clickedOrder: "",
      startTime: "08:00",
      endTime: "20:00",
      indexCell: null,
      selectedTime: "",
      selectedSpecialist: "",
      // date: new Date().toLocaleDateString(),
      date: "08.02.2021",
        // Get more form https://flatpickr.js.org/options/
        config: {
          wrap: false, // set wrap to true only when using 'input-group'
          altFormat: 'j M, Y',
          altInput: true,
          dateFormat: 'd.m.Y',
          // enableTime: true,
          locale: Russian // locale for this instance only          
        },   
    };
  },
  beforeMount() {
    this.renderTimings();
  },
  beforeUpdate() {
    
  },
  updated() {
  },
  methods: {
    getCellData(time, specialist) {
      this.selectedTime = time;
      this.selectedSpecialist = specialist;
      this.clickedOrder = "";
      this.time = this.date + ' ' + time;
      // console.log(this.date)
      // this.$store.dispatch("ADD_FORM_VALUES", {
      //   specialistID: specialist.id,
      //   specialistName: specialist.name,
      //   orderTime: time,
      // });
    this.countAvailableTimeForOrder()
    },
    getOrderData(order) {
      this.clickedOrder = order;
      console.log(this.clickedOrder);
      // this.$store.commit("UPDATE_FORM_VALUES", order);
      // return order;
    },
    highlightRow(index) {
      this.indexCell = index;
    },
    countAvailableTimeForOrder() {
      let allOrders = this.orders;
      let filteredOrders = allOrders.filter((order) => order.specialistID === this.selectedSpecialist.id && order.clinicID === this.selectedClinic.id && order.orderDate === this.date && this.selectedTime < order.orderTime);
      filteredOrders.sort((prev, next) => {
        if (prev.orderTime > next.orderTime) return 1;
        if (prev.orderTime < next.orderTime) return -1;
        return 0;
      }
      );
      let closestOrderTime;
      let manipulationEnding = moment(this.selectedTime, "H:i").add(this.selectedService.duration, "m").format("HH:mm");
        if (filteredOrders.length > 0) {
          closestOrderTime = filteredOrders[0].orderTime;
      // console.log(closestOrderTime)
        } else {
          closestOrderTime = this.endTime;
        }
        // console.log(manipulationEnding)
      if(manipulationEnding < closestOrderTime) {
            // console.log('siska')
      } else {
        // console.log('not siska')
      }
     console.log(closestOrderTime)
    },
    // ordered(order) {
    //   console.log(order);
    //   // if (order.isOrdered) {
    //   //   console.log(order.isOrdered);
    //   // } else {
    //   //   console.log(false);
    //   // }
    // },
    moment,
    renderTimings() {
      let startTime = moment(this.startTime, "H:i");
      let endTime = moment(this.endTime, "H:i");
      let current = new moment(startTime);
      let times = [];
      while (current.isBefore(endTime)) {
        times.push(current.format("HH:mm"));
        current.add(15, "m");
      }
      this.$store.commit("SET_TIMINGS", times);
    },

    // countFreeTime() {
    //   console.log(this.orders)
    //   let manipulationEnd = 12;
    // },
    
    // getColorCell() {},
  },
  computed: {
    specialistsRender() {
      return this.$store.getters.SPECIALISTS_RENDER;
    },
    formValues() {
      return this.$store.getters.GET_FORM_VALUES;
    },
    timings() {
      return this.$store.state.timings;
    },
    selectedClinic() {
      return this.$store.getters.GET_CHOSEN_CLINIC;
    },
    selectedService() { 
      return this.$store.getters.GET_SELECTED_SERVICE;
      },
    //     hoveredRow(order) {

    //      if (
    // }
    //     },

    // isHovered() {
    //   if (this.highlightRow() === 1) {
    //     console.log('siska');
    //     return true
    //     } else {
    //       return false
    //       }
    //     },
    tableBodyGrid() {
      return {
        "grid-template-columns": `30px repeat(${
          this.$store.state.specialists.length - 1
        }, minmax(120px, 1fr))`,
        "grid-template-rows": `repeat(${this.$store.state.timings.length}, 1fr)`,
        "grid-auto-flow": "column",
      };
    },

    orders() {
      return this.$store.getters.GET_ORDER_LIST;
    },
    serviceCategoryColors() {
      return this.$store.getters.GET_CATEGORY_COLORS;
    },
    cellColor() {
      return "background-color: #f7a63e";
    },
  },
};
</script>

<style>
.app-table-grid__item-contents {
  display: contents;
}

.app-table-grid__item-contents .app-table-grid__item-body:hover {
  background-color: gold;
  position: relative;
  /* z-index: 1000; */
}

.app-table-grid__item-body.hovered {
  background-color: lightgray;
  position: relative;
  /* z-index: 1000; */
}

body {
  display: grid;
  justify-content: center;
  align-items: baseline;
  grid-auto-flow: column;
  font-size: 14px;
}

.app-table-grid-heading,
.app-table-grid-body {
  display: grid;
}

.app-table-grid-body {
  border-color: #a9a9a9;
  border-left: 1px solid;
}

.app-table-grid__item-head {
  background-color: #1a1a37;
  color: #fff;
  text-align: center;
  padding: 1px 10px;
  font-size: 10px;
  font-weight: 600;
}

.app-table-grid__item-head:not(:first-child) {
  border-left: 1px solid;
}

.app-table-grid__item-body {
  position: relative;
  background-color: #fff;
  cursor: pointer;
  font-size: 9px;
  height: 15px;
  border-bottom: 1px solid;
  border-right: 1px solid;
  border-color: #a9a9a9;
}

.app-table-grid__item-body .cell {
  padding: 0 4px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  /* height: 29px; */
  min-height: auto;
  z-index: 1000;
  background-color: cyan;
  transition-duration: .2s;
}

.app-table-grid__item-body .cell:hover {
  transition-duration: .2s;
  box-shadow: 0px 0px 9px -3px #000;
}

.pet-owner,
.pet {
  flex-basis: 100%;
}

.pet {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.date {
  margin-bottom: 20px;
}

.choose_clinic_text {
  margin-top: 35vh;
}
</style>

// to remove

<style>
/* !reset styles */

/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Remove default padding */
ul[class],
ol[class] {
  padding: 0;
}

/* Remove default margin */
body,
h1,
h2,
h3,
h4,
p,
ul[class],
ol[class],
li,
figure,
figcaption,
blockquote,
dl,
dd {
  margin: 0;
}

/* Set core body defaults */
body {
  min-height: 100vh;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
}

/* Remove list styles on ul, ol elements with a class attribute */
ul[class],
ol[class] {
  list-style: none;
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Make images easier to work with */
img {
  max-width: 100%;
  display: block;
}

/* Natural flow and rhythm in articles by default */
article > * + * {
  margin-top: 1em;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
}

/* Remove all animations and transitions for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* !reset styles */
</style>
