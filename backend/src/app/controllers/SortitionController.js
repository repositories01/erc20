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
      // let names = []
      // req.body.participants.map(item => {
      //   names.push(item.name)
      // })
      const data = req.body.participants.map(async item => {
        await Sortition.create({
          name_sortition: req.body.name_sortition,
          name: item.name,
          email: item.email,
        })
        // const randomIndex = Math.floor(Math.random() * names.length)

        // const obj = Object.assign(
        //   {
        //     name_sortition: req.body.name_sortition,
        //     name: item.name,
        //     email: item.email,
        //   },
        //   item.name != names[randomIndex]
        //     ? { name_friend: names[randomIndex] }
        //     : { name_friend: names[i + 1] }
        // )
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

      const {name, email} = req.body

      


      await Sortition.updateOne({ _id: id }, { name, email })
      
      // const updatePromises = req.body.map(e =>
      //   Sortition.findOneAndUpdate(
      //     { name_sortition: req.params.name_sortition },
      //     { $set: { name: e.name, email: e.name } }
      //   )
      // )

      // Promise.all(updatePromises)
      //   .then(console.log)
      //   .catch(console.error)

      // const userExists = Sortition.findById(id)
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
      const { name_sortition } = req.body

      // const nameSortitionExists = Sortition.find({ name_sortition })

      // if (!nameSortitionExists) {
      //   res.json('not found')
      // }
      const name = 'nome'
      const name_friend = 'nome-fiend'

      mailer.sendMail(
        {
          to: 'thiagomedina.tmd@gmail.com',
          from: 'thiagomedina001@gmail.com',
          template: 'notification',
          context: { name, name_friend },
        },
        err => {
          console.log(err)
        }
      )

      return res.json()
    } catch (err) {
      console.log(err)
    }
  }
}

export default new SortitionController()
