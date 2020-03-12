var util = {

  isTheProperty: function (object, nameProperty) {
    return (object.hasOwnProperty(nameProperty));
  },
  createVueFrom: function (object) {
    return new Vue({
      el: object.el,
      data:object.model,
      methods: util.isTheProperty(object, 'methods') ? object.methods :null,
      components:util.isTheProperty(object, 'components') ? object.components :null
    })
  },

  dinamicIdFrom: function (formId) {
    var $inputs = jQuery("#" + formId + " .form-control")
    for (var i = 0; i < $inputs.length; i++) {
      $inputs[i].setAttribute('id', formId + '_' + $inputs[i].name);
    }
  },
  clenFrom: function (object) {
    for (var key in object) {
      if (utilString.validateString(object[key])) {
        object[key] = '';
      } else { object[key] = 0; }
    }
  },

  validateNullOrEmpty: function (val) {
    if (typeof val == 'string') {
      return (val !== "") ? true : false;
    } else if (typeof val == 'object') {
      return Array.isArray(val);
    } else {
      return false;
    }
  },
  updateFrom: function (vuFrom, object) {
    for (var key in object) {
      //key = modsJS.convertColumns( key.toLocaleLowerCase() );
      if (vuFrom.hasOwnProperty(key)) {
        if (key.split('fecha').length > 1) {
          vuFrom[key] = moment(new Date(object[key])).format("YYYY-MM-DD");
        } else {
          vuFrom[key] = object[key];
        }
      }
    }
  },

  validateUnderScript: function (string) {
    return string.split('_').length > 1 ? true : false;
  },

  convertColumns: function (column) {
    if (util.validateUnderScript(column)) {
      const arr = column.split('_');
      return column = arr[0] + util.getFirstCapitalLetter(arr[1]);
    } else { return column; }
  },

  getFirstCapitalLetter: function (letter) {
    const arr = letter.split('');
    var string = "";
    for (var i = 0; i < arr.length; i++) {
      string += (i === 0) ? arr[i].toLocaleUpperCase() : arr[i];
    }
    return string;
  },

  validateForm:function(form, property){
    var $elements = jQuery("#"+form +" .form-control");
        const entity = {};
        const inputsErr = [];
        var result = null;
        for (var i = 0; i < $elements.length; i++) {
            if ($elements[i].hasAttribute('required')) {
                if (util.validateNullOrEmpty((jQuery($elements[i]).val()=="0")?"":jQuery($elements[i]).val())) {
                    if ($elements[i].hasAttribute('pattern')) {
                        var reg = RegExp($elements[i].pattern);
                        if(jQuery($elements[i]).hasClass("isNumber")){
                          result= reg.test(parseInt($elements[i].value));
                          //result= $elements[i].value.match($elements[i].pattern);
                        }else{
                          //result= reg.test($elements[i].value);
                          result= $elements[i].value.match($elements[i].pattern);
                        }
                        
                        
                        if (result !==null) {
                            entity[$elements[i].name] = jQuery($elements[i]).val();
                        } else {
                            inputsErr.push({
                                pattern: true,
                                title: "Información proporcionada no valida: "+property[$elements[i].getAttribute('data-original-name')],
                                name: property[$elements[i].getAttribute('data-original-name')]
                            });
                        }
                    } else {
                        entity[$elements[i].name] = jQuery($elements[i]).val();
                    }

                    if($elements[i].hasAttribute('maxLength')){
                        if(jQuery($elements[i]).val().length > $elements[i].maxLength){
                          inputsErr.push({
                            pattern:false,
                            title:'',
                            name:mesages.msg_lon_M.replace("${text}",property[$elements[i].getAttribute('data-original-name')]).replace("${number}",$elements[i].maxLength)
                          })
                        }
                    }
                } else {
                    inputsErr.push({
                        pattern: false,
                        title: $elements[i].getAttribute('data-original-title'),
                        name: property[$elements[i].getAttribute('data-original-name')]
                    });
                }
            } else {
                entity[$elements[i].name] = jQuery($elements[i]).val();
            }
        }

        if (inputsErr.length > 0) {
            var text = "Revise los siguientes campos del formulario :<br>";
            var cant = inputsErr.length - 1;
            for (i = 0; i < inputsErr.length; i++) {
                text += (i < cant) ? inputsErr[i].title + "<br>" : inputsErr[i].title ;
            }
            message.showMessage('!Formulario No valido!',text,'error');
            return {validate:false};
        } else {
            return {validate:true, entity};
        }
  },

  messageError:function(title,text){
    swal({
      title: title,
      text: text,
      type: "warning",
      showCancelButton: false,
      confirmButtonColor: "#5cb85c",
      confirmButtonText: "OK",
      animation: "slide-from-top",
      closeOnConfirm: false
  }, function () {

      jQuery(".cancel").click();
  });
  },
  getDaysMonth:function(mes,ayo){
    return new Date(ayo, mes, 0).getDate();
  },

  formatDateInput:function(d,s){
    //año-mes-dia
    var m = d.getMonth()+1;
    var da = d.getDate();
    m = (m>=10) ? m : "0"+m;
    da = (da>=10) ? da:"0"+da;
    return (d.getFullYear()+s+m+s+da);
  },

  soloNumeros:function(element){
    element.value = element.value.replace(/[^0-9]/g,'');
  }


};

