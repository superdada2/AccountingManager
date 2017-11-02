export const config = {
  db:{
    database:"viziya_invoices3",
    user:"viziya",
    options:{
      dialect: 'mysql',
      host:'localhost',
      define:{
        timestamps:false
      }
    }
  }
}
export default config