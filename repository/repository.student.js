var mysql               = require('mysql');
var config              = require('../config.json');
var Q                   = require('q');
var pool                = mysql.createPool(config.dbConfig);

module.exports.GetStudents = function() {
    var deferred = Q.defer();

    var sql =   "SELECT * FROM Student"

    // let sqlString = `CALL spStudent(?)`;

    // var options = { sql: sqlString, nestTables: true };
         
    // pool.query(sqlString, 57, function(error,result){
    pool.query(sql, function(error,result){        
        if(!error) {
            if (result.length > 0){
                deferred.resolve(result);
            } else {
                deferred.resolve(null);
            }
        } else {
            deferred.reject(error);      
        }           
    });

    return deferred.promise;

};

module.exports.GetStudentByStudentId = function(studentId) {

    var deferred = Q.defer();

    // var sql = "SELECT * FROM Student WHERE studentId = " + studentId

    let sqlString = `CALL spStudent(?)`;

    // var options = { sql: sqlString, nestTables: true };
         
    pool.query(sqlString, studentId, function(error,result){

    // pool.query(sql,function(error,result){
        if(!error) {
            if (result.length > 0){
                deferred.resolve(result);
            } else {
                deferred.resolve(null);
            }
        } else {
            deferred.reject(error);      
        }           
    });

    return deferred.promise;

};

module.exports.GetStudentByIdentityNumber = function(identityNumber) {

    var deferred = Q.defer();

    var sql = "SELECT * FROM Student WHERE identityNumber = " + identityNumber
         
    pool.query(sql,function(error,result){
        if(!error) {
            if (result.length > 0){
                deferred.resolve(result);
            } else {
                deferred.resolve(null);
            }
        } else {
            deferred.reject(error);      
        }           
    });

    return deferred.promise;

};

module.exports.UpdateStudent = function(student) {

    var deferred = Q.defer();

    var sql = UpdateStudentSQL(student);
        
    pool.query(sql,function(error,result){
        if(!error) {
            deferred.resolve(result);
        } else {
            deferred.reject(error);      
        }           
    });

    return deferred.promise;

}

module.exports.CreateStudent = function (student){
    
    var deferred = Q.defer();

    var sql = CreateStudentSQL(student)

    pool.query(sql,function(error,result){
        if(!error) {
            // // console.log(result);
            // if (result.length > 0){
            //     deferred.resolve(result);
            // } else {
                deferred.resolve();
            // }
        } else {
            deferred.reject(error);      
        }           
    });

    return deferred.promise;

};

