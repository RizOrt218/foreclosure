'use strict';

var steve;
var stevesLoan;
var month = 0;
var monthsUntilEvicted;

function loan () {
  var account = {
    borrowed : 550000,
    balance : 286000,
    monthlyPayment : 1700,
    defaulted : 0,
    defaultsToForeclose : 5,
    foreclosed : false
  };

  //NESTED IN loan FUNCTION PRIVATE
  function missPayment () {
    account.defaulted += 1;

    if ( account.defaulted >= account.defaultsToForeclose ) {
      console.log('why are u loopinnng!!!! while');
      account.foreclosed = true;
    }
  }

  return {
    getBalance : function () {
      return account.balance;
    },
    receivePayment : function (amount) {
      if ( amount < account.monthlyPayment ) {
        console.log('missedPayment');
        missPayment();
      }
      account.balance -= amount;
    },
    getMonthlyPayment : function () {
      return account.monthlyPayment;
    },
    isForeclosed : function () {
      return account.foreclosed;
    }
  }; //END OF return
} //END OF loan

//function name borrow.. take in arg-loan
function borrower (loan) {
  var account = {       //object literal declaration
    monthlyIncome : 1350,
    funds : 2800,
    loan : loan
  };

  return { //IN THE BLOCK OF borrow(loan)
    getFunds : function () {
      return account.funds;
    },

    makePayment : function () {
      if ( account.funds > loan.getMonthlyPayment() ) {

        account.funds -= loan.getMonthlyPayment();
        loan.receivePayment(loan.getMonthlyPayment() );
      } else {

        loan.receivePayment(account.funds);
        account.funds = 0;
      }
    }, // END OF makePayment

    payDay : function () {
      account.funds += account.monthlyIncome;
    }
  }; //END OF return

}//END OF borrow(loan)

stevesLoan = loan();
steve = borrower(stevesLoan);

while ( stevesLoan.isForeclosed() === false ) {
  steve.payDay();

  steve.makePayment();

  month += 1;
}

monthsUntilEvicted = 13;
