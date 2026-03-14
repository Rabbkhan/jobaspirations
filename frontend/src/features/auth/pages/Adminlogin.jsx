import { useState } from 'react'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAdmin } from '@/features/admin/adminAuthSlice'
import { useAdminLoginMutation } from '@/features/admin/api/adminAuthApi'

const AdminLogin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')

    const [adminLogin, { isLoading }] = useAdminLoginMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            const res = await adminLogin(formData).unwrap()
            const { safeUser } = res

            // 🚫 HARD BLOCK
            if (safeUser.role !== 'admin') {
                throw new Error('Unauthorized access')
            }

            dispatch(setAdmin(safeUser))
            navigate('/admin/dashboard', { replace: true })
        } catch (err) {
            setError(err?.data?.message || err.message || 'Login failed')
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-muted/20">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-center">Admin Login</h2>

                {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                <Input
                    placeholder="Admin Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />

                <Input
                    placeholder="Password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />

                <Button
                    type="submit"
                    disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </Button>
            </form>
        </div>
    )
}

export default AdminLogin
