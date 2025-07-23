import { UserIcon } from "@/assets/icons/common";
import { CalendarIcon } from "@/assets/icons/dashboard";
import { CalendarCheckIcon, EmailIcon, ImageIcon, Language, LocationIcon, PDFIcon, PhoneIcon, PriceIcon, TimeIcon, VideoIcon } from "@/assets/icons/user-management";
import VerificationStatus from '@/components/user-management/verification-status';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { faker } from '@faker-js/faker';
import { Check } from "lucide-react";
import moment from "moment";
import { useMemo, useState } from "react";
import { useBoolean } from "usehooks-ts";
import Preview from "./preview";

const Info = () => {
  const previewModal = useBoolean()

  const [preview, setPreview] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([
    { file: `${import.meta.env.VITE_BASE_PATH}/sample.pdf`, approved: faker.datatype.boolean() },
    { file: `${import.meta.env.VITE_BASE_PATH}/sample.mp4`, approved: faker.datatype.boolean() }
  ]);
  const [strikes, setStrikes] = useState(0);

  const userData = useMemo(() => ({
    id: faker.database.mongodbObjectId(),
    profession: faker.helpers.arrayElement(["Babysitter"]),
    language: faker.helpers.arrayElement(["English", "German", "Spanish", "French", "Hindi"]),
    email: faker.internet.email(),
    phone: faker.phone.number({ style: "international" }),
    address: `${faker.location.city()}, ${faker.location.state()}, ${faker.location.zipCode()}`,
    dob: faker.date.birthdate({ min: 1985, max: 2003, mode: 'year' }),
    registration_date: faker.date.recent(),
    rate: "₱" + faker.number.int({ min: 100, max: 200 }) + "/hr",
    availability: "Full-time (40+ hrs/week)",
    days: "Mon, Tue, Wed, Thu, Fri | Daytime",
    skills: [
      "Safety Awareness",
      "Empathy & Compassion",
      "Conflict Resolution",
      "Experienced with Special-Needs Children",
      "Experienced with Elderly Care"
    ],
    status: faker.helpers.arrayElement([0, 1, 2]),
  }), [])

  return (
    <>
      <ul className="flex flex-col gap-y-4">
        <li className="flex items-center gap-x-1.5">
          <UserIcon className="size-[18px] stroke-text-1 stroke-[2px]" />
          <span className="text-text-1 text-sm opacity-70">{userData.profession}</span>
        </li>
        <li className="flex items-center gap-x-1.5">
          <Language className="size-[18px] stroke-text-1 stroke-[1.5px]" />
          <span className="text-text-1 text-sm opacity-70">{userData.language}</span>
        </li>
        <li className="flex items-center gap-x-1.5">
          <EmailIcon className="size-[18px] stroke-text-1 stroke-[1.5px]" />
          <span className="text-text-1 text-sm opacity-70">{userData.email}</span>
        </li>
        <li className="flex items-center gap-x-1.5">
          <PhoneIcon className="size-[18px] stroke-text-1 stroke-[1.5px]" />
          <span className="text-text-1 text-sm opacity-70">{userData.phone}</span>
        </li>
        <li className="flex items-center gap-x-1.5">
          <LocationIcon className="size-[18px] stroke-text-1 stroke-[1.5px]" />
          <span className="text-text-1 text-sm opacity-70">{userData.address}</span>
        </li>
        <li className="flex items-center gap-x-1.5">
          <CalendarIcon className="size-[18px] stroke-text-1 stroke-[2px]" />
          <div className="w-full flex items-center justify-between">
            <span className="text-text-1 text-sm opacity-70">{moment(userData.dob).format("MMM DD, YYYY")}</span>
            <span className="text-text-1 text-sm opacity-70">Date of Birth</span>
          </div>
        </li>
        <li className="flex items-center gap-x-1.5">
          <CalendarCheckIcon className="size-[18px] stroke-text-1" />
          <div className="w-full flex items-center justify-between">
            <span className="text-text-1 text-sm opacity-70">{moment(userData.registration_date).format("MMM DD, YYYY")}</span>
            <span className="text-text-1 text-sm opacity-70">Registration Date</span>
          </div>
        </li>
      </ul>
      <Separator className="my-4 bg-text-19" />
      <ul className="flex flex-col gap-y-4">
        <li className="flex items-center gap-x-1.5">
          <PriceIcon className="size-[18px] stroke-text-1 stroke-[1.5px]" />
          <span className="text-text-1 text-sm opacity-70">{userData.rate}</span>
        </li>
        <li className="flex items-center gap-x-1.5">
          <TimeIcon className="size-[18px] stroke-text-1 stroke-[1.5px]" />
          <div className="w-full flex items-center justify-between">
            <span className="text-text-1 text-sm opacity-70">{userData.availability}</span>
            <span className="text-text-1 text-sm opacity-70">{userData.days}</span>
          </div>
        </li>
      </ul>
      <div className="mt-4 flex flex-col gap-y-1">
        <span className="text-text-1 text-sm opacity-70">Skills</span>
        <div className="flex gap-1 flex-wrap">
          {userData.skills.map((skill, index) => {
            return <Badge key={index} className="px-3 bg-transparent text-text-1 opacity-70 text-sm border-text-15 rounded-full">{skill}</Badge>
          })}
        </div>
      </div>
      <Separator className="my-4 bg-text-19" />
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center">
          <span className="text-text-1 text-sm opacity-70">Verification</span>
          <span className="text-text-1 text-sm opacity-70">
            {(uploadedFiles.every(data => data.approved) && uploadedFiles.length === 3)
              ? "All Required Docs Received"
              : `${uploadedFiles.length} of 3 Documents Submitted`
            }
          </span>
        </div>
        <div className="no-scrollbar h-full flex gap-x-2 overflow-x-auto">
          {uploadedFiles.map(({ file, approved }, index) => {
            const isVideo = file.includes(".mp4") || file.includes(".webm");
            const isImage = file.includes(".png") || file.includes(".jpg") || file.includes(".jpeg")
            const isPDF = file.includes(".pdf");
            return (
              <div key={index} className="h-full min-w-[100px] relative aspect-square p-2 flex flex-col justify-center gap-y-1 rounded-xl bg-text-19 overflow-hidden group">
                <div className="relative size-7 min-w-7 mx-auto">
                  {isImage && <ImageIcon className="size-7 min-w-7 mx-auto stroke-text-2" />}
                  {isVideo && <VideoIcon className="size-7 min-w-7 mx-auto fill-text-2" />}
                  {isPDF && <PDFIcon className="size-7 min-w-7 mx-auto fill-text-2" />}
                  {approved &&
                    <div className="absolute bottom-0 right-0 size-3 flex items-center justify-center rounded-full bg-text-20">
                      <Check className="size-2.5 text-white" />
                    </div>
                  }
                </div>
                <p className="text-xs text-center text-text-1 whitespace-nowrap truncate">{file}</p>
                <Button
                  type="button"
                  className="p-0 font-semibold text-xs text-text-7 bg-transparent shadow-none hover:bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation()
                    previewModal.setTrue()
                    setPreview({ file, approved, index })
                  }}
                >
                  Preview
                </Button>
              </div>
            )
          })}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-text-1 text-sm opacity-70">Verification Status</span>
          <VerificationStatus status={userData.status} />
        </div>
        <Separator className="my-4 bg-text-19" />
        <div className="flex justify-between items-center">
          <span className="text-text-1 text-sm opacity-70">Strikes</span>
          <div className="bg-text-13 space-x-2 rounded-sm">
            <Button type="button" className="p-0 text-base px-2 bg-transparent text-text-1 hover:bg-transparent" onClick={() => setStrikes(prev => prev - 1)} disabled={strikes <= 0}>-</Button>
            <span className="text-text-1 text-sm opacity-70">{strikes}</span>
            <Button type="button" className="p-0 text-base px-2 bg-transparent text-text-1 hover:bg-transparent" onClick={() => setStrikes(prev => prev + 1)}>+</Button>
          </div>
        </div>
      </div>
      <div className="mt-8 pb-2 flex items-center gap-x-2">
        <Button type="button" className="w-full p-2.5 rounded-xl text-text-2 bg-transparent border border-text-2 hover:bg-transparent">
          <EmailIcon className="size-5 stroke-text-2" />
          Message
        </Button>
        <Button type="button" className="w-full p-2.5 rounded-xl bg-text-7 border border-text-7 hover:bg-text-7">
          Deactivate
        </Button>
      </div>
      <Preview
        file={preview}
        state={previewModal}
        setUploadedFiles={setUploadedFiles}
        onClose={() => {
          setPreview(null)
          previewModal.setFalse()
        }}
      />
    </>
  )
}

export default Info