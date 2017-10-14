'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Order = models.order

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Order.find()
    .then(orders => res.json({
      orders: orders.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    order: req.order.toJSON({ virtuals: true, user: req.user })
  })
}

const create = (req, res, next) => {
  const order = Object.assign(req.body.order, {
    _owner: req.user._id
  })
  Order.create(order)
    .then(order =>
      res.status(201)
        .json({
          order: order.toJSON({ virtuals: true, user: req.user })
        }))
    .catch(next)
}

const update = (req, res, next) => {
  delete req.body.order._owner  // disallow owner reassignment.
  // console.log('req.order.products is ', req.order.products)
  // console.log('req.body.order is: ', req.body.order)
  // console.log('req.body.order.products is ', req.body.order.products)
  // console.log('req.body.order.products.id is: ', req.body.order.products.id)
  if (req.body.order.products.id === undefined) {
    const prodArray = req.order.products
    prodArray.push(req.body.order.products)
    // console.log(prodArray)
    // console.log(req.body.order)
    req.body.order.products = prodArray
    req.order.update(req.body.order)
      .then(() => res.sendStatus(204))
      .catch(next)
  } else {
    const productId = req.body.order.products.id
    const orderId = req.body.order.id
    Order.findByIdAndUpdate(orderId, {
      $pull: {
        products: {
          _id: productId
        }
      }
    })
      .then(() => res.sendStatus(204))
      .catch(next)
  }
}

const destroy = (req, res, next) => {
  req.order.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Order), only: ['show'] },
  { method: setModel(Order, { forUser: true }), only: ['update', 'destroy'] }
] })
