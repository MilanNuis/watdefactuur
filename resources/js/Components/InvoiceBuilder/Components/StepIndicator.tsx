import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
    id: number;
    title: string;
}

interface StepIndicatorProps {
    steps: Step[];
    currentStep: number;
}

export const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
    const activeColor = "bg-[--main-green]";
    const borderColor = "border-[--main-green]";
    const textColor = "text-[--main-green]";
    const progressColor = "bg-[--main-green]";

    return (
        <div className="w-full">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex flex-1 items-center last:flex-initial">
                        <div className="flex min-w-[50px] flex-col items-center md:min-w-[80px]">
                            <div
                                className={cn(
                                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 md:h-10 md:w-10 md:text-sm",
                                    // Voltoorde stap: gevuld met kleur, wit tekst
                                    currentStep > step.id && `${activeColor} text-white`,
                                    // Actieve stap: gevuld met kleur, wit tekst
                                    currentStep === step.id && `${activeColor} text-white`,
                                    // Inactieve stap: alleen border, geen background
                                    currentStep < step.id && `border-2 ${borderColor} ${textColor} bg-transparent`,
                                )}
                            >
                                {currentStep > step.id ? <Check className="h-4 w-4 md:h-5 md:w-5" /> : step.id}
                            </div>
                            <span
                                className={cn(
                                    "mt-2 text-center text-[10px] font-medium transition-colors duration-300 md:text-xs",
                                    currentStep >= step.id ? "text-foreground" : "text-muted-foreground",
                                )}
                            >
                                <span className="hidden sm:inline">{step.title}</span>
                                <span className="block max-w-[50px] truncate sm:hidden">{step.title}</span>
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div className="mx-2 mb-5 h-1 flex-1 overflow-hidden rounded-full bg-muted md:mx-4">
                                <div
                                    className={cn(
                                        `h-full ${progressColor} transition-all duration-500 ease-out`,
                                        currentStep > step.id ? "w-full" : "w-0",
                                    )}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
