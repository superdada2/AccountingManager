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
  sequelize,
} from '../../../models';
import Promise from 'bluebird';

const companies = [
  '3Com Corp',
  '3M Company',
  'A.G. Edwards Inc.',
  'Abbott Laboratories',
  'Abercrombie & Fitch Co.',
  'ABM Industries Incorporated',
  'Ace Hardware Corporation',
  'ACT Manufacturing Inc.',
]

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}
export async function loadData() {
  for (var i = 0; i < 100; i++) {
    await loadData2()
  }
}

export function loadData2() {
  return new Promise(async(res, rej) => {
    var month = random(1, 12)
    var year = (random(2014, 2017))
    var billingMonth = new Date(year, month)
    var recStartMonth = new Date(year, month + 2)
    var result = await CreateInvoice({
      type: random(1, 3),
      Class: random(1, 6),
      product: random(1, 4),
      currency: random(1, 5),
      status: random(1, 3),
      revenueType: random(1, 5),
      companyName: companies[random(1, companies.length)],
      invoiceNumber: random(1, 90000),
      invoiceDate: randomDate(new Date(2014, 1), new Date(2017, 11)),
      invoiceAmount: random(0, 100000) / random(1, 1000),
      billMonth: billingMonth,
      recognitionStrMonth: recStartMonth,
      lengthRec: random(10, 12),
      fxRate: random(1, 5),
      monthlyRec: random(1, 10000) / random(1, 1000),
      dateLastIncrease: randomDate(new Date(2014, 1), new Date(2017, 11)),
      increasePerc: random(1, 5),
      cancelationDate: randomDate(new Date(2014, 1), new Date(2017, 11)),
      invoiceAmountUsd: random(1, 50000) / random(1, 1000),
      annualIncreaseBool: true,
      subscription: random(1, 2),
      country: random(1, 40)
    })
    res(result)
  })
}

export function ModifyIncomeDeferred({
  data = [],
  invoiceId = 0
}) {
  return new Promise(async(res, rej) => {
    try {
      await DeleteIncome({
        id: invoiceId
      })
      await DeleteDeferred({
        id: invoiceId
      })
      data.forEach(value => {
        if (value.income != 0) {

          income.create({
            invoiceId: invoiceId,
            amount: value.income,
            year: value.year,
            month: value.month
          })
        }
        if (value.deferred != 0) {

          deferred_balance.create({
            invoiceId: invoiceId,
            amount: value.deferred,
            year: value.year,
            month: value.month
          })
        }
      })
      res("success")
    } catch (err) {
      rej(err)
    }
  })
}

export function DeleteIncome({
  id = 0
}) {
  return income.destroy({
    where: {
      invoiceId: id
    }
  })
}

export function DeleteDeferred({
  id = 0
}) {
  return deferred_balance.destroy({
    where: {
      invoiceId: id
    }
  })
}

export function DeleteInvoice({
  id = 0
}) {
  return new Promise((res, rej) => {
    try {
      income.destroy({
        where: {
          invoiceId: id
        }
      }).then(() => {
        deferred_balance.destroy({
          where: {
            invoiceId: id
          }
        }).then(() => {
          invoice.destroy({
            where: {
              id: id
            }
          }).then(() => {
            res("success")
          })
        })
      })
    } catch (err) {
      rej(err)
    }
  })

}

