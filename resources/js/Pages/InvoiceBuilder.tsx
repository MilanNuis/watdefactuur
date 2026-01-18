import Bedrijfsgegevens from "@/Components/InvoiceBuilder/Components/Bedrijfsgegevens";
import { useState } from "react";
import { FileText, ArrowLeft, ArrowRight } from "lucide-react";
import { StepIndicator } from "@/Components/InvoiceBuilder/Components/StepIndicator";
import { InvoiceData } from "@/Components/InvoiceBuilder/types/InvoiceTypes";
import KlantInfoformulier from "@/Components/InvoiceBuilder/Components/KlantInfoformulier";
import { Button } from "@/components/ui/button";
import ProductenFormulier from "@/Components/InvoiceBuilder/Components/ProductenFormulier";
import GenereerStap from "@/Components/InvoiceBuilder/Components/GenereerStap";
import Factuurvoorbeeld from "@/Components/InvoiceBuilder/Components/Factuurvoorbeeld";
const initialInvoiceData: InvoiceData = {
    invoiceNumber: `${new Date().getFullYear()}-001`,
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    company: {
        name: "",
        address: "",
        postalCode: "",
        city: "",
        email: "",
        phone: "",
        kvkNumber: "",
        btwNumber: "",
        iban: "",
        logo: null,
    },
    client: {
        name: "",
        address: "",
        postalCode: "",
        city: "",
        email: "",
    },
    products: [],
    notes: "Betaling binnen 30 dagen na factuurdatum.",
};
const steps = [
    { id: 1, title: "Bedrijf" },
    { id: 2, title: "Klant" },
    { id: 3, title: "Producten" },
    { id: 4, title: "Genereer" },
];
export default function InvoiceBuilder() {
    const [currentStep, setCurrentStep] = useState(1);
    const [invoiceData, setInvoiceData] = useState<InvoiceData>(initialInvoiceData);

    const nextStep = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Bedrijfsgegevens
                    // company={invoiceData.company}
                    // onChange={(company) => setInvoiceData({ ...invoiceData, company })}
                    />
                );
            case 2:
                return (
                    <KlantInfoformulier
                    // client={invoiceData.client}
                    // onChange={(client) => setInvoiceData({ ...invoiceData, client })}
                    />
                );
            case 3:
                return (
                    <ProductenFormulier
                    // invoiceData={invoiceData} onChange={setInvoiceData}
                    />
                );
            case 4:
                return <GenereerStap data={invoiceData} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-background w-[100rem] px-5 mx-auto">
            {/* Header */}
            <header className="bg-card border-b border-border sticky top-0 z-10">
                <div className="container py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center bg-[#74EE8C]">
                            <FileText className="w-5 h-5 text-black " />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-foreground">FactuurMaker</h1>
                            <p className="text-xs text-muted-foreground">Maak professionele facturen in minuten</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container py-8">
                {/* Step Indicator */}
                <div className="max-w-2xl mx-auto lg:max-w-none">
                    <StepIndicator steps={steps} currentStep={currentStep} />
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form Section */}
                    <div className="order-2 lg:order-1">
                        <div className="bg-card rounded-xl invoice-shadow p-6 md:p-8">
                            {renderStepContent()}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-8 pt-6 border-t border-border">
                                <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Vorige
                                </Button>
                                {currentStep < steps.length && (
                                    <Button onClick={nextStep}>
                                        Volgende
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div className="order-1 lg:order-2">
                        <div className="sticky top-24">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                    Live Preview
                                </h2>
                            </div>
                            <div className="transform scale-[0.85] origin-top-left lg:scale-100">
                                <Factuurvoorbeeld data={invoiceData} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
