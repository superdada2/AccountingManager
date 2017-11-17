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
  country_enum,
  sequelize,
  Sequelize,
} from '../../../models';
export function BillByCustomer({
  filter = 'active',
  startMonth = new Date(2015, 1),
  endMonth = new Date()
}) {
  switch (filter) {
    case "active":
      return invoice.findAll({
        attributes: ["customerName", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['customerName'],

        where: {
          recognitionStartMonth: {
            $between: [sequelize.fn('DATE_SUB', sequelize.fn('NOW'), sequelize.literal(`INTERVAL ${sequelize.col('invoice.lengthMonth').col} MONTH`)), new Date(3000, 1)]
          },
          status: {
            $ne: 3
          }
        }
      })
      break;
    case "total":
      return invoice.findAll({
        attributes: ["customerName", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['customerName'],

      })
      break;
    case "billingMonth":
      return invoice.findAll({
        attributes: ["customerName", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['customerName'],
        where: {
          billingMonth: {
            $between: [new Date(startMonth), new Date(endMonth)]
          },
        }
      })
      break;
    case "recognitionStartMonth":
      return invoice.findAll({
        attributes: ["customerName", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['customerName'],
        where: {
          recognitionStartMonth: {
            $between: [new Date(startMonth), new Date(endMonth)]
          },
        }
      })
      break;
  }
}

export function BillByCurrency({
  filter = 'active',
  startMonth = new Date(2015, 1),
  endMonth = new Date()

}) {
  switch (filter) {
    case "active":
      return invoice.findAll({
        attributes: ["currency", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['currency'],
        include: [{
          model: currency_enum
        }],
        where: {
          recognitionStartMonth: {
            $between: [sequelize.fn('DATE_SUB', sequelize.fn('NOW'), sequelize.literal(`INTERVAL ${sequelize.col('invoice.lengthMonth').col} MONTH`)), new Date(3000, 1)]
          },
          status: {
            $ne: 3
          }
        }
      })
      break;
    case "total":
      return invoice.findAll({
        attributes: ["currency", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['currency'],
        include: [{
          model: currency_enum
        }]
      })
      break;
    case "billingMonth":
      return invoice.findAll({
        attributes: ["currency", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['currency'],
        include: [{
          model: currency_enum
        }],
        where: {
          billingMonth: {
            $between: [new Date(startMonth), new Date(endMonth)]
          },
        }
      })
      break;
    case "recognitionStartMonth":
      return invoice.findAll({
        attributes: ["currency", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['currency'],
        include: [{
          model: currency_enum
        }],
        where: {
          recognitionStartMonth: {
            $between: [new Date(startMonth), new Date(endMonth)]
          },
        }
      })
      break;
  }
}

export function BillByClass({
  filter = 'active',
  startMonth = new Date(2015, 1),
  endMonth = new Date()
}) {
  switch (filter) {
    case "active":
      return invoice.findAll({
        attributes: ["class", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['class'],
        include: [{
          model: class_enum
        }],
        where: {
          recognitionStartMonth: {
            $between: [sequelize.fn('DATE_SUB', sequelize.fn('NOW'), sequelize.literal(`INTERVAL ${sequelize.col('invoice.lengthMonth').col} MONTH`)), new Date(3000, 1)]
          },
          status: {
            $ne: 3
          }
        }
      })
      break;
    case "total":
      return invoice.findAll({
        attributes: ["class", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['class'],
        include: [{
          model: class_enum
        }]
      })
      break;
    case "billingMonth":
      return invoice.findAll({
        attributes: ["class", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['class'],
        include: [{
          model: class_enum
        }],
        where: {
          billingMonth: {
            $between: [new Date(startMonth), new Date(endMonth)]
          },
        }
      })
      break;
    case "recognitionStartMonth":
      return invoice.findAll({
        attributes: ["class", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['class'],
        include: [{
          model: class_enum
        }],
        where: {
          recognitionStartMonth: {
            $between: [new Date(startMonth), new Date(endMonth)]
          },
        }
      })
      break;
  }
}

export function BillByProduct({
  filter = 'active',
  startMonth = new Date(2015, 1),
  endMonth = new Date()
}) {
  switch (filter) {
    case "active":
      return invoice.findAll({
        attributes: ["product", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['product'],
        include: [{
          model: product_enum
        }],
        where: {
          recognitionStartMonth: {
            $between: [sequelize.fn('DATE_SUB', sequelize.fn('NOW'), sequelize.literal(`INTERVAL ${sequelize.col('invoice.lengthMonth').col} MONTH`)), new Date(3000, 1)]
          },
          status: {
            $ne: 3
          }
        }
      })
      break;
    case "total":
      return invoice.findAll({
        attributes: ["product", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['product'],
        include: [{
          model: product_enum
        }]
      })
      break;
    case "billingMonth":
      return invoice.findAll({
        attributes: ["product", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['product'],
        include: [{
          model: product_enum
        }],
        where: {
          billingMonth: {
            $between: [new Date(startMonth), new Date(endMonth)]
          },
        }
      })
      break;
    case "recognitionStartMonth":
      return invoice.findAll({
        attributes: ["product", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['product'],
        include: [{
          model: product_enum
        }],
        where: {
          recognitionStartMonth: {
            $between: [new Date(startMonth), new Date(endMonth)]
          },
        }
      })
      break;
  }
}

export function BillByRevenueType({
  filter = 'active',
  startMonth = new Date(2015, 1),
  endMonth = new Date()
}) {
  switch (filter) {
    case "active":
      return invoice.findAll({
        attributes: ["revenueType", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['revenueType'],
        include: [{
          model: revenue_type_enum
        }],
        where: {
          recognitionStartMonth: {
            $between: [sequelize.fn('DATE_SUB', sequelize.fn('NOW'), sequelize.literal(`INTERVAL ${sequelize.col('invoice.lengthMonth').col} MONTH`)), new Date(3000, 1)]
          },
          status: {
            $ne: 3
          }
        }
      })
      break;
    case "total":
      return invoice.findAll({
        attributes: ["revenueType", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['revenueType'],
        include: [{
          model: revenue_type_enum
        }]
      })
      break;
    case "billingMonth":
      return invoice.findAll({
        attributes: ["revenueType", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['revenueType'],
        include: [{
          model: revenue_type_enum
        }],
        where: {
          billingMonth: {
            $between: [new Date(startMonth), new Date(endMonth)]
          },
        }
      })
      break;
    case "recognitionStartMonth":
      return invoice.findAll({
        attributes: ["revenueType", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['revenueType'],
        include: [{
          model: revenue_type_enum
        }],
        where: {
          recognitionStartMonth: {
            $between: [new Date(startMonth), new Date(endMonth)]
          },
        }
      })
      break;
  }
}

export function BillByStatus({
  filter = 'active',
  startMonth = new Date(2015, 1),
  endMonth = new Date()
}) {
  switch (filter) {
    case "active":
      return invoice.findAll({
        attributes: ["status", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['status'],
        include: [{
          model: status_enum
        }],
        where: {
          recognitionStartMonth: {
            $between: [sequelize.fn('DATE_SUB', sequelize.fn('NOW'), sequelize.literal(`INTERVAL ${sequelize.col('invoice.lengthMonth').col} MONTH`)), new Date(3000, 1)]
          },
          status: {
            $ne: 3
          }
        }
      })
      break;
    case "total":
      return invoice.findAll({
        attributes: ["status", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['status'],
        include: [{
          model: status_enum
        }]
      })
      break;
    case "billingMonth":
      return invoice.findAll({
        attributes: ["status", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['status'],
        include: [{
          model: status_enum
        }],
        where: {
          billingMonth: {
            $between: [new Date(startMonth), new Date(endMonth)]
          },
        }
      })
      break;
    case "recognitionStartMonth":
      return invoice.findAll({
        attributes: ["status", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['status'],
        include: [{
          model: status_enum
        }],
        where: {
          recognitionStartMonth: {
            $between: [new Date(startMonth), new Date(endMonth)]
          },
        }
      })
      break;
  }
}

export function BillByType({
  filter = 'active',
  startMonth = new Date(2015, 1),
  endMonth = new Date()
}) {
  switch (filter) {
    case "active":
      return invoice.findAll({
        attributes: ["type", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['type'],
        include: [{
          model: type_enum
        }],
        where: {
          recognitionStartMonth: {
            $between: [sequelize.fn('DATE_SUB', sequelize.fn('NOW'), sequelize.literal(`INTERVAL ${sequelize.col('invoice.lengthMonth').col} MONTH`)), new Date(3000, 1)]
          },
          status: {
            $ne: 3
          }
        }
      })
      break;
    case "total":
      return invoice.findAll({
        attributes: ["type", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['type'],
        include: [{
          model: type_enum
        }]
      })
      break;
    case "billingMonth":
      return invoice.findAll({
        attributes: ["type", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['type'],
        include: [{
          model: type_enum
        }],
        where: {
          billingMonth: {
            $between: [new Date(startMonth), new Date(endMonth)]
          },
        }
      })
      break;
    case "recognitionStartMonth":
      return invoice.findAll({
        attributes: ["type", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['type'],
        include: [{
          model: type_enum
        }],
        where: {
          recognitionStartMonth: {
            $between: [new Date(startMonth), new Date(endMonth)]
          },
        }
      })
      break;
  }
}

export function BillByCountry({
  filter = 'active',
  startMonth = new Date(2015, 1),
  endMonth = new Date()
}) {
  switch (filter) {
    case "active":
      return invoice.findAll({
        attributes: ["country", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['country'],
        include: [{
          model: country_enum
        }],
        where: {
          recognitionStartMonth: {
            $between: [sequelize.fn('DATE_SUB', sequelize.fn('NOW'), sequelize.literal(`INTERVAL ${sequelize.col('invoice.lengthMonth').col} MONTH`)), new Date(3000, 1)]
          },
          status: {
            $ne: 3
          }
        }
      })
      break;
    case "total":
      return invoice.findAll({
        attributes: ["country", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['country'],
        include: [{
          model: country_enum
        }]
      })
      break;
    case "billingMonth":
      return invoice.findAll({
        attributes: ["country", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['country'],
        include: [{
          model: country_enum
        }],
        where: {
          billingMonth: {
            $between: [new Date(startMonth), new Date(endMonth)]
          },
        }
      })
      break;
    case "recognitionStartMonth":
      return invoice.findAll({
        attributes: ["country", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
          [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
        ],
        group: ['country'],
        include: [{
          model: country_enum
        }],
        where: {
          recognitionStartMonth: {
            $between: [new Date(startMonth), new Date(endMonth)]
          },
        }
      })
      break;
  }
}



export function BillByMonthInvoiced() {
  return invoice.findAll({
    attributes: ["customerName", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice']],
    group: ['customerName'],

  })
}
export function BillByBillingMonth({
  startM = new Date(2015, 1),
  endM = new Date()
}) {
  const Op = Sequelize.Op
  return invoice.findAll({
    attributes: ["billingMonth", [sequelize.fn('sum', sequelize.col('invoiceAmountUSD')), 'totalInvoice'],
      [sequelize.fn('count', sequelize.col('invoiceAmountUSD')), 'numberInvoice']
    ],
    group: ['billingMonth'],
    where: {
      billingMonth: {
        $between: [startM, endM]
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