import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { User } from "@/types";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Loader2 } from "lucide-react";

export default function UpdateEmailForm({ user }: { user: User }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        email: user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route("pro.dashboard.account.email.update"));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="montserrat-main">Email Adres</CardTitle>
                <CardDescription>
                    Wijzig het email adres van je account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            autoComplete="email"
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div className="flex items-center gap-4">
                        <Button 
                            disabled={processing} 
                            className="bg-[--main-green] text-white hover:bg-[#74ee8c]/90"
                        >
                            {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Opslaan
                        </Button>

                        {recentlySuccessful && (
                            <p className="text-sm text-gray-600">Opgeslagen.</p>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
