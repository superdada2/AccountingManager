export function Authorize(req, res, next, requredPermissions) {
  const permissions = [...req.user.permissions]
  if (requredPermissions.constructor === Array) {
    var authorize = undefined
    for (var i = 0; i < requredPermissions.length; i++) {
      authorize = permissions.find(j => {
        return j.module === requredPermissions[i].type && j.role === requredPermissions[i].role
      })
      if (authorize) {
        break;
      }
    }
    if (authorize) {
      console.log("authorized")
      next()
    } else {
      console.log("Unauthorized")
      res.status(401).json({
        type: "error",
        message: "Unauthorized request"
      })
    }
  } else {
    const authorize = permissions.find(i => {
      return i.module === requredPermissions.type && i.role === requredPermissions.role
    })
    if (authorize) {
      console.log("authorized")
      next()
    } else {
      console.log("Unauthorized")
      res.status(401).json({
        type: "error",
        message: "Unauthorized request"
      })
    }
  }
}