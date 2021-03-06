import {
  class_enum,
  currency_enum,
  product_enum,
  revenue_type_enum,
  status_enum,
  subscription_enum,
  type_enum,
  month_enum,
  country_enum
} from '../../../models';
import Promise from 'bluebird';



export function getClass() {
  return class_enum.findAll()
}

export function getCountry() {
  return country_enum.findAll()
}

export function addClass({
  data = ''
}) {
  return class_enum.create({
    data: data
  })
}

export function updateClass({
  id = 0,
  data = "updated"
}) {
  return class_enum.update({
    data: data
  }, {
    where: {
      id: id
    }
  })
}

export function deleteClass({
  id = 0
}) {
  return class_enum.destroy({
    where: {
      id: id
    }
  })
}

export function getCurrency() {
  return currency_enum.findAll()
}

export function addCurrency({
  data = ''
}) {
  return currency_enum.create({
    data: data
  })
}

export function updateCurrency({
  id = 0,
  data = "updated"
}) {
  return currency_enum.update({
    data: data
  }, {
    where: {
      id: id
    }
  })
}

export function deleteCurrency({
  id = 0
}) {
  return currency_enum.destroy({
    where: {
      id: id
    }
  })
}


export function getProduct() {
  return product_enum.findAll()
}

export function addProduct({
  data = ''
}) {
  return product_enum.create({
    data: data
  })
}

export function updateProduct({
  id = 0,
  data = "updated"
}) {
  return product_enum.update({
    data: data
  }, {
    where: {
      id: id
    }
  })
}

export function deleteProduct({
  id = 0
}) {
  return product_enum.destroy({
    where: {
      id: id
    }
  })
}


export function getRevenueType() {
  return revenue_type_enum.findAll()
}

export function addRevenueType({
  data = ''
}) {
  return revenue_type_enum.create({
    data: data
  })
}

export function updateRevenueType({
  id = 0,
  data = "updated"
}) {
  return revenue_type_enum.update({
    data: data
  }, {
    where: {
      id: id
    }
  })
}

export function deleteRevenueType({
  id = 0
}) {
  return revenue_type_enum.destroy({
    where: {
      id: id
    }
  })
}


export function getStatus() {
  return status_enum.findAll()
}

export function addStatus({
  data = ''
}) {
  return status_enum.create({
    data: data
  })
}

export function updateStatus({
  id = 0,
  data = "updated"
}) {
  return status_enum.update({
    data: data
  }, {
    where: {
      id: id
    }
  })
}

export function deleteStatus({
  id = 0
}) {
  return status_enum.destroy({
    where: {
      id: id
    }
  })
}


export function getSubscription() {
  return subscription_enum.findAll()
}

export function addSubscription({
  data = ''
}) {
  return subscription_enum.create({
    data: data
  })
}

export function updateSubscription({
  id = 0,
  data = "updated"
}) {
  return subscription_enum.update({
    data: data
  }, {
    where: {
      id: id
    }
  })
}

export function deleteSubscription({
  id = 0
}) {
  return subscription_enum.destroy({
    where: {
      id: id
    }
  })
}


export function getType() {
  return type_enum.findAll()
}

export function addType({
  data = ''
}) {
  return type_enum.create({
    data: data
  })
}

export function updateType({
  id = 0,
  data = "updated"
}) {
  return type_enum.update({
    data: data
  }, {
    where: {
      id: id
    }
  })
}

export function deleteType({
  id = 0
}) {
  return type_enum.destroy({
    where: {
      id: id
    }
  })
}

export function getMonth() {
  return month_enum.findAll()
}

export function update({
  type = 'class',
  id = 0,
  data = 'Updated'
}) {
  switch (type) {
    case 'class':
      return updateClass({
        id: id,
        data: data
      })
      break;
    case 'currency':
      return updateCurrency({
        id: id,
        data: data
      })
      break;
    case 'product':
      return updateProduct({
        id: id,
        data: data
      })
      break;
    case 'revenueType':
      return updateRevenueType({
        id: id,
        data: data
      })
      break;
    case 'status':
      return updateStatus({
        id: id,
        data: data
      })
      break;
    case 'subscription':
      return updateSubscription({
        id: id,
        data: data
      })
      break;
    case 'type':
      return updateType({
        id: id,
        data: data
      })
      break;
  }
}

export function deleteEnum({
  type = 'class',
  id = 0,
  data = 'Updated'
}) {
  switch (type) {
    case 'class':
      return deleteClass({
        id: id,
      })
      break;
    case 'currency':
      return deleteCurrency({
        id: id,
      })
      break;
    case 'product':
      return deleteProduct({
        id: id,
      })
      break;
    case 'revenueType':
      return deleteRevenueType({
        id: id,
      })
      break;
    case 'status':
      return deleteStatus({
        id: id,
      })
      break;
    case 'subscription':
      return deleteSubscription({
        id: id,
      })
      break;
    case 'type':
      return deleteType({
        id: id,
      })
      break;
  }
}

export function add({
  type = 'class',
  data = 'Updated'
}) {
  switch (type) {
    case 'class':
      return addClass({
        data: data
      })
      break;
    case 'currency':
      return addCurrency({
        data: data
      })
      break;
    case 'product':
      return addProduct({
        data: data
      })
      break;
    case 'revenueType':
      return addRevenueType({
        data: data
      })
      break;
    case 'status':
      return addStatus({
        data: data
      })
      break;
    case 'subscription':
      return addSubscription({
        data: data
      })
      break;
    case 'type':
      return addType({
        data: data
      })
      break;
  }
}