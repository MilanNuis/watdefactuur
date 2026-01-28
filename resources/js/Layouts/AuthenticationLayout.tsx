import { FileText } from "lucide-react";

export default function AuthenticationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="grid grid-cols-2 h-screen">
            {/* Left side */}
            <div className="bg-[--main-green] flex items-center justify-center p-12">
                <div className="w-full max-w-md text-center">
                    <div className="flex items-center justify-center flex-col gap-3 mb-6 ">
                        <img
                            src="/logos/LogoLogin.svg"
                            height={450}
                            width={450}
                            alt="watdefactuur"
                        />
                        <p className="text-white/80 text-lg">
                            Maak professionele facturen in enkele minuten.
                            Eenvoudig, snel en overzichtelijk.
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
