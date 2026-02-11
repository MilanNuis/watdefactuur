import { FileText } from "lucide-react";

export default function AuthenticationLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="grid h-screen grid-cols-2">
            {/* Left side */}
            <div className="flex items-center justify-center bg-[--main-green] p-12">
                <div className="w-full max-w-md text-center">
                    <div className="mb-6 flex flex-col items-center justify-center gap-3">
                        <img src="/logos/LogoLogin.svg" height={450} width={450} alt="watdefactuur" />
                        <p className="text-xl font-medium text-white/80">
                            Maak professionele facturen in enkele minuten. Eenvoudig, snel en overzichtelijk.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right side */}
            <div className="flex items-center justify-center p-12">
                <div className="w-full max-w-md">{children}</div>
            </div>
        </main>
    );
}
