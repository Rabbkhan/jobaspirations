import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Button } from '@/shared/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'

import { toast } from 'sonner'
import { useApplyRecruiterMutation } from '../api/recruiterAapplicationsApi.js'
import { Alert, AlertDescription } from '@/shared/ui/alert.js'

export default function HireApply() {
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const [applyRecruiter, { isLoading }] = useApplyRecruiterMutation()

    const [submitted, setSubmitted] = useState(false)

    const [form, setForm] = useState({
        phoneNumber: '',
        companyname: '',
        companyEmail: '',
        companyWebsite: '',
        companyLinkedIn: '',
        companySize: '',
        companyLocation: '',
        companyDescription: '',
        recruiterLinkedIn: '',
        companyLogoFile: null
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
        const MAX_SIZE = 2 * 1024 * 1024

        if (!allowedTypes.includes(file.type)) {
            toast.error('Only JPG, PNG, WEBP allowed')
            return
        }

        if (file.size > MAX_SIZE) {
            toast.error('Image must be under 2MB')
            return
        }

        setForm({ ...form, companyLogoFile: file })
    }

    const submit = async (e) => {
        e.preventDefault()

        const companySizeMapping = {
            '1-10': 10,
            '11-50': 50,
            '51-200': 200,
            '201-500': 500,
            '500+': 1000
        }

        try {
            const payload = new FormData()

            payload.append('companyname', form.companyname)
            payload.append('companyEmail', form.companyEmail)
            payload.append('website', form.companyWebsite)
            payload.append('companyLinkedin', form.companyLinkedIn)
            payload.append('employees', companySizeMapping[form.companySize] || 0)
            payload.append('location', form.companyLocation)
            payload.append('description', form.companyDescription)
            payload.append('linkedinProfile', form.recruiterLinkedIn)

            if (form.companyLogoFile) {
                payload.append('logo', form.companyLogoFile)
            }

            const res = await applyRecruiter(payload).unwrap()

            if (res.success) {
                setSubmitted(true)
                toast.success('Application submitted! Pending admin approval.')
                navigate('/pending-approval')
            }
        } catch (err) {
            toast.error(err?.data?.message || 'Submission failed')
        }
    }

    return (
        <div className="min-h-screen bg-muted/40 flex items-center justify-center px-4 py-8">
            <Card className="w-full max-w-4xl shadow-xl rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Apply as a Recruiter</CardTitle>
                    <CardDescription>Submit company details. Admin will review your application.</CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={submit}
                        className="space-y-6">
                        {submitted && (
                            <Alert>
                                <AlertDescription>Application submitted and pending admin approval.</AlertDescription>
                            </Alert>
                        )}

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-muted-foreground">Recruiter Information</h3>

                                <Input
                                    value={user?.fullname || ''}
                                    disabled
                                />
                                <Input
                                    value={user?.email || ''}
                                    disabled
                                />

                                <Input
                                    placeholder="Phone number"
                                    name="phoneNumber"
                                    value={form.phoneNumber}
                                    onChange={handleChange}
                                    required
                                />

                                <Input
                                    placeholder="LinkedIn profile"
                                    name="recruiterLinkedIn"
                                    value={form.recruiterLinkedIn}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-muted-foreground">Company Information</h3>

                                <Input
                                    placeholder="Company name"
                                    name="companyname"
                                    value={form.companyname}
                                    onChange={handleChange}
                                    required
                                />

                                <Input
                                    placeholder="Company email"
                                    name="companyEmail"
                                    value={form.companyEmail}
                                    onChange={handleChange}
                                    required
                                />

                                <Input
                                    placeholder="Website"
                                    name="companyWebsite"
                                    value={form.companyWebsite}
                                    onChange={handleChange}
                                    required
                                />

                                <Select
                                    value={form.companySize}
                                    onValueChange={(val) => setForm({ ...form, companySize: val })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Company size" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="1-10">1–10</SelectItem>
                                        <SelectItem value="11-50">11–50</SelectItem>
                                        <SelectItem value="51-200">51–200</SelectItem>
                                        <SelectItem value="201-500">201–500</SelectItem>
                                        <SelectItem value="500+">500+</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}>
                            {isLoading ? 'Submitting...' : 'Submit for Approval'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
