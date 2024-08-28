import React from 'react'

function DisplayTasks({allTasks,HandleDeleteTask,HandleEditTask}) {
  return (
    <div className='grid grid-cols-5 w-[100%] gap-4 text-lg'>
        {allTasks.map((task, index) => (
          <div
            key={index}
            className='border border-2 border-white/40 rounded-md m-2 p-2 bg-white/40 '
          >
            <p className='text-md'>Task - {index + 1}</p>
            <h3>{task}</h3>
            <button onClick={() => HandleDeleteTask(index)} className='bg-red-500 text-white rounded-lg px-4 py-2 mt-4'>Delete</button>
            <button onClick={() => HandleEditTask(index)} className='bg-red-500 text-white rounded-lg px-4 py-2 mt-4 mx-2'>Edit</button>
          </div>
        ))}
      </div>
  )
}

export default DisplayTasks
