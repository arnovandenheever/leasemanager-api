function Lease(){
    this.leaseId = -1;
    this.leaseDate = "";
    this.studentId = "";
    this.houseId = "";
    this.roomId = "";
    this.startDate = "";
    this.term = "";
    this.leaseType = "";
    this.statementDayOfMonth = "";
    this.gracePeriod = "";
    this.rent = "";
    this.deposit = "";
    this.keyDeposit = "";
    this.contractFee = "";
    this.latePayFee = "";
    this.cashFee = "";
    this.letterOfDemandFee = "";
    this.unlockingFee = "";
    this.inspectionFee = "";
    this.lettingFee = "";
    this.balance = "";
    this.leaseStatus = "";

}

Lease.prototype.fromRecord = function(record){
    this.leaseId = record.leaseId
    this.leaseDate = record.leaseDate
    this.studentId = record.studentId
    this.houseId = record.houseId
    this.roomId = record.roomId
    this.startDate = record.startDate
    this.term = record.term
    this.leaseType = record.leaseType
    this.statementDayOfMonth = record.statementDayOfMonth
    this.gracePeriod = record.gracePeriod
    this.rent = record.rent
    this.deposit = record.deposit
    this.keyDeposit = record.keyDeposit
    this.contractFee = record.contractFee
    this.latePayFee = record.latePayFee
    this.cashFee = record.cashFee
    this.letterOfDemandFee = record.letterOfDemandFee
    this.unlockingFee = record.unlockingFee
    this.inspectionFee = record.inspectionFee
    this.lettingFee = record.lettingFee
    this.balance = record.balance
    this.leaseStatus = record.leaseStatus
  
}

Lease.prototype.log = function(){

    console.log("Lease.studentId = " + this.studentId);
    console.log("Lease.leaseId = " + this.leaseId);
    console.log("Lease.leaseDate = " + this.leaseDate);
    console.log("Lease.studentId = " + this.studentId);
    console.log("Lease.houseId = " + this.houseId);
    console.log("Lease.roomId = " + this.roomId);
    console.log("Lease.startDate = " + this.startDate);
    console.log("Lease.term = " + this.term);
    console.log("Lease.leaseType = " + this.leaseType);
    console.log("Lease.statementDayOfMonth = " + this.statementDayOfMonth);
    console.log("Lease.gracePeriod = " + this.gracePeriod);
    console.log("Lease.rent = " + this.rent);
    console.log("Lease.deposit = " + this.deposit);
    console.log("Lease.keyDeposit = " + this.keyDeposit);
    console.log("Lease.contractFee = " + this.contractFee);
    console.log("Lease.latePayFee = " + this.latePayFee);
    console.log("Lease.cashFee = " + this.cashFee);
    console.log("Lease.letterOfDemandFee = " + this.letterOfDemandFee);
    console.log("Lease.unlockingFee = " + this.unlockingFee);
    console.log("Lease.inspectionFee = " + this.inspectionFee);
    console.log("Lease.lettingFee = " + this.lettingFee);
    console.log("Lease.balance = " + this.balance);
    console.log("Lease.status = " + this.status);
    
};

module.exports = Lease;

console.log("Loaded model.Lease.js");



