import { useForm } from "@inertiajs/react"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog"
import {
  Field,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface FirstLoginPasswordDialogProps {
  open: boolean
}

/**
 * First Login Password Change Dialog
 * 
 * Displays a non-closable modal dialog for barangay users on their first login.
 * Based on the existing change-password form UI components.
 * Users must change their password before continuing to use the system.
 */
export function FirstLoginPasswordDialog({
  open,
}: FirstLoginPasswordDialogProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { data, setData, post, processing, errors } = useForm({
    password: '',
    password_confirmation: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/first-login/change-password', {
      preserveScroll: true,
    })
  }

  return (
    <Dialog open={open} onOpenChange={() => { }} modal={true}>
      <DialogPortal>
        <DialogOverlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-40 bg-black/80" />
        <div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <div
            className="pointer-events-auto w-full max-w-sm mx-auto px-4"
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                e.preventDefault()
              }
            }}
          >
            <div className={cn("flex flex-col gap-6")}>
              <Card>
                <CardHeader>
                  <CardTitle>Change your password</CardTitle>
                  <CardDescription>
                    This is your first login. Please set a new password to continue using the system.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center">
                        <FieldLabel htmlFor="password">
                          New Password
                        </FieldLabel>
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          placeholder="Enter new password"
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={data.password}
                          onChange={(e) =>
                            setData('password', e.target.value)
                          }
                          disabled={processing}
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-sm text-destructive mt-1">
                          {Array.isArray(errors.password)
                            ? errors.password.join(', ')
                            : errors.password}
                        </p>
                      )}
                      <div className="flex items-center">
                        <FieldLabel htmlFor="password_confirmation">
                          Confirm New Password
                        </FieldLabel>
                      </div>
                      <div className="relative">
                        <Input
                          id="password_confirmation"
                          placeholder="Confirm new password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          value={data.password_confirmation}
                          onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                          }
                          disabled={processing}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          tabIndex={-1}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>
                      {errors.password_confirmation && (
                        <p className="text-sm text-destructive mt-1">
                          {Array.isArray(errors.password_confirmation)
                            ? errors.password_confirmation.join(', ')
                            : errors.password_confirmation}
                        </p>
                      )}
                      <Field className="mt-2">
                        <Button
                          type="submit"
                          disabled={processing}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                          {processing
                            ? 'Updating password...'
                            : 'Change Password'}
                        </Button>
                      </Field>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  )
}
