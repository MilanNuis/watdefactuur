import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/Components/ui/dialog";
import { User } from "@/types/index";
import { Link } from "@inertiajs/react";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useState } from "react";

export default function SubscriptionManagement({ user }: { user: User }) {
    const [isCancelling, setIsCancelling] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    return (
        <Card>
            <CardHeader>
                <CardTitle className="montserrat-main">Subscription Beheer</CardTitle>
                <CardDescription>Beheer je huidige subscription en bekijk je status.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-4 rounded-lg border bg-muted/50 p-4">
                    {user.is_pro ? (
                        <>
                            <CheckCircle2 className="h-8 w-8 text-[--main-green]" />
                            <div>
                                <p className="text-lg font-semibold">Pro Plan</p>
                                <p className="text-sm text-muted-foreground">
                                    Je hebt momenteel een actieve Pro subscription.
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <XCircle className="h-8 w-8 text-red-500" />
                            <div>
                                <p className="text-lg font-semibold">Gratis Plan</p>
                                <p className="text-sm text-muted-foreground">Je gebruikt momenteel het gratis plan.</p>
                            </div>
                        </>
                    )}
                </div>

                {user.is_pro && (
                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
                        <p className="mb-1 font-medium">Informatie over je subscription</p>
                        <p>
                            Je hebt toegang tot alle Pro functionaliteiten, inclusief onbeperkt facturen maken,
                            klantenbeheer en productbeheer.
                        </p>
                    </div>
                )}
            </CardContent>
            <CardFooter className="mt-4 flex justify-between border-t p-6">
                {!user.is_pro ? (
                    <Link href={route("mollie.start-checkout")} method="post" as="button" className="w-full sm:w-auto">
                        <Button className="w-full bg-[--main-green] text-white hover:bg-[#74ee8c]/90">
                            Upgrade naar Pro
                        </Button>
                    </Link>
                ) : (
                    <>
                        <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
                            <p className="text-sm text-muted-foreground">Wil je je subscription opzeggen?</p>
                            <Button
                                variant="destructive"
                                className="w-full sm:w-auto"
                                onClick={() => setDialogOpen(true)}
                                disabled={isCancelling}
                            >
                                {isCancelling && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Subscription Opzeggen
                            </Button>
                        </div>

                        {/* Dialog for confirmation */}
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Subscription Opzeggen</DialogTitle>
                                    <DialogDescription>
                                        Weet je zeker dat je je Pro subscription wilt opzeggen? Je verliest direct
                                        toegang tot Pro functionaliteiten.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="mt-4 flex justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => setDialogOpen(false)}
                                        disabled={isCancelling}
                                    >
                                        Annuleren
                                    </Button>
                                    <Link
                                        href={route("pro.dashboard.account.subscription.cancel")}
                                        method="post"
                                        as="button"
                                        onBefore={() => {
                                            setIsCancelling(true);
                                        }}
                                        onFinish={() => {
                                            setIsCancelling(false);
                                            setDialogOpen(false);
                                        }}
                                        className="w-full sm:w-auto"
                                    >
                                        <Button variant="destructive" className="w-full" disabled={isCancelling}>
                                            {isCancelling && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Bevestig Opzegging
                                        </Button>
                                    </Link>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </>
                )}
            </CardFooter>
        </Card>
    );
}
