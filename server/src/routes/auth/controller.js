import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
  user,
  user_permission
} from '../../models'
import {
  jwtOptions
} from '../../settings'

export function login({
  username = "blobl",
  password = "bob"
}) {
  return new Promise((res, rej) => {
    console.log(username)
    user.findOne({
      where: {
        username: username
      },
      include: [{
        model: user_permission
      }],
    }).then(thisUser => {
      console.log(thisUser.dataValues.password)

      if (bcrypt.compareSync(password, thisUser.dataValues.password)) {
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
      rej({
        message: "failed"
      })
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

  const hashed = bcrypt.hashSync(password, 10)

  const res = await user.create({
    username: username,
    password: hashed
  })
  return login({
    username: username,
    password: password
  })
}

export function GetUsers() {

  return user.findAll({
    attributes: ['username'],
    include: [{
      model: user_permission
    }],

  })
}

export function UpdatePermissions({
  username = "",
  permissions = []
}) {
  return new Promise(async(res, rej) => {
    await user_permission.destroy({
      where: {
        username: username
      }
    })
    user_permission.bulkCreate(permissions).then(
      out => {
        res("success")
      }
    ).catch(err => {

      rej("failed")
    })
  })
}