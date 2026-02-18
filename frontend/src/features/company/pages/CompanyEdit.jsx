import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Loader2, Upload, X } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { setLoading, setSingleCompany } from '@/features/company/companySlice'

const CompanyEdit = () => {
    const { id } = useParams() // ✅ company id from URL
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading } = useSelector((store) => store.company)

    const [formData, setFormData] = useState({
        companyname: '',
        location: '',
        website: '',
        employees: '',
        description: ''
    })

    const [logoFile, setLogoFile] = useState(null)
    const [logoPreview, setLogoPreview] = useState(null)

    // ✅ FETCH COMPANY DATA
    useEffect(() => {
        const fetchCompany = async () => {
            try {
                dispatch(setLoading(true))

                const res = await axios.get(`${COMPANY_API_END_POINT}/${id}`, {
                    withCredentials: true
                })

                const company = res.data.company

                setFormData({
                    companyname: company.companyname || '',
                    location: company.location || '',
                    website: company.website || '',
                    employees: company.employees || '',
                    description: company.description || ''
                })

                setLogoPreview(company.logo)
                dispatch(setSingleCompany(company))
            } catch (error) {
                console.error('Fetch company error:', error)
                toast.error('Failed to load company')
            } finally {
                dispatch(setLoading(false))
            }
        }

        fetchCompany()
    }, [id])

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleLogoUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            setLogoFile(file)
            setLogoPreview(URL.createObjectURL(file))
        }
    }

    // ✅ UPDATE COMPANY
    const updateCompany = async () => {
        try {
            dispatch(setLoading(true))

            const data = new FormData()
            data.append('companyname', formData.companyname)
            data.append('location', formData.location)
            data.append('website', formData.website)
            data.append('employees', formData.employees)
            data.append('description', formData.description)

            if (logoFile) data.append('logo', logoFile)

            const res = await axios.put(`${COMPANY_API_END_POINT}/${id}`, data, {
                withCredentials: true
            })

            toast.success(res.data.message)
            navigate('/admin/companies')
        } catch (error) {
            console.error('Update error:', error)
            toast.error(error.response?.data?.message || 'Failed to update company')
        } finally {
            dispatch(setLoading(false))
        }
    }

    return (
        <div className="p-6 flex justify-center">
            <Card className="w-full max-w-4xl rounded-xl border shadow-sm bg-card">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Edit Company</CardTitle>
                    <p className="text-muted-foreground text-sm">Update company details</p>
                </CardHeader>

                <CardContent className="space-y-8">
                    {/* ✅ LOGO */}
                    <div className="space-y-3">
                        <Label>Company Logo</Label>
                        <div className="flex items-center gap-6">
                            {logoPreview ? (
                                <div className="relative">
                                    <img
                                        src={logoPreview}
                                        alt="logo"
                                        className="h-28 w-28 rounded-lg border object-cover"
                                    />
                                    <button
                                        onClick={() => {
                                            setLogoPreview(null)
                                            setLogoFile(null)
                                        }}
                                        className="absolute -top-2 -right-2 bg-destructive p-1 rounded-full text-white">
                                        <X size={12} />
                                    </button>
                                </div>
                            ) : (
                                <Label
                                    htmlFor="logo"
                                    className="h-28 w-28 border border-dashed rounded-lg cursor-pointer flex flex-col items-center justify-center bg-muted/30">
                                    <Upload size={20} />
                                    <Input
                                        id="logo"
                                        type="file"
                                        className="hidden"
                                        onChange={handleLogoUpload}
                                    />
                                </Label>
                            )}

                            <p className="text-sm text-muted-foreground">Upload new logo to replace existing one</p>
                        </div>
                    </div>

                    {/* ✅ FORM */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Company Name</Label>
                            <Input
                                name="companyname"
                                value={formData.companyname}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Location</Label>
                            <Input
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Website</Label>
                            <Input
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Total Employees</Label>
                            <Input
                                name="employees"
                                type="number"
                                value={formData.employees}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            name="description"
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    {/* ✅ BUTTONS */}
                    <div className="flex justify-end gap-3">
                        <Button
                            variant="outline"
                            onClick={() => navigate('/admin/companies')}>
                            Cancel
                        </Button>

                        {loading ? (
                            <Button>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Updating...
                            </Button>
                        ) : (
                            <Button onClick={updateCompany}>Update Company</Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default CompanyEdit
