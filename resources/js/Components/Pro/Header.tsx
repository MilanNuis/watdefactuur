import { Head } from "@inertiajs/react";

export default function Header({ title, description }: { title: string; description?: string }) {
    return (
        <div>
            <Head title={title}>
                <meta name="description" content={description} />
                <meta
                    name="keywords"
                    content="facturen, freelancers, ZZP'ers, ondernemers, factuurmaker, factuur, facturen maken, facturen versturen, facturen beheren"
                />
                <meta name="author" content="WatDeFactuur" />
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
                <meta name="google" content="notranslate" />
            </Head>
            <h1 className="montserrat-main text-2xl font-semibold text-gray-900">{title}</h1>
            {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
        </div>
    );
}
