import jwt from 'jsonwebtoken';
import passportJWT from 'passport-jwt';

var ExtractJwt = passportJWT.ExtractJwt;
var strategyJWT = passportJWT.Strategy

export var jwtOptions = {}
jwtOptions.jwtFromRequest = passportJWT.ExtractJwt.fromAuthHeaderWithScheme('jwt')
jwtOptions.secretOrKey = 'invoice';
jwtOptions.resetSecret = "resetPassword"