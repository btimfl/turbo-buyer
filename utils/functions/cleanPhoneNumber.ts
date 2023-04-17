export default function cleanPhoneNumber(mobile: string | null | undefined): string | null {
    if(!mobile) return null;

    return mobile.slice(-10);
} 