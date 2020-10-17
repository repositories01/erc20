import Sortition from '../models/Sortition'
import mailer from '../../lib/Mail'

class SortitionController {
  async index(req, res) {
    const result = await Sortition.find({})
    return res.json(result)
  }
  async store(req, res) {
    try {
      const SortitionNameExists = await Sortition.find({
        name_sortition: req.body.name_sortition,
      })

      if (SortitionNameExists.length > 0) {
        return res.status(401).json({
          error: 'the draw name already exist, please change the name ',
        })
      }

      const data = req.body.participants.map(async item => {
        await Sortition.create({
          name_sortition: req.body.name_sortition,
          name: item.name,
          email: item.email,
          name_friend: '',
        })
      })
      return res.status(201).json('new draw successfully created')
    } catch (err) {
      console.log(err)
      return res
        .status(401)
        .json({ error: 'not was possible create a new draw' })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params

      const SortitionNameExists = await Sortition.findById({ _id: id })

      if (!SortitionNameExists) {
        return res.status(401).json('user not found')
      }

      const { name, email } = req.body

      await Sortition.updateOne({ _id: id }, { name, email })

      return res.status(200).json('updated successfully')
    } catch (err) {
      console.log(err)
      return res.status(401).json('not was possible update the user')
    }
  }

  async destroy(req, res) {
    const { id } = req.params
    await Sortition.findByIdAndDelete({ _id: id })
    return res.status(200).json('deleted successfully')
  }

  async raffle(req, res) {
    try {
      const { name_sortition } = req.params

      const nameSortition = await Sortition.find({
        name_sortition,
      })

      if (!nameSortition) {
        res.json('not found')
      }

      let names = []
      nameSortition.map(item => {
        names.push(item.name)
      })

      nameSortition.map(async (item, i) => {
        const randomIndex = Math.floor(Math.random() * names.length)
        const otherIndex = Math.floor(Math.random() * names.length)

        const obj = Object.assign(
          item.name === names[randomIndex]
            ? { name_friend: names.splice(randomIndex, 1) }
            : { name_friend: names[randomIndex] }
        )

        await Sortition.updateOne({ _id: item.id }, { $set: obj })
        return obj
      })

      const emailName = await Sortition.find({
        name_sortition,
      })

      emailName.map(e => {
        const { name, email, name_friend } = e

        mailer.sendMail(
          {
            to: email,
            from: 'contato@thiagomedina.me',
            template: 'notification',
            context: { name, name_friend },
          },
          err => {
            if (err) {
              console.log(err)
            }
          }
        )
      })

      return res.status(201).json( 'Sent successfully' )
    } catch (err) {
      console.log(err)
      return res.status(400).json('It was not possible to send the email')
    }
  }
}

export default new SortitionController()
