import mongoose from 'mongoose'

const SortitionSchema = new mongoose.Schema(
  {
    name_sortition:{
      type:String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name_friend: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('SortitionSchema', SortitionSchema)
