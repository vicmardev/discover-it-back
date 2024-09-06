const nagiosService = require("services/nagios.service");
const config = require("config.json");
const alarmService = require("services/alarm.service");
const Alarm = require("assets/alarm");
const { func } = require("joi");

/**
 * Alarm
 * Params:
 *  StartTime-Date
 *  EndTime-Date
 *  AlertType-String
 *  HostName-String
 *  ServiceName-String
 *  State-String
 *  StateType-String
 *  PluginOutput-String
 *  EquipmentSerial-String
 *  Resolved-Boolean
 */

let today = new Date();
let setToday = () => {
  today = new Date();
};
//sets date
/**
 * in milliseconds
 * 1000 = 1s
 * 60000 = 1 min
 * 300000 = 5 min
 * 3600000 = 1 hr
 * 864000000 = 1 d
 */

//server creates an alarm
function createAlarm(alarmData) {
  alarmService.createAlarm(alarmData, today);
}

function updateAlarm(id, alarmData) {
  alarmService.updateAlarm(id, alarmData);
}

async function createAlarmsFromFile() {
  statusFile = config.nagiosStatus;
  hostAlarms = await nagiosService.getHosts(statusFile);
  serviceAlarms = await nagiosService.getServices(statusFile);
  
  alarmList = {};


  for (let i = 0; i < hostAlarms.length; i++) {
    //dont save if host is ok
    if (hostAlarms[i].status != "ok") {
      try {
        alarm = {
          Time: new Date(),
          Duration: "",
          AlarmType: "Host Alarm",
          Hostname: hostAlarms[i].hostname,
          Serial: hostAlarms[i].serial,
          ServiceName: "",
          Status: hostAlarms[i].status,
          PluginOutput: "No output",
        };
        createAlarm(alarm);
      } catch (error) {
        alarm = {
          Time: new Date(),
          Duration: "",
          AlarmType: "Host Alarm",
          Hostname: hostAlarms[i].hostname,
          ServiceName: "",
          Status: hostAlarms[i].status,
          PluginOutput: "No output",
        };
        createAlarm(alarm);
      }
      
    }
  }

  for (let i = 0; i < serviceAlarms.length; i++) {
    try{
      alarm = {
        Time: new Date(),
        Duration: serviceAlarms[i].Duration,
        AlarmType: "Service Alarm",
        Hostname: serviceAlarms[i].Hostname,
        Serial: hostAlarms[i].serial ,
        ServiceName: serviceAlarms[i].ServiceName,
        Status: serviceAlarms[i].Status,
        PluginOutput: serviceAlarms[i].PluginOutput,
      };
      createAlarm(alarm);
    }
    catch{
      alarm = {
        Time: new Date(),
        Duration: serviceAlarms[i].Duration,
        AlarmType: "Service Alarm",
        Hostname: serviceAlarms[i].Hostname,
        ServiceName: serviceAlarms[i].ServiceName,
        Status: serviceAlarms[i].Status,
        PluginOutput: serviceAlarms[i].PluginOutput,
      };
    }
  }
}

function alarmTimeout(interval) {
  setInterval(createAlarmsFromFile, interval);

  setInterval(setToday, interval);
}

module.exports = alarmTimeout;
