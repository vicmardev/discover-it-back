
statusHashTable = {
  0: "ok",
  1: "down",
  2: "unreachable",
};

class Host{
   /**
    * @param {string} hostname 
    * @param {number} statusCode 0-ok, 1-down, 2-unreachable
    * @param {number} notifications 
    * @param {boolean} acknowledged
    */
  constructor(hostname,statusCode, notification, acknowledged){
    let splitHostnameString = hostname.split(" ");
    this.Hostname = splitHostnameString[0];
    if(splitHostnameString[1] ){
      this.Serial = splitHostnameString[1];
    }
    this.Status = statusHashTable[statusCode];
    this.Notification = notification;
    this.Acknowledged = acknowledged;
    
  }
}

module.exports = Host;