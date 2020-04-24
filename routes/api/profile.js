const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')

const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @route   POST api/profile/me
// @desc    GET current users profile
// @access  Private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })

    if (!profile) {
      res.status(400).json({ msg: 'Profile not found' })
    }
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private

router.post(
  '/',
  [
    auth,
    [
      check('name', 'Full name is required')
        .not()
        .isEmpty()
        .isLength({ max: 50 }),
      check('address1', 'Address1 is required')
        .not()
        .isEmpty()
        .isLength({ max: 100 }),
      check('address2').isLength({ max: 100 }),
      check('city', 'City is required').not().isEmpty().isLength({ max: 100 }),
      check('state', 'State is required').not().isEmpty(),
      check(
        'zipcode',
        'Please enter zipcode with atleast 5 character'
      ).isLength({ min: 5, max: 9 }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, address1, address2, city, state, zipcode } = req.body
    const profileField = {}

    profileField.user = req.user.id
    if (name) profileField.name = name
    if (address1) profileField.address1 = address1
    if (address2) profileField.address2 = address2
    if (city) profileField.city = city
    if (state) profileField.state = state
    if (zipcode) profileField.zipcode = zipcode

    try {
      let profile = await Profile.findOne({ user: req.user.id })

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileField },
          { new: true }
        )
        return res.json(profile)
      }

      profile = new Profile(profileField)
      await profile.save()
      res.json(profile)
    } catch (err) {
      console.error(err.messge)
      res.status(500).send('Server Error')
    }
  }
)

// @route   GET api/profile
// @desc    Get all profile
// @access  Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find()
    res.json(profiles)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id })

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' })
    }

    res.json(profile)
  } catch (err) {
    console.error(err.message)
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' })
    }
    res.status(500).send('Server Error')
  }
})

// @route   DELETE api/profile
// @desc    Get all profile
// @access  Private

router.delete('/', auth, async (req, res) => {
  try {
    // Remove   profile
    await Profile.findOneAndDelete({ user: req.user.id })
    await User.findOneAndDelete({ _id: req.user.id })
    res.json({ msg: 'User deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   PUT api/profile/quotelist
// @desc    Add quote
// @access  Private

router.put(
  '/quotelist',
  [
    auth,
    [
      check('gallons', 'Number of gallons is required').not().isEmpty(),
      check('deliveryDate', 'Delivery Date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { gallons, deliveryDate } = req.body

    const newQuote = {
      gallons,
      deliveryDate,
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id })
      if (!profile) {
        return res.status(400).json({ msg: 'Profile not found' })
      }

      date1 = newQuote.deliveryDate
      month = date1[5] + date1[6] + date1[8] + date1[9]
      day = parseInt(month)
      var current = 1.5
      var location
      var hist
      var galRequested
      var profit = 0.1
      var fluctuation = 0

      if (day > 620 && day < 922) {
        fluctuation = 0.04
      } else {
        fluctuation = 0.03
      }

      if (profile.state === 'TX') {
        location = 0.02
      } else {
        location = 0.04
      }

      if (profile.quoteList.length < 1) {
        hist = 0
      } else {
        hist = 0.01
      }

      if (newQuote.gallons > 1000) {
        galRequested = 0.02
      } else {
        galRequested = 0.03
      }
      var price =
        current * (location - hist + galRequested + profit + fluctuation)
      var total = price * newQuote.gallons

      newQuote.deliveryAddress = profile.address1
      newQuote.deliveryAddress2 = profile.address2
      newQuote.suggestedPrice = price.toFixed(2)
      newQuote.totalPrice = total.toFixed(2)

      profile.quoteList.unshift(newQuote)
      await profile.save()
      res.json(profile.quoteList)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route   DELETE api/profile/quotelist/:quo_id
// @desc    Delete experience from profile
// @access  Private

router.delete('/quotelist/:quo_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    const removeIndex = profile.quoteList
      .map((item) => item.id)
      .indexOf(req.params.quo_id)
    profile.quoteList.splice(removeIndex, 1)
    await profile.save()
    res.json(profile.quoteList)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
