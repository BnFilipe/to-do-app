// pages/index.tsx
'use client'
import { useState, useEffect } from 'react'
import TaskItem from '.././components/TaskItem'

interface Task {
  id: number
  titulo: string
  concluida: boolean
}

export default function Home() {
  const [tarefas, setTarefas] = useState<Task[]>([])
  const [novoTitulo, setNovoTitulo] = useState('')
  const [loading, setLoading] = useState(false)

  // Carregar tarefas
  const fetchTarefas = async () => {
    setLoading(true)
    const res = await fetch('/api/tasks')
    const data = await res.json()
    setTarefas(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchTarefas()
  }, [])

  // Criar nova tarefa
  const handleCreate = async () => {
    if (!novoTitulo.trim()) return
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ titulo: novoTitulo }),
    })

    const data = await res.json()
    if (res.ok) {
      setNovoTitulo('')
      fetchTarefas()
    } else {
      alert(data.erro)
    }
  }

  // Deletar tarefa
  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' })
    if (res.ok) fetchTarefas()
  }

  // Marcar como concluída
  const handleToggleConcluida = async (id: number, concluida: boolean) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ concluida: !concluida }),
    })

    if (res.ok) fetchTarefas()
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">To-Do List</h1>

      <div className="mb-4">
        <input
          type="text"
          value={novoTitulo}
          onChange={(e) => setNovoTitulo(e.target.value)}
          placeholder="Adicionar nova tarefa"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleCreate}
          className="mt-2 w-full p-2 bg-blue-500 text-white rounded-md"
        >
          Adicionar
        </button>
      </div>

      {loading ? (
        <div className="text-center">Carregando...</div>
      ) : (
        <div>
          {tarefas.length === 0 ? (
            <div className="text-center">Não há tarefas</div>
          ) : (
            tarefas.map((tarefa) => (
              <TaskItem
                key={tarefa.id}
                id={tarefa.id}
                titulo={tarefa.titulo}
                concluida={tarefa.concluida}
                onDelete={() => handleDelete(tarefa.id)}
                onToggleConcluida={() => handleToggleConcluida(tarefa.id, tarefa.concluida)}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}
