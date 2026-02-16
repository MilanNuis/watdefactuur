import { Button } from "@/Components/ui/button";
import AuthenticationLayout from "@/Layouts/AuthenticationLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <AuthenticationLayout>
            <Head title="E-mail verifiëren" />

            <div className="mb-4 text-sm text-gray-600">
                Bedankt voor het aanmelden! Voordat je aan de slag kunt, verifieer je e-mailadres door op de link te
                klikken die we je zojuist hebben gemaild. Heb je de e-mail niet ontvangen? Dan sturen we je graag een
                nieuwe.
            </div>

            {status === "verification-link-sent" && (
                <div className="mb-4 text-sm font-medium text-[--main-green]">
                    Er is een nieuwe verificatielink verzonden naar het e-mailadres dat je bij de registratie hebt
                    opgegeven.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <Button
                        variant="home"
                        type="submit"
                        className="bg-[--main-green] text-white hover:bg-[--main-green]/90"
                        disabled={processing}
                    >
                        Verificatie-e-mail opnieuw versturen
                    </Button>

                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                    >
                        Uitloggen
                    </Link>
                </div>
            </form>
        </AuthenticationLayout>
    );
}
