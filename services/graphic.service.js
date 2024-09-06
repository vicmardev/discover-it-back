const config = require('config.json');
const db = require('database/db');
const { query } = require('express');
const { Server } = require('mongodb');


const spanishDict = {
    'Suspended': 'Suspendido',
    'Active': 'Activo',
    'Complete': 'Completo',
    'Balancer': 'Balanceador',
    'Storage': 'Almacenamiento',
    // 'Switch': 'Conmutador',
    'Server': 'Servidor',
    // 'Router': 'Enrutador',
    'Pending': 'Pendiente',
    'Reassigned': 'Reasignado',
    'Complete': 'Completado',
    'Admin': 'Administrador',
    'User': 'Usuario',

}

const monthNumToAbrv = {
    1: "Ene",
    2: "Feb",
    3: "Mar",
    4: "Abr",
    5: "Mayo",
    6: "Jun",
    7: "Jul",
    8: "Ago",
    9: "Sept",
    10: "Oct",
    11: "Nov",
    12: "Dic"
}

const daysPerMonth = {
    1: 31,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10:31,
    11: 30,
    12: 31
}

function getDaysPerMonth(month, year){
    if (month == 2) {
        //year is leap year
        if ((year % 4 == 0 && year%100 != 0) || (year % 400 == 0)){
            return 29;
        }
        else{
            return 28
        }
    }
    return daysPerMonth[month];
}

function translatetoSpanish(key){
    
    if (key in spanishDict) return spanishDict[key]
    else return key
}


 const countTickets =  async()=>{
    try {
        const  salida  =  await db.TicketAlerts.aggregate([{$group:{_id:"$statusTicket",y:{$sum:1}}}]);
        for (let element of salida) {
            switch (element._id) {
              case 'Canceled':
                    element.color = "#F4583F"; 
                break;
              case 'Pending':
                    element.color = "#F2D680"; 
                break;
              case 'Tracking':
                    element.color = "#98D691"; 
                break;
              case 'Complete':
                    element.color = "#0099CC"; 
                break;
              default:
                element.color = "#BCBABA"
                break;
            }
            element._id = translatetoSpanish(element._id);
        }
        return  salida;
    } catch (error) {
        throw error
        
    }
}  



/* methos  of   fields  Tickets */
const  distinctFieldsTickets = async (field) =>{
    try {
        //removing varfield and assigning valField as const
        const  valField = `$supportAssignment`;
        const  valFieldReassign = `$responsableReassig`;
        const query = await db.TicketAlerts.aggregate([{$group:{_id:{$ifNull: [valFieldReassign, valField]},y:{$sum:1}}}]);
        for(let element of query){
            element._id = translatetoSpanish(element._id);
        }
        return query;
    } catch (error) {
        throw error;
    }
}

const  distinctEquipment  =  async () =>{
    try {
        const  query  =  await  db.Equipment.aggregate([{$group:{_id:"$Equipment",y:{$sum:1}}}]).sort({Equipment: -1});
        for(let element of query){
            element._id = translatetoSpanish(element._id);
        }
        return  query;
       } catch (error) {
           throw error
       }
}
const countContracts  =  async  () =>{
    try {
        const  query  =  await   db.Equipment.aggregate([{$group:{_id:"$Contrato",y:{$sum:1}}}]);
        
        for (let contract of query){
            
            let alias = await db.ContractAlias.findOne({Contrato: contract._id});
            if (!alias) continue;
            
            
            contract._id = `${alias.Alias} \t\t\n ${contract._id}` ; 
          }
        for(let element of query){
            element._id = translatetoSpanish(element._id);
        }
        return  query;
    } catch (error) {
        throw error
    }
}

const  countAllFieldsEquipment =  async (field)=>{
    const  valfield = `$${field}`;
    try {
        const query  = await db.Equipment.aggregate([{$group:{_id:valfield,y:{$sum:1}}}]);
        for(let element of query){
            element._id = translatetoSpanish(element._id);
        }
        return query;
    } catch (error) {
        throw error
    }
}


const  countAlllFields =  async  (field) =>{
    const   valfield = `$${field}`;
    try {
        const  query  =  await db.Account.aggregate([{$group:{_id:valfield,y:{$sum:1}}}]);
        for(let element of query){
            element._id = translatetoSpanish(element._id);
        }
        return query;
    } catch (error) {
        throw error;
    }
}

const countUsersPerContract = async () => {
    try {
        const query = await db.Account.aggregate([ {$unwind: {path: "$contrato"}}, {$group: {_id: "$contrato", y:{$sum: 1}} }]);
        for(let element of query){
            element._id = translatetoSpanish(element._id);
        }
        return query;
    } catch (error) {
        throw error;
    }
}

