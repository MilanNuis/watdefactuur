import { Link } from "@inertiajs/react";
import { Pagination, PaginationContent, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

interface PaginationProps {
    data: {
        links: { url: string | null; label: string; active: boolean }[];
        current_page: any;
    };
}

const Paginator: React.FC<PaginationProps> = ({ data }) => {
    if (!data?.links?.length || data?.links.length <= 3) return null;

    return (
        <Pagination className="mt-4">
            <PaginationContent>
                {data.links.map((link, index) =>
                    link.label?.includes("Previous") ? (
                        data.current_page != 1 && (
                            <PaginationPrevious
                                key={index}
                                href={link.url ?? undefined}
                                className={
                                    link.active
                                        ? "!font-bold text-primary"
                                        : " !font-light"
                                }
                            >
                                {link.label}
                            </PaginationPrevious>
                        )
                    ) : link.label?.includes("Next") ? (
                        data.current_page != data.links.length - 2 && (
                            <PaginationNext
                                key={index}
                                href={link.url ?? undefined}
                                className={
                                    link.active
                                        ? "!font-bold text-primary"
                                        : " !font-light"
                                    }
                                        >
                                {link.label}
                            </PaginationNext>
                        )
                    ) : (
                        <PaginationLink
                            key={index}
                            href={link.url ?? undefined}
                            className={
                                link.active
                                    ? "!font-bold text-primary text-lg"
                                    : " !font-light"
                            }
                        >
                            {link.label}
                        </PaginationLink>
                    )
                )}
            </PaginationContent>
        </Pagination>
    );
};

export default Paginator;
