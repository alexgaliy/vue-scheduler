<template>
  <form class="form" @submit.prevent="!orderData.isOrdered ? addOrder() : ''">
    <label for="owner">ФИО владельца</label>
    <input class="form-control" type="text" name="owner" v-model="formValues.owner" />
    <label for="owner">Специалист</label>
    <input class="form-control" type="text" disabled name="specialist" :value="specialist.name" />
    <label for="pet">Вид животного</label>
    <select name="petType" class="form-control" v-model="formValues.petType">
      <option value="" disabled hidden>Выберите вид животного</option>
      <option v-for="animalType in animalTypes" :key="animalType.id" :value="animalType">
        {{ animalType.name }}
      </option>
    </select>
    <label for="time">Время начала</label>
    <input class="form-control" type="text" disabled name="time" :value="time" />
    <input class="form-control" type="text" disabled name="date" :value="date" />
    <label for="ownerPhone">Телефон</label>
    <input class="form-control" type="tel" v-model="formValues.ownerPhone" name="phone" id="phone"
      placeholder="8 (555) 555-5555" maxlength="14" v-phone pattern="[+7|8]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{4}" />

    <label for="serviceCategory">Категория</label>
    <select name="serviceCategory" class="form-control" v-model="selectedCategory" @change="clearChosenService">
      <option v-for="category in serviceCategories" :key="category.id" :value="category">
        {{ category.name }}
      </option>
    </select>
    <template v-if="checkIsCategoryValid()">
      <label for="service">Услуга</label>
      <select name="service" class="form-control" v-model="selectedService" @change="addSelectedService">
        <option value="" disabled hidden>Выберите услугу</option>
        <option v-for="service in selectedCategory.services" :key="service.id" :value="service">
          {{ service.name }}
        </option>
      </select>
    </template>
    <label for="petname">Кличка</label>
    <input class="form-control" type="text" name="petName" v-model="formValues.petName" />

    <label for="petage">Возраст</label>
    <input class="form-control" type="text" name="petAge" v-model="formValues.petAge" />

    <label for="address">Адрес</label>
    <input class="form-control" type="text" name="ownerAddress" v-model="formValues.ownerAddress" />

    <label for="note">Примечание</label>
    <input class="form-control" type="text" name="noteOrder" v-model="formValues.noteOrder" />
    <input class="form-control" hidden type="text" v-model="formValues.clinicID" />
    <div class="alert alert-danger" role="alert">тестовое сообщение</div>
    <button class="btn btn-success mb-2" type="submit">{{ orderData.isOrdered ? "Редактировать" : "Записать" }}</button>
    <div class="copyPaste">
      <button class="btn btn-primary" @click.prevent="copyForm">Копировать</button>
      <button class="btn btn-secondary" @click.prevent="pasteForm">Вставить</button>
      <button class="btn btn-danger" @click.prevent="pasteOrderInfo">Очистить форму</button>
    </div>
  </form>
</template>

<script>
  export default {
    name: "AppForm",
    props: ["time", "specialist", "orderData", "date"],
    data() {
      return {
        copiedData: "",
        selectedCategory: null,
        selectedService: "",
        formValues: {
          owner: "",
          orderTime: "",
          specialistName: "",
          ownerPhone: "",
          ownerAddress: "",
          petType: "",
          petName: "",
          orderDate: "",
          petAge: "",
          noteOrder: "",
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
      this.addSelectedService()
    },
    updated() {
      this.formValues.orderTime = this.time;
      this.formValues.orderDate = this.date;
      this.formValues.specialistID = this.specialist.id,
        this.formValues.specialistName = this.specialist.name,
        this.formValues.category = this.selectedCategory;
      this.formValues.service = this.selectedService;
      this.formValues.clinicID = this.chosenClinic.id;
      if (this.orderData) {
        this.formValues.owner = this.orderData.owner;
        this.formValues.petName = this.orderData.petName;
        this.formValues.specialistID = this.orderData.specialistID;
        this.formValues.specialistName = this.orderData.specialistName;
        this.formValues.category = this.orderData.serviceCategoryInfo;
      }
    },
    methods: {

      pasteOrderInfo() {
      },
      checkIsCategoryValid() {
        if (this.selectedCategory != null && this.selectedCategory.services != null) {
          return true;
        }
      },
      clearChosenService() {
        this.selectedService = "";
      },
      addOrder() {
        this.$store.dispatch("ADD_ORDER", this.formValues);
        console.log(this.$store.state.orders);
      },
      addSelectedService() {
        this.$store.dispatch("ADD_SELECTED_SERVICE", this.selectedService);
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
      },
    },
    computed: {
      serviceCategories() {
        return this.$store.getters.GET_SERVICE_CATEGORIES;
      },
      chosenClinic() {
        return this.$store.getters.GET_CHOSEN_CLINIC;
      },
      animalTypes() {
        return this.$store.getters.GET_ANIMAL_TYPES;
      },
      defaultCategory() {
        return this.$store.getters.GET_SERVICE_CATEGORIES[0];
      },
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