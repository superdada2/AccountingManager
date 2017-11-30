import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
  user,
  user_permission
} from '../../models'
import {
  jwtOptions
} from '../../settings'
import nodemailer from 'nodemailer'

export function resetPassword({
  email = ""
}) {
  return new Promise(async(res, rej) => {

    user.findOne({
      email: email,
      status: 'active'
    }).then(res => {
      var token = jwt.sign({
        username: res.dataValues.username
      }, jwtOptions.resetPassword, {
        expiresIn: '10h'
      })
      res({
        status: 'success'
      })
    }).catch(err => {
      rej({
        status: 'failed',
        message: 'Error'
      })
    })
  })
}

export function changePassword({
  password = "",
  username = "",
  forceReset = false
}) {
  const hashed = bcrypt.hashSync(password, 10)
  return user.update({
    password: hashed,
    forceReset: forceReset
  }, {
    where: {
      username: username
    }
  })
}


export function ChangeStatus({
  username = "",
  status = "Active"
}) {
  return user.update({
    status: status
  }, {
    where: {
      username: username
    }
  })
}
export function login({
  username = "blobl",
  password = "bob"
}) {
  return new Promise((res, rej) => {
    user.findOne({
      where: {
        username: username,
        status: "active"
      },
      include: [{
        model: user_permission
      }],
    }).then(thisUser => {

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
  password = "",
  email = ""
}) {

  const hashed = bcrypt.hashSync(password, 10)

  const res = await user.create({
    username: username,
    password: hashed,
    email: email
  })
  return login({
    username: username,
    password: password
  })
}

export function GetUsers() {

  return user.findAll({
    attributes: ['username', 'status', 'email'],
    include: [{
      model: user_permission
    }],

  })
}

export function DeleteUser({
  username = ""
}) {
  return user.update({
    status: "deleted"
  }, {
    where: {
      username: username
    }
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