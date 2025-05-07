// components/TaskItem.tsx
import React from 'react'

interface TaskItemProps {
  id: number
  titulo: string
  concluida: boolean
  onDelete: () => void
  onToggleConcluida: () => void
}

const TaskItem: React.FC<TaskItemProps> = ({ id, titulo, concluida, onDelete, onToggleConcluida }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={concluida}
          onChange={onToggleConcluida}
          className="mr-4"
        />
        <span className={concluida ? 'line-through text-gray-500' : ''}>{titulo}</span>
      </div>
      <button onClick={onDelete} className="text-red-500">Excluir</button>
    </div>
  )
}

export default TaskItem
