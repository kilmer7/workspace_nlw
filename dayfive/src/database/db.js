// importar a depedência do sqlite3 e faz com que mande mensagens de retorno
const sqlite3 = require("sqlite3").verbose()

// criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

//permite que vc pegue esse código
module.exports = db

// // utilizar o objeto de banco de dados, para nossas operações
db.serialize( () => {

    // // com comandos SQL eu vou:
    // // 1. Criar uma tabela
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     );
    // `)

    // // 2. Inserir dados na tabela
    // const query = `
    //     INSERT INTO places (
    //         image,
    //         name,
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //     ) VALUES ( ?, ?, ?, ?, ?, ?, ? );
    // `
    // const values = [
    //     "https://images.unsplash.com/photo-1566933882642-186d156f1145?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    //     "Papersider",
    //     "Guilherme Gemballa, Jardim América",
    //     "Número 260",
    //     "Santa Catarina",
    //     "Rio do Sul",
    //     "Resíduos Eletrônicos, Lâmpadas"
    // ]

    // function afterInsertData(err){
    //     if(err){
    //         return console.log(err)
    //     }
    //     console.log("Cadastrado com sucesso")
    //     console.log(this)
    // }
    // //note que vc está chamando a função por referência, ou seja, vc não executa ela nesse exato momento(função de callback)
    // //caso fosse executar imediatamente vc deveria chama-lá assim: afterInsertData(err)
    // db.run(query, values, afterInsertData)

    // // 3. Consultar os dados da tabela
    // // o * significa tudo, caso deseje algo específico deve procurar por ele: SELECT name
    // db.all(`SELECT * FROM places`, function(err, rows){
    //     if(err){
    //         return console.log(err)
    //     }
    //     console.log("Aqui estão os seus registros")
    //     console.log(rows)
    // })

    // // 4. Deletar um dado da tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [4], function(err){
    //     if(err){
    //         return console.log(err)
    //     }
    //     console.log("Registro deletado com sucesso!")
    // })

})
