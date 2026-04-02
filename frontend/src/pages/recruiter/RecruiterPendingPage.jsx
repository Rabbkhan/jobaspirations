import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'

export default function RecruiterPendingPage() {
    const navigate = useNavigate()

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <Card className="max-w-lg w-full text-center shadow-lg">
                <CardHeader className="flex flex-col items-center gap-3">
                    <CheckCircle2 className="h-12 w-12 text-green-500" />
                    <CardTitle className="text-2xl">Application Submitted</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">Your recruiter application has been submitted successfully.</p>

                    <p className="text-sm text-muted-foreground">
                        Our team will review your request. This usually takes
                        <span className="font-medium"> 24–48 hours</span>.
                    </p>

                    <p className="text-sm text-muted-foreground">Once approved, you’ll gain access to the recruiter dashboard.</p>

                    <div className="pt-4">
                        <Button onClick={() => navigate('/')}>Back to Home</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
