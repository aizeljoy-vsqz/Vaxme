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
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPasswords, setShowPasswords] = useState(false)

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Change your password</CardTitle>
          <CardDescription>
            Enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">New Password</FieldLabel>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="Enter new password"
                    type={showPasswords ? "text" : "password"}
                    required
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 size-8 -translate-y-1/2"
                    onClick={() => setShowPasswords((current) => !current)}
                    aria-label={showPasswords ? "Hide password" : "Show password"}
                  >
                    {showPasswords ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </Button>
                </div>
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="confirm-password">Confirm New Password</FieldLabel>
                </div>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    placeholder="Confirm new password"
                    type={showPasswords ? "text" : "password"}
                    required
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 size-8 -translate-y-1/2"
                    onClick={() => setShowPasswords((current) => !current)}
                    aria-label={showPasswords ? "Hide password" : "Show password"}
                  >
                    {showPasswords ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </Button>
                </div>
              </Field>
              <Field>
                <Button type="submit">Change Password</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
