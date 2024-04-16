const router = require('express').Router()
const Person = require('../models/Person')

// ######## Rotas da API ####################

// POST - Adiciona Pessoa ----------------------------------------------------
router.post('/', async (req, res) => {
    //req.body
    const {name, salary, approved} = req.body

    //Validando campos
    if(!name){
        res.status(422).json({error: "Campo nome obrigatório"})
        return
    }
    const person = {
        name,
        salary,
        approved
    }
//Utilizar método create do moongose
        try{
            //criando dados
            await Person.create(person)

            res.status(201).json({message: 'Pessoa inserida com sucesso!'})
            
        }catch(error){
            res.status(500).json({error: error})
        }
})


//GET Leitura de dados -------------------------------------------------------------------------
router.get('/', async(req, res) => {
  try{

    const people = await Person.find()
    res.status(200).json(people)

  }catch(error){

    res.status(500).json({ error: error })
  }  
})

//GET Busca Pessoa pelo id --------------------------------------------------------------------
router.get('/:id', async(req, res) => {
    //extrair dado da requisição, pela url = req.params
    const id = req.params.id

    try {
        const person = await Person.findOne({_id: id})

        if(!person){
            res.status(422).json({message: 'Usuário não encontrado'})
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res(500).json({error: error})
    }

})

// (PUT, PATCH) Update de Usuários -------------------------------------------
router.patch('/:id', async(req, res) => {
    const id = req.params.id
    const {name, salary, approved} = req.body
    const person = {
        name,
        salary,
        approved
    }
    try {
        const  updatePerson = await Person.updateOne({_id: id}, person)

        if(updatePerson.matchedCount === 0){
            res.status(422).json({message: "Usuário não atualizado"})
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// Deletar dados
router.delete('/:id', async(req, res) => {
   const id = req.params.id

   const person = await Person.findOne({_id: id})

   if(!person){
    res.status(422).json({message: "Usuário não encontrado"})
    return
   }

   try {
    await Person.deleteOne({_id: id})
    res.status(200).json({message: "Usuário deletado com sucesso"})
   } catch (error) {
    res.status(500).json({error: error})
   }

})

// //rota inicial / endpoint
// router.get('/', (req, res) => {
//     //mostrar requisiçao
//     res.json({message: 'Oi Express'})
// })

module.exports = router