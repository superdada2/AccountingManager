import {
  user,
  user_permission
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
    },
    include: [{
      model: user_permission
    }],
  }).then(res => {
    next(null, {
      username: res.dataValues.username,
      permissions: res.dataValues.user_permissions.map(i => i.dataValues)
    })
  })

})

export default strategy