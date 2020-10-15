import Sortition from '../models/Sortition'

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
      const data = req.body.participants.map(async (item) => {
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
      const { name, email } = req.body

      const userExists = Sortition.findById(id)
      console.log(userExists)
      if (userExists._id) {
        return res.status(401).json('user not found')
      }
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
}

export default new SortitionController()
