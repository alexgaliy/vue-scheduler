<template>
  <form class="form" @submit.prevent="addOrder">
    <label for="owner">ФИО владельца</label>
    <input type="text" name="owner" @blur="updateInputValue" v-model="owner" />

    <label for="owner">Специалист</label>
    <input type="text" disabled name="specialist" :value="formValues.specialistName" />

    <label for="pet">Вид животного</label>
    <input type="text" name="petType" v-model="petType" />

    <label for="time">Время начала</label>
    <input type="text" disabled name="orderTime" :value="formValues.orderTime" />

    <label for="owner">Телефон</label>
    <input type="text" name="ownerPhone" v-model="ownerPhone" />

    <label for="serviceCategory">Категория</label>

    <select
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
    <label for="service">Услуга</label>

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
    </select>
    <label for="petname">Кличка</label>
    <input type="text" name="petName" v-model="petName" />

    <label for="petage">Возраст</label>
    <input type="text" name="petAge" v-model="petAge" />

    <label for="address">Адрес</label>
    <input type="text" name="ownerAddress" v-model="ownerAddress" />

    <label for="note">Примечание</label>
    <input type="text" name="noteOrder" v-model="noteOrder" />

    <input type="submit" value="Записать" />
    <div class="copyPaste">
      <button @click.prevent="copyForm">Копировать</button>
      <button @click.prevent="pasteForm">Вставить</button>
    </div>
    <p>{{ $store.state.formCopy }}</p>
  </form>
</template>

<script>
export default {
  name: "AppForm",
  props: ["time", "specialist"],
  data() {
    return {
      copiedData: "",
    };
  },
  mounted() {
    if (this.serviceCategoryInfo === null) {
      this.serviceCategoryInfo = this.defaultCategory;
      return this.serviceCategoryInfo;
    }
  },
  beforeUpdate() {
    if (this.serviceInfo === null) {
      this.serviceInfo = this.defaultCategory.services[3];
      return this.serviceInfo;
    }
  },
  methods: {
    resetServiceSelect() {
      this.serviceInfo = null;
      this.$store.commit("UPDATE_SERVICE_INFO", "");
      console.log(this.serviceInfo);
      // return this.serviceInfo;
    },
    addOrder() {
      this.$store.dispatch("ADD_ORDER", this.formValues);
      console.log(this.$store.state.orders);
    },
    copyForm() {
      this.copiedData = this.formValues;
      // return this.copiedData;
      this.$store.commit("SET_FORM_COPY", this.copiedData);
    },
    pasteForm() {
      this.$store.commit("SET_FORM_COPY", this.copiedData);
      // console.log(this.formValues);
      // this.formValues = this.copiedData;
    },
  },
  computed: {
    formValues() {
      return this.$store.getters.GET_FORM_VALUES;
    },
    owner: {
      get() {
        return this.$store.state.formEdit.owner;
      },
      set(value) {
        this.$store.commit("UPDATE_OWNER", value);
      },
    },
    petType: {
      get() {
        return this.$store.state.formEdit.petType;
      },
      set(value) {
        this.$store.commit("UPDATE_PET_TYPE", value);
      },
    },
    ownerPhone: {
      get() {
        return this.$store.state.formEdit.ownerPhone;
      },
      set(value) {
        this.$store.commit("UPDATE_OWNER_PHONE", value);
      },
    },

    serviceCategories() {
      return this.$store.getters.GET_SERVICE_CATEGORIES;
    },

    serviceCategoryInfo: {
      get() {
        return this.$store.state.formEdit.serviceCategoryInfo;
      },
      set(value) {
        this.$store.commit("UPDATE_SERVICE_CATEGORY_INFO", value);
      },
    },

    serviceInfo: {
      get() {
        return this.$store.state.formEdit.serviceInfo;
      },
      set(value) {
        this.$store.commit("UPDATE_SERVICE_INFO", value);
        // {
        //   serviceName: value.serviceName,
        //   serviceID: value.serviceID,
        //   colorCell: value.colorCell,
        // });
      },
    },
    defaultCategory() {
      return this.$store.getters.GET_SERVICE_CATEGORIES[0];
    },
    petName: {
      get() {
        return this.$store.state.formEdit.petName;
      },
      set(value) {
        this.$store.commit("UPDATE_PET_NAME", value);
      },
    },
    petAge: {
      get() {
        return this.$store.state.formEdit.petAge;
      },
      set(value) {
        this.$store.commit("UPDATE_PET_AGE", value);
      },
    },

    colorCell: {
      get() {
        return this.$store.state.formEdit.colorCell;
      },
      set(value) {
        this.$store.commit("UPDATE_COLOR_CELL", value);
      },
    },

    ownerAddress: {
      get() {
        return this.$store.state.formEdit.ownerAddress;
      },
      set(value) {
        this.$store.commit("UPDATE_OWNER_ADDRESS", value);
      },
    },
    noteOrder: {
      get() {
        return this.$store.state.formEdit.noteOrder;
      },
      set(value) {
        this.$store.commit("UPDATE_NOTE_ORDER", value);
      },
    },
  },
};
</script>

<style>
.form {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}

.form input {
  margin-bottom: 10px;
}

.form button {
  max-width: fit-content;
}

.copyPaste {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}
</style>
