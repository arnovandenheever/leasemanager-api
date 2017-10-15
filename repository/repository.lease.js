var mysql       = require('mysql');
var config      = require('../config.json');
var Q           = require('q');
var pool        = mysql.createPool(config.dbConfig);

module.exports.GetLeases = function (){
    var deferred = Q.defer();

    var sql = "SELECT Lease.leaseId, Lease.LeaseDate, Lease.StudentId, Student.StudentName, Student.Surname, "
        sql += "Agent.AgentName, House.HouseName, Room.RoomName, Lease.leaseStatus "
        sql += "FROM Lease INNER JOIN House ON Lease.HouseId = House.houseId INNER JOIN "
        sql += "Student ON Lease.StudentId = Student.studentId LEFT OUTER JOIN Room ON "
        sql += "Lease.RoomId = Room.roomId LEFT OUTER JOIN Agent ON "
        sql += "House.AgentId = Agent.agentId "
    
    pool.query(sql,function(error,result){
        if(!error) {
            deferred.resolve(result);
        } else {
            deferred.reject(error);  
        }           
    });

    return deferred.promise;

}

module.exports.GetLeasesByLeaseId = function (leaseId){
    var deferred = Q.defer();

    var sql = "SELECT Lease.leaseId, Lease.LeaseDate, Lease.StudentId, Student.StudentName, Student.Surname, "
        sql += "Agent.AgentName, House.HouseName, Room.RoomName, Lease.leaseStatus "
        sql += "FROM Lease INNER JOIN House ON Lease.HouseId = House.houseId INNER JOIN "
        sql += "Student ON Lease.StudentId = Student.studentId LEFT OUTER JOIN Room ON "
        sql += "Lease.RoomId = Room.roomId LEFT OUTER JOIN Agent ON "
        sql += "House.AgentId = Agent.agentId WHERE leaseId = " + leaseId 
    
    pool.query(sql,function(error,result){
        if(!error) {
            deferred.resolve(result);
        } else {
            deferred.reject(error);  
        }           
    });

    return deferred.promise;

}

module.exports.GetLeasesByStudentId = function(studentId){

    var deferred = Q.defer();

    var sql = "SELECT Lease.leaseId, Lease.LeaseDate, Lease.StudentId, Student.StudentName, "
        sql += "Student.Surname, Student.identityNumber, Agent.AgentName, Lease.HouseId, "
        sql += "House.HouseName, Lease.RoomId, Room.RoomName, "
        sql += "Lease.StartDate, Lease.Term, Lease.LeaseType, Lease.statementDayOfMonth, "
        sql += "Lease.GracePeriod, Lease.Rent, Lease.Deposit, Lease.KeyDeposit, "
        sql += "Lease.ContractFee, Lease.LatePayFee, Lease.CashFee, Lease.LetterOfDemandFee, "
        sql += "Lease.UnlockingFee, Lease.InspectionFee, Lease.LettingFee, "
        sql += "Lease.Balance, Lease.leaseStatus "
        sql += "FROM Lease INNER JOIN House ON Lease.HouseId = House.houseId INNER JOIN "
        sql += "Student ON Lease.StudentId = Student.studentId LEFT OUTER JOIN Room ON "
        sql += "Lease.RoomId = Room.roomId LEFT OUTER JOIN Agent ON "
        sql += "House.AgentId = Agent.agentId WHERE Lease.StudentId = " + studentId + " ORDER BY Lease.LeaseDate"   
    
    pool.query(sql,function(error,result){
        if(!error) {
            deferred.resolve(result);
        } else {
            deferred.reject(error);  
        }           
    });

    return deferred.promise;

}

module.exports.GetLeasesActive = function(){

    var deferred = Q.defer();

    var sql = "SELECT Lease.leaseId, Lease.LeaseDate, Lease.studentId, Student.studentName, Student.surname, "
        sql += "Agent.agentName, House.houseName, Room.roomName, Lease.leaseStatus "
        sql += "FROM Lease INNER JOIN House ON Lease.houseId = House.houseId INNER JOIN "
        sql += "Student ON Lease.studentId = Student.studentId LEFT OUTER JOIN Room ON "
        sql += "Lease.roomId = Room.roomId LEFT OUTER JOIN Agent ON "
        sql += "House.agentId = Agent.agentId WHERE (Lease.leaseStatus = N'ACTIVE')"   

    pool.query(sql,function(error,result){
        if(!error) {
            deferred.resolve(result);
        } else {
            deferred.reject(error);  
        }           
    });

    return deferred.promise;
                
}

