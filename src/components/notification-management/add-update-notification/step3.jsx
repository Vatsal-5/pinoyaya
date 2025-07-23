import Logo from "@/assets/logo"
import { Button } from "@/components/ui/button"
import { useNavigate, useSearch } from "@tanstack/react-router"
import moment from "moment"

const Step3 = ({ helpers, formData, setFormData, onClose }) => {
  const search = useSearch({ strict: false })
  const navigate = useNavigate()

  const handleClose = () => {
    console.log(formData)
    onClose()
    setFormData({ step1: null, step2: null, step3: null });
  }

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <p className="text-base text-text-1 font-medium text-center">Preview</p>
        <div className="p-3 rounded-lg bg-text-13 flex flex-col gap-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-3">
              <Logo className="size-9 rounded-md" />
              <div className="flex flex-col">
                <p className="text-text-1 text-sm">Pinoyaya</p>
                <p className="text-text-4 text-sm">Trusted care with ease.</p>
              </div>
            </div>
            <p className="text-text-1 text-xs opacity-40">{moment(new Date()).format("h:mmA")}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-text-1 text-sm">⚡ "Quick reminder!" for unused credits.</p>
            <p className="text-text-1 opacity-70 text-xs">Lorem ipsum dolor sit consectetur. Ullamcorper acc.</p>
          </div>
        </div>
      </div>
      <div className="mt-8 flex gap-x-11">
        <Button type="button" className="w-full p-2.5 rounded-xl text-text-1 bg-text-24 hover:text-text-1 hover:bg-text-24"
          onClick={() => {
            navigate({ search: { ...search, step: 2 } })
            helpers.setStep(2)
          }}>
          Back
        </Button>
        <Button type="button" className="w-full p-2.5 rounded-xl bg-text-7 hover:bg-text-7" onClick={handleClose}>
          Submit
        </Button>
      </div>
    </>
  )
}

export default Step3