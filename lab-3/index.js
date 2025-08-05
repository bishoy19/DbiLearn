/* ## Banking System
Develop a system serving a bank including functionalities dealing with accounts and transactions
1. Write a Function to Create a new bank account with validation for required fields.
**Rules**:
- Must have **`firstName`**, **`lastName`**, **`initialDeposit`** (min $50)
- Generate a unique 10-digit account number */

let lastAccountNumber = 10;

function createBankAccount({ firstName, lastName, initialDeposit }) {
  lastAccountNumber += 1;
  const accountNumber = lastAccountNumber.toString();
  const newAccount = {
    accountNumber,
    firstName,
    lastName,
    balance: initialDeposit,
    createdAt: new Date().toISOString(),
  };

  return newAccount;
}
console.log(
  createBankAccount({
    firstName: "beshoy",
    lastName: "milad",
    initialDeposit: 1000,
  })
);

/* 2- Write the Function to Deposit money into an account with transaction recording.
**Rules**:
- Amount must be positive
- Update balance and transaction history */
function deposit(account, amount) {
  account.balance += amount;
  const transaction = {
    type: "DEPOSIT",
    amount: amount,
    date: new Date().toISOString(),
    newBalance: account.balance,
  };
  if (!account.transactions) {
    account.transactions = [];
  }
  account.transactions.push(transaction);

  return account;
}
let account = {
  accountNumber: "1000000001",
  balance: 100,
  transactions: [],
};

account = deposit(account, 200);

console.log(account);

/* 3. Write a Function to Process withdrawals with overdraft protection.
**Rules**:
- Reject if insufficient funds
- $5 penalty for overdraft attempts*/
function withdraw(account, amount) {
  if (amount <= 0) {
    throw new Error("Withdrawal amount must be positive.");
  }
  if (!account.transactions) {
    account.transactions = [];
  }

  if (amount <= account.balance) {
    account.balance -= amount;

    account.transactions.push({
      type: "WITHDRAWAL",
      amount: amount,
      date: new Date().toISOString(),
      newBalance: account.balance,
    });
  } else {
    const penalty = 5;
    account.balance -= penalty;

    account.transactions.push({
      type: "OVERDRAFT_ATTEMPT",
      amount: amount,
      date: new Date().toISOString(),
      penalty: penalty,
    });
  }

  return account;
}
let account1 = {
  accountNumber: "1000000001",
  balance: 100,
  transactions: [],
};

console.log(withdraw(account1, 50));

// 4-Write a function to Transfer money between accounts with validation.
// **Rules**:
// - Both accounts must exist
// - No negative transfers
// - Transaction recorded in both accounts

function transfer(fromAccount, toAccount, amount) {
  if (!fromAccount || !toAccount) {
    throw new Error("Both accounts must exist.");
  }

  if (amount <= 0) {
    throw new Error("Transfer amount must be positive.");
  }

  if (amount > fromAccount.balance) {
    throw new Error("Insufficient funds in source account.");
  }

  // تأكد من وجود transactions في الحسابين
  if (!fromAccount.transactions) fromAccount.transactions = [];
  if (!toAccount.transactions) toAccount.transactions = [];

  const date = new Date().toISOString();

  // تحديث الرصيد
  fromAccount.balance -= amount;
  toAccount.balance += amount;

  // تسجيل التحويل في الحساب المرسل
  fromAccount.transactions.push({
    type: "TRANSFER_OUT",
    to: toAccount.accountNumber,
    amount: amount,
    date: date,
  });

  // تسجيل التحويل في الحساب المستلم
  toAccount.transactions.push({
    type: "TRANSFER_IN",
    from: fromAccount.accountNumber,
    amount: amount,
    date: date,
  });

  return [fromAccount, toAccount];
}

const acountOne = {
  accountNumber: "1000000001",
  balance: 100,
};

const acountTow = {
  accountNumber: "1000000002",
  balance: 200,
};

const [updatedFrom, updatedTo] = transfer(acountOne, acountTow, 75);
console.log(updatedFrom);
console.log(updatedTo);
console.log(acountOne.balance);
console.log(acountTow.balance);

/* 5-Write a Function to Calculate monthly interest (compound) for savings accounts.
**Rules**:
- 2% annual interest (0.167% monthly)
- Applied only if balance > $500 */
function applyMonthlyInterest(account) {
  const monthlyInterestRate = 0.00167;
  if (account.type !== "SAVINGS" || account.balance <= 500) {
    return account;
  }

  const interest = parseFloat(
    (account.balance * monthlyInterestRate).toFixed(2)
  );
  account.balance = parseFloat((account.balance + interest).toFixed(2));

  if (!account.transactions) {
    account.transactions = [];
  }

  account.transactions.push({
    type: "INTEREST",
    amount: interest,
    date: new Date().toISOString(),
  });

  return account;
}

let savingsAccount = {
  accountNumber: "1000000001",
  balance: 1000,
  type: "SAVINGS",
};

console.log(applyMonthlyInterest(savingsAccount));

/* 6. Write a Function to Retrieve transactions within a date range.
**Rules**:
- Support filtering by type (deposit/withdrawal/etc.)
- Sort by date descending */

