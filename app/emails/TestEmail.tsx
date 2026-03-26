import { Text } from '@react-email/components'
import EmailLayout from './layouts/EmailLayout'

export default function TestEmail() {
    return (
        <EmailLayout previewText="Test email preview">
            <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }}>
                Hi Michael,
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
                Thanks for getting in touch. We will get back to you shortly.
            </Text>
        </EmailLayout>
    )
}
