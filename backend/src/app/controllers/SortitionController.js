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

      if (SortitionNameExists) {
        return res
          .status(401)
          .json({
            error: 'the draw name already exist, please change the name ',
          })
      }
      let names = []
      req.body.participants.map(item => {
        names.push(item.name)
      })
      const data = req.body.participants.map(async (item, i) => {
        const randomIndex = Math.floor(Math.random() * names.length)

        const obj = Object.assign(
          {
            name_sortition: req.body.name_sortition,
            name: item.name,
            email: item.email,
          },
          item.name != names[randomIndex]
            ? { name_friend: names[randomIndex] }
            : { name_friend: names[i + 1] }
        )

        await Sortition.create(obj)
        return obj
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
    return res.json('ok')
  }
}

export default new SortitionController()
