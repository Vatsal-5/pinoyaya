import { UserIcon } from '@/assets/icons/common'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { H4 } from '@/components/ui/Typography'
import { useNavigate } from '@tanstack/react-router'
import { ChevronRight, X } from 'lucide-react'
import { Route as LoginRoute } from '@/routes/(auth)/login'
import { useBoolean } from 'usehooks-ts'

const index = () => {
  const navigate = useNavigate()
  const logoutModal = useBoolean(false)
  return (
    <Popover modal open={logoutModal.value} onOpenChange={logoutModal.setValue}>
      <PopoverTrigger className="relative cursor-pointer">
        <UserIcon className="size-7 stroke-text-1 stroke-[1.5px]" />
      </PopoverTrigger>
      <PopoverContent overlay align="end" sideOffset={16} className="w-[256px] p-5 space-y-6 rounded-xl">
        <div className='flex flex-col gap-y-1'>
          <div className='flex justify-between items-center'>
            <H4 text="Admin" className="text-text-1 font-medium" />
            <Button type="button" className="p-0 shadow-none bg-transparent hover:bg-transparent" onClick={logoutModal.setFalse}>
              <X className='size-5 text-text-4' />
            </Button>
          </div>
          <span className='text-sm text-text-1 opacity-40'>ann.smith@gmail.com</span>
        </div>
        <Button
          type="button"
          className="w-full justify-between text-sm text-text-2 border border-text-2 rounded-full bg-transparent hover:bg-transparent"
          onClick={() => navigate({ to: LoginRoute.fullPath })}
        >
          Log Out
          <ChevronRight className='size-4' />
        </Button>
      </PopoverContent>
    </Popover>
  )
}

export default index