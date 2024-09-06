class Alarm {
  constructor(
    time,
    duration,
    alarmType,
    hostName,
    serviceName,
    status,
    pluginOutput
  ) {
    this.Time = time;
    this.Duration = duration;
    this.AlarmType = alarmType;
    this.Hostname = hostName;
    this.ServiceName = serviceName;
    this.Status = status;
    this.PluginOutput = pluginOutput;
  }
}
module.exports = Alarm;