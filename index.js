/* 
      Projeto: Construir API para a escola 'Lion School'
      Autor: Ítalo Reis Rosa da Silva
      Versão: 1.0
      Data Início: 27/03/2023
  */
const express = require('express')

const cors = require('cors')

const bodyParser = require('body-parser')

const app = express()

const cursosLionSchool = require('./APIs_Lion_School/cursos')
const alunosLionSchool = require('./APIs_Lion_School/alunos')
app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')

    response.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS')

    app.use(cors())

    next()
})

app.get('/v1/lion-school/cursos', cors(), async function (request, response, next) {

    let listaCursos = cursosLionSchool.getCursos()

    response.json(listaCursos)
    response.status(200)



})

app.get('/v1/lion-school/alunos', cors(), async function (request, response, next) {

    let statusDoAluno = request.query.status
    let cursoDoAluno = request.query.siglaCurso
    let anoDoAluno = request.query.anoDeConclusao
    let listaAlunos
    let status
    if (statusDoAluno == undefined && cursoDoAluno == undefined && anoDoAluno == undefined) {
        listaAlunos = alunosLionSchool.getAlunos()
        status = true
    }
    else if (statusDoAluno != undefined) {
        listaAlunos = alunosLionSchool.getAlunosStatus(statusDoAluno)
        status = true
    }
    else if(anoDoAluno != undefined){
        listaAlunos = alunosLionSchool.getAlunoPeloAno(anoDoAluno)
        status = true
    }
    else {
        listaAlunos = alunosLionSchool.getAlunosCurso(cursoDoAluno)
        if (listaAlunos == true) {
            listaAlunos
            status = true
        }
    }
    if(listaAlunos == false){
        response.status(404)
        response.json('erro')
        
    }
    else{
        response.json(listaAlunos)
        response.status(200)
    }
  
    

})

app.get('/v1/lion-school/alunos/:matricula', cors(), async function (request, response, next) {

    let numeroMatricula = request.params.matricula

    let getAlunosPelaMAtricula = alunosLionSchool.getAlunoPelaMatricula(numeroMatricula)

    if (getAlunosPelaMAtricula == undefined || getAlunosPelaMAtricula == ' ') {
        response.status(400)
        response.json('Erro, matricula não indentificada')
    }
    else {
        response.json(getAlunosPelaMAtricula)
        response.status(200)
    }

})

app.get('/v1/lion-school/alunos/cursos/:siglacurso', cors(), async function (request, response, next) {

    let curso = request.params.siglacurso

    let getAlunosPeloCurso = alunosLionSchool.getAlunosCurso(curso)

    if (getAlunosPeloCurso == undefined || getAlunosPeloCurso == ' ' || getAlunosPeloCurso == null) {
        response.status(404)
        response.json('Erro, sigla não identificada')
    }
    else if (getAlunosPeloCurso == Number) {
        response.st
    }
    else {
        response.json(getAlunosPeloCurso)
        response.status(200)
    }

})


app.get('/v1/lion-school/alunos/status/:stAlunos', cors(), async function (request, response, next) {
    let statusAluno = request.params.stAlunos
    let getAlunoStatus = alunosLionSchool.getAlunosStatus(statusAluno)

    if (getAlunoStatus == null || getAlunoStatus == ' ' || getAlunoStatus == undefined) {
        response.json('Erro, status não indentificado')
        response.status(404)
    }
    else {
        response.json(getAlunoStatus)
        response.status(200)
    }


})
app.listen(8080, function () {
    console.log('Servidor aguardando requisições na porta 8080');
})