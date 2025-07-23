import { EyeOn } from '@/assets/icons/common';
import { CalendarIcon } from '@/assets/icons/dashboard';
import { UsersIcon } from '@/assets/icons/sidebar';
import { ClockIcon, LocationIcon } from '@/assets/icons/user-management';
import Img from '@/components/common/Img';
import JobCountDown from '@/components/user-management/job-countdown';
import JobStatus from '@/components/user-management/job-status';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import moment from 'moment';

const Jobs = ({ data }) => {
  return (
    <>
      <div className='flex flex-col gap-y-4'>
        {data.map((data) => {
          return (
            <div key={data.id} className='p-4 bg-gradient-to-tr from-80% to-20% from-text-13 to-[#FFFFFF33] bg-text-13 rounded-xl'>
              <div className='flex items-center justify-between gap-x-2'>
                <div className='flex items-center gap-x-2'>
                  <p className='text-sm text-text-1 font-bold'>{data.title}</p>
                  <div className='space-x-1'>
                    <JobStatus status={data.status} />
                    {data.countdown && <JobCountDown time={data.countdown} />}
                  </div>
                </div>
                <p className='text-sm text-text-2 font-semibold'>₱{data.rate}/hr</p>
              </div>
              <ul className="mt-3 flex flex-col gap-y-1.5">
                <li className="flex items-center gap-x-1.5">
                  <LocationIcon className="size-[18px] min-w-[18px] stroke-text-1 stroke-[1.5px]" />
                  <span className="text-text-1 text-xs opacity-70">{data.address}</span>
                </li>
                <li className="flex items-center gap-x-1.5">
                  <CalendarIcon className="size-[18px] min-w-[18px] stroke-text-1 stroke-[2px]" />
                  <div className="w-full flex items-center justify-between">
                    <span className="text-text-1 text-xs opacity-70">{data.status === 0 ? "Accepted" : "Starts"}: {moment(data.start_date).format('MMM DD, YYYY')} {data.isPartTime && "| Part Time"}</span>
                  </div>
                </li>
                <li className="flex items-center gap-x-1.5">
                  <ClockIcon className="size-[18px] min-w-[18px] stroke-text-1 stroke-[2px]" />
                  <div className="w-full flex items-center justify-between">
                    <span className="text-text-1 text-xs opacity-70">{data.hours_per_week} Hours per week</span>
                  </div>
                </li>
                {data.status ?
                  <li className="flex items-center gap-x-3">
                    <div className="flex items-center gap-x-1.5">
                      <EyeOn className="size-[18px] min-w-[18px] stroke-text-1 stroke-[2px]" />
                      <div className="w-full flex items-center justify-between">
                        <span className="text-text-1 text-xs opacity-70">{data.hours_per_week} Viewers</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-x-1.5">
                      <UsersIcon className="size-[18px] min-w-[18px] stroke-text-1 stroke-[2px]" />
                      <div className="w-full flex items-center justify-between">
                        <span className="text-text-1 text-xs opacity-70">{data.applicants} Applicants</span>
                      </div>
                    </div>
                  </li>
                  : null}
                <li className="flex items-center justify-between gap-x-1.5">
                  <div className="flex items-center gap-x-1.5">
                    <CalendarIcon className="size-[18px] min-w-[18px] stroke-text-1 stroke-[2px]" />
                    <div className="w-full flex items-center justify-between">
                      <span className="text-text-1 text-xs opacity-70">{moment(data.expiry_date).format('MMM DD, YYYY')} {data.isPartTime && "| Part Time"}</span>
                    </div>
                  </div>
                  <span className="text-text-1 text-xs opacity-70">Expiry Date</span>
                </li>
              </ul>
              <Separator className="my-3 bg-text-1 opacity-10" />
              {data.chosen_applicant ?
                <div className='flex items-center gap-x-2'>
                  <Img src={data.chosen_applicant_img} className="min-w-7 min-h-7 size-7 rounded-full border-2 border-text-19" />
                  <p className='text-sm text-text-9'>
                    <span className="text-text-1 font-medium">{data.chosen_applicant}</span>
                    &nbsp;
                    was chosen for this job.
                  </p>
                </div>
                : null}
              <div className="mt-6 pb-2 flex items-center gap-x-2">
                <Button type="button" className="w-full p-1.5 rounded-full text-sm text-text-2 bg-transparent border border-text-2 hover:bg-transparent">
                  Cancel
                </Button>
                {!data.chosen_applicant
                  ? <Button type="button" className="w-full p-1.5 rounded-full text-sm text-text-2 bg-transparent border border-text-2 hover:bg-transparent">
                    Mark as hired
                  </Button>
                  : null}
                <Button type="button" className="w-full p-1.5 rounded-full text-sm text-text-1 bg-text-24 border border-text-24 hover:bg-text-24">
                  View
                </Button>
              </div>
            </div>
          )
        })}
      </div >
    </>
  )
}

export default Jobs