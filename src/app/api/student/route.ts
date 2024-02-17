
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prismaClient from '@/lib/prisma'


//rota procurar um aluno
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const studentEmail = searchParams.get("email")

  if (!studentEmail || studentEmail === "") {
    return NextResponse.json({ error: "Aluno(a) não encontrado(a)!" }, { status: 400 })
  }

  try {
    const student = await prismaClient.student.findFirst({
      where: {
        email: studentEmail
      }
    })

    return NextResponse.json(student)

  } catch (err) {
    return NextResponse.json({ error: "Aluno(a) não encontrado(a)!" }, { status: 400 })
  }

}

//rota deletar um aluno
export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id")

  if (!userId) {
    return NextResponse.json({ error: "Falha ao excluir aluno(a)" }, { status: 400 })
  }


  const findTickets = await prismaClient.ticket.findFirst({
    where: {
      studentId: userId
    }
  })

  if (findTickets) {
    return NextResponse.json({ error: "Falha ao excluir aluno(a)" }, { status: 400 })
  }

  try {
    await prismaClient.student.delete({
      where: {
        id: userId as string
      }
    })

    return NextResponse.json({ message: "Aluno deletado com sucesso!" })

  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Falha ao excluir aluno(a)" }, { status: 400 })
  }

}

// Rota para cadastrar um aluno
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { name, email, phone, address, userId } = await request.json();

  try {
    await prismaClient.student.create({
      data: {
        name,
        phone,
        email,
        address: address ? address : "",
        userId: userId
      }
    })

    return NextResponse.json({ message: "Aluno(a) cadastrado(a) com sucesso!" })

  } catch (err) {
    return NextResponse.json({ error: "Falha ao cadastrar Aluno(a)" }, { status: 400 })
  }

}