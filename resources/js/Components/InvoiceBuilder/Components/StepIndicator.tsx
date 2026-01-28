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
    return (
        <div className="w-full">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <div
                        key={step.id}
                        className="flex items-center flex-1 last:flex-initial"
                    >
                        <div className="flex flex-col items-center min-w-[50px] md:min-w-[80px]">
                            <div
                                className={cn(
                                    "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm text-white font-bold transition-all duration-300 bg-[--main-green]",
                                    currentStep > step.id &&
                                        "step-indicator-completed",
                                    currentStep === step.id &&
                                        "step-indicator-active",
                                    currentStep < step.id &&
                                        "step-indicator-inactive",
                                )}
                            >
                                {currentStep > step.id ? (
                                    <Check className="w-4 h-4 md:w-5 md:h-5" />
                                ) : (
                                    step.id
                                )}
                            </div>
                            <span
                                className={cn(
                                    "mt-2 text-[10px] md:text-xs font-medium transition-colors duration-300 text-center",
                                    currentStep >= step.id
                                        ? "text-foreground"
                                        : "text-muted-foreground",
                                )}
                            >
                                <span className="hidden sm:inline">
                                    {step.title}
                                </span>
                                <span className="sm:hidden block max-w-[50px] truncate">
                                    {step.title}
                                </span>
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div className="flex-1 mx-2 md:mx-4 h-1 rounded-full bg-muted overflow-hidden ">
                                <div
                                    className={cn(
                                        "h-full  transition-all duration-500 ease-out bg-[--main-green]",
                                        currentStep > step.id
                                            ? "w-full"
                                            : "w-0",
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
