import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { update } from '@/actions/App/Http/Controllers/Auth/FirstLoginPasswordController';

type ChangePasswordForm = {
    password: string;
    password_confirmation: string;
};

function ChangePasswordPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);

    const { data, setData, post, processing, errors } =
        useForm<ChangePasswordForm>({
            password: '',
            password_confirmation: '',
        });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(update.url(), {
            preserveScroll: true,
        });
    };

    return (
      <>
          <Head title="Change password" />

          <Dialog open>
              <DialogContent className="sm:max-w-xl cursor-pointer">
                  
                  {/* HEADER */}
                  <div className="px-2 pt-4 text-center">
                      <DialogTitle className="text-xl font-semibold">
                          Change password
                      </DialogTitle>

                      <DialogDescription className="mt-1 text-sm">
                          Set a new password to continue
                      </DialogDescription>
                  </div>

                  {/* FORM */}
                  <form onSubmit={submit} className="flex flex-col px-2 pb-2 pt-2">

                      {/* NEW PASSWORD */}
                      <Field className="flex flex-col gap-2 pb-4">
                          <FieldLabel className="text-sm font-medium">
                              New password
                          </FieldLabel>

                          <div className="relative">
                              <Input
                                  id="password"
                                  placeholder="Enter new password"
                                  type={showPassword ? 'text' : 'password'}
                                  value={data.password}
                                  onChange={(e) =>
                                      setData('password', e.target.value)
                                  }
                                  autoComplete="new-password"
                                  disabled={processing}
                                  autoFocus
                              />

                              <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="absolute right-1 top-1/2 size-8 -translate-y-1/2 text-zinc-500"
                                  onClick={() => setShowPassword((v) => !v)}
                              >
                                  {showPassword ? (
                                      <EyeOff className="size-4" />
                                  ) : (
                                      <Eye className="size-4" />
                                  )}
                              </Button>
                          </div>

                          <InputError message={errors.password} />
                      </Field>

                      {/* CONFIRM PASSWORD */}
                      <Field className="flex flex-col gap-2 pb-6">
                          <FieldLabel className="text-sm font-medium">
                              Confirm password
                          </FieldLabel>

                          <div className="relative">
                              <Input
                                  id="password_confirmation"
                                  placeholder="Confirm password"
                                  type={showPasswordConfirmation ? 'text' : 'password'}
                                  value={data.password_confirmation}
                                  onChange={(e) =>
                                      setData('password_confirmation', e.target.value)
                                  }
                                  autoComplete="new-password"
                                  disabled={processing}
                              />

                              <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="absolute right-1 top-1/2 size-8 -translate-y-1/2 text-zinc-500"
                                  onClick={() =>
                                      setShowPasswordConfirmation((v) => !v)
                                  }
                              >
                                  {showPasswordConfirmation ? (
                                      <EyeOff className="size-4" />
                                  ) : (
                                      <Eye className="size-4" />
                                  )}
                              </Button>
                          </div>

                          <InputError message={errors.password_confirmation} />
                      </Field>

                      {/* BUTTON */}
                      <Button
                          type="submit"
                          className="h-11 w-full rounded-lg bg-zinc-900 text-sm font-medium text-white hover:bg-zinc-800"
                          disabled={processing}
                      >
                          {processing ? 'Updating...' : 'Update password'}
                      </Button>
                  </form>
              </DialogContent>
          </Dialog>
      </>
  );
}

export default ChangePasswordPage;
