<template>
  <form class="form" @submit.prevent="addOrder">

    <label for="owner">ФИО владельца</label>
    <input class="form-control" type="text" name="owner" v-model="formValues.owner" />
    <label for="owner">Специалист</label>
    <input class="form-control" type="text" disabled name="specialist" :value="specialist.name" />
    <label for="pet">Вид животного</label>
    <input class="form-control" type="text" name="petType" v-model="formValues.petType" />

    <label for="time">Время начала</label>
    <input class="form-control" type="text" disabled name="time" :value="time" />
    <input class="form-control" type="text" disabled name="date" :value="date" />

    <label for="ownerPhone">Телефон</label>
    <!-- <input class="form-control" type="text" name="ownerPhone" placeholder="+7 (999) 999-9999"
                  
                    v-model="formValues.ownerPhone" /> -->
<input class="form-control"
        type="tel" 
        v-model="formValues.ownerPhone"
        name="phone"
        id="phone"
        placeholder="8 (555) 555-5555"

        maxlength="14"
        v-phone
        pattern="[+7|8]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{4}"
        required
      />

    <label for="serviceCategory">Категория</label>
    <select name="serviceCategory" class="form-control" v-model="selectedCategory" @change="clearChosenService">
      <option v-for="category in serviceCategories" :key="category.id" :value="category">
        {{ category.name }}
      </option>
    </select>
    <template v-if="checkIsCategoryValid()">
      <label for="service">Услуга</label>
      <select name="service" class="form-control" v-model="selectedService">
        <option value="" disabled hidden>Выберите услугу</option>
        <option
          v-for="service in selectedCategory.services"
          :key="service.id"
          :value="service"
        >
          {{ service.name }}
        </option>
      </select>
      {{selectedService}}
    </template>
    <!-- <select
      name="serviceCategory"
      v-model="serviceCategoryInfo"
      @change="resetServiceSelect"
    >
      <template v-if="serviceCategoryInfo === null">
        <option :value="serviceCategoryInfo">{{ serviceCategoryInfo }}</option>
      </template>
      <template v-else />
      <option v-for="category in serviceCategories" :value="category" :key="category.id">
        {{ category.name }}
      </option>
    </select>

    <select name="service" v-model="serviceInfo" v-if="serviceCategoryInfo">
      <template v-if="serviceInfo === null">
        <option :value="serviceInfo">{{ serviceInfo }}</option>
      </template>
      <template v-else />
      <option
        v-for="service in serviceCategoryInfo.services"
        :value="service"
        :key="service.id"
      >
        {{ service.name }}
      </option>
    </select> -->
    <label for="petname">Кличка</label>
    <input class="form-control" type="text" name="petName" v-model="formValues.petName" />

    <label for="petage">Возраст</label>
    <input class="form-control" type="text" name="petAge" v-model="formValues.petAge" />

    <label for="address">Адрес</label>
    <input class="form-control" type="text" name="ownerAddress" v-model="formValues.ownerAddress" />

    <label for="note">Примечание</label>
    <input class="form-control" type="text" name="noteOrder" v-model="formValues.noteOrder" />
    <input class="form-control" hidden type="text" v-model="formValues.clinicID" />
    

    <input class="btn btn-success mb-2" type="submit" value="Записать" />
    <div class="copyPaste">
      <button class="btn btn-primary" @click.prevent="copyForm">Копировать</button>
      <button class="btn btn-secondary" @click.prevent="pasteForm">Вставить</button>
      <button class="btn btn-danger" @click.prevent="pasteOrderInfo">Очистить форму</button>
    </div>
  </form>
  <!-- <p v-if="selectedCategory">{{ selectedCategory }} {{ selectedService }}</p> -->
  <!-- {{ checkIsCategoryValid() }} -->
</template>

