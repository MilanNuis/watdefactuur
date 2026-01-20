import { FileText } from "lucide-react";

export default function AuthenticationLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="grid grid-cols-2 h-screen">
            {/* Left side */}
            <div className="bg-[#3c7144] flex items-center justify-center p-12">
                <div className="w-full max-w-md text-center">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                            <FileText className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold text-white mb-4">WatDeFactuur</h1>

                    <p className="text-white/80 text-lg">
                        Maak professionele facturen in enkele minuten. Eenvoudig, snel en overzichtelijk.
                    </p>
                </div>
            </div>

            {/* Right side */}
            <div className="flex items-center justify-center p-12">
                <div className="w-full max-w-md">{children}</div>
            </div>
        </main>
    );
}
