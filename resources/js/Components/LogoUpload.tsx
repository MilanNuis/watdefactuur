import { useCallback, useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "./ui/Button";
import { Dispatch, SetStateAction } from "react";
interface Props {
    Preview: string | null;
    setPreview: Dispatch<SetStateAction<string | null>>;
}

export const LogoUpload = ({ Preview, setPreview }: Props) => {
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        setPreview(url);

        // opslaan zodat het overal beschikbaar is
        localStorage.setItem("logo", url);
    };

    return (
        <div className="space-y-2 flex flex-col">
            <label className="text-sm font-medium text-foreground">Bedrijfslogo</label>
            {Preview ? (
                <div className="relative">
                    <div>
                        <img
                            src={Preview}
                            alt="Bedrijfslogo"
                            className="w-32 h-32 object-contain rounded-lg border border-border bg-card p-2"
                        />
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className=" w-6 h-6 relative bottom-36 left-28"
                            onClick={() => setPreview(null)}
                        >
                            <X className="w-3 h-3 " />
                        </Button>
                    </div>
                </div>
            ) : (
                <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-3 rounded-lg cursor-pointer hover:border-[#74EE8C] hover:bg-accent/50 transition-colors">
                    <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                    <span className="text-xs text-muted-foreground">Upload logo</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
                </label>
            )}
        </div>
    );
};
