const express = require("express")
const server = express()

//Pegar o banco de dados
const db = require("./database/db")

//configurar pasta pública
//configuração de uso
server.use(express.static("public"))

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({extended: true}))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar caminhos da minha aplicação
//página inicial
//configuração de rota
server.get("/", (req, res) => {
    //res.sendFile(__dirname + "/views/index.html")
    return res.render("index.html", {title: "Um título"})
})

server.get("/create-point", (req, res) => {

    //req.query: Query Strings da nossa url
    //console.log(req.query)
    
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    //req.body: o corpo do nosso fomulário
    //console.log(req.body)

    // inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES ( ?, ?, ?, ?, ?, ?, ? );
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if(err){
            console.log(err)
            return res.send("Erro no Cadastro")
        }
        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }
    //note que vc está chamando a função por referência, ou seja, vc não executa ela nesse exato momento(função de callback)
    //caso fosse executar imediatamente vc deveria chama-lá assim: afterInsertData(err)
    db.run(query, values, afterInsertData)

    
})

server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == ""){
        //pesquisa vazia
        return res.render("search-results.html", { total: 0})
    }

    //pegar os dados do banco de dados
    //o * significa tudo, caso deseje algo específico deve procurar por ele: SELECT name
    //o LIKE serve para fazer com a busca faço pela palavra e não pela cidade exata, usando tbm o %
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err)
        }

        const total = rows.length

        //console.log("Aqui estão os seus registros")
        //console.log(rows)
        //mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total})
    })

    
})


//configuração de ligar o servidor
server.listen(3000)
//npm start iniciará o servidor
//pelo atalho em package.json
//para parar o servidor use o Ctrl+C
//limpar o bash use Ctrl+L