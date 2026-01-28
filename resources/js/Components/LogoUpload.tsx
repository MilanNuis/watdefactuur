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
            const result =
                typeof reader.result === "string" ? reader.result : null;
            if (!result) return;
            setPreview(result);
            onChange?.(result);

            // opslaan zodat het overal beschikbaar is
            localStorage.setItem("logo", result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="space-y-2 flex flex-col">
            <label className="text-sm font-medium text-foreground">
                Bedrijfslogo
            </label>
            {Preview ? (
                <div className="relative w-32 h-32">
                    <img
                        src={Preview}
                        alt="Bedrijfslogo"
                        className="w-full h-full object-contain rounded-lg border border-border bg-card p-2"
                    />
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full"
                        onClick={() => {
                            setPreview(null);
                            onChange?.(null);
                        }}
                    >
                        <X className="w-3 h-3" />
                    </Button>
                </div>
            ) : (
                <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-3 rounded-lg cursor-pointer hover:border-[--main-green] hover:bg-accent/50 transition-colors">
                    <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                    <span className="text-xs text-muted-foreground ">
                        Upload logo
                    </span>
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFile}
                    />
                </label>
            )}
        </div>
    );
};
