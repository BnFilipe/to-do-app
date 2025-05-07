// pages/api/tasks/index.ts
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const tarefas = await prisma.tarefa.findMany({ orderBy: { criadaEm: 'desc' } })
    return res.status(200).json(tarefas)
  }

  if (req.method === 'POST') {
    const { titulo } = req.body

    if (!titulo || titulo.trim() === '') {
      return res.status(400).json({ erro: 'Título é obrigatório.' })
    }

    const novaTarefa = await prisma.tarefa.create({
      data: { titulo }
    })

    return res.status(201).json(novaTarefa)
  }

  return res.status(405).json({ erro: 'Método não permitido' })
}
