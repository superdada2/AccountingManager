import http from 'http';
import express from 'express';
import compress from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes';
import expressPartils from 'express-partials';


const app = express();
app.set("view engine", 'ejs')
  .set('views', __dirname + '/views')
  .use(expressPartils())
  .use(compress())
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended:true}))
  .use("/", router)

export default app;

const server = http.createServer(app);
const port = process.env.PORT || 3030;

server.listen(port,function(){
  console.log('Servedr listening at port %d', port);
})