import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../../config';

export const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.pass,
  config.db.options
)


const db = {}

fs
  .readdirSync(__dirname)
  .filter((file)=>
    file !== 'index.js'
  )
  .forEach((file)=>{
    const model = sequelize.import(path.join(__dirname,file))
    db[model.name] = model
  })

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

db.invoice.belongsTo(db.class_enum,{foreignKey: 'class'})
db.invoice.belongsTo(db.currency_enum,{foreignKey: 'currency'})
db.invoice.belongsTo(db.product_enum,{foreignKey: 'product'})
db.invoice.belongsTo(db.revenue_type_enum,{foreignKey: 'revenueType'})
db.invoice.belongsTo(db.status_enum,{foreignKey: 'status'})
db.invoice.belongsTo(db.subscription_enum,{foreignKey: 'subscriptionType'})
db.invoice.belongsTo(db.type_enum,{foreignKey: 'type'})
db.invoice.hasMany(db.income,{foreignKey:'invoiceId', onDelete: 'cascade'})

db.income.belongsTo(db.invoice,{foreignKey:'invoiceId', onDelete:'cascade'})
db.income.belongsTo(db.month_enum,{foreignKey:'month'})

db.deferred_balance.belongsTo(db.invoice,{foreignKey:'invoiceId', onDelete: 'cascade'})
db.deferred_balance.belongsTo(db.month_enum,{foreignKey:'month'})




module.exports =  db;