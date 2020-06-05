const express = require("express")
const server = express()

//configurar pasta pública
//configuração de uso
server.use(express.static("public"))

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
    return res.render("create-point.html")
})
server.get("/search", (req, res) => {
    return res.render("search-results.html")
})


//configuração de ligar o servidor
server.listen(3000)
//npm start iniciará o servidor
//pelo atalho em package.json
//para parar o servidor use o Ctrl+C
//limpar o bash use Ctrl+L