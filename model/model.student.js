function Student(){
    this.studentId = "";
    this.studentDate = "";
    this.surname= "";
    this.studentName = ""; 
    this.identityNumber = "";
    this.address = "";
    this.telephone = "";
    this.mobile = "";
    this.email = "";
    this.bank = "";
    this.branchCode = "";
    this.accountNumber = "";
    this.institution = "";
    this.studentNumber = "";
    this.employer = "";
    this.employerTelephone = "";
    this.guardianName = "";
    this.guardianTelephone = ""; 
    this.guardianEmail = "";
    this.responsiblePersonName = ""; 
    this.responsiblePersonTelephone = "";
    this.responsiblePersonEmail = "";
    this.scholarshipFrom = "";
    this.scholarshipContact = "";
    this.scholarshipTelephone = "";
    this.scholarshipEmail = "";  
}

Student.prototype.FromRecord = function(record){
    this.studentId  = record.studentId;
    this.studentDate  = record.studentDate;
    this.surname = record.surname;
    this.studentName  = record.studentName; 
    this.identityNumber  = record.identityNumber;
    this.address  = record.address;
    this.telephone  = record.telephone;
    this.mobile  = record.mobile;
    this.email  = record.email;
    this.bank  = record.bank;
    this.branchCode  = record.branchCode;
    this.accountNumber  = record.accountNumber;
    this.institution  = record.institution;
    this.studentNumber  = record.studentNumber;
    this.employer  = record.employer;
    this.employerTelephone  = record.employerTelephone;
    this.guardianName  = record.guardianName;
    this.guardianTelephone  = record.guardianTelephone; 
    this.guardianEmail  = record.guardianEmail;
    this.responsiblePersonName  = record.responsiblePersonName; 
    this.responsiblePersonTelephone  = record.responsiblePersonTelephone;
    this.responsiblePersonEmail  = record.responsiblePersonEmail;
    this.scholarshipFrom  = record.scholarshipFrom;
    this.scholarshipContact  = record.scholarshipContact;
    this.scholarshipTelephone  = record.scholarshipTelephone;
    this.scholarshipEmail  = record.scholarshipEmail;  
}

Student.prototype.Log = function(){

    console.log("Student.studentId = " + this.studentId);
    console.log("Student.firstName = " + this.firstName);
    console.log("Student.studentDate = " + this.studentDate);
    console.log("Student.surname= " + this.surname);
    console.log("Student.studentName = " + this.studentName); 
    console.log("Student.identityNumber = " + this.identityNumber);
    console.log("Student.address = " + this.address);
    console.log("Student.telephone = " + this.telephone);
    console.log("Student.mobile = " + this.mobile);
    console.log("Student.email = " + this.email);
    console.log("Student.bank = " + this.bank);
    console.log("Student.branchCode = " + this.branchCode);
    console.log("Student.accountNumber = " + this.accountNumber);
    console.log("Student.institution = " + this.institution);
    console.log("Student.studentNumber = " + this.studentNumber);
    console.log("Student.employer = " + this.employer);
    console.log("Student.employerTelephone = " + this.employerTelephone);
    console.log("Student.guardianName = " + this.guardianName);
    console.log("Student.guardianTelephone = " + this.guardianTelephone); 
    console.log("Student.guardianEmail = " + this.guardianEmail);
    console.log("Student.responsiblePersonName = " + this.responsiblePersonName); 
    console.log("Student.responsiblePersonTelephone = " + this.responsiblePersonTelephone);
    console.log("Student.responsiblePersonEmail = " + this.responsiblePersonEmail);
    console.log("Student.scholarshipFrom = " + this.scholarshipFrom);
    console.log("Student.scholarshipContact = " + this.scholarshipContact);
    console.log("Student.scholarshipTelephone = " + this.scholarshipTelephone);
    console.log("Student.scholarshipEmail = " + this.scholarshipEmail); 

};

module.exports = Student;

console.log("Loaded model.Student.js");