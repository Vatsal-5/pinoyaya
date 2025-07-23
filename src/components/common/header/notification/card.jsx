import { StickyNoteIcon } from '@/assets/icons/notification';
import { UsersIcon } from '@/assets/icons/sidebar';
import { Button } from '@/components/ui/button';
import moment from 'moment';

const Card = ({ notification }) => {
  const { title, description, time, isNewUser } = notification;

  return (
    <div className='flex flex-col gap-y-1 py-4 border-b last:border-b-0 first:pt-0 last:pb-0'>
      <div className="flex items-center gap-x-4">
        <div className='flex items-center'>
          <div className="size-11 bg-text-19 rounded-full flex items-center justify-center">
            {isNewUser ? <UsersIcon className="size-6 stroke-text-2" /> : <StickyNoteIcon className="size-6 stroke-text-2" />}
          </div>
        </div>
        <div className='w-full flex justify-between gap-x-2'>
          <div className='flex-1 space-y-0.5'>
            <div className="text-sm font-semibold text-text-1">{title}</div>
            <div className="text-[13px] text-text-1 opacity-70">{description}</div>
          </div>
          <div className="flex items-end">
            <span className='text-xs text-text-1 whitespace-nowrap opacity-40'>{moment(time).fromNow()}</span>
          </div>
        </div>
      </div>
      {isNewUser &&
        <Button type="submit" className="w-max ml-[60px] py-1 px-3 text-sm rounded-xl">
          Review
        </Button>}
    </div>
  );
}

export default Card