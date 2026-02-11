import { Upload, X } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Dispatch, SetStateAction } from "react";
interface Props {
    Preview: string | null;
    setPreview: Dispatch<SetStateAction<string | null>>;
    onChange?: (value: string | null) => void;
}

export const LogoUpload = ({ Preview, setPreview, onChange }: Props) => {
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const result = typeof reader.result === "string" ? reader.result : null;
            if (!result) return;
            setPreview(result);
            onChange?.(result);

            // opslaan zodat het overal beschikbaar is
            localStorage.setItem("logo", result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-foreground">Bedrijfslogo</label>
            {Preview ? (
                <div className="relative h-32 w-32">
                    <img
                        src={Preview}
                        alt="Bedrijfslogo"
                        className="h-full w-full rounded-lg border border-border bg-card object-contain p-2"
                    />
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                        onClick={() => {
                            setPreview(null);
                            onChange?.(null);
                        }}
                    >
                        <X className="h-3 w-3" />
                    </Button>
                </div>
            ) : (
                <label className="border-3 flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors hover:border-[--main-green] hover:bg-accent/50">
                    <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Upload logo</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
                </label>
            )}
        </div>
    );
};
