
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const Role = require('helpers/role');
const KnowledgeBaseService = require('services/knowledge-base.service');
const path = require('path')

module.exports = {
  createSchema,
  updateSchema,
  createKnowledgeBaseNode,
  createKnowledgeBaseEntry,
  getKnowledgeBase,
  updateKnowledgeBaseNode,
  updateKnowledgeBaseEntry,
  deleteKnowledgeBaseNode,

};

function getKnowledgeBase(req, res, next){
  if(req.query.filepath){
    let file = req.query.filepath.toString();
    res.sendFile(path.resolve(file));
  }
  else {
    KnowledgeBaseService.getKnowledgeBase()
    .then(kbTree => {
      res.json(kbTree);
    })
    .catch(next);
  }
}

function createSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required(),
    filepath: Joi.string(),
    ancestors: Joi.array().items(Joi.string()),
    parent: Joi.string(),
  });
  validateRequest(req, next, schema);
}

function createKnowledgeBaseNode(req, res, next) {
  
  KnowledgeBaseService.createKnowledgeBaseNode(req.body, req.files)
      .then(equipment => res.json(equipment))
      .catch(next);
}

function createKnowledgeBaseEntry(req, res, next) {
  
  KnowledgeBaseService.createKnowledgeBaseEntry(req.body, req.files, req.params)
      .then(tree => res.json(tree))
      .catch(next);
}

function updateSchema(req, res, next) {
  const schemaRules = {
    name: Joi.string().required(),
    type: Joi.string().required(),
    filepath: Joi.string(),
    ancestors: Joi.array().items(Joi.string()),
    parent: Joi.string(),
  };

  const schema = Joi.object(schemaRules);
  validateRequest(req, next, schema);
}

function updateKnowledgeBaseEntry(req, res, next) {
  KnowledgeBaseService.updateKnowledgeBaseEntry(req.body, req.files, req.params)
      .then(tree => res.json(tree))
      .catch(next);
}

function updateKnowledgeBaseNode(req, res, next) {
  KnowledgeBaseService.updateKnowledgeBaseNode( req.body, req.files)
      .then(equipment => res.json(equipment))
      .catch(next);
}

function deleteKnowledgeBaseNode(req, res, next) {
  
  KnowledgeBaseService.deleteKnowledgeBaseNode(req.params.id)
  .then((deleted) => res.json({ message: `${deleted} nodes deleted successfully` }))
  .catch(next);
}