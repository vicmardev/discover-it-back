statusHashTable = {
  0: "ok",
  1: "warning",
  2: "critical",
  3: "unknown",
};

class Service {
  /**
 *
 * @param {string} hostName service hostname
 * @param {string} serviceName
 * @param {number} status 0-ok, 1-warning, 2-critical, 3-unknown
 * @param {number} duration
 * @param {*} attemps
 * @param {string} pluginOutput
 * @param {number} notification
 * @param {boolean} acknowledged
 */
  constructor(
    hostName,
    serviceName,
    statusCode,
    durationEnd,
    attemps,
    pluginOutput,
    notification,
    acknowledged
  ) {
    let timestamp = statusCode != 0 ? durationEnd : new Date().getTime() / 1000;
    //first index is the hostname, second index is serial number
    let splitHostnameString = hostName.split(" ");
    this.Hostname = splitHostnameString[0];
    if(splitHostnameString[1] ){
      this.Serial = splitHostnameString[1];
    }
    this.Created = statusCode != 0 ? new Date(durationEnd * 1000) : new Date().getTime();
    this.ServiceName = serviceName;
    this.Status = statusHashTable[statusCode];
    this.DurationObject = this.duration(timestamp);
    this.Duration = this.durationString();
    this.Attemps = attemps;
    this.PluginOutput = pluginOutput;
    this.Notification = notification;
    this.Acknowledged = acknowledged;
  }

  duration(end) {
    //amount of secinds in a day
    const dayLength = 86400;
    //amount of seconds in hour
    const hourLength = 3600;
    let now = new Date().getTime() / 1000;
    let timeDifference = now - end;
    let days = Math.floor(timeDifference / dayLength);
    let hours = Math.floor((timeDifference % dayLength) / hourLength);
    let minutes = Math.floor(((timeDifference % dayLength) % hourLength) / 60);
    let seconds = Math.floor(timeDifference % 60);
    return (
      {
        "seconds": seconds,
        "minutes": minutes,
        "hours": hours,
        "days": days,
        "created": new Date(end * 1000)
      }
    );
  }

  durationString() {
    return `${this.DurationObject.days} days, ${this.DurationObject.hours} h ${this.DurationObject.minutes} m ${this.DurationObject.seconds} s`
  }
}

module.exports = Service;