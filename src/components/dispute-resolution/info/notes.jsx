import moment from "moment"

const Notes = ({ data }) => {
  return (
    <div className='flex flex-col gap-y-4'>
      {data.map((data) => {
        return (
          <div key={data.id} className='p-4 bg-gradient-to-tr from-80% to-20% from-text-13 to-[#FFFFFF33] bg-text-13 rounded-xl'>
            <div className='flex items-center gap-x-2'>
              <div className="bg-text-5 size-5 rounded-full flex items-center justify-center">
                <span className="text-[10px] text-text-1">{data.fname.at(0)}{data.lname.at(0)}</span>
              </div>
              <p className='text-sm text-text-1 font-medium'>{data.fname} {data.lname}</p>
            </div>
            <p className="my-3 text-text-2 text-sm font-medium">{moment(data.createdAt).format("DD MMM YYYY H:mmA")}</p>
            <p className="text-text-1 text-xs">{data.message}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Notes