//const { getProduct } = require("../../../controllers/product");

const app = new Vue({
    el: "#app",
    data: {
        //Array de articulos que parseamos desde el fichero json
        articulos: [],
        toProduce: [],
        //Array del fetch de json de empresas
        facturas: [],

        //Objeto que guarda la empresa que esta selecionada en el select
        selectedFactura: {
            id: '',
            nombre: '',
            serie: '',
            tipo: '',
            centro: '',
            numero: ''
        },

        //Atributos de los aticulos
        fondos: [],
        laterales: [],
        tapas: [],

    },
    /*Metodos que se ejecutan al iniciar la pagina*/
    created() {
        this.getFacturas();
        console.log(this.facturas[0]);
        setTimeout(() => {
            this.setDefault(this.facturas[0])
        }, 500);

    },
    methods: {
        comprobar: function (index, a) {
            if (this.fondos[index] === true && this.laterales[index] === true && this.tapas[index] === true) {
                this.sendProduction(index, a);
                return true;
            } else if (this.fondos[index] === '' && this.laterales[index] === '' && this.tapas[index] === true) {
                this.sendProduction(index, a);
                return true;
            } else if (this.fondos[index] === true && this.laterales[index] === '' && this.tapas[index] === '') {
                this.sendProduction(index, a);
                return true;
            } else if (this.fondos[index] === '' && this.laterales[index] === true && this.tapas[index] === '') {
                this.sendProduction(index, a);
                return true;
            } else if (this.fondos[index] === true && this.laterales[index] === '' && this.tapas[index] === true) {
                this.sendProduction(index, a);
                return true;
            } else if (this.fondos[index] === '' && this.laterales[index] === true && this.tapas[index] === true) {
                this.sendProduction(index, a);
                return true;
            } else if (this.fondos[index] === true && this.laterales[index] === true && this.tapas[index] === '') {
                this.sendProduction(index, a);
                return true;
            } else {
                this.deleteProduct(index, a);
            }

        },
        sendProduction: function (index, a) {
            //Comprueba que elementos li estan marcados en verde
            this.toProduce[index] = (a);
        },
        deleteProduct: function (index) {
            this.toProduce[index] = null;
        },
        showProduction: function () {
            //Eliminar las posiciones que son nulas
            const results = this.toProduce.filter(element => {
                return element !== null;
            });

            console.log(results);
        },
        setSerieByName: function (nombre) {

            //Recorremos el array mirando que empresa tiene el nombre del parametro y hacemos un set del serie


            //this.setDefault(empresa);


            //console.log(this.currentFactura.serie)
        },
        filter: function (a) {
            /*console.log(a.serie + " "+ a.tipo + " " + a.centro + " es igual a ->" + this.currentEmpresa.serie + " " + this.currentEmpresa.tipo + " " + this.currentEmpresa.centro)
            console.log()*/
            let ideProducto = a.serie + a.tipo + a.centro + a.numero;
            return ideProducto.toUpperCase() === this.selectedFactura.id.toUpperCase();
        },
        setSelected: function (facturaObject) {
            //console.log("cambiando  ->" + facturaId)
            //Sacamos una array separando por '/' en cada uno de las posiciones
            //let atributos = this.currentFactura.id.split('/');
            //console.log(atributos);
            //Recorrer la array
            this.setDefault(facturaObject);
        },
        setDefault: function (factura) {
            this.selectedFactura.id = factura.serie + factura.tipo + factura.centro + factura.numero;
            this.selectedFactura.nombre = factura.nomfiscli;
            this.selectedFactura.serie = factura.serie;
            this.selectedFactura.tipo = factura.tipo;
            this.selectedFactura.centro = factura.centro;
            this.selectedFactura.numero = factura.numero;
            this.getProducts();
        },
        getProducts() {
            //const url = "http://localhost:8080/kriterOMNI/KriterRS004/getOP?centro=" + this.currentFactura.centro + "&tipo=" + this.currentFactura.tipo
            //    + "&serie=" + this.currentFactura.serie + "&numero=" + this.currentFactura.numero;
            //console.log(url);

            fetch("../data/products.json")
                .then((res) => res.json())
                .then((data) => ((this.articulos = data), console.log(this.articulos)))
                .catch((err) => console.log(err.message));


        },

        getFacturas() {
            fetch("../data/facturas.json")
                .then((res) => res.json())
                .then((data) => ((this.facturas = data), console.log(this.facturas)))
                .catch((err) => console.log(err.message));
        },
    },
});


/*METODOS DE GETTERS*/

/*
     getProductos() {
       fetch("/products")
         .then((res) => res.json())
         .then((data) => {
           console.log(data);
           this.productos = data.productos;
           console.log(this.productos);
         })
         .catch((err) => console.log(err.message));
     },
   },
   */
