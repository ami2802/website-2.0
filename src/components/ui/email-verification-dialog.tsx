"use client";

import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { MdEmail } from "react-icons/md";
import { FiCopy, FiCheck } from "react-icons/fi";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface EmailVerificationDialogProps {
    buttonStyle: string;
}

export function EmailVerificationDialog({ buttonStyle }: EmailVerificationDialogProps) {
    const [verified, setVerified] = useState(false);
    const [copied, setCopied] = useState(false);
    const emailBase64 = "YW1pcnVsYXppem9sJTJFZGV2JTQwZ21haWwlMkVjb20=";

    const handleSuccess = () => {
        setVerified(true);
    };

    const getEmail = () => {
        return decodeURIComponent(atob(emailBase64));
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(getEmail());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="group outline-none">
                    <MdEmail className={buttonStyle} />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogTitle className="sr-only">Email Verification</DialogTitle>
                <div className="flex flex-col items-center justify-center py-6 min-h-[120px]">
                    {!verified ? (
                        <Turnstile
                            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                            onSuccess={handleSuccess}
                        />
                    ) : (
                        <div className="flex flex-col items-center gap-4 w-full">
                            <a
                                href={`mailto:${getEmail()}`}
                                className="text-xl font-medium text-foreground hover:underline"
                            >
                                {getEmail()}
                            </a>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2"
                                onClick={handleCopy}
                            >
                                {copied ? <FiCheck className="text-green-500" /> : <FiCopy />}
                                {copied ? "Copied!" : "Copy to clipboard"}
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
