import Vuex from 'vuex'

export default Vuex.createStore({
  state() {
    return {
      clinic: {
        id: 1,
        name: 'Aclinic',
        serviceIDS: [1, 2, 3],
        specialistIDs: [1, 3, 4, 5],
        workTimeStart: '9:00',
        workTimeEnd: '20:00'
      },
      clinics: [
        {
          id: 1,
          name: '1Aclinic',
          serviceIDS: [1, 2, 3],
          specialistIDs: [1, 3, 4, 5],
          workTimeStart: '9:00',
          workTimeEnd: '20:00'
        },
        {
          id: 2,
          name: '2Aclinic',
          serviceIDS: [1, 2, 3],
          specialistIDs: [1, 3, 4, 5],
          workTimeStart: '9:00',
          workTimeEnd: '20:00'
        },
        {
          id: 3,
          name: '3Aclinic',
          serviceIDS: [1, 2, 3],
          specialistIDs: [1, 3, 4, 5],
          workTimeStart: '9:00',
          workTimeEnd: '20:00'
        },
        {
          id: 4,
          name: '4Aclinic',
          serviceIDS: [1, 2, 3],
          specialistIDs: [1, 3, 4, 5],
          workTimeStart: '9:00',
          workTimeEnd: '20:00'
        },
      ],
      specialists: [{
          id: 1,
          name: 'Иванов Иван Иванович',
          serviceIDs: [1, 2, 3, 4, 5],
          clinicIDs: [2, 4, 7],
          workTime: ['8:00', '8:00', '8:15', '8:30']
        },
        {
          id: 2,
          name: 'Иванов Олег Иванович',
          serviceIDs: [1, 2, 3, 4, 5],
          clinicIDs: [2, 4, 7],
          workTime: ['9:00', '9:00', '9:15', '9:30']
        },
        {
          id: 3,
          name: 'Иванов Николай Иванович',
          serviceIDs: [1, 2, 3, 4, 5],
          clinicIDs: [2, 4, 7],
          workTime: ['8:00', '8:00', '8:15', '8:30']
        },
        {
          id: 4,
          name: 'Иванов Иван Иванович',
          serviceIDs: [1, 2, 3, 4, 5],
          clinicIDs: [2, 4, 7],
          workTime: ['8:00', '8:00', '8:15', '8:30']
        },
        {
          id: 5,
          name: 'Иванов Геннадий Иванович',
          serviceIDs: [1, 2, 3, 4, 5],
          clinicIDs: [2, 4, 7],
          workTime: ['9:00', '9:00', '9:15', '9:30']
        },
        {
          id: 6,
          name: 'Иванов Геннадий Иванович',
          serviceIDs: [1, 2, 3, 4, 5],
          clinicIDs: [2, 4, 7],
          workTime: ['9:00', '9:00', '9:15', '9:30']
        },
        {
          id: 7,
          name: 'Иванов Геннадий Иванович',
          serviceIDs: [1, 2, 3, 4, 5],
          clinicIDs: [2, 4, 7],
          workTime: ['9:00', '9:00', '9:15', '9:30']
        },
        {
          id: 8,
          name: 'Иванов Геннадий Иванович',
          serviceIDs: [1, 2, 3, 4, 5],
          clinicIDs: [2, 4, 7],
          workTime: ['9:00', '9:00', '9:15', '9:30']
        },
        {
          id: 9,
          name: 'Иванов Геннадий Иванович',
          serviceIDs: [1, 2, 3, 4, 5],
          clinicIDs: [2, 4, 7],
          workTime: ['9:00', '9:00', '9:15', '9:30']
        }
      ],
      orderCellPick: {
        specialistTime: null,
        specialistName: null,
        time: null
      },
      workHours: [],

      orders: [
        //demo orders
        {
          orderID: 1,
          specialistID: 1,
          clinicID: 1,
          category:"asd",
          specialistName: 'Иванов Геннадий Иванович',
          owner: 'Геннадий Иванович Попов',
          petType: 'Хомяк',
          orderTime: '18:00',
          orderDate: '08.02.2021',
          ownerPhone: 98098082309,
          serviceName: 'Первичный осмотр',
          serviceInfo: {duration: 99},
          petName: 'хома',
          petAge: '4',
          ownerAddress: 'Тихорецк',
          noteOrder: 'текст заметки',
          serviceCategory: 1,
          colorCell: 'greenyellow',
          isOrdered: true
        },
        {
          orderID: 1,
          specialistID: 5,
          clinicID: 1,
          category:"asd",
          specialistName: 'Иванов Геннадий Иванович',
          owner: 'василий иванович ким',
          petType: 'Собака',
          orderTime: '11:00',
          orderDate: '08.02.2021',
          ownerPhone: 982342309,
          serviceName: 'Стрижка',
          petName: 'Киqweqт',
          serviceInfo: {duration: 67},
          petAge: '4',
          ownerAddress: 'Геленджик',
          noteOrder: 'текст заметки',
          serviceCategory: 1,
          colorCell: 'orange',
          isOrdered: true
        },
        {
          orderID: 1,
          specialistID: 4,
          clinicID: 2,
          category:"asd",
          specialistName: 'Иванов И.И.',
          owner: 'Елена Ивановна',
          petType: 'Кошка',
          orderTime: '9:00',
          orderDate: '08.02.2021',
          ownerPhone: 98098234282309,
          serviceName: 'Стрижка',
          petName: 'Кweqит',
          serviceInfo: {duration: 25},
          petAge: '4',
          ownerAddress: 'Кропоткин',
          noteOrder: 'текст заметки',
          serviceCategory: 1,
          colorCell: 'lightskyblue',
          isOrdered: true
        },
        {
          orderID: 1,
          specialistID: 3,
          clinicID: 1,
          specialistName: 'Рафик',
          owner: 'Альберт',
          petType: 'Кошка',
          orderTime: '14:00',
          orderDate: '08.02.2021',
          ownerPhone: 2342309,
          serviceName: 'Стрижка',
          serviceInfo: {duration: 20},
          petName: 'Кит',
          petAge: '4',
          ownerAddress: 'Краснодар',
          noteOrder: 'текст заметки',
          serviceCategory: 1,
          colorCell: 'plum',
          isOrdered: true
        },
        {
          orderID: 1,
          specialistID: 3,
          clinicID: 1,
          specialistName: 'Рафик',
          owner: 'Альберт',
          petType: 'Кошка',
          orderTime: '10:00',
          orderDate: '08.02.2021',
          ownerPhone: 2342309,
          serviceName: 'Стрижка',
          serviceInfo: {duration: 40},
          petName: 'Кит',
          petAge: '4',
          ownerAddress: 'Краснодар',
          noteOrder: 'текст заметки',
          serviceCategory: 1,
          colorCell: 'plum',
          isOrdered: true
        },
        {
          orderID: 1,
          specialistID: 3,
          clinicID: 1,
          specialistName: 'Рафик',
          owner: 'Альберт',
          petType: 'Кошка',
          orderTime: '12:00',
          orderDate: '08.02.2021',
          ownerPhone: 2342309,
          serviceName: 'Стрижка',
          serviceInfo: {duration: 24},
          petName: 'Кит',
          petAge: '4',
          ownerAddress: 'Краснодар',
          noteOrder: 'текст заметки',
          serviceCategory: 1,
          colorCell: 'plum',
          isOrdered: true
        },
        {
          orderID: 1,
          specialistID: 3,
          clinicID: 1,
          specialistName: 'Рафик',
          owner: 'Альберт',
          petType: 'Кошка',
          orderTime: '12:00',
          orderDate: '09.02.2021',
          ownerPhone: 2342309,
          serviceName: 'Стрижка',
          serviceInfo: {duration: 37},
          petName: 'Кит',
          petAge: '4',
          ownerAddress: 'Краснодар',
          noteOrder: 'текст заметки',
          serviceCategory: 1,
          colorCell: 'plum',
          isOrdered: true
        },
        {
          orderID: 1,
          specialistID: 2,
          clinicID: 4,
          specialistName: 'Рафик',
          owner: 'Альберт',
          petType: 'Кошка',
          orderTime: '14:00',
          orderDate: '09.02.2021',
          ownerPhone: 2342309,
          serviceInfo: {duration: 65},
          serviceName: 'Стрижка',
          petName: 'Кит',
          petAge: '4',
          ownerAddress: 'Краснодар',
          noteOrder: 'текст заметки',
          serviceCategory: 1,
          colorCell: 'plum',
          isOrdered: true
        },
        {
          colorCell: "plum",
          orderTime: "16:45",
          owner: "sadasds",
          ownerPhone: "asdad",
          petType: "Собача",
          serviceCategoryInfo: {id: 1, name: "Амбулаторный прием", color: "plum"},
          serviceID: 4,
          serviceInfo:{id: 4, name: "Повторный прием", duration: 30},
          serviceName: "Повторный прием",
          specialistID: 1,
          specialistName: "Иванов Николай Иванович"
        }
       
      ],

      formEdit: {
        orderID: null,
        specialistID: null,
        specialistName: null,
        owner: null,
        petType: null,
        orderTime: null,
        ownerPhone: null,
        colorCell: null,
        serviceCategoryInfo: null,
        serviceID: null,
        serviceName: null,
        serviceInfo: null,
        petName: null,
        petAge: null,
        ownerAddress: null,
        noteOrder: null,
        isOrdered: true
      },
      // formCopy: 'null',
      // timings: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '14:01', '14:02', '14:03', '14:04', '14:05', '14:06', '14:07', '14:08'],
      timings: [],
      chosenClinic: "",
      selectedService: "",
      serviceCategories: [{
          id: 1,
          name: 'Амбулаторный прием',
          color: 'plum',
          services: [{
              id: 1,
              name: 'Вакцинация',
              duration: 30
            },
            {
              id: 2,
              name: 'Первичный прием',
              duration: 45
            },
            {
              id: 3,
              name: 'Эвтаназия',
              duration: 60
            },
            {
              id: 4,
              name: 'Повторный прием',
              duration: 120
            }
          ]
        },
        {
          id: 2,
          name: 'Хирургичесие операции',
          color: 'lightskyblue',
          services: [{
              id: 5,
              name: 'sad',
              duration: 30
            },
            {
              id: 6,
              name: 'qwe',
              duration: 30
            },
            {
              id: 7,
              name: 'qwewqe',
              duration: 30
            },
            {
              id: 8,
              name: 'qweqweqwe',
              duration: 30
            }
          ]
        },

        {
          id: 3,
          name: 'Забор материала для диагностических исследований',
          services: [{
            id: 9,
            name: 'Забор материала для диагностических исследований',
            duration: 15
          }
        ],
          color: 'orange'
        },
        {
          id: 4,
          name: 'УЗИ, рентген',
          color: 'greenyellow',
          services: [{
              id: 9,
              name: 't1',
              duration: 15
            },
            {
              id: 10,
              name: 't2',
              duration: 45
            }
          ]
        },
        {
          id: 5,
          name: 'Оформление ВСД',
          services: [{
            id: 9,
            name: 'Оформление ВСД',
            duration: 15
          }
        ],
          color: 'lemonchiffon'
        },
      ],
      serviceCategoryColors: [{
          id: 1,
          color: 'plum'
        },
        {
          id: 2,
          color: 'lightskyblue'
        },
        {
          id: 3,
          color: 'orange'
        },
        {
          id: 4,
          color: 'greenyellow'
        },
        {
          id: 5,
          color: 'lemonchiffon'
        },
        {
          id: 6,
          color: 'tomato'
        }
      ],
      animalTypes: [
        {
          id:1,
          name: "Кошка"
        },
        {
          id:2,
          name: "Собака"
        },
        {
          id:3,
          name: "Попугай"
        },
        {
          id:4,
          name: "Крыса"
        },
        {
          id:44,
          name: "Хорек"
        },
        {
          id:5,
          name: "Змея"
        },
        {
          id:6,
          name: "Другое"
        }
      ]
    }
  },
  getters: {
    GET_CATEGORY_COLORS: state => {
      return state.serviceCategoryColors
    },
    SPECIALISTS_RENDER: state => {
      state.specialists.unshift('');
      return state.specialists
    },
    GET_FORM_VALUES: state => {
      return state.formEdit
    },
    GET_ORDER_LIST: state => {
      return state.orders
    },
    GET_CLINICS: state => {
      return state.clinics
    },
    GET_SERVICE_CATEGORIES: state => {
      return state.serviceCategories
    },
    GET_CHOSEN_CLINIC: state => {
      return state.chosenClinic
    },
    GET_ANIMAL_TYPES: state => {
      return state.animalTypes
    },
    GET_SELECTED_SERVICE: state => {
      return state.selectedService
    }
  },
  mutations: {
    SET_ORDER(state, payload) {
      const order = {};
      order.owner = payload.owner;
      order.specialistID = payload.specialistID;
      order.specialistName = payload.specialistName;
      order.petType = payload.petType;
      order.orderTime = payload.orderTime;
      order.orderDate = payload.orderDate;
      order.ownerPhone = payload.ownerPhone;
      order.serviceID = payload.service.id;
      order.serviceName = payload.service.name;
      order.serviceCategoryInfo = payload.category;
      order.serviceInfo = payload.service;
      order.colorCell = payload.category.color;
      order.clinicID = payload.clinicID;
      order.isOrdered = true;
      // order.colorCell = 'orange';
      state.orders.push(order)
    },
    SET_FORM_VALUES(state, payload) {
      state.formEdit.specialistID = payload.specialistID;
      state.formEdit.specialistName = payload.specialistName;
      state.formEdit.orderTime = payload.orderTime;
    },
    UPDATE_FORM_VALUES(state, payload) {
      state.formEdit.owner = payload.owner;
      state.formEdit.ownerPhone = payload.ownerPhone;
      state.formEdit.petType = payload.petType;
      state.formEdit.petAge = payload.petAge;
      state.formEdit.petName = payload.petName;
      state.formEdit.ownerAddress = payload.ownerAddress;
    },
    SET_FORM_COPY(state, payload) {
      state.formCopy = payload;
    },
    UPDATE_OWNER(state, payload) {
      state.formEdit.owner = payload
    },
    UPDATE_PET_TYPE(state, payload) {
      state.formEdit.petType = payload
    },
    UPDATE_OWNER_PHONE(state, payload) {
      state.formEdit.ownerPhone = payload
    },
    UPDATE_SERVICE_CATEGORY_INFO(state, payload) {
      state.formEdit.serviceCategoryInfo = payload;
      // state.formEdit.serviceName = payload.name;
      // state.formEdit.serviceID = payload.id
    },
    UPDATE_SERVICE_INFO(state, payload) {
      state.formEdit.serviceInfo = payload;
      // state.formEdit.serviceName = payload.name;
      // state.formEdit.serviceID = payload.id
    },
    UPDATE_PET_NAME(state, payload) {
      state.formEdit.petName = payload
    },
    UPDATE_PET_AGE(state, payload) {
      state.formEdit.petAge = payload
    },
    UPDATE_OWNER_ADDRESS(state, payload) {
      state.formEdit.ownerAddress = payload
    },
    UPDATE_NOTE_ORDER(state, payload) {
      state.formEdit.noteOrder = payload
    },
    UPDATE_COLOR_CELL(state, payload) {
      state.formEdit.colorCell = payload
    },
    SET_TIMINGS(state, payload) {
      state.timings = payload;
    },
    CHOOSE_CLINIC(state, payload) {
      state.chosenClinic = payload;
    }
    ,
    SET_SELECTED_SERVICE(state, payload) {
      state.selectedService = payload;
    }
  },
  actions: {
    ADD_ORDER(context, payload) {
      context.commit('SET_ORDER', payload);
    },
    ADD_FORM_VALUES(context, payload) {
      context.commit('SET_FORM_VALUES', payload);
    },
    ADD_SELECTED_SERVICE(context, payload) {
      context.commit('SET_SELECTED_SERVICE', payload);
    },

    // ADD_TIMINGS(context, payload) {
    //   context.commit('SET_TIMINGS', payload);
    // }
  }
})