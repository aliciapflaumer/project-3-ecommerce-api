'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Charge = models.charge

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

// const keyPublishable = pk_test_IWtf8h0ew1zAXAmlNvnTtXKo
// const keySecret = process.env.SECRET_KEY
const stripe = require('stripe')('sk_test_vl80VL6bvo2yITX7PNMzVUZp')

const index = (req, res, next) => {
  Charge.find({ _owner: req.user })
    .then(charges => res.json({
      charges: charges.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    charge: req.charge.toJSON({ virtuals: true, user: req.user })
  })
}

const create = (req, res, next) => {
  // console.log('req.body is ', req.body)
  const charge = {}
  const token = req.body.token.id
  // console.log(req.user)
  const totalAmount = req.body.amount

  stripe.charges.create({
    amount: totalAmount,
    currency: 'usd',
    source: token
  })
    // .then((data) => console.log('stripe response is: ', data))
    .then(function (data) {
      charge.amount = data.amount
      charge.stripeToken = data.id
      charge.description = data.description
      charge._owner = '59df8c888f6fc16ed71cb882'
      // This sets the owner for all charges to be the admin account
      return charge
    })
    // .then(data => console.log('charge is ', data))
    .then(data => Charge.create(data))
    // .then((data) => console.log('data after charge created: ', data))
    .then(data =>
      res.status(201)
        .json({
          charge: data.toJSON()
        })
      )
    .catch(next)
}

const update = (req, res, next) => {
  delete req.body._owner  // disallow owner reassignment.
  req.charge.update(req.body.charge)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.charge.remove()
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
  { method: authenticate },
  { method: setModel(Charge), only: ['show'] },
  { method: setModel(Charge, { forUser: true }), only: ['update', 'destroy'] }
] })