<script>
// import { MDBInput } from 'mdb-vue-ui-kit';
export default {
  name: "AppForm",
  props: ["time", "specialist", "orderData", "date"],
  components: {
    //  MDBInput
  },
  data() {
    return {
      copiedData: "",
      selectedCategory: null,
      selectedService: "",
      formValues: {
        owner: this.owner,
        orderTime: "",
        specialistName: "",
        ownerPhone: this.ownerPhone,
        ownerAddress: this.ownerAddress,
        petType: this.petType,
        petName: this.petName,
        orderDate: this.orderDate,
        petAge: this.petAge,
        noteOrder: this.noteOrder,
        specialistID: "",
        category: "",
        service: "",
        clinicID: ""
      },
    };
  },
  mounted() {
    if (this.selectedCategory === null) {
      this.selectedCategory = this.defaultCategory;
      this.selectedService = this.defaultCategory.services[3];
    }
    this.checkIsCategoryValid();
  },
  updated() {
    this.formValues.orderTime = this.time;
    this.formValues.orderDate = this.date;
    this.formValues.specialistID = this.specialist.id,
    this.formValues.specialistName = this.specialist.name,
    this.formValues.category = this.selectedCategory;
    this.formValues.service = this.selectedService;
    this.formValues.clinicID = this.chosenClinic.id
    // console.log(this.chosenClinic.id)
    // if (this.selectedCategory.services) {
    //   this.formValues.service = this.selectedService;
    // } else {
    //   this.formValues.service = null;
    // }
    // console.log(this.formValues);
    
  },
  methods: {
    pasteOrderInfo() {
      this.formValues.owner = this.orderData.owner;
    },
    checkIsCategoryValid() {
      if (this.selectedCategory != null && this.selectedCategory.services != null) {
        return true;
      }
    },
    clearChosenService() {
      console.log(this.selectedService)

      this.selectedService = "";
            console.log(this.selectedService)

    },
    // resetServiceSelect() {
    //   this.serviceInfo = null;
    //   this.$store.commit("UPDATE_SERVICE_INFO", "");
    //   console.log(this.serviceInfo);
    // },
    addOrder() {
      this.$store.dispatch("ADD_ORDER", this.formValues);
      console.log(this.$store.state.orders);
    },
    copyForm() {
      this.copiedData = {
        owner: this.formValues.owner,
        ownerPhone: this.formValues.ownerPhone,
        ownerAddress: this.formValues.ownerAddress,
        petType: this.formValues.petType,
        petName: this.formValues.petName,
        petAge: this.formValues.petAge,
        noteOrder: this.formValues.noteOrder,
      };
    },
    pasteForm() {
      this.formValues.owner = this.copiedData.owner;
      this.formValues.ownerPhone = this.copiedData.ownerPhone;
      this.formValues.ownerAddress = this.copiedData.ownerAddress;
      this.formValues.petType = this.copiedData.petType;
      this.formValues.petName = this.copiedData.petName;
      this.formValues.petAge = this.copiedData.petAge;
      this.formValues.noteOrder = this.copiedData.noteOrder;
      document.querySelector('#phone').focus();
      // console.log(this.formValues);
    },
  },
  computed: {
    // formValues() {
    //   return this.$store.getters.GET_FORM_VALUES;
    // },
    // owner: {
    //   get() {
    //     return this.$store.state.formEdit.owner;
    //   },
    //   set(value) {
    //     this.$store.commit("UPDATE_OWNER", value);
    //   },
    // },
    // petType: {
    //   get() {
    //     return this.$store.state.formEdit.petType;
    //   },
    //   set(value) {
    //     this.$store.commit("UPDATE_PET_TYPE", value);
    //   },
    // },
    // ownerPhone: {
    //   get() {
    //     return this.$store.state.formEdit.ownerPhone;
    //   },
    //   set(value) {
    //     this.$store.commit("UPDATE_OWNER_PHONE", value);
    //   },
    // },
    serviceCategories() {
      return this.$store.getters.GET_SERVICE_CATEGORIES;
    },
    chosenClinic() {
      return this.$store.getters.GET_CHOSEN_CLINIC;
    },
    // serviceCategoryInfo: {
    //   get() {
    //     return this.$store.state.formEdit.serviceCategoryInfo;
    //   },
    //   set(value) {
    //     this.$store.commit("UPDATE_SERVICE_CATEGORY_INFO", value);
    //   },
    // },
    // serviceInfo: {
    //   get() {
    //     return this.$store.state.formEdit.serviceInfo;
    //   },
    //   set(value) {
    //     this.$store.commit("UPDATE_SERVICE_INFO", value);
    //     // {
    //     //   serviceName: value.serviceName,
    //     //   serviceID: value.serviceID,
    //     //   colorCell: value.colorCell,
    //     // });
    //   },
    // },
    defaultCategory() {
      return this.$store.getters.GET_SERVICE_CATEGORIES[0];
    },
    // petName: {
    //   get() {
    //     return this.$store.state.formEdit.petName;
    //   },
    //   set(value) {
    //     this.$store.commit("UPDATE_PET_NAME", value);
    //   },
    // },
    // petAge: {
    //   get() {
    //     return this.$store.state.formEdit.petAge;
    //   },
    //   set(value) {
    //     this.$store.commit("UPDATE_PET_AGE", value);
    //   },
    // },
    // colorCell: {
    //   get() {
    //     return this.$store.state.formEdit.colorCell;
    //   },
    //   set(value) {
    //     this.$store.commit("UPDATE_COLOR_CELL", value);
    //   },
    // },
    // ownerAddress: {
    //   get() {
    //     return this.$store.state.formEdit.ownerAddress;
    //   },
    //   set(value) {
    //     this.$store.commit("UPDATE_OWNER_ADDRESS", value);
    //   },
    // },
    // noteOrder: {
    //   get() {
    //     return this.$store.state.formEdit.noteOrder;
    //   },
    //   set(value) {
    //     this.$store.commit("UPDATE_NOTE_ORDER", value);
    //   },
    // },
  },
};
</script>

<style>
.form {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin-top: 20px;
}

.form input {
  margin-bottom: 10px;
}

.form button {
  max-width: fit-content;
}

.copyPaste {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>
