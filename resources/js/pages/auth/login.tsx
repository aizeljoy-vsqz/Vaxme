import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword,
}: Props) {
    return (
        <>
            <Head title="VAXME Login" />

            <div className=" flex items-center justify-center bg-background px-6">

                {/* CARD */}
                <div className="w-full max-w-sm">


                    {/* STATUS */}
                    {status && (
                        <div className="mb-4 text-center text-xs text-green-600">
                            {status}
                        </div>
                    )}

                    <Form
                        {...store.form()}
                        resetOnSuccess={['password']}
                        className="flex flex-col gap-4"
                    >
                        {({ processing, errors }) => (
                            <>
                                {/* EMAIL */}
                                <div className="space-y-1">
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Email address"
                                        autoComplete="email"
                                        className="h-11 rounded-xl"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                {/* PASSWORD */}
                                <div className="space-y-1">
                                    <PasswordInput
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        autoComplete="current-password"
                                        className="h-11 rounded-xl"
                                    />

                                    <div className="flex justify-end">
                                        {canResetPassword && (
                                            <TextLink
                                                href={request()}
                                                className="text-xs text-muted-foreground"
                                            >
                                                Forgot password?
                                            </TextLink>
                                        )}
                                    </div>

                                    <InputError message={errors.password} />
                                </div>

                                {/* REMEMBER */}
                                <div className="flex items-center gap-2">
                                    <Checkbox id="remember" name="remember" />
                                    <Label htmlFor="remember" className="text-sm">
                                        Remember me
                                    </Label>
                                </div>

                                {/* BUTTON */}
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full h-11 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                                >
                                    {processing ? <Spinner /> : "Sign in"}
                                </Button>
                            </>
                        )}
                    </Form>

                </div>
            </div>
        </>
    );
}
