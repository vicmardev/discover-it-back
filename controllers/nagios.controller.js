const express = require('express');
const nagiosService = require('services/nagios.service');
const config = require('config.json');


module.exports = {
  getHosts,
  getServices,

};

const statusFile = config.nagiosStatus;

function getHosts(req, res, next) {
  //check if user is authorized
  nagiosService.getHosts(statusFile)
    .then(hosts => hosts ? res.json(hosts) : res.sendStatus(404))
    .catch(next)
}

function getServices(req, res, next) {
  //check if user is authorized
  //TODO: add query params to only get services by host
  //filter by hostname
  if(req.query.filter){
    const filter = req.query.filter;
    
  }
  nagiosService.getServices(statusFile)
    .then(services => services ? res.json(services) : res.sendStatus(404))
    .catch(next)
}

// helper functions