import jwt from 'jsonwebtoken';
import {
  user
} from '../../models'
import {
  jwtOptions
} from '../../settings'

export function login({
  username = "blobl",
  password = "bob"
}) {
  return new Promise((res, rej) => {
    user.findOne({
      where: {
        username: username
      }
    }).then(thisUser => {
      console.log(thisUser.dataValues.password)
      if (password == thisUser.dataValues.password) {
        var token = jwt.sign({
          username: username
        }, jwtOptions.secretOrKey)

        res({
          message: "success",
          user: { ...thisUser.dataValues,
            password: ""
          },
          token
        })
      }
    }).catch(err => {
      rej({
        message: "failed"
      })
    })
  })
}

export async function register({
  username = "",
  password = ""
}) {

  const res = await user.create({
    username: username,
    password: password
  })
  return login(res)
}