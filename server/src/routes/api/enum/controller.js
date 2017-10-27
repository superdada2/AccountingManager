import {
  class_enum,
  currency_enum,
  product_enum,
  revenue_type_enum,
  status_enum,
  subscription_enum,
  type_enum,
  month_enum
} from '../../../models';
import Promise from 'bluebird';

export function getClass() {
  return class_enum.findAll()
}

export function addClass({
  data = ''
}) {
  return class_enum.create({
    data: data
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

export function getMonth() {
  return month_enum.findAll()
}