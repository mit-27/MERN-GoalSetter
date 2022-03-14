import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { deleteGoal,updateGoal } from '../features/goals/goalSlice'
import { toast } from 'react-toastify'


function GoalItem({ goal }) {
  const dispatch = useDispatch()
  const [text,setText] = useState(goal.text)

  const ChangeGoal = () => {
    if(text===goal.text)
    {
      toast.error('Change goal value')
    }
    else
    {
      console.log('New text : ',text)
      dispatch(updateGoal({id:goal._id,text}))
      
      
    }
  }

  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h2>{goal.text}</h2>
      <div className="container">
      <div className='form-group'>
          <label htmlFor='text'>Update Goal</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' onClick={() => ChangeGoal()}>
            Update Goal
          </button>
        </div>
      </div>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default GoalItem