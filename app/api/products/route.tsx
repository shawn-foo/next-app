import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

export async function GET(request:NextRequest) {
  const products = await prisma.product.findMany()
  return NextResponse.json(products)
}

export async function POST(request:NextRequest) {
    const body = await request.json()
    const validation = schema.safeParse(body)
    if (!validation.success)
      return NextResponse.json(validation.error.errors, {status: 400})

    let newProduct = await prisma.product.create({
        data: {
          name: body.name,
          price: body.price
      }
    })
    return NextResponse.json(newProduct, {status: 201})
}

// export async function DELETE(request: NextRequest){
//   const body = await request.json()
//   const validation = schema.safeParse(body)
//   if (!validation.success)
//     return NextResponse.json(validation.error.errors, {status: 400})
//   return NextResponse.json({})
// }

// export async function PUT(request: NextRequest){
//   const body = await request.json()
//   const validation = schema.safeParse(body)
//   if (!validation.success)
//     return NextResponse.json(validation.error.errors, {status: 404})

//   return NextResponse.json({id: 1, name: body.name})
// }