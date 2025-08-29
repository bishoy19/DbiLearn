function BankAccount(accountNumber, balance) {
  this.accountNumber = accountNumber;
  this.balance = balance;


  this.getAccountNumber = function () {
    return accountNumber;
  };

  this.setAccountNumber = function (newAccountNumber) {
    accountNumber = newAccountNumber;
  };

  this.getBalance = function () {
    return balance;
  };

  this.setBalance = function (newBalance) {
    if (newBalance >= 0) {
      balance = newBalance;
    } else {
      console.error("Balance cannot be negative.");
    }
  };

  this.deposit = function (amount) {
    if (amount > 0) {
      balance += amount;
      console.log(`Deposited ${amount}. New balance: ${balance}`);
    } else {
      console.error("Deposit amount must be positive.");
    }
  };
}

BankAccount.transferFunds = function (fromAccount, toAccount, amount) {
  if (!(fromAccount instanceof BankAccount) || !(toAccount instanceof BankAccount)) {
    console.error("Both arguments must be BankAccount instances.");
    return;
  }

  if (amount <= 0) {
    console.error("Transfer amount must be positive.");
    return;
  }

  if (fromAccount.getBalance() >= amount) {
    fromAccount.setBalance(fromAccount.getBalance() - amount);
    toAccount.setBalance(toAccount.getBalance() + amount);
    console.log(`Transferred ${amount} from ${fromAccount.getAccountNumber()} to ${toAccount.getAccountNumber()}.`);
  } else {
    console.error(`Insufficient funds in account ${fromAccount.getAccountNumber()} for transfer.`);
  }
};
let user1 = new BankAccount("1", 1000);
user1.deposit(500)


let user2 = new BankAccount("2", 1000);
user2.deposit(100)

BankAccount.transferFunds(user1, user2, 300)
console.log(user1.getBalance());
console.log(user2.getBalance());
BankAccount.transferFunds(user2, user1, 1000);
console.log(user1.getBalance());
console.log(user2.getBalance());


