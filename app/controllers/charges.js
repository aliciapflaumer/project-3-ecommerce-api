'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Charge = models.charge

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Charge.find()
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
  console.log('req.body is ', req.body)
  const charge = Object.assign(req.body)
  Charge.create(charge)
    .then(charge =>
      res.status(201)
        .json({
          charge: charge.toJSON({ virtuals: true, user: req.user })
        }))
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
  { method: authenticate, except: ['index', 'show', 'create'] },
  { method: setModel(Charge), only: ['show'] },
  { method: setModel(Charge, { forUser: true }), only: ['update', 'destroy'] }
] })