var utilGrid = {

  propsDefault: {
    heroes: Array,
    columns: Array,
    filterKey: String
  },

  dataDefault: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  component: {
    setOrder: function () {
      var sortOrders = {}
      this.columns.forEach(function (key) {
        if (key !== "") {
          sortOrders[key] = 1
        }
      })
      return {
        sortKey: '',
        sortOrders: sortOrders
      }
    }
  },

  computed: {
    filteredHeroes: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var heroes = this.heroes
      if (filterKey) {
        heroes = heroes.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        heroes = heroes.slice().sort(function (a, b) {
          a = a[sortKey.column]
          b = b[sortKey.column]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return heroes
    }
  },

  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  },

  createGrid: function (object) {
    Vue.component('demo-grid', object.component)
    var demo = new Vue({
      el: object.element,
      data: {
        searchQuery: '',
        gridColumns: object.columns,
        gridData: object.data
      }
    });

    return demo;
  },
  findGridObject:function(card,property,value){
    const rows = card._data.cardData;
    for(var i=0;i<rows.length;i++){
        if(rows[i][property] ==value){
            return rows[i];
        }
    }
 }
};


var utilCard = {
  propsDefault: {
    heroes: Array,
    columns: Array,
    filterKey: String
  },
  dataDefault: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  computed: {
  filteredHeroes: function () {
    var sortKey = this.sortKey
    var filterKey = this.filterKey && this.filterKey.toLowerCase()
    var order = this.sortOrders[sortKey] || 1
    var heroes = this.heroes;
    if (filterKey) {
      heroes = heroes.filter(function (row) {
        return Object.keys(row).some(function (key) {
          return String(row[key]).toLowerCase().indexOf(filterKey) > -1
        })
      })
    }
    if (sortKey) {
      heroes = heroes.slice().sort(function (a, b) {
        a = a[sortKey.name]
        b = b[sortKey.name]
        return (a === b ? 0 : a > b ? 1 : -1) * order
      })
    }
    return heroes
  }
},
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
  },
  component: {
    setOrder: function () {
      var sortOrders = {}
      this.columns.forEach(function (key) {
        if (key !== "") {
          sortOrders[key] = 1
        }
      })
      return {
        sortKey: '',
        sortOrders: sortOrders
      }
    }
  },
  createCard: function (object) {
    Vue.component('demo-card', object.component);
    var demo = new Vue({
      el: object.element,
      data: {
        searchQuery: '',
        cardColumns: object.columns,
        cardData: object.data
      }
    });

    return demo;
  },
  findCardObject:function(card,property,value){
    const rows = card._data.cardData;
    for(var i=0;i<rows.length;i++){
        if(rows[i][property] ==value){
            return rows[i];
        }
    }
 }
};



////////////////////777

var utilArticle = {
  propsDefault: {
    heroes: Array,
    columns: Array
  },
  dataDefault: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key.column] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  computed: {
  filteredHeroes: function () {
    var sortKey = this.sortKey
    var filterKey = this.filterKey && this.filterKey.toLowerCase()
    var order = this.sortOrders[sortKey] || 1
    var heroes = this.heroes;
    if (filterKey) {
      heroes = heroes.filter(function (row) {
        return Object.keys(row).some(function (key) {
          return String(row[key]).toLowerCase().indexOf(filterKey) > -1
        })
      })
    }
    if (sortKey) {
      heroes = heroes.slice().sort(function (a, b) {
        a = a[sortKey.column]
        b = b[sortKey.column]
        return (a === b ? 0 : a > b ? 1 : -1) * order
      })
    }
    return heroes
  }
},
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key.column] = this.sortOrders[key.column] * -1
    },
  },
  component: {
    setOrder: function () {
      var sortOrders = {}
      this.columns.forEach(function (key) {
        if (key !== "") {
          sortOrders[key.column] = 1
        }
      })
      return {
        sortKey: '',
        sortOrders: sortOrders
      }
    }
  },
  createArticle: function (object) {
    Vue.component('demo-article', object.component);
    var demo = new Vue({
      el: object.element,
      data: {
        articleColumns: object.columns,
        articleData: object.data
      }
    });

    return demo;
  },
  findArticlebject:function(article,property,value){
    const rows = article._data.articleData;
    for(var i=0;i<rows.length;i++){
        if(rows[i][property] ==value){
            return rows[i];
        }
    }
 }
};

var utilString = {
  validateString: function (obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
  }
};

const message ={
    showMessage:function(title,text,icon){
        swal.fire({
            title,
            html:text,
            icon
        })
    }
}

const utilXHTTP={
    url:'/vipermedix/',
    status:{
        OK:200
    },
    get:async function(action){
        return new Promise((resolve, reject) => {
            $.get(utilXHTTP.url+action,function(data,status){
                if(data.status==utilXHTTP.status.OK){
                    resolve({result:true,data});
                }else{
                    resolve({result:false,data:[]});
                }
            })
        });
    },
    post:async function(action,data){
      return new Promise((resolve,reject)=>{
        $.post((utilXHTTP.url+action),data,function(data,status){
          if(data.status==utilXHTTP.status.OK){
            console.log(data);
            resolve(data);
          }
        });
      });
    }
}