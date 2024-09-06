const  graphicService = require('services/graphic.service') 


function getCountTickets (req, res, next){
    graphicService.countTickets()
    .then(countStatusTicket =>res.json(countStatusTicket))
    .catch(next)
}

const  listEquipment = (req, res, next) =>{
    graphicService.distinctEquipment()
    .then(listEquipment => res.json(listEquipment))
    .catch(next)

}

const listContract = (req,res,next) =>{
    graphicService.countContracts()
    .then(listContrat =>  res.json(listContrat))
    .catch(next)
}

const listUsersPerContract = (req,res,next) =>{
    graphicService.countUsersPerContract()
    .then(listContrat =>  res.json(listContrat))
    .catch(next)
}

const  listAllFields = (req, res, next) =>{
    let  field  =  req.params.field;
    graphicService.countAllFieldsEquipment(field)
    .then(alllist => res.json(alllist))
    .catch(next)
}

const listAllFieldsUser = (req, res, next) =>{
    let  field =  req.params.field;
    graphicService.countAlllFields(field)
    .then(allList => res.json(allList))
    .catch(next)

}

const listFieldsTickets = (req, res, next) =>{
    let  field  =  req.params.field;
    graphicService.distinctFieldsTickets(field)
    .then(allList => res.json(allList))
    .catch(next)
}

const  graphicBrand = (req, res, next) =>{
    graphicService.chartEquipmnetCount()
    .then(allList => res.json(allList))
    .catch(next)
}

const  ticketsPerDay = (req, res, next) =>{
    graphicService.ticketsPerDay()
    .then(allList => res.json(allList))
    .catch(next)
}



module.exports={
    getCountTickets,
    listEquipment,
    listContract,
    listAllFields,
    listAllFieldsUser,
    listFieldsTickets,
    graphicBrand,
    listUsersPerContract,
    ticketsPerDay
}