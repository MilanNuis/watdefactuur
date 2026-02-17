import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";
import { Loader2 } from "lucide-react";

export default function UpdatePasswordForm() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, put, errors, processing, reset, recentlySuccessful } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("pro.dashboard.account.password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="montserrat-main text-[--main-purple]">Wachtwoord</CardTitle>
                <CardDescription>
                    Zorg ervoor dat je account een lang, willekeurig wachtwoord gebruikt om veilig te blijven.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={updatePassword} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="current_password">Huidig Wachtwoord</Label>
                        <Input
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) => setData("current_password", e.target.value)}
                            type="password"
                            autoComplete="current-password"
                        />
                        {errors.current_password && <p className="text-sm text-red-500">{errors.current_password}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Nieuw Wachtwoord</Label>
                        <Input
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            type="password"
                            autoComplete="new-password"
                        />
                        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password_confirmation">Bevestig Nieuw Wachtwoord</Label>
                        <Input
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData("password_confirmation", e.target.value)}
                            type="password"
                            autoComplete="new-password"
                        />
                        {errors.password_confirmation && (
                            <p className="text-sm text-red-500">{errors.password_confirmation}</p>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing} className="border-2 border-[--main-purple] bg-[--main-purple] text-white" variant={"home"}>
                            {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Opslaan
                        </Button>

                        {recentlySuccessful && <p className="text-sm text-gray-600">Opgeslagen.</p>}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
