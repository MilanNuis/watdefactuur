import { useCallback } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LogoUploadProps {
    logo: string | null;
    onLogoChange: (logo: string | null) => void;
}

export const LogoUpload = ({ logo, onLogoChange }: LogoUploadProps) => {
    const handleFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    onLogoChange(reader.result as string);
                };
                reader.readAsDataURL(file);
            }
        },
        [onLogoChange]
    );

    return (
        <div className="space-y-2 flex flex-col">
            <label className="text-sm font-medium text-foreground">Bedrijfslogo</label>
            {/* {logo ? ( */}
            {/* <div className="relative inline-block">
                <img
                    // src={logo}
                    alt="Bedrijfslogo"
                    className="w-32 h-32 object-contain rounded-lg border border-border bg-card p-2"
                />
                <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 w-6 h-6"
                    // onClick={handleRemoveLogo}
                >
                    <X className="w-3 h-3" />
                </Button>
            </div> */}
            {/* ) : ( */}
            <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-[#74EE8C] hover:bg-accent/50 transition-colors">
                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                <span className="text-xs text-muted-foreground">Upload logo</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>
            {/* )} */}
        </div>
    );
};
