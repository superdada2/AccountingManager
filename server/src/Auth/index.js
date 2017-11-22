import {
  user
} from '../models';
import passport from 'passport';
import {
  jwtOptions
} from '../settings'
import passportJWT from 'passport-jwt'

var ExtractJwt = passportJWT.ExtractJwt;
var strategyJWT = passportJWT.Strategy


var strategy = new strategyJWT(jwtOptions, (payload, next) => {

  user.findOne({
    where: {
      username: payload.username
    }
  }).then(res => {

    next(null, {
      username: res.dataValues.username,
      accessLevel: res.dataValues.accessLevel
    })
  })

})

export default strategy