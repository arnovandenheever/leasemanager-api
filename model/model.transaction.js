function Transaction(){
    this.transactionId = -1;
    this.leaseId = "";
    this.transactionDate = "";
    this.transactionType = "";
    this.reference = "";
    this.debit = "";
    this.credit = "";
    this.balance = ""
}

Transaction.prototype.fromRecord = function(record){
    this.transactionId = record.transactionId;
    this.leaseId = record.leaseId;
    this.transactionDate = record.transactionDate;
    this.transactionType = record.transactionType;
    this.reference = record.reference;
    this.debit = record.debit;
    this.credit = record.credit;
    this.balance = record.balance
}

module.exports = Transaction;

console.log("Loaded model.Bank.js");