function getTransactionsInRange(account, filter) {
  const { startDate, endDate, type } = filter;

  if (!account.transactions || account.transactions.length === 0) {
    return [];
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  let filtered = account.transactions.filter((tx) => {
    const txDate = new Date(tx.date);
    const inRange = txDate >= start && txDate <= end;
    const typeMatches = type ? tx.type === type : true;
    return inRange && typeMatches;
  });

  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

  return filtered;
}

const accounts = {
  accountNumber: "1000000001",
  transactions: [
    { type: "DEPOSIT", amount: 200, date: "2023-11-15T10:00:00Z" },
    { type: "WITHDRAWAL", amount: 50, date: "2023-11-20T14:00:00Z" },
    { type: "DEPOSIT", amount: 100, date: "2023-11-05T09:00:00Z" },
  ],
};

const result = getTransactionsInRange(accounts, {
  startDate: "2023-11-01",
  endDate: "2023-11-30",
  type: "DEPOSIT",
});

console.log(result);

/* 7. Write a function to manage account freeze/unfreeze , toggle account status with security checks.
**Rules**:
- Require manager approval for freeze
- Prevent transactions on frozen accounts */

function toggleAccountStatus(account, action, byUser) {
  const validActions = ["FREEZE", "UNFREEZE"];

  if (!validActions.includes(action)) {
    throw new Error("Invalid action. Use 'FREEZE' or 'UNFREEZE'.");
  }

  if (!account.statusHistory) {
    account.statusHistory = [];
  }

  const timestamp = new Date().toISOString();

  if (action === "FREEZE") {
    if (!byUser || !byUser.startsWith("manager")) {
      throw new Error("Only a manager can freeze an account.");
    }
    account.status = "FROZEN";
    account.statusHistory.push({
      action: "FREEZE",
      by: byUser,
      date: timestamp,
    });
  }

  if (action === "UNFREEZE") {
    account.status = "ACTIVE";
    account.statusHistory.push({
      action: "UNFREEZE",
      by: byUser,
      date: timestamp,
    });
  }

  return account;
}

let accoune = {
  accountNumber: "1000000001",
  status: "ACTIVE",
};

account = toggleAccountStatus(accoune, "FREEZE", "manager123");

console.log(accoune);

/* 8. Write a function to Enforce $500 daily withdrawal limit.
**Rules**:
- Calculate sum of today's withdrawals
- Reject if limit exceeded */

function withdrawWithDailyLimit(account, amount) {
  const DAILY_LIMIT = 600;

  if (amount <= 0) {
    throw new Error("Withdrawal amount must be positive.");
  }

  if (account.status === "FROZEN") {
    throw new Error("Account is frozen. Withdrawals are not allowed.");
  }

  if (!account.transactions) {
    account.transactions = [];
  }

  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

  // حساب مجموع السحوبات لليوم
  const todayWithdrawalsTotal = account.transactions
    .filter((tx) => tx.type === "WITHDRAWAL" && tx.date.startsWith(today))
    .reduce((sum, tx) => sum + tx.amount, 0);

  if (todayWithdrawalsTotal + amount > DAILY_LIMIT) {
    throw new Error("Daily withdrawal limit exceeded ($500 max)");
  }

  if (amount > account.balance) {
    throw new Error("Insufficient funds.");
  }

  // تنفيذ السحب
  account.balance -= amount;
  const transaction = {
    type: "WITHDRAWAL",
    amount: amount,
    date: new Date().toISOString(),
    newBalance: account.balance,
  };

  account.transactions.push(transaction);

  return account;
}

let accounte = {
  accountNumber: "1000000001",
  balance: 1000,
  transactions: [
    { type: "WITHDRAWAL", amount: 250, date: "2025-08-05T09:00:00Z" },
  ],
};

console.log(withdrawWithDailyLimit(accounte, 300));

/* 
9. Write a function to validate password
**Rules**:
- Minimum 12 characters
- Require uppercase, lowercase, number, and special character
- No common passwords */
function validatePassword(password) {
  const reasons = [];
  const commonPasswords = [
    "123456",
    "password",
    "123456789",
    "12345678",
    "qwerty",
    "abc123",
    "111111",
    "123123",
    "000000",
    "iloveyou",
  ];

  if (password.length < 12) {
    reasons.push("Password must be at least 12 characters");
  }

  if (!/[A-Z]/.test(password)) {
    reasons.push("Password must contain an uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    reasons.push("Password must contain a lowercase letter");
  }

  if (!/[0-9]/.test(password)) {
    reasons.push("Password must contain a number");
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    reasons.push("Password must contain a special character");
  }
  if (commonPasswords.includes(password.toLowerCase())) {
    reasons.push("Password is too common");
  }

  return {
    valid: reasons.length === 0,
    ...(reasons.length > 0 && { reasons }),
  };
}
console.log(validatePassword("BankAccount@123!"));
console.log(validatePassword("ankccount@123!"));
console.log(validatePassword("ankccount123"));

/* 10. Write a function to check and detect suspicious activities, and flags unusual transaction patterns
**Rules**:
- Alert on transactions >$10,000
- Alert on rapid sequence of small transactions (3+ in 5 minutes) */