module.exports.UpdateLease = function(lease){

    var deferred = Q.defer();

    var sql = "UPDATE Lease SET ";
    if(lease.leaseDate){
        var leasedate = lease.leaseDate.substring(0, 10);
        sql += "leaseDate = '" + leasedate + "',"
    }
    if(lease.studentId){
        sql += "studentId = '" + lease.studentId + "',"
    }
    if(lease.houseId){
        sql += "houseId = '" + lease.houseId + "',"
    }
    if(lease.roomId){
        sql += "roomId = '" + lease.roomId + "',"
    }
    if(lease.startDate){
        var startdate = lease.startDate.substring(0, 10);
        sql += "startDate = '" + startdate + "',"
    }
    if(lease.term){
        sql += "term = '" + lease.term + "',"
    }                
    if(lease.leaseType){
        sql += "leaseType = '" + lease.leaseType + "',"
    }
    if(lease.statementDayOfMonth){
        sql += "statementDayOfMonth = '" + lease.statementDayOfMonth + "',"
    }
    if(lease.gracePeriod){
        sql += "gracePeriod = '" + lease.gracePeriod + "',"
    }
    if(lease.rent){
        sql += "rent = '" + lease.rent + "',"
    }
    if(lease.deposit){
        sql += "deposit = '" + lease.deposit + "',"
    }
    if(lease.keyDeposit){
        sql += "keyDeposit = '" + lease.keyDeposit + "',"
    }
    if(lease.contractFee){
        sql += "contractFee = '" + lease.contractFee + "',"
    }
    if(lease.latePayFee){
        sql += "latePayFee = '" + lease.latePayFee + "',"
    }
    if(lease.cashFee){
        sql += "cashFee = '" + lease.cashFee + "',"
    }
    if(lease.letterOfDemandFee){
        sql += "letterOfDemandFee = '" + lease.letterOfDemandFee + "',"
    }
    if(lease.unlockingFee){
        sql += "unlockingFee = '" + lease.unlockingFee + "',"
    }
    if(lease.inspectionFee){
        sql += "inspectionFee = '" + lease.inspectionFee + "',"
    }
    if(lease.lettingFee){
        sql += "lettingFee = '" + lease.lettingFee + "',"
    }
    if(lease.balance){
        sql += "balance = '" + lease.balance + "',"
    }
    if(lease.leaseStatus){
        sql += "leaseStatus = '" + lease.leaseStatus + "',"
    }
    sql = sql.slice(0,-1);
    sql += " WHERE leaseId = " + lease.leaseId  

    pool.query(sql,function(error,result){
        if(!error) {
            deferred.resolve(result);
        } else {
            deferred.reject(error);  
        }           
    });

    return deferred.promise;

}

module.exports.InsertLease = function(lease){

    var deferred = Q.defer();

//     var leasedate = lease.leaseDate.substring(0, 10);
//     var startdate = lease.startDate.substring(0, 10);

    lease.leaseDate = lease.leaseDate.substring(0, 10);
    lease.startDate = lease.startDate.substring(0, 10);

    console.log(lease);

    // sql = "INSERT INTO Lease ("
    // sql += "leaseDate"
    // sql += ",studentId"
    // sql += ",houseId"
    // sql += ",roomId"
    // sql += ",startDate"
    // sql += ",term"
    // sql += ",leaseType"
    // sql += ",statementDayOfMonth"
    // sql += ",gracePeriod"
    // sql += ",rent"
    // sql += ",deposit"
    // sql += ",keyDeposit"
    // sql += ",contractFee"
    // sql += ",latePayFee"
    // sql += ",cashFee"
    // sql += ",letterOfDemandFee"
    // sql += ",unlockingFee"
    // sql += ",inspectionFee"
    // sql += ",lettingFee"
    // sql += ",leaseStatus"
    // sql += ") VALUES ("
    // sql += "'" + leasedate + "'"
    // sql += ",'" + lease.studentId + "'"
    // sql += ",'" + lease.houseId + "'"
    // sql += ",'" + lease.roomId + "'"
    // sql += ",'" + startdate + "'"
    // sql += ",'" + lease.term + "'"
    // sql += ",'" + lease.leaseType + "'"
    // sql += ",'" + lease.statementDayOfMonth + "'"
    // sql += ",'" + lease.gracePeriod + "'"
    // sql += ",'" + lease.rent + "'"
    // sql += ",'" + lease.deposit + "'"
    // sql += ",'" + lease.keyDeposit + "'"
    // sql += ",'" + lease.contractFee + "'"
    // sql += ",'" + lease.latePayFee + "'"
    // sql += ",'" + lease.cashFee + "'"
    // sql += ",'" + lease.letterOfDemandFee + "'"
    // sql += ",'" + lease.unlockingFee + "'"
    // sql += ",'" + lease.inspectionFee + "'"
    // sql += ",'" + lease.lettingFee + "'"
    // sql += ",'" + lease.leaseStatus + "')"

    pool.query('INSERT INTO Lease SET ?', lease, function(error,result){
        if(!error) {
            deferred.resolve(result);
        } else {
            deferred.reject(error);  
        }           
    });

    return deferred.promise;

}