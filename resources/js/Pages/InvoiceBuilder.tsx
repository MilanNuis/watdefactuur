import Bedrijfsgegevens from "@/Components/InvoiceBuilder/Components/Bedrijfsgegevens";
import { useState } from "react";
import { FileText, ArrowLeft, ArrowRight } from "lucide-react";
import { StepIndicator } from "@/Components/InvoiceBuilder/Components/StepIndicator";
import { InvoiceData } from "@/Components/InvoiceBuilder/types/InvoiceTypes";
import KlantInfoformulier from "@/Components/InvoiceBuilder/Components/KlantInfoformulier";
import { Button } from "@/Components/ui/button";
import ProductenFormulier from "@/Components/InvoiceBuilder/Components/ProductenFormulier";
import GenereerStap from "@/Components/InvoiceBuilder/Components/GenereerStap";
import Factuurvoorbeeld from "@/Components/InvoiceBuilder/Components/Factuurvoorbeeld";
import { Head, useForm } from "@inertiajs/react";
const initialInvoiceData: InvoiceData = {
    invoiceNumber: `${new Date().getFullYear()}-001`,
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
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
        phone: "",
        houseNumber: "",
        street: "",
        country: "",
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
    const { data, setData, post, processing } =
        useForm<InvoiceData>(initialInvoiceData);
    const [Preview, setPreview] = useState<string | null>(null);

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
                        Preview={Preview}
                        setPreview={setPreview}
                        company={data.company}
                        onChange={(company) => setData("company", company)}
                    />
                );
            case 2:
                return (
                    <KlantInfoformulier
                        client={data.client}
                        onChange={(client) => setData("client", client)}
                    />
                );
            case 3:
                return (
                    <ProductenFormulier invoiceData={data} setData={setData} />
                );
            case 4:
                return <GenereerStap data={data} isSubmitting={processing} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-background max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <Head title="Factuur maken & versturen">
                <meta
                    name="description"
                    content="Maak professionele facturen in minuten. Perfect voor freelancers, ZZP'ers en kleine ondernemers."
                />
                <meta
                    name="keywords"
                    content="facturen, freelancers, ZZP'ers, ondernemers, factuur, facturen maken, facturen versturen, facturen beheren"
                />
                <meta name="author" content="WatDeFactuur" />
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
            </Head>
            <header className="bg-card border-b border-border sticky top-0 z-10">
                <div className="container py-4">
                    <div className="flex items-center gap-3">
                        <img src="/logos/LogoGreen.svg" alt="Watdefactuur" />
                    </div>
                </div>
            </header>

            <div className="hidden lg:block pt-8">
                <div className="max-w-2xl mx-auto lg:max-w-none">
                    <StepIndicator steps={steps} currentStep={currentStep} />
                </div>
            </div>

            <main className="py-8 pb-32 lg:pb-8">
                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form Section */}
                    <div className="order-2 lg:order-1">
                        <div className="bg-card rounded-xl invoice-shadow p-4 md:p-8">
                            {renderStepContent()}

                            {/* Navigation Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-between mt-8 pt-6 border-t border-border">
                                <Button
                                    variant="outline"
                                    onClick={prevStep}
                                    disabled={currentStep === 1}
                                    className="w-full sm:w-auto order-2 sm:order-1 font-bold"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Vorige
                                </Button>
                                {currentStep < steps.length && (
                                    <Button
                                        onClick={nextStep}
                                        className="w-full sm:w-auto order-1 sm:order-2 bg-[--main-green] text-white font-bold"
                                        variant="home"
                                    >
                                        Volgende
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div className="order-1 lg:order-2">
                        <div className="lg:sticky lg:top-24">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                    Live Preview
                                </h2>
                            </div>
                            <div className="relative">
                                <div className="overflow-x-auto lg:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0 rounded-xl">
                                    <div className="w-auto lg:min-w-0 md:flex md:flex-col origin-top-left transition-transform duration-300">
                                        <Factuurvoorbeeld
                                            data={data}
                                            Preview={Preview}
                                        />
                                    </div>
                                </div>
                                {/* Gradient overlay to show it's scrollable/scaled */}
                                <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background/50 to-transparent pointer-events-none lg:hidden" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Step Indicator */}
            <footer className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-20 lg:hidden">
                <div className="max-w-2xl mx-auto">
                    <StepIndicator steps={steps} currentStep={currentStep} />
                </div>
            </footer>
        </div>
    );
}
