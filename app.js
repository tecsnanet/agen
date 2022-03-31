const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const Usuario = require('./model/Usuario')
const handlebars = require('express-handlebars')
app.use(express.static('public'));
const path = require("path")
app.use(express.static(__dirname + "/public"))
//CONFIGURA O HANDLEBARS
app.engine("handlebars", handlebars({
    defaultLayout: "main",
    runtimeOptions: {allowProtoPropertiesByDefault: true,
              allowProtoMethodsByDefault: true,},})
);
//CONTINUA CONFIRAÇÃO DO HANDLEBARS
//app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//CONFIGURA O BODY-PARSER
app.use(bodyParser.urlencoded({ extended: false }))
const port = process.env.PORT || 3000 

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/views/home.html');
})
app.get('/cadastro', (req, res) => {
    res.sendFile(__dirname + "/views/cadastro.html")
})
app.get("/login",(req,res)=>{
    res.sendFile(__dirname + "/views/login.html")
})
// app.post('/login', (req, res) => {
//     Usuario.create({
//         email: req.body.email,
//         senha: req.body.senha
//     }).then(() =>{
//         res.redirect('/')
//     }) 
// })
app.post('/cadastro', (req, res) => {
    Usuario.create({
        email: req.body.email,
        senha: req.body.senha,
        cpf: req.body.cpf
    }).then(() =>{
        res.redirect('/')
    }) 
})

app.get('/usuarios', (req, res) => {
    Usuario.findAll().then((dados) =>{ 
        res.render('usuarios', {dados:dados})       
    })   
})

app.get('/pesquisar', (req, res) =>{
    Usuario.findAll().then((dados) =>{
        res.render('usuarios', {usuarios:dados})
    })
})

app.get('/excluir/:cpf', (req, res) =>{
    Usuario.destroy(
        {
            where:{cpf: req.params.cpf}
        }
    ).then(() => {
        res.redirect('/pesquisar')
    })   
})

// app.post('/editar', (req, res) =>{
//     Usuario.update(
//         {nome: req.body.nome},
//         {where: {cpf: req.body.cpf}}
//     ).then(() =>{
//         res.redirect('/pesquisar')
//     })
// })

// app.get('/recebe/:cpf/:nome', (req, res) =>{
//     res.render('atualizar', {dados:{cpf:req.params.cpf, nome:req.params.nome}})
// })
//app.post("/update/:cpf",(req,res)=>{
//    const data = req.body;
//    const {cpf}= req.params;

 //   Usuario.update(data,{
 //       where:{
 //           cpf
 //       }
//    }).then(()=>{
 //       res.redirect("/")
//    })
//})
//app.get("/update/:cpf", async (req,res)=>{
  //  const {cpf} = req.params; 
  //  const user = await Usuario.findOne({
   //     where:{
   //         cpf
   //     }
  //  });
 //   return res.render("atualizar", {user})
//})


//app.listen(port, () =>{
    //console.log("Servidor ligado")
//})