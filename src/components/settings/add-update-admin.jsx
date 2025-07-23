import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { X } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import Input from "../common/inputs/input";
import Select from "../common/inputs/select";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const adminRoleOptions = [
  { label: "Support Manager", value: "support-manager" },
  { label: "Super Admin", value: "super-admin" }
]

const permisions = [
  { label: "View & manage job posts", value: "View & manage job posts" },
  { label: "Approve caregiver verifications", value: "Approve caregiver verifications" },
  { label: "Manage disputes & chat with both sides", value: "Manage disputes & chat with both sides" },
  { label: "Send scheduled or emergency notifications", value: "Send scheduled or emergency notifications" },
  { label: "Add internal notes to disputes or user profiles", value: "Add internal notes to disputes or user profiles" },
  { label: "View analytics (non-financial)", value: "View analytics (non-financial)" },
  { label: "Manage FAQ & content pages", value: "Manage FAQ & content pages" },
  { label: "Access payments or revenue reports", value: "Access payments or revenue reports" },
  { label: "Add/edit admins", value: "Add/edit admins" },
  { label: "Issue refunds or manual adjustments", value: "Issue refunds or manual adjustments" }
]

const adminSchema = z.object({
  full_name: z.string({ required_error: "Full name is required" }).min(1, "Full name is required"),
  email: z.string({ required_error: "Email is required" }).min(1, "Email is required").email('Enter a valid email').nonempty('Email is required'),
  role: z.string({ required_error: "Role is required" }).min(1, "Role is required"),
  permissions: z.array(z.string(), { required_error: "Permissions is required" }).min(1, "Permissions is required"),
});

const AddUpdateAdmin = ({ state, data, onClose }) => {
  const isUpdateModal = useMemo(() => Boolean(data), [state.value])

  const adminForm = useForm({
    resolver: zodResolver(adminSchema),
    defaultValues: { full_name: "", email: "", role: "", permissions: [] },
  });

  useEffect(() => {
    if (!state.value) return
    adminForm.reset(data)
    return () => {
      adminForm.reset({ full_name: "", email: "", role: "", permissions: [] })
    }
  }, [state.value]);

  const handleCheckBoxChange = (e, value) => {
    e
      ? adminForm.setValue("permissions", [...adminForm.getValues("permissions"), value], { shouldDirty: true, shouldValidate: true })
      : adminForm.setValue("permissions", adminForm.getValues("permissions").filter(e => e !== value), { shouldDirty: true, shouldValidate: true })
  }

  const handleClose = () => {
    onClose();
    state.setFalse();
  };

  const onSubmit = (e) => {
    console.log(e);
    handleClose()
  };
  return (
    <Drawer
      modal={false}
      open={state.value}
      direction="right"
      dismissible={false}
    >
      {state.value && (
        <div className="fixed inset-0 z-[52] bg-text-1 opacity-10" />
      )}
      <DrawerContent className="!max-w-[512px] pt-8 gap-y-8 border-none">
        <DrawerHeader className="py-0 px-8">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl text-text-1">{isUpdateModal ? "Edit" : "Add"} Admin</DrawerTitle>
            <Button
              type="button"
              variant="outlined"
              className="p-0"
              onClick={handleClose}
            >
              <X className="size-5 text-text-4" />
            </Button>
          </div>
          <VisuallyHidden.Root>
            <DrawerDescription>add or admin roles</DrawerDescription>
          </VisuallyHidden.Root>
        </DrawerHeader>
        <div className="w-full h-full pb-4 px-2 flex overflow-hidden">
          <ScrollArea className="w-full px-6">
            <Form {...adminForm}>
              <form
                noValidate
                onSubmit={adminForm.handleSubmit(onSubmit)}
                className='space-y-4'
              >
                <Input
                  name="full_name"
                  label="Full Name"
                  placeholder="Full Name"
                />
                <Input
                  name="email"
                  label="Email Address"
                  placeholder="Email Address"
                />
                <Select
                  name="role"
                  placeholder="Role"
                  options={adminRoleOptions}
                  className="w-full py-[9px]"
                  label="Role"
                />
                <div>
                  <div className="space-y-2">
                    <p className="text-base text-text-1">Access Permissions</p>
                    {permisions.map((data, index) => {
                      return (
                        <div key={index} className={cn("px-4 flex items-center gap-x-3 rounded-lg bg-text-23 border transition-colors",
                          adminForm.formState.errors?.permissions ? "border-red-500" : "border-transparent"
                        )}>
                          <div className="relative flex items-center">
                            <Checkbox
                              id={data.value}
                              className="size-5 bg-text-14"
                              iconClassName="size-4"
                              checked={adminForm.watch("permissions").includes(data.value)}
                              onCheckedChange={(e) => handleCheckBoxChange(e, data.value)}
                            />
                            {!adminForm.watch("permissions").includes(data.value)
                              && <X className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-4 text-white cursor-pointer z-10" onClick={() => handleCheckBoxChange(true, data.value)} />}

                          </div>
                          <Label htmlFor={data.value} className="w-full py-3 text-text-1 text-sm">
                            {data.label}
                          </Label>
                        </div>
                      )
                    })}
                  </div>
                  <Button type="submit" className="w-full mt-8 py-2.5 text-base rounded-xl">
                    {isUpdateModal ? "Update" : "Send Invite"}
                  </Button>
                </div>
              </form>
            </Form>
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default AddUpdateAdmin