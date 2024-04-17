'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { SessionProvider } from "next-auth/react";
const CreateUser = () => {
  const {data: session} = useSession(
    {required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/CreateUser')
    }}
  )

  return (
    <SessionProvider session={session}>
    <div>CreateUser</div>
    </SessionProvider>
  )
}

export default CreateUser