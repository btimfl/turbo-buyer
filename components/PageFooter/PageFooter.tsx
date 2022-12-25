import { Link, Text } from "@chakra-ui/react";

interface PageFooterProps {
    containsButton?: boolean,
    buttonLink?: string | null,
    buttonAction?: any | null
}
export default function PageFooter(props: PageFooterProps) {

    return (
        <Text mt={2} fontSize={`sm`} textAlign={`center`}>Powered by 
            <Link href={`https://unicommerce.com`}>
                <Text as="span" color={`var(--turbo-colors-link)`} fontWeight="bold">&nbsp;TURBO</Text>
            </Link>
        </Text>
    )
}