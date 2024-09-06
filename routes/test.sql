
/**
Tabla de tickets
*/

IdTicket 
EstatusTicket -- Catalogo de estatus
TicketRegistrationDate
StepTicket -- catalogo de pasos o un numero incrementable
TitleTicket -- Viene del titulo de la alarma
SupportAssigment -- Catalogo de usuarios de soporte 
Host -- viene de alertas
AffectedPart -- viene de alertas
Statushost -- viene de alertas
dateAlert -- viene de alertas
alertDuration -- viene de alertas
Response -- viene de alertas
Contract -- Viene de inventario
Brand -- viene de inventario
Model -- viene de inventario
Serial -- viene de inventario
Location -- viene de inventario
UserClient -- El usuario
UserPhone -- El usuario
UserEmail -- usuario
DateSolution -- Campo de ticket
Evidence -- Campo de ticket
Solution -- campo de ticket
ResponsableReassign -- Catalogo de soporte
SolutionReassig --Campo de ticket
EvidenciaReassig --Campo de ticket
SLA --Viene de inventario
ObservationSupport --Campo de ticket
ObservationResponseUser --Campos de ticket


CREATE TABLE `discoverit`.`ticketsalarms` (
  `IdTicketAlarm` INT NOT NULL AUTO_INCREMENT,
  `EstatusTicket` INT UNSIGNED NOT NULL,
  `TicketRegistrationDate` DATE NOT NULL,
  `StepTicket` INT UNSIGNED NOT NULL,
  `TitleTicket` VARCHAR(100) NOT NULL,
  `SupportAssigment` INT UNSIGNED NOT NULL,
  `Host` VARCHAR(30) NOT NULL,
  `AffectedPart` VARCHAR(30) NOT NULL,
  `StatusHost` VARCHAR(20) NOT NULL,
  `DateAlert` DATE NOT NULL,
  `AlertDuration` VARCHAR(20) NOT NULL,
  `Response` VARCHAR(120) NOT NULL,
  `Contract` VARCHAR(10) NOT NULL,
  `Brand` VARCHAR(20) NOT NULL,
  `Serial` VARCHAR(20) NOT NULL,
  `Location` VARCHAR(100) NOT NULL,
  `UserClient` VARCHAR(45) NOT NULL,
  `UserPhone` VARCHAR(45) NOT NULL,
  `UserEmail` VARCHAR(45) NOT NULL,
  `DateSolution` DATE NOT NULL,
  `Evidence` VARCHAR(80) NOT NULL,
  `Solution` VARCHAR(80) NOT NULL,
  `ResponsableReassign` INT UNSIGNED NOT NULL,
  `SolutionReassign` VARCHAR(45) NOT NULL,
  `EvidenceReassign` VARCHAR(45) NOT NULL,
  `SLA` VARCHAR(45) NOT NULL,
  `ObservationSupport` VARCHAR(45) NOT NULL,
  `ObservationResponseUser` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`IdTicketAlarm`));

CREATE TABLE `estatusticket` (
  `IdStatus` int(11) NOT NULL AUTO_INCREMENT,
  `NameStatus` varchar(45) NOT NULL,
  PRIMARY KEY (`IdStatus`)
)

CREATE TABLE `userssupport` (
  `IdUserssupport` int(11) NOT NULL AUTO_INCREMENT,
  `NameUserSupport` varchar(45) NOT NULL,
  PRIMARY KEY (`IdUserssupport`)
)
/*ALTER TABLE `discoverit`.`inventory` 
CHANGE COLUMN `SerialOctopian` `SerialProvider` VARCHAR(50) NULL DEFAULT NULL ;
*/

-- freya, 

CREATE TABLE `discoverit`.`generalstatus` (
  `idgeneralstatus` INT NOT NULL AUTO_INCREMENT,
  `Section` VARCHAR(45) NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `Description` VARCHAR(45) NOT NULL,
  `Active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`idgeneralstatus`));
  
ALTER TABLE `discoverit`.`generalstatus` 
CHANGE COLUMN `section` `section` VARCHAR(45) NOT NULL AFTER `idgeneralstatus`;

INSERT INTO `discoverit`.`generalstatus` (`Section`, `Name`, `Description`, `Active`) VALUES ('Inventory', 'Activo', 'Inventory active', '1');
INSERT INTO `discoverit`.`generalstatus` (`Section`, `Name`, `Description`, `Active`) VALUES ('Inventory', 'Completo', 'Inventory complete', '1');
INSERT INTO `discoverit`.`generalstatus` (`Section`, `Name`, `Description`, `Active`) VALUES ('Inventory', 'Suspendido', 'Inventory suspended', '1');
INSERT INTO `discoverit`.`generalstatus` (`Section`, `Name`, `Description`, `Active`) VALUES ('Inventory', 'Por suspender', 'Inventory to suspended', '1');
INSERT INTO `discoverit`.`generalstatus` (`Section`, `Name`, `Description`, `Active`) VALUES ('Tickets', 'Pendiente', 'Ticket Pending', '1');
INSERT INTO `discoverit`.`generalstatus` (`Section`, `Name`, `Description`, `Active`) VALUES ('Tickets', 'Reasignado', 'Ticket Reasign', '1');
-- "connectionStringMariaDB": "mariadb://10.10.50.38/DiscoverIT?user=admin&password=Alph4n3t%",//
-- "connectionStringMariaDB":"mariadb://172.16.3.66:3306/DiscoverIt?user=Alpha&password=Alph4n3t%",
--"connectionStringMariaDB": "mariadb://localhost:3306/discoverit?user=root&password=root",
--Primero ingresar a esta direccion:
--cd /mnt/c/Users/Victor Martinez/Desktop
--Luego ejecutar este comando   Alph4n3t%
--mysqldump -u alpha -pAlph4n3t% -h 169.63.177.159 -P 4001 DiscoverIT > discoverbd2.sql
-- Base de datos de mongodb test asi se llama
ALTER TABLE `discover`.`orderpurchase` 
ADD COLUMN `StatusOrder` TINYINT(4) NULL AFTER `IdBrand`;

123456789abcde


-- GRANT USAGE ON *.* TO 'vic'@localhost IDENTIFIED BY '1234';
-- GRANT ALL PRIVILEGES ON `vic`.* TO 'vic'@'localhost';
--GRANT ALL PRIVILEGES ON `vic`.* TO 'vic'@'localhost';

