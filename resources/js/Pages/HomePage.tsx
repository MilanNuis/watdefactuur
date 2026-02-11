import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/Badge";
import {
    FileText,
    CheckCircle,
    Zap,
    Shield,
    Clock,
    ArrowRight,
    Star,
    Sparkles,
    TrendingUp,
    Users,
    Menu,
    X,
    Crown,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Head, Link, usePage } from "@inertiajs/react";
import { useState } from "react";
export default function HomePage() {
    const user = usePage().props.auth.user;
    console.log(user);
    const features = [
        {
            icon: FileText,
            title: "Professionele Facturen",
            description: "Maak binnen minuten mooie, professionele facturen met je eigen logo en branding.",
        },
        {
            icon: Clock,
            title: "Bespaar Tijd",
            description: "Automatisch berekenen van totalen, BTW en meer. Geen handmatig werk meer.",
        },
        {
            icon: Shield,
            title: "Veilig & Betrouwbaar",
            description: "Al je gegevens worden veilig opgeslagen en zijn altijd beschikbaar.",
        },
    ];

    const premiumFeatures = [
        "Onbeperkt facturen aanmaken",
        "Klantenbeheer",
        "Productcatalogus",
        "Factuurgeschiedenis",
        "Dashboard met statistieken",
        "Prioriteit support",
    ];

    const stats = [
        { value: "10K+", label: "Facturen gemaakt", icon: FileText },
        { value: "2K+", label: "Tevreden gebruikers", icon: Users },
        { value: "99%", label: "Uptime garantie", icon: TrendingUp },
    ];

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    return (
        <div className="min-h-screen bg-white">
            <Head title="Home">
                <meta
                    name="description"
                    content="De eenvoudigste manier om facturen te maken, versturen en beheren. Perfect voor freelancers, ZZP'ers en kleine ondernemers."
                />
                <meta
                    name="keywords"
                    content="facturen, freelancers, ZZP'ers, ondernemers, factuurmaker, factuur, facturen maken, facturen versturen, facturen beheren"
                />
                <meta name="author" content="FactuurMaker" />
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
                <meta name="google" content="notranslate" />
                <meta name="google" content="notranslate" />
            </Head>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Noise overlay */}
                <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]" />

                {/* Navigation */}
                <header className="sticky top-0 z-50 border-b border-border bg-white">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="group flex cursor-pointer items-center gap-3">
                                <div className="flex items-center justify-center rounded-xl">
                                    <img src="/logos/LogoGreen.svg" alt="Watdefactuur" />
                                </div>
                            </div>

                            {/* Desktop navigatie */}
                            <div className="hidden items-center gap-3 sm:flex">
                                {user ? (
                                    <Link href={route("pro.dashboard.index")}>
                                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                                            Dashboard
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link href={route("login")}>
                                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                                            Inloggen
                                        </Button>
                                    </Link>
                                )}
                                {user ? (
                                    <Link href={route("logout")} method="post" as="button">
                                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                                            Uitloggen
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link href={route("register")}>
                                        <Button size="sm" className="bg-[--main-green] text-white" variant="home">
                                            <Sparkles className="mr-2 h-4 w-4" />
                                            Registreren
                                        </Button>
                                    </Link>
                                )}
                            </div>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 text-gray-600 transition-colors hover:text-gray-900 sm:hidden"
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>

                        {/* Mobile menu */}
                        {isMenuOpen && (
                            <div className="mt-4 space-y-3 border-t border-border pb-4 pt-4 sm:hidden">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full text-gray-600 hover:text-gray-900"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Inloggen
                                </Button>
                                <Button
                                    size="sm"
                                    className="w-full bg-[--main-green] text-white"
                                    variant="home"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Registreren
                                </Button>
                            </div>
                        )}
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative overflow-hidden py-24 md:py-40">
                    <div className="container relative z-10 mx-auto">
                        <div className="mx-auto max-w-4xl text-center">
                            <div className="animate-[fade-in_0.6s_ease-out_0.1s_forwards] opacity-0">
                                <Badge
                                    variant="outline"
                                    className="mb-8 border-green-600/30 bg-green-600/10 px-5 py-2.5 text-sm font-medium text-green-700"
                                >
                                    <Zap className="mr-2 h-4 w-4" />
                                    Nu beschikbaar voor iedereen
                                </Badge>
                            </div>

                            <h1 className="montserrat-main mb-8 animate-[fade-in-up_0.8s_ease-out_0.2s_forwards] text-5xl font-bold leading-[1.05] tracking-tight text-gray-900 opacity-0 dark:text-gray-50 md:text-7xl lg:text-8xl">
                                Maak Facturen
                                <br />
                                <span className="bg-[linear-gradient(to_right,hsl(134_70%_45%),hsl(134_70%_45%),hsl(134_80%_80%))] bg-clip-text text-transparent dark:bg-[linear-gradient(to_right,hsl(134_70%_50%),hsl(134_70%_50%),hsl(134_80%_80%))]">
                                    in Minuten
                                </span>
                            </h1>

                            <p className="mx-auto mb-12 max-w-2xl animate-[fade-in-up_0.8s_ease-out_0.3s_forwards] text-lg leading-relaxed text-gray-600 opacity-0 md:text-xl">
                                De eenvoudigste manier om facturen te maken, versturen en beheren. Perfect voor
                                <span className="font-semibold text-gray-900 dark:text-gray-50"> freelancers</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-50"> ZZP'ers</span> en{" "}
                                <span className="font-semibold text-gray-900 dark:text-gray-50">
                                    kleine ondernemers
                                </span>
                                .
                            </p>

                            <div className="flex animate-[fade-in-up_0.8s_ease-out_0.4s_forwards] flex-col justify-center gap-4 opacity-0 sm:flex-row">
                                <Link href={route("invoice-builder.index")}>
                                    {" "}
                                    <Button
                                        size="lg"
                                        className="w-full bg-[--main-green] px-10 py-7 text-base font-semibold text-white sm:w-auto"
                                        variant="home"
                                    >
                                        Gratis Factuur Maken
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>

                                <a href="#pricing">
                                    <Button
                                        variant="home"
                                        size="lg"
                                        className="w-full bg-[--main-purple] px-10 py-7 text-base font-semibold text-white sm:w-auto"
                                    >
                                        Bekijk Premium
                                        <Star className="ml-2 h-5 w-5 text-white" />
                                    </Button>
                                </a>
                            </div>

                            {/* Stats */}
                            <div className="mx-auto mt-20 grid max-w-2xl animate-[fade-in-up_0.8s_ease-out_0.5s_forwards] grid-cols-3 gap-6 opacity-0">
                                {stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="rounded-2xl border border-gray-300/30 bg-gray-200/30 p-6 text-center backdrop-blur-sm"
                                    >
                                        <div className="mb-2 flex items-center justify-center gap-2">
                                            <stat.icon className="h-5 w-5 text-[--main-green]" />
                                            <span className="text-3xl font-bold text-gray-900 md:text-4xl">
                                                {stat.value}
                                            </span>
                                        </div>
                                        <span className="text-sm text-gray-600">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="relative py-24 md:py-32">
                    <div className="container mx-auto">
                        <div className="mb-20 text-center">
                            <Badge variant="outline" className="mb-6 border-green-600/30 bg-green-600/5 text-green-700">
                                <Sparkles className="mr-1 h-3 w-3" />
                                Features
                            </Badge>
                            <h2 className="montserrat-main mb-6 text-4xl font-bold text-gray-900 md:text-6xl">
                                Waarom WatDeFactuur?
                            </h2>
                            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                                Alles wat je nodig hebt om professioneel te factureren, zonder de complexiteit.
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-3 lg:gap-10">
                            {features.map((feature, index) => (
                                <Card key={index} className="relative bg-white/60">
                                    <CardHeader className="relative pb-4">
                                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-600/10">
                                            <feature.icon className="h-8 w-8 text-[--main-green]" />
                                        </div>
                                        <CardTitle className="montserrat-main text-2xl font-bold text-gray-900">
                                            {feature.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="relative">
                                        <CardDescription className="text-base leading-relaxed text-gray-600">
                                            {feature.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="py-24 md:py-32">
                    <div className="bg-gradient-to-b" />

                    <div className="container relative mx-auto">
                        <div className="mb-20 text-center">
                            <Badge
                                variant="outline"
                                className="bg-purple-600/ mb-6 border-purple-600/30 text-purple-700"
                            >
                                <Crown className="mr-1 h-3 w-3" />
                                Pricing
                            </Badge>
                            <h2 className="montserrat-main text-4xl font-bold text-gray-900 md:text-6xl">
                                Eenvoudige Prijzen
                            </h2>
                            <p className="mx-auto max-w-2xl text-lg text-gray-600">
                                Begin gratis of upgrade naar Premium voor alle functionaliteiten.
                            </p>
                        </div>

                        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
                            {/* Free Plan */}
                            <Card className="border border-green-600 bg-white/60">
                                <CardHeader className="pb-8 pt-10 text-center">
                                    <CardTitle className="montserrat-main text-2xl font-bold text-gray-900">
                                        Gratis
                                    </CardTitle>
                                    <div className="mt-6">
                                        <span className="montserrat-main text-6xl font-bold text-gray-900">€0</span>
                                        <span className="ml-2 text-gray-600">/maand</span>
                                    </div>
                                    <CardDescription className="mt-4 text-base text-gray-600">
                                        Perfect om te beginnen
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6 pb-10">
                                    <ul className="montserrat-main space-y-4">
                                        <li className="flex items-center gap-4">
                                            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-600/10">
                                                <CheckCircle className="h-4 w-4 text-[--main-green]" />
                                            </div>
                                            <span className="text-gray-900">5 facturen per maand</span>
                                        </li>
                                        <li className="flex items-center gap-4">
                                            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-600/10">
                                                <CheckCircle className="h-4 w-4 text-[--main-green]" />
                                            </div>
                                            <span className="text-gray-900">Basis templates</span>
                                        </li>
                                        <li className="flex items-center gap-4">
                                            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-600/10">
                                                <CheckCircle className="h-4 w-4 text-[--main-green]" />
                                            </div>
                                            <span className="text-gray-900">PDF export</span>
                                        </li>
                                    </ul>
                                    <div className="block pt-4">
                                        <Link href={route("invoice-builder.index")}>
                                            <Button
                                                variant="home"
                                                className="w-full bg-[--main-green] py-7 text-base font-semibold text-white"
                                            >
                                                Gratis Beginnen
                                                <ChevronRight className="ml-2 h-5 w-5" />
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Premium Plan */}
                            <Card className="border border-[--main-purple] bg-white/60 backdrop-blur-2xl dark:bg-zinc-800/60">
                                {/* Gradient border effect */}
                                <div className="pointer-events-none absolute inset-0 rounded-xl" />

                                <div className="absolute right-6 top-6">
                                    <Badge
                                        variant="home"
                                        className="bg-[--main-purple] px-4 py-1.5 font-semibold text-white"
                                    >
                                        <Sparkles className="mr-1.5 h-3 w-3" />
                                        Populair
                                    </Badge>
                                </div>
                                <CardHeader className="pb-8 pt-12 text-center">
                                    <CardTitle className="montserrat-main flex items-center justify-center gap-3 text-2xl font-bold">
                                        <Crown className="h-7 w-7 text-[--main-purple]" />
                                        <span className="bg-clip-text text-transparent">Premium</span>
                                    </CardTitle>
                                    <div className="montserrat-main mt-6">
                                        <span className="montserrat-main text-6xl font-bold text-gray-900 dark:text-gray-50">
                                            €10
                                        </span>
                                        <span className="ml-2 text-gray-600 dark:text-gray-400">/maand</span>
                                    </div>
                                    <CardDescription className="mt-4 text-base text-gray-600 dark:text-gray-400">
                                        Alles wat je nodig hebt
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6 pb-10">
                                    <ul className="montserrat-main space-y-4">
                                        {premiumFeatures.map((feature, index) => (
                                            <li key={index} className="flex items-center gap-4">
                                                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[--main-purple]">
                                                    <CheckCircle className="h-4 w-4 text-white" />
                                                </div>
                                                <span className="text-gray-900 dark:text-gray-50">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="block pt-4">
                                        <Link href={route("mollie.start-checkout")} className="w-full" method="post">
                                            <Button
                                                className="w-full bg-[--main-purple] py-7 text-base font-semibold text-white"
                                                variant="home"
                                            >
                                                Start Premium
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 md:py-32">
                    <div className="container mx-auto px-4">
                        <div className="relative overflow-hidden rounded-3xl bg-[--main-green] p-10 text-center md:p-20">
                            <div className="pointer-events-none absolute inset-0" />

                            <div>
                                <h2 className="montserrat-main mb-8 text-4xl font-bold text-white md:text-6xl">
                                    Klaar om te beginnen?
                                </h2>

                                <p className="mx-auto mb-12 max-w-xl text-lg leading-relaxed text-white md:text-xl">
                                    Maak vandaag nog je eerste professionele factuur. Geen creditcard vereist.
                                </p>
                                <Link href={route("invoice-builder.index")}>
                                    <Button
                                        size="lg"
                                        variant="home"
                                        className="w-full whitespace-normal bg-white px-4 py-9 text-sm font-bold text-green-700 sm:px-6 sm:text-base md:py-6"
                                    >
                                        <div className="flex min-w-0 items-center justify-center gap-2 sm:gap-3 md:gap-4">
                                            <div className="h-4 w-4 sm:h-5 sm:w-5 md:flex-shrink-0">
                                                <img
                                                    src="/logos/ArrowLogo.svg"
                                                    alt="log klein"
                                                    className="h-full w-full"
                                                />
                                            </div>
                                            <span className="montserrat-main truncate whitespace-normal font-semibold">
                                                Maak Je Eerste Factuur
                                            </span>
                                            <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-10 md:w-10 md:flex-shrink-0" />
                                        </div>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-border py-16">
                    <div className="container mx-auto">
                        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                            <div className="flex items-center gap-4">
                                <div>
                                    <img src="/logos/LogoGreen.svg" alt="Watdefactuur" height={300} width={300} />
                                </div>
                            </div>
                            <p className="text-sm text-[--main-purple] text-gray-600 dark:text-gray-400">
                                © {new Date().getFullYear()} FactuurMaker. Alle rechten voorbehouden.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
