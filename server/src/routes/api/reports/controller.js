import {
  invoice,
  income,
  deferred_balance,
  class_enum,
  currency_enum,
  product_enum,
  revenue_type_enum,
  status_enum,
  subscription_enum,
  type_enum,
  month_enum
} from '../../../models';
import Promise from 'bluebird';

export function CreateInvoice({
  type = 1,
  Class = 1,
  product = 1,
  currency = 1,
  status = 1,
  revenueType = 1,
  companyName = 1,
  invoiceNumber = 1,
  invoiceAmount = 1,
  invoiceDate = 1,
  billMonth = 1,
  description = 1,
  recognitionStrMonth = 1,
  lengthRec = 12,
  fxRate = 1,
  monthlyRec = 1,
  dateLastIncrease = 1,
  increasePerc = 1,
  cancelationDate = 1,
  comments = '1',
  invoiceAmountUsd = 1,
  annualIncreaseBool = 1,
  subscription = 1
}) {
  return new Promise(async(res, rej) => {
    try {
      var response = await invoice.create({
        type: type,
        customerName: companyName,
        comments: comments,
        description: description,
        product: product,
        class: Class,
        invoiceNumber: invoiceNumber,
        invoiceAmount: invoiceAmount,
        invoiceDate: invoiceDate,
        subscriptionType: subscription,
        billingMonth: billMonth,
        status: status,
        recognitionStartMonth: recognitionStrMonth,
        lengthMonth: lengthRec,
        currency: currency,
        FXRate: fxRate,
        revenueType: revenueType,
        cancellationDate: null,
        annualIncreaseEli: annualIncreaseBool,
        dateLastIncrease: dateLastIncrease,
        increasePercentage: increasePerc,
        invoiceAmountUSD: invoiceAmountUsd,
        MonthlyRecoginitionAmountUSD: monthlyRec
      })
      const id = response.dataValues.id
      const yr = new Date(invoiceDate).getFullYear()
      const incomeList = createIncomeList({
        id: id,
        startMonth: recognitionStrMonth,
        year: yr,
        length: lengthRec,
        invoiceAmount: invoiceAmountUsd
      })
      console.log(incomeList)
      incomeList.forEach(async(value) => {
        await income.create(value)
      })
      const defferedList = createDeferred({
        id: id,
        startMonth: recognitionStrMonth,
        year: yr,
        length: lengthRec,
        invoiceAmount: invoiceAmountUsd
      })
      defferedList.forEach(async(value) => {
        await deferred_balance.create(value)
      })
      res('Success')
    } catch (err) {
      rej(err.message)
    }
  })

}

function createIncomeList({
  id = 0,
  startMonth = 1,
  year = 2017,
  length = 12,
  invoiceAmount = 1000
}) {
  var incomeList = []
  var currentYr = year
  var currentMonth = startMonth
  const amountPerMonth = invoiceAmount / length
  for (var i = 0; i < length; i++) {
    incomeList.push({
      invoiceId: id,
      amount: amountPerMonth,
      year: currentYr,
      month: currentMonth
    })
    if (currentMonth == 12) {
      currentMonth = 0
      currentYr++
    }
    currentMonth++
  }
  return incomeList
}

function createDeferred({
  id = 0,
  startMonth = 1,
  year = 2017,
  length = 12,
  invoiceAmount = 1000
}) {
  var incomeList = []
  var currentYr = year
  var currentMonth = startMonth
  var remainingAmount = invoiceAmount
  const amountPerMonth = invoiceAmount / length
  incomeList.push({
    invoiceId: id,
    amount: remainingAmount,
    year: currentYr,
    month: currentMonth - 2
  })
  incomeList.push({
    invoiceId: id,
    amount: remainingAmount,
    year: currentYr,
    month: currentMonth - 1
  })

  for (var i = 0; i < length - 1; i++) {
    remainingAmount -= amountPerMonth
    incomeList.push({
      invoiceId: id,
      amount: remainingAmount,
      year: currentYr,
      month: currentMonth
    })
    if (currentMonth == 12) {
      currentMonth = 0
      currentYr++
    }
    currentMonth++
  }
  return incomeList
}

export function GetInvoice({ where }) {
  console.log("queery", where)
  return invoice.findAll({
    where,
    include: [{
      model: class_enum
    }, {
      model: currency_enum
    }, {
      model: month_enum,
      as:'billingMonthEnum'      
    }, {
      model: product_enum
    }, {
      model: revenue_type_enum
    }, {
      model: status_enum
    }, {
      model: subscription_enum
    }, {
      model: type_enum
    },{
      model:month_enum,
      as:'recognitionStrMonthEnum'
    }]
  })
}