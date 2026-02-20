import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Loader2, Upload, X } from 'lucide-react'

const CompanyForm = ({ title, submitLabel, initialData, isLoading, onSubmit }) => {
    /* ================= REACT HOOK FORM ================= */
    const {
        register, // connects inputs
        handleSubmit, // handles form submit
        formState: { errors }
    } = useForm({
        defaultValues: {
            companyname: initialData?.companyname || '',
            location: initialData?.location || '',
            website: initialData?.website || '',
            employees: initialData?.employees || '',
            description: initialData?.description || ''
        }
    })

    /* ================= FILE STATE ================= */
    const [logoFile, setLogoFile] = useState(null)
    const [logoPreview, setLogoPreview] = useState(initialData?.logo || null)

    const handleLogoUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            setLogoFile(file)
            setLogoPreview(URL.createObjectURL(file))
        }
    }

    /* ================= SUBMIT ================= */
    const submitHandler = (data) => {
        const formData = new FormData()

        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value)
        })

        if (logoFile) {
            formData.append('logo', logoFile)
        }

        onSubmit(formData)
    }

    return (
        <div className="p-6 flex justify-center">
            <Card className="w-full max-w-4xl">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* LOGO */}
                    <div>
                        <Label>Company Logo</Label>
                        <div className="flex gap-4 mt-2">
                            {logoPreview ? (
                                <div className="relative">
                                    <img
                                        src={logoPreview}
                                        className="h-24 w-24 rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setLogoPreview(null)
                                            setLogoFile(null)
                                        }}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full">
                                        <X size={12} />
                                    </button>
                                </div>
                            ) : (
                                <Label className="h-24 w-24 border-dashed border flex items-center justify-center cursor-pointer">
                                    <Upload size={20} />
                                    <Input
                                        type="file"
                                        className="hidden"
                                        onChange={handleLogoUpload}
                                    />
                                </Label>
                            )}
                        </div>
                    </div>

                    {/* INPUTS */}
                    <div>
                        <Input
                            placeholder="Company Name"
                            {...register('companyname', { required: 'Company name is required' })}
                        />
                        {errors.companyname && <p className="text-red-500 text-sm">{errors.companyname.message}</p>}
                    </div>

                    <Input
                        placeholder="Location"
                        {...register('location')}
                    />
                    <Input
                        placeholder="Website"
                        {...register('website')}
                    />
                    <Input
                        type="number"
                        placeholder="Employees"
                        {...register('employees')}
                    />
                    <Textarea
                        placeholder="Description"
                        {...register('description')}
                    />

                    <div className="flex justify-end">
                        <Button
                            onClick={handleSubmit(submitHandler)}
                            disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {submitLabel}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default CompanyForm
