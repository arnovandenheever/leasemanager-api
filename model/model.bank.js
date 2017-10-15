function Bank(){
    this.bankId = -1;
    this.accountNumber = "";
    this.bankDate = "";
    this.description = "";
    this.amount = "";
    this.balance = "";
    this.journalAccount = "";
    this.reference = "";
    this.fileName = "";

}

Bank.prototype.fromRecord = function(record){
    this.bankId = record.bankId;
    this.accountNumber = record.accountNumber;
    this.bankDate = record.bankDate;
    this.description = record.description;
    this.amount = record.amount;
    this.balance = record.balance;
    this.journalAccount = record.journalAccount;
    this.reference = record.reference;
    this.fileName = record.fileName;

}

module.exports = Bank;

console.log("Loaded model.Bank.js");



