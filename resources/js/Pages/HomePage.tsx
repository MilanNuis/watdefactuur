import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
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
            description:
                "Maak binnen minuten mooie, professionele facturen met je eigen logo en branding.",
        },
        {
            icon: Clock,
            title: "Bespaar Tijd",
            description:
                "Automatisch berekenen van totalen, BTW en meer. Geen handmatig werk meer.",
        },
        {
            icon: Shield,
            title: "Veilig & Betrouwbaar",
            description:
                "Al je gegevens worden veilig opgeslagen en zijn altijd beschikbaar.",
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
        <div className="min-h-screen bg-white ">
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Noise overlay */}
                <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" />

                {/* Navigation */}
                <header className="bg-white sticky top-0 z-50 border-b border-border">
                    <div className="container py-4 mx-auto px-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 group cursor-pointer">
                                <div className="rounded-xl flex items-center justify-center">
                                    <img
                                        src="/logos/LogoGreen.svg"
                                        alt="Watdefactuur"
                                    />
                                </div>
                            </div>

                            {/* Desktop navigatie */}
                            <div className="hidden sm:flex items-center gap-3">
                                {user ? (
                                    <Link href={route("pro.dashboard.index")}>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-gray-600 hover:text-gray-900"
                                        >
                                            Dashboard
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link href={route("login")}>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-gray-600 hover:text-gray-900"
                                        >
                                            Inloggen
                                        </Button>
                                    </Link>
                                )}
                                {user ? (
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-gray-600 hover:text-gray-900"
                                        >
                                            Uitloggen
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link href={route("register")}>
                                        <Button
                                            size="sm"
                                            className="bg-[--main-green] text-white"
                                            variant="home"
                                        >
                                            <Sparkles className="w-4 h-4 mr-2" />
                                            Registreren
                                        </Button>
                                    </Link>
                                )}
                            </div>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="sm:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? (
                                    <X className="w-6 h-6" />
                                ) : (
                                    <Menu className="w-6 h-6" />
                                )}
                            </button>
                        </div>

                        {/* Mobile menu */}
                        {isMenuOpen && (
                            <div className="sm:hidden mt-4 pb-4 border-t border-border pt-4 space-y-3">
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
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Registreren
                                </Button>
                            </div>
                        )}
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative py-24 md:py-40 overflow-hidden  ">
                    <div className="container mx-auto relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="opacity-0 animate-[fade-in_0.6s_ease-out_0.1s_forwards]">
                                <Badge
                                    variant="outline"
                                    className="mb-8 px-5 py-2.5 text-sm font-medium border-green-600/30  bg-green-600/10  text-green-700  "
                                >
                                    <Zap className="w-4 h-4 mr-2" />
                                    Nu beschikbaar voor iedereen
                                </Badge>
                            </div>

                            <h1 className="opacity-0 animate-[fade-in-up_0.8s_ease-out_0.2s_forwards] text-5xl md:text-7xl lg:text-8xl  text-gray-900 dark:text-gray-50 mb-8 leading-[1.05] tracking-tight montserrat-main font-bold">
                                Maak Facturen
                                <br />
                                <span className="bg-[linear-gradient(to_right,hsl(134_70%_45%),hsl(134_70%_45%),hsl(134_80%_80%))] dark:bg-[linear-gradient(to_right,hsl(134_70%_50%),hsl(134_70%_50%),hsl(134_80%_80%))] bg-clip-text text-transparent">
                                    in Minuten
                                </span>
                            </h1>

                            <p className="opacity-0 animate-[fade-in-up_0.8s_ease-out_0.3s_forwards] text-lg md:text-xl text-gray-600  mb-12 max-w-2xl mx-auto leading-relaxed">
                                De eenvoudigste manier om facturen te maken,
                                versturen en beheren. Perfect voor
                                <span className="text-gray-900 dark:text-gray-50 font-semibold">
                                    {" "}
                                    freelancers
                                </span>
                                <span className="text-gray-900 dark:text-gray-50 font-semibold">
                                    {" "}
                                    ZZP'ers
                                </span>{" "}
                                en{" "}
                                <span className="text-gray-900 dark:text-gray-50 font-semibold">
                                    kleine ondernemers
                                </span>
                                .
                            </p>

                            <div className="opacity-0 animate-[fade-in-up_0.8s_ease-out_0.4s_forwards] flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href={route("invoice-builder.index")}>
                                    {" "}
                                    <Button
                                        size="lg"
                                        className="w-full sm:w-auto text-base px-10 py-7 bg-[--main-green]  text-white  font-semibold"
                                        variant="home"
                                    >
                                        Gratis Factuur Maken
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </Link>

                                <a href="#pricing">
                                    <Button
                                        variant="home"
                                        size="lg"
                                        className="w-full sm:w-auto text-base px-10 py-7 bg-[--main-purple] text-white font-semibold"
                                    >
                                        Bekijk Premium
                                        <Star className="w-5 h-5 ml-2 text-white " />
                                    </Button>
                                </a>
                            </div>

                            {/* Stats */}
                            <div className="opacity-0 animate-[fade-in-up_0.8s_ease-out_0.5s_forwards] mt-20 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                                {stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="text-center p-6 rounded-2xl bg-gray-200/30  border border-gray-300/30  backdrop-blur-sm"
                                    >
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <stat.icon className="w-5 h-5 text-[--main-green]" />
                                            <span className="text-3xl md:text-4xl font-bold text-gray-900 ">
                                                {stat.value}
                                            </span>
                                        </div>
                                        <span className="text-sm text-gray-600 ">
                                            {stat.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-24 md:py-32 relative">
                    <div className="container mx-auto">
                        <div className="text-center mb-20">
                            <Badge
                                variant="outline"
                                className="mb-6 border-green-600/30  bg-green-600/5  text-green-700 "
                            >
                                <Sparkles className="w-3 h-3 mr-1" />
                                Features
                            </Badge>
                            <h2 className="text-4xl md:text-6xl  text-gray-900  mb-6 montserrat-main font-bold">
                                Waarom WatDeFactuur?
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                                Alles wat je nodig hebt om professioneel te
                                factureren, zonder de complexiteit.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
                            {features.map((feature, index) => (
                                <Card
                                    key={index}
                                    className="bg-white/60 relative"
                                >
                                    <CardHeader className="relative pb-4 ">
                                        <div className="w-16 h-16 rounded-2xl bg-green-600/10   flex items-center justify-center mb-6 ">
                                            <feature.icon className="w-8 h-8 text-[--main-green]" />
                                        </div>
                                        <CardTitle className="text-2xl font-bold text-gray-900 montserrat-main ">
                                            {feature.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="relative">
                                        <CardDescription className="text-base leading-relaxed text-gray-600 ">
                                            {feature.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="py-24 md:py-32 ">
                    <div className="bg-gradient-to-b " />

                    <div className="container mx-auto relative">
                        <div className="text-center mb-20">
                            <Badge
                                variant="outline"
                                className="mb-6 border-purple-600/30  bg-purple-600/ text-purple-700 "
                            >
                                <Crown className="w-3 h-3 mr-1" />
                                Pricing
                            </Badge>
                            <h2 className="text-4xl md:text-6xl montserrat-main font-bold text-gray-900 ">
                                Eenvoudige Prijzen
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                                Begin gratis of upgrade naar Premium voor alle
                                functionaliteiten.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {/* Free Plan */}
                            <Card className="bg-white/60 border border-green-600">
                                <CardHeader className="text-center pb-8 pt-10">
                                    <CardTitle className="text-2xl font-bold text-gray-900 montserrat-main">
                                        Gratis
                                    </CardTitle>
                                    <div className="mt-6">
                                        <span className="text-6xl  text-gray-900 montserrat-main font-bold ">
                                            €0
                                        </span>
                                        <span className="text-gray-600  ml-2">
                                            /maand
                                        </span>
                                    </div>
                                    <CardDescription className="mt-4 text-base text-gray-600 ">
                                        Perfect om te beginnen
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6 pb-10 ">
                                    <ul className="space-y-4 montserrat-main">
                                        <li className="flex items-center gap-4">
                                            <div className="w-6 h-6 rounded-full bg-green-600/10  flex items-center justify-center flex-shrink-0">
                                                <CheckCircle className="w-4 h-4 text-[--main-green]" />
                                            </div>
                                            <span className="text-gray-900">
                                                5 facturen per maand
                                            </span>
                                        </li>
                                        <li className="flex items-center gap-4">
                                            <div className="w-6 h-6 rounded-full bg-green-600/10  flex items-center justify-center flex-shrink-0">
                                                <CheckCircle className="w-4 h-4 text-[--main-green]" />
                                            </div>
                                            <span className="text-gray-900 ">
                                                Basis templates
                                            </span>
                                        </li>
                                        <li className="flex items-center gap-4">
                                            <div className="w-6 h-6 rounded-full bg-green-600/10  flex items-center justify-center flex-shrink-0">
                                                <CheckCircle className="w-4 h-4 text-[--main-green]" />
                                            </div>
                                            <span className="text-gray-900 ">
                                                PDF export
                                            </span>
                                        </li>
                                    </ul>
                                    <div className="block pt-4">
                                        <Link
                                            href={route(
                                                "invoice-builder.index",
                                            )}
                                        >
                                            <Button
                                                variant="home"
                                                className="w-full py-7 text-base font-semibold bg-[--main-green] text-white "
                                            >
                                                Gratis Beginnen
                                                <ChevronRight className="w-5 h-5 ml-2" />
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Premium Plan */}
                            <Card className="bg-white/60 dark:bg-zinc-800/60 backdrop-blur-2xl border border-[--main-purple] ">
                                {/* Gradient border effect */}
                                <div className="absolute inset-0 rounded-xl pointer-events-none" />

                                <div className="absolute top-6 right-6">
                                    <Badge
                                        variant="home"
                                        className="bg-[--main-purple] text-white px-4 py-1.5 font-semibold "
                                    >
                                        <Sparkles className="w-3 h-3 mr-1.5" />
                                        Populair
                                    </Badge>
                                </div>
                                <CardHeader className="text-center pb-8 pt-12">
                                    <CardTitle className="text-2xl font-bold flex items-center justify-center gap-3 montserrat-main">
                                        <Crown className="w-7 h-7 text-[--main-purple] " />
                                        <span className="bg-clip-text text-transparent">
                                            Premium
                                        </span>
                                    </CardTitle>
                                    <div className="mt-6 montserrat-main">
                                        <span className="text-6xl font-bold montserrat-main text-gray-900 dark:text-gray-50">
                                            €10
                                        </span>
                                        <span className="text-gray-600 dark:text-gray-400 ml-2 ">
                                            /maand
                                        </span>
                                    </div>
                                    <CardDescription className="mt-4 text-base text-gray-600 dark:text-gray-400">
                                        Alles wat je nodig hebt
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6 pb-10">
                                    <ul className="space-y-4 montserrat-main ">
                                        {premiumFeatures.map(
                                            (feature, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-center gap-4"
                                                >
                                                    <div className="w-6 h-6 rounded-full bg-[--main-purple] flex items-center justify-center flex-shrink-0">
                                                        <CheckCircle className="w-4 h-4 text-white" />
                                                    </div>
                                                    <span className="text-gray-900 dark:text-gray-50">
                                                        {feature}
                                                    </span>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                    <div className="block pt-4 ">
                                        <Link
                                            href={route(
                                                "mollie.start-checkout",
                                            )}
                                            className="w-full"
                                            method="post"
                                        >
                                            <Button
                                                className="w-full py-7 text-base font-semibold bg-[--main-purple]  text-white "
                                                variant="home"
                                            >
                                                Start Premium
                                                <ArrowRight className="w-5 h-5 ml-2" />
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
                        <div className="relative overflow-hidden rounded-3xl bg-[--main-green] p-10 md:p-20 text-center">
                            <div className="absolute inset-0 pointer-events-none" />

                            <div>
                                <h2 className="text-4xl md:text-6xl  text-white mb-8 montserrat-main font-bold">
                                    Klaar om te beginnen?
                                </h2>

                                <p className="text-white text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
                                    Maak vandaag nog je eerste professionele
                                    factuur. Geen creditcard vereist.
                                </p>
                                <Link href={route("invoice-builder.index")}>
                                    <Button
                                        size="lg"
                                        variant="home"
                                        className="text-sm sm:text-base font-bold bg-white text-green-700 w-full px-4 py-9 md:py-6 sm:px-6 whitespace-normal"
                                    >
                                        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 min-w-0">
                                            <div className="h-4 w-4 sm:h-5 sm:w-5 md:flex-shrink-0">
                                                <img
                                                    src="/logos/ArrowLogo.svg"
                                                    alt="log klein"
                                                    className="w-full h-full"
                                                />
                                            </div>
                                            <span className="whitespace-normal truncate montserrat-main font-semibold">
                                                Maak Je Eerste Factuur
                                            </span>
                                            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-10 md:h-10 md:flex-shrink-0" />
                                        </div>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-16 border-t border-border">
                    <div className="container mx-auto">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-4">
                                <div>
                                    <img
                                        src="/logos/LogoGreen.svg"
                                        alt="Watdefactuur"
                                        height={300}
                                        width={300}
                                    />
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 text-[--main-purple]">
                                © {new Date().getFullYear()} FactuurMaker. Alle
                                rechten voorbehouden.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