/* methods  for alerts */
const  countAllHostAlarm   = async(host,field) =>{
      const  valHost   =  host;
      const  valField  =  `$${field}`;
     try {
         const  query  =  db.alarms.aggregate({"$match":{"AlarmType":valHost}},{"$group":{"_id":valField, "y":{"$sum":1} }});
         for(let element of query){
            element._id = translatetoSpanish(element._id);
        }
         return query;
         
     } catch (error) {
         throw  erorr;
     }    
}
const chartEquipmnetCount = async ()=>{
    try {
        const listServer = [];
        const listBalancer = [];
        const listStorage = [];
        const listSwitch = [];
        const listBrand =  await listBrands();
      listBrand.forEach(brands => {
            const  query  =   coutEquipmentBrand('Server',brands);
            listServer.push(query)
        });
      listBrand.forEach(brands => {
            const  query  =   coutEquipmentBrand('Balancer',brands);
            listBalancer.push(query)
           
        });
      listBrand.forEach(brands => {
            const  query  =   coutEquipmentBrand('Storage',brands);
            listStorage.push(query)
        });
      listBrand.forEach(brands => {
            const  query  =   coutEquipmentBrand('Switch',brands);
            listSwitch.push(query)
        });
        const server  = await Promise.all(listServer);
        const balancer  =  await Promise.all(listBalancer);
        const storage =  await Promise.all(listStorage)
        const switchlist =  await Promise.all(listSwitch);

        const   arrayGraphic   = [
            {
              name:"Servidor",
               data: server
 
             },
            {
                name:translatetoSpanish("Balancer"),
                data: balancer
 
             },
            {
                name:translatetoSpanish("Storage"),
                data: storage
 
             },
            {
                name:translatetoSpanish("Switch"),
                data: switchlist
 
             },
              {
                 categorias: listBrand
             } 
        ]
        return arrayGraphic;
        
    } catch (error) {
        
    }

 }

const  coutEquipmentBrand =  async(equipment,element)=>{
  try {
      const  query =  await  db.Equipment.find({"Equipment":equipment,"Brand":element}).countDocuments();
      return  query;
  } catch (error) {
      throw error;
  }
}

//disticnt  brandas
const  listBrands  =  async () =>{
     try {
        const  query  =  await db.Equipment.distinct("Brand");
        return query;
         
     } catch (error) {
         throw error
     }
}


const  ticketsPerDay  =  async () =>{
    try {
        let today = new Date();
        // today.setFullYear(today.getFullYear()-);
        setDateToStartOfNextMonth(today);
        today.setUTCMonth(0);
        const nextYear = new Date(today)
        nextYear.setUTCFullYear(nextYear.getUTCFullYear()+1)
        nextYear.setUTCDate(nextYear.getUTCDate()-1)
        let ticketCount = createTicketsPerDayObject();
        while(today < nextYear){
            let tomorrow = getNextDay(today);
            const  query  =  await db.TicketAlerts.aggregate([{$match:{"ticketRegistrationDate": {$gte: today, $lt: tomorrow}}},{$project: {"ticketRegistrationDate": 1, "ticketID": 1}}, {$group: {_id: null, y:{$sum:1}}}]);
            if (query.length > 0){
                ticketCount[today.getUTCMonth()].data.push({x: today.getUTCDate(), y: query[0].y})
            } 
            else{
                ticketCount[today.getUTCMonth()].data.push({x: today.getUTCDate(), y: 0})
            }
            today = tomorrow
        }

        ticketCount = await deleteMonthsNotUsed(ticketCount);
             
        return ticketCount.reverse();
        
    } catch (error) {
        throw error
    }
}


function createTicketsPerDayObject(){
    let obj = []
    for(let i = 1; i<=12; i++){
        let monthDict = {
            name: monthNumToAbrv[i],
            data: [],
        }
        obj.push(monthDict)
        
    }
    return obj;
}

const deleteMonthsNotUsed = async (ticketsObj) =>{
    let reducedTicketsPerMonth = []
    for (let month in ticketsObj){
        const ticketsPerMonth = await ticketsObj[month].data.reduce((sum, ticketCount) => sum + ticketCount.y, 0)
        if (ticketsPerMonth != 0){
            reducedTicketsPerMonth.push(ticketsObj[month])
        }
    }
    ticketsObj = reducedTicketsPerMonth;
    return ticketsObj;
}

function setDateToStartOfNextMonth(date){
    date.setUTCHours(0,0,0,0);
    date.setUTCMonth((date.getUTCMonth()+1)%12, 1);
    return date;
}

function getNextDay(date){
    let nextDay = new Date(date);
    nextDay.setUTCDate(nextDay.getUTCDate()+1);
    return nextDay;

}



/* export all function */
module.exports = {
    countTickets,
    distinctEquipment,
    countContracts,
    countAllFieldsEquipment,
    countAlllFields,
    countAllHostAlarm,
    distinctFieldsTickets,
    chartEquipmnetCount,
    countUsersPerContract,
    ticketsPerDay
}