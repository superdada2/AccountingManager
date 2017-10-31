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
  month_enum,
  sequelize
} from '../../../models';
import Promise from 'bluebird';

export function loadData(){
  return new Promise(async(res, rej)=>{
    res("works")
  })
}

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

function getReportByClassProduct(year = 2017, month = 1, income = true){
  var query = 'SELECT SUM(income.amount) AS amount, class_enum.data AS class, COUNT(income.amount) AS count, product_enum.data as product FROM invoice AS invoice LEFT JOIN income AS income on income.invoiceId = invoice.id AND income.year = %YEAR% AND income.month = %MONTH% LEFT JOIN product_enum as product_enum ON product_enum.id = invoice.product LEFT JOIN class_enum as class_enum ON class_enum.id = invoice.class GROUP BY invoice.product, invoice.class'
  query = query.replace("%YEAR%", year).replace("%MONTH%", month)
  if(!income)
    query = query.replace(/income/g, "deferred_balance")
  return sequelize.query(query,{ type: sequelize.QueryTypes.SELECT} )
}

function getReportByProduct(year = 2017, month = 1, income = true){
  var query = 'SELECT SUM(income.amount) AS amount, COUNT(*) AS count, product_enum.data as product FROM invoice AS invoice LEFT JOIN income AS income on income.invoiceId = invoice.id AND income.year = %YEAR% AND income.month = %MONTH% LEFT JOIN product_enum as product_enum ON product_enum.id = invoice.product LEFT JOIN class_enum as class_enum ON class_enum.id = invoice.class GROUP BY invoice.product'
  query = query.replace("%YEAR%", year).replace("%MONTH%", month)
  if(!income)
    query = query.replace(/income/g, "deferred_balance")
  return sequelize.query(query,{ type: sequelize.QueryTypes.SELECT} )
}

function getReportByClass(year = 2017, month = 1, income = true){
  var query = 'SELECT SUM(income.amount) AS amount, COUNT(income.amount) AS count, class_enum.data as class FROM invoice AS invoice LEFT JOIN income AS income on income.invoiceId = invoice.id AND income.year = %YEAR% AND income.month = %MONTH% LEFT JOIN product_enum as product_enum ON product_enum.id = invoice.product LEFT JOIN class_enum as class_enum ON class_enum.id = invoice.class GROUP BY  invoice.class'
  query = query.replace("%YEAR%", year).replace("%MONTH%", month)
  if(!income)
    query = query.replace(/income/g, "deferred_balance")
  return sequelize.query(query,{ type: sequelize.QueryTypes.SELECT} )
}

export  function getProductTable({startY = 2000, endY = 2016, startM = 1, endM = 12, isIncome = false}){
  return new Promise(async (res, rej)=>{
    try{
      var dataTable = []
      var currentY = startY
      var currentM = startM
      while(currentY != endY || currentM != endM){
       const data = await  getReportByProduct(currentY, currentM,isIncome)
       var currentEntry = {}
       var count = 0
       data.forEach(value=>{
         currentEntry[value.product] = value.amount
         count += value.count
       })
       currentEntry["year"] = currentY
       currentEntry["month"] = currentM
       currentEntry["count"] = count
       
       dataTable.push(currentEntry)
       if(currentM == 12){
         currentM = 1
         currentY ++
       }      
       else
         currentM ++
      }
      res(dataTable)
    }
    catch(err){
      rej(err.message)
    }
    
  })   
}

export  function getClassTable({startY = 2000, endY = 2016, startM = 1, endM = 12, isIncome = false}){
  return new Promise(async (res, rej)=>{
    try{
      var dataTable = []
      var currentY = startY
      var currentM = startM
      while(currentY != endY || currentM != endM){
       const data = await  getReportByClass(currentY, currentM,isIncome)
       var currentEntry = {}
       var count = 0
       data.forEach(value=>{
         currentEntry[value.class] = value.amount
         count += value.count
       })
       currentEntry["year"] = currentY
       currentEntry["month"] = currentM
       currentEntry["count"] = count

       dataTable.push(currentEntry)
       if(currentM == 12){
         currentM = 1
         currentY ++
       }      
       else
         currentM ++
      }
      res(dataTable)
    }
    catch(err){
      rej(err.message)
    }
    
  })   
}




