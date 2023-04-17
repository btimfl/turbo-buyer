interface Error {
    error_code: string;
    message: string;
}

export function showErrorToast(toast: any, error: Error) {
    toast({
        title: `${error.error_code}`,
        description: `${error.message}`,
        status: 'error',
        variant: 'left-accent',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
    });
}