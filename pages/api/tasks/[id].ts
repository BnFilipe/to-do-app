// pages/api/tasks/[id].ts
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id)

  if (isNaN(id)) {
    return res.status(400).json({ erro: 'ID inválido' })
  }

  if (req.method === 'PUT') {
    const { titulo, concluida } = req.body

    const tarefaAtualizada = await prisma.tarefa.update({
      where: { id },
      data: { titulo, concluida }
    })

    return res.status(200).json(tarefaAtualizada)
  }

  if (req.method === 'DELETE') {
    await prisma.tarefa.delete({ where: { id } })
    return res.status(204).end()
  }

  return res.status(405).json({ erro: 'Método não permitido' })
}