function UpdateStudentSQL(student){

    var studentdate = student.studentDate.substring(0, 10);

    // var studentdate = student.StudentDate.split(/\//);
    // studentdate = [ studentdate[2], studentdate[1], studentdate[0] ].join('/'); 
    // studentdate = studentdate + ' 00:00:00'
    // studentdate = "CONVERT(DATETIME, '" + studentdate + "', 102)"

    var sql = "UPDATE Student SET ";

    if(student.studentDate){
        sql += "studentDate = '" + studentdate + "',"
    }
    if(student.surname){
        sql += "surname = '" + student.surname + "',"
    }
    if(student.studentName){
        sql += "studentName = '" + student.studentName + "',"
    }
    if(student.IdentityNumber){
        sql += "identityNumber = '" + student.identityNumber + "',"
    }
    if(student.address){
        sql += "address = '" + student.address + "',"
    }
    if(student.telephone){
        sql += "telephone = '" + student.telephone + "',"
    }
    if(student.mobile){
        sql += "mobile = '" + student.mobile + "',"
    }
    if(student.email){
        sql += "email = '" + student.email + "',"
    }
    if(student.bank){
        sql += "bank = '" + student.bank + "',"
    }
    if(student.branchCode){
        sql += "branchCode = '" + student.branchCode + "',"
    }
    if(student.accountNumber){
        sql += "accountNumber = '" + student.accountNumber + "',"
    }
    if(student.institution){
        sql += "institution = '" + student.institution + "',"
    }
    if(student.studentNumber){
        sql += "studentNumber = '" + student.studentNumber + "',"
    }
    if(student.employer){
        sql += "employer = '" + student.employer + "',"
    }
    if(student.employerTelephone){
        sql += "employerTelephone = '" + student.EmployerTelephone + "',"
    }
    if(student.guardianName){
        sql += "guardianName = '" + student.guardianName + "',"
    }
    if(student.guardianTelephone){
        sql += "guardianTelephone = '" + student.guardianTelephone + "',"
    }
    if(student.guardianEmail){
        sql += "guardianEmail = '" + student.guardianEmail + "',"
    }
    if(student.responsiblePersonName){
        sql += "responsiblePersonName = '" + student.responsiblePersonName + "',"
    }
    if(student.responsiblePersonTelephone){
        sql += "responsiblePersonTelephone = '" + student.responsiblePersonTelephone + "',"
    }
    if(student.responsiblePersonEmail){
        sql += "responsiblePersonEmail = '" + student.responsiblePersonEmail + "',"
    }
    if(student.scholarshipFrom){
        sql += "scholarshipFrom = '" + student.scholarshipFrom + "',"
    }
    if(student.scholarshipContact){
        sql += "scholarshipContact = '" + student.scholarshipContact + "',"
    }
    if(student.scholarshipTelephone){
        sql += "scholarshipTelephone = '" + student.scholarshipTelephone + "',"
    }
    if(student.Scholarship_Email){
        sql += "scholarshipEmail = '" + student.scholarshipEmail + "',"
    }

    sql = sql.slice(0,-1);
    sql += " WHERE studentId = " + student.studentId

    return sql
}

function CreateStudentSQL(student){

    var sql = "INSERT INTO Student ("
        sql += "studentDate, "
        sql += "surname, "
        sql += "studentName, " 
        sql += "identityNumber, "
        sql += "address, "
        sql += "telephone, "
        sql += "mobile, "
        sql += "email, "
        sql += "bank, "
        sql += "branchCode, "
        sql += "accountNumber, "
        sql += "institution, "
        sql += "studentNumber, "
        sql += "employer, "
        sql += "employerTelephone, "
        sql += "guardianName, "
        sql += "guardianTelephone, " 
        sql += "guardianEmail, "
        sql += "responsiblePersonName, " 
        sql += "responsiblePersonTelephone, "
        sql += "responsiblePersonEmail, "
        sql += "scholarshipFrom, "
        sql += "scholarshipContact, "
        sql += "scholarshipTelephone, "
        sql += "scholarshipEmail) "            
        sql += "VALUES ('" + student.studentDate + "', "
        sql += "'" + student.surname + "', "
        sql += "'" + student.studentName + "', "
        sql += "'" + student.identityNumber + "', "
        sql += "'" + student.address + "', "
        sql += "'" + student.telephone + "', "
        sql += "'" + student.mobile + "', "
        sql += "'" + student.email + "', "
        sql += "'" + student.bank + "', "
        sql += "'" + student.branchCode + "', "
        sql += "'" + student.accountNumber + "', "
        sql += "'" + student.institution + "', "
        sql += "'" + student.studentNumber + "', "
        sql += "'" + student.employer + "', "
        sql += "'" + student.employerTelephone + "', "
        sql += "'" + student.guardianName + "', "
        sql += "'" + student.guardianTelephone + "', "
        sql += "'" + student.guardianEmail + "', "
        sql += "'" + student.responsiblePersonName + "', "
        sql += "'" + student.responsiblePersonTelephone + "', "
        sql += "'" + student.responsiblePersonEmail + "', "
        sql += "'" + student.scholarshipFrom + "', "        
        sql += "'" + student.scholarshipContact + "', "    
        sql += "'" + student.scholarshipTelephone + "', "    
        sql += "'" + student.scholarshipEmail + "')"

    return sql;

}

console.log('Loaded repository.student.js');