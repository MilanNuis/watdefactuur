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
        <div className="w-full mb-8 justify-center align- items-center ">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center flex-1">
                        <div className="flex flex-col items-center">
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-[#74EE8C]",
                                    currentStep > step.id && "step-indicator-completed",
                                    currentStep === step.id && "step-indicator-active",
                                    currentStep < step.id && "step-indicator-inactive",
                                )}
                            >
                                {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                            </div>
                            <span
                                className={cn(
                                    "mt-2 text-xs font-medium transition-colors duration-300 ",
                                    currentStep >= step.id ? "text-foreground" : "text-muted-foreground",
                                )}
                            >
                                {step.title}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div className="flex-1 mx-4 h-1 rounded-full bg-muted overflow-hidden ">
                                <div
                                    className={cn(
                                        "h-full bg-primary transition-all duration-500 ease-out bg-[#74EE8C]",
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
