
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const Role = require('helpers/role');
const ticketService = require('services/ticket.service');

module.exports = {
  getAllTickets,
  getTicketById,
  createSchema,
  createTicket,
  updateSchema,
  updateTicket,

};

function getAllTickets(req, res, next){
  ticketService.getAllTickets()
    .then(ticketList => res.json(ticketList))
    .catch(next);
}

function getTicketById(req, res, next) {
  ticketService.getTicketById(req.params.id)
      .then(ticket => ticket ? res.json(ticket) : res.sendStatus(404))
      .catch(next);
}


function createSchema(req, res, next) {
  const schema = Joi.object({
    equipment: Joi.string().required(),
    model: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    severity: Joi.string().required(),
    client: Joi.string().required(),
    issueType: Joi.string().required(),
    userName: Joi.string().required(),
    contract: Joi.string().required(),
    email: Joi.string().required(),
    telephone: Joi.string().required(),
    equipmentSerial: Joi.string().required(),
    clientName:Joi.string().required(),
    adressEquipt:Joi.string().required(),
    brand:Joi.string().required(),
    affectationPart:Joi.string().required(),
    operatingSystem:Joi.string().required(),
    brand:Joi.string().required(),

    clientEvidencePath: Joi.string().allow("")
  });
  validateRequest(req, next, schema);
}

function createTicket(req, res, next) {
  ticketService.createTicket(req.body, req.files)
      .then(equipment => res.json(equipment))
      .catch(next);
}

function updateSchema(req, res, next){
  const schema = Joi.object({
      stepTicket: Joi.number().required(),
      statusTicket: Joi.string().required(),
      responsableReassig: Joi.string(),
      solutionReassig: Joi.string(),
      dateSolutionReassig: Joi.date(), 
      evidenceReassig: Joi.string()
  });
  validateRequest(req, next, schema);
}

function updateTicket(req, res, next) {
  if (req.user.role !== Role.Admin) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  if(req.query.case) {
    switch (req.query.case) {
      case 'reassign':
        ticketService.updateTicketReassign(req.params.id, req.body, req.files)
                .then( ticketAlert => res.json(ticketAlert))
                .catch(next)
        break;
    
      default:
        break;
    }
  }
  else{
    ticketService.updateTicket(req.params.id, req.body, req.files)
    .then(equipment => res.json(equipment))
    .catch(next);
  }
} 