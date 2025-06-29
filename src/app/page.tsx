import { redirect } from 'next/navigation'

import { LogoutButton } from '@/components/logout-button'
import { createClient } from '@/lib/supabase/server'
// import { PrismaClient } from '@/generated/prisma'
// import { withAccelerate } from "@prisma/extension-accelerate"
import prisma from '@/lib/prisma'



export default async function ProtectedPage() {
  const supabase = await createClient()


  const { data, error } = await supabase.auth.getUser()
  // seems little point here since middleware dealt with it.
  // if (error || !data?.user) {
  //   redirect('/auth/login')
  // }



  const profile = await prisma.profile.findFirst();

  return (
    <div className="flex h-svh w-full items-center justify-center gap-2">
      <p>
        Hello <span>{data?.user?.email}</span>
      </p>
      <p>
        {
          profile?.givenName || "no profile"
        }
      </p>
      <LogoutButton />
    </div>
  )
}