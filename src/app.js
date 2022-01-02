const express = require("express")
const app = express()
const path = require("path");
const exp = require("constants");
const methodOverride = require("method-override");
const { json } = require("express");
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

const publicpath = path.resolve(__dirname,'../public');
app.use(express.static(publicpath))

// ************ Route System require and use() ************
let rutasHome = require("./routes/rutaHome.js");
let rutasCarrito = require("./routes/rutaCarrito.js");
let rutasLogin = require("./routes/rutaLogin.js");
let rutasRegister = require("./routes/rutaRegister.js");
let rutasProductos = require("./routes/rutaProductos.js");
// ++++++++++++++++Use++++++++++++++++++++++
app.use("/",rutasHome);
app.use("/carrito",rutasCarrito);
app.use("/login",rutasLogin);
app.use("/register",rutasRegister);
app.use("/productos",rutasProductos);

const productList=[
    {
        id:1,
        name:"Aeorus",
        price:27000,
    },
    {
        id:2,
        name:"Gskill",
        price:37000,
    },
    {
        id:3,
        name:"Ram",
        price:1000,
    }
]

app.delete("/productos/:id", (req,res)=>{
    const paramId= parseInt(req.params.id, 10);
    const productIndex= productList.findIndex(productElement => productElement.id === paramId)

    productList.splice(productIndex,1)

    res.json({msg:'Product deleted'});
})
app.post("/productos/:id", (req,res)=>{
    const {name, price}=req.body;
    const productId=productList[productList.length -1].id +1;
    const product={
        id:productId,
        name,
        price
    }
    productList.push(product);
    res.status(201).json(product)
})

app.listen(process.env.PORT || 3000, ()=> {
    console.log("Servidor funcionando");
})
//  ---termina la zona de puertos, comienza funcionalidad---
function showmenu() {
    document.getElementsByClassName("header-a").classList.toggle("show");
  }
app.set('view engine', 'ejs');