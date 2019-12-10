const express = require('express');

const server = express();

server.use(express.json());

// Query params = ?nome=NodeJS
// Route params = /curso/2
// Request Body = {nome: 'NodeJS'}

const cursos = ['Node JS', 'Javascript', 'React'];

// middleware global
server.use((req, res, next) => {
    console.log(`URL chamada: ${req.url}`);
    return next();
})

// middleware normal para validar o nome do curso
function checkCurso(req, res, next) {
    if(!req.body.name) {
        return res.status(400).json({error: "Nome do curso é obrigatório"})
    }
    return next();
}

function checkIndexCurso(req, res, next) {
    const curso = cursos[req.params.index];
    if(!curso) {
        return res.status(400).json({error: "Curso nao existe"});
    }
    return next();
}

server.get('/cursos', (req, res ) => {
    return res.json(cursos);
})
 
server.get('/cursos/:index', checkIndexCurso, (req, res) => {

    // localhost:3000/curso?nome={nome}
    //const nome = req.query.nome;

    // localhost:3000/curso/{id}
    //const id = req.params.id;

    const {index} = req.params;

    return res.json(cursos[index]);
})

server.post('/cursos', checkCurso, (req, res) => {
    // alternativa a const name = req.body.name;
    const { name } = req.body;
    cursos.push(name);
    return res.json(cursos);
})

server.put('/cursos/:index', checkCurso, checkIndexCurso, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    cursos[index] = name;

    return res.json(cursos);
})

server.delete('/cursos/:index', checkIndexCurso, (req, res) => {
    const { index } = req.params;
    cursos.splice(index, 1);
    return res.json(cursos);
})

server.listen(3000);