export function ModifyInvoice(body) {
  return new Promise(async(res, rej) => {
    try {
      await DeleteInvoice({
        id: body.id
      })
      await CreateInvoice(body)
      res("success")
    } catch (err) {
      rej(err)
    }
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
  subscription = 1,
  country = 1,
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
        MonthlyRecoginitionAmountUSD: monthlyRec,
        country: country
      })

      Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
      };
      const id = response.dataValues.id
      const billingStart = new Date(billMonth).addDays(2)
      const supportStart = new Date(recognitionStrMonth).addDays(2)


      const incomeList = createIncomeList({
        id: id,
        startMonth: supportStart.getMonth() + 1,
        year: supportStart.getFullYear(),
        length: lengthRec,
        invoiceAmount: invoiceAmountUsd
      })
      incomeList.forEach(async(value) => {
        await income.create(value)
      })
      const defferedList = createDeferred({
        id: id,
        startMonth: billingStart.getMonth() + 1,
        year: billingStart.getFullYear(),
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

  for (var i = 0; i < length + 1; i++) {
    if (i == 0 || i == 1) {
      incomeList.push({
        invoiceId: id,
        amount: remainingAmount,
        year: currentYr,
        month: currentMonth
      })
    } else {
      remainingAmount -= amountPerMonth
      incomeList.push({
        invoiceId: id,
        amount: remainingAmount,
        year: currentYr,
        month: currentMonth
      })
    }
    if (currentMonth == 12) {
      currentMonth = 0
      currentYr++
    }
    currentMonth++
  }
  return incomeList
}

export function UpdateInvoiceDescription({
  id = 0,
  description = "",
  comments = ""
}) {
  return invoice.update({
    description: description,
    comments: comments
  }, {
    where: {
      id: id
    }
  })
}

export function GetIncomeDeferred({
  where
}) {
  return invoice.findAll({
    where,
    include: [{
        model: income
      },
      {
        model: deferred_balance
      },
      {
        model: product_enum
      }
    ]
  }, )
}

export function GetInvoice({
  where,
  all = false
}) {
  return new Promise(async(res, rej) => {
    try {

      var result = await invoice.findAll({
        where,
        include: [{
          model: class_enum
        }, {
          model: currency_enum
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
        }]
      })
      if (all) {
        res(result)
      } else {
        res(result.splice(0, 50))
      }

    } catch (err) {
      rej(err)
    }
  })

}

export function getDistinctInvoiceNumber() {
  const query = "SELECT DISTINCT invoiceNumber AS value FROM invoice"
  return sequelize.query(query, {
    type: sequelize.QueryTypes.SELECT
  })
}

export function getDistinctCustomerName() {
  const query = "SELECT DISTINCT customerName AS value FROM invoice"
  return sequelize.query(query, {
    type: sequelize.QueryTypes.SELECT
  })
}

function getReportByClassProduct(year = 2017, month = 1, income = true) {
  var query = 'SELECT SUM(income.amount) AS amount, class_enum.data AS class, COUNT(income.amount) AS count, product_enum.data as product FROM invoice AS invoice LEFT JOIN income AS income on income.invoiceId = invoice.id AND income.year = %YEAR% AND income.month = %MONTH% LEFT JOIN product_enum as product_enum ON product_enum.id = invoice.product LEFT JOIN class_enum as class_enum ON class_enum.id = invoice.class GROUP BY invoice.product, invoice.class'
  query = query.replace("%YEAR%", year).replace("%MONTH%", month)
  if (!income)
    query = query.replace(/income/g, "deferred_balance")
  return sequelize.query(query, {
    type: sequelize.QueryTypes.SELECT
  })
}

function getReportByProduct(year = 2017, month = 1, income = true) {
  var query = 'SELECT SUM(income.amount) AS amount, COUNT(income.amount) AS count, product_enum.data as product FROM invoice AS invoice LEFT JOIN income AS income on income.invoiceId = invoice.id AND income.year = %YEAR% AND income.month = %MONTH% LEFT JOIN product_enum as product_enum ON product_enum.id = invoice.product LEFT JOIN class_enum as class_enum ON class_enum.id = invoice.class GROUP BY invoice.product'
  query = query.replace("%YEAR%", year).replace("%MONTH%", month)
  if (!income)
    query = query.replace(/income/g, "deferred_balance")
  return sequelize.query(query, {
    type: sequelize.QueryTypes.SELECT
  })
}

function getReportByClass(year = 2017, month = 1, income = true) {
  var query = 'SELECT SUM(income.amount) AS amount, COUNT(income.amount) AS count, class_enum.data as class FROM invoice AS invoice LEFT JOIN income AS income on income.invoiceId = invoice.id AND income.year = %YEAR% AND income.month = %MONTH% LEFT JOIN product_enum as product_enum ON product_enum.id = invoice.product LEFT JOIN class_enum as class_enum ON class_enum.id = invoice.class GROUP BY  invoice.class'
  query = query.replace("%YEAR%", year).replace("%MONTH%", month)
  if (!income)
    query = query.replace(/income/g, "deferred_balance")
  return sequelize.query(query, {
    type: sequelize.QueryTypes.SELECT
  })
}

export function getProductTable({
  startY = 2000,
  endY = 2016,
  startM = 1,
  endM = 12,
  isIncome = false
}) {
  return new Promise(async(res, rej) => {
    try {
      var dataTable = []
      var currentY = startY
      var currentM = startM
      while (currentY != endY || currentM != endM) {
        const data = await getReportByProduct(currentY, currentM, isIncome)
        var currentEntry = {}
        var count = 0
        var total = 0

        data.forEach(value => {
          currentEntry[value.product] = value.amount
          currentEntry[value.product + '_count'] = value.count
          count += value.count
          if (value.amount != null)
            total += parseFloat(value.amount)
        })
        currentEntry["year"] = currentY
        currentEntry["month"] = currentM
        currentEntry["count"] = count
        currentEntry["total"] = total

        dataTable.push(currentEntry)
        if (currentM == 12) {
          currentM = 1
          currentY++
        } else
          currentM++
      }
      res(dataTable)
    } catch (err) {
      rej(err.message)
    }

  })
}

export function getClassTable({
  startY = 2000,
  endY = 2016,
  startM = 1,
  endM = 12,
  isIncome = false
}) {
  return new Promise(async(res, rej) => {
    try {
      var dataTable = []
      var currentY = startY
      var currentM = startM
      while (currentY != endY || currentM != endM) {
        const data = await getReportByClass(currentY, currentM, isIncome)
        var currentEntry = {}
        var count = 0
        var total = 0
        data.forEach(value => {
          currentEntry[value.class] = value.amount
          //  currentEntry[value.class] = {value:0, count:0}
          //  currentEntry[value.class]["value"] = value.amount
          //  currentEntry[value.class]["count"] = value.count
          currentEntry[value.class + '_count'] = value.count
          count += value.count
          if (value.amount != null)
            total += parseFloat(value.amount)
        })
        currentEntry["year"] = currentY
        currentEntry["month"] = currentM
        currentEntry["count"] = count
        currentEntry["total"] = total

        dataTable.push(currentEntry)
        if (currentM == 12) {
          currentM = 1
          currentY++
        } else
          currentM++
      }
      res(dataTable)
    } catch (err) {
      rej(err.message)
    }

  })
}