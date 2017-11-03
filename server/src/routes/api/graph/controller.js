import Promise from 'bluebird';
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
  Sequelize,
} from '../../../models';
export function BillByCustomer() {
  return invoice.findAll({
    attributes: ["customerName", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],[sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']],
    group: ['customerName'],   

  })
}

export function BillByCurrency() {
  return invoice.findAll({
    attributes: ["currency", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],[sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']],
    group: ['currency'],
    include:[{
      model: currency_enum
    }]
  })
}

export function BillByClass() {
  return invoice.findAll({
    attributes: ["class", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],[sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']],
    group: ['class'],
    include:[{
      model: class_enum
    }]
  })
}

export function BillByProduct() {
  return invoice.findAll({
    attributes: ["product", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],[sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']],
    group: ['product'],
    include:[{
      model: product_enum
    }]

  })
}



export function BillByMonthInvoiced() {
  return invoice.findAll({
    attributes: ["customerName", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice']],
    group: ['customerName'],
    
  })
}
export function BillByBillingMonth({startM = new Date(2015,2),  endM = new Date(2017, 10)}) {
  const Op = Sequelize.Op
  return invoice.findAll({
    attributes: ["billingMonth", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],[sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']],
    group: ['billingMonth'],
    where:{
      billingMonth:{
        [Op.and]:{
          [Op.lte]: endM,
          [Op.gte]: startM
        }
      }
    }
  })
}

export function RecognitionStartMonth() {
  return invoice.findAll({
    attributes: ["recognitionStartMonth", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice']],
    group: ['recognitionStartMonth'],

  })
}