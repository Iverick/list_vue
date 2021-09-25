const express = require('express')
const BucketListItem = require("../models/bucketListItem.models.js")

const router = express.Router()

router.get('/', async(req, res) => {
  try {
    const bucketListItems = await BucketListItem.find()
    if (!bucketListItems) throw new Error('No BucketListItems')
    const sorted = bucketListItems.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
    res.status(200).json(sorted)
  } catch (err) {
     res.status(500).json({ error: err.message })
  }
})

router.post('/', async(req, res) => {
  const newBucketListItem = new BucketListItem(req.body)
  try {
    const bucketListItem = await newBucketListItem.save()
    if (!bucketListItem) throw new Error('Could not save the BucketListItem')
    res.status(200).json(bucketListItem)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/:id', async(req, res) => {
  const { id } = req.params
  try {
    const bucketListItem = await BucketListItem.findByIdAndUpdate(id, req.body)
    if (!bucketListItem) throw new Error('Could not update the BucketListItem')
    const updated = { ...bucketListItem._doc, ...req.body }
    res.status(200).json(updated)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/:id', async(req, res) => {
  const { id } = req.params

  try {
    const removed = await BucketListItem.findByIdAndDelete(id)
    if (!removed) throw new Error('Could not delete the BucketListItem')
    res.status(200).json(removed)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
