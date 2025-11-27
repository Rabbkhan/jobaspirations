import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setLoading, setSingleCompany } from "../../features/companySlice";
const Companycreate = () => {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    companyname: "",
    location: "",
    website: "",
    employees: "",
    description: "",
  });

  // Logo File + Preview
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const { loading } = useSelector((store) => store.company);

  const dispatch = useDispatch();
  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { user } = useSelector((store) => store.auth);

  // Logo Upload Handler
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  // Submit Handler
 const RegisterNewCompany = async () => {
  try {
    dispatch(setLoading(true));

    const data = new FormData();   // <-- YOU WERE MISSING THIS

    data.append("companyname", formData.companyname);
    data.append("location", formData.location);
    data.append("website", formData.website);
    data.append("employees", formData.employees);
    data.append("description", formData.description);

    if (logoFile) {
      data.append("logo", logoFile);
    }

    const res = await axios.post(`${COMPANY_API_END_POINT}/create`, data, {
      withCredentials: true,
    });

    if (res?.data?.success) {
      dispatch(setSingleCompany(res?.data?.company));
      toast.success(res?.data?.message);
      navigate(`/admin/companies`);
    }
  } catch (error) {
    console.error("Create company error:", error.response?.data || error);

    toast.error(
      error.response?.data?.message ||
      error.response?.data?.errors?.[0]?.msg ||
      error.message ||
      "Something went wrong"
    );
  } finally {
    dispatch(setLoading(false));
  }
};


  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full max-w-4xl rounded-xl border border-border shadow-sm bg-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create Company</CardTitle>
          <p className="text-muted-foreground text-sm">
            Fill out the details to add a new company to the system.
          </p>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* ---------- Logo Upload Section ---------- */}
          <div className="space-y-3">
            <Label className="text-sm">Company Logo</Label>
            <div className="flex items-center gap-6">
              {logoPreview ? (
                <div className="relative group">
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    className="h-28 w-28 rounded-lg border object-cover shadow-sm"
                  />
                  <button
                    onClick={() => {
                      setLogoPreview(null);
                      setLogoFile(null);
                    }}
                    className="absolute -top-2 -right-2 bg-destructive text-white p-1 rounded-full opacity-90"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <Label
                  htmlFor="logo"
                  className="h-28 w-28 border border-dashed rounded-lg cursor-pointer flex flex-col items-center justify-center bg-muted/30 hover:bg-muted transition"
                >
                  <Upload size={20} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground mt-1">
                    Upload Logo
                  </span>

                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoUpload}
                  />
                </Label>
              )}

              <p className="text-sm text-muted-foreground">
                Recommended size: 300×300px (PNG or JPG).
              </p>
            </div>{" "}
            *
          </div>

          {/* ---------- Form Section ---------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input
                name="companyname"
                type="text"
                placeholder="TechHive Solutions"
                value={formData.companyname} // FIXED
                onChange={handleChange}
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                name="location"
                type="text"
                placeholder="Delhi, India"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            {/* Website */}
            <div className="space-y-2">
              <Label>Website</Label>
              <Input
                name="website"
                type="text"
                placeholder="https://company.com"
                value={formData.website}
                onChange={handleChange}
              />
            </div>

            {/* Employees */}
            <div className="space-y-2">
              <Label>Total Employees</Label>
              <Input
                name="employees"
                type="number"
                placeholder="120"
                value={formData.employees}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              type="text"
              rows={4}
              placeholder="Write a short company description..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* ---------- Buttons ---------- */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/companies")}
            >
              Cancel
            </Button>

            {loading ? (
              <Button className="bg-primary cursor-pointer text-primary-foreground px-6">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                wait....
              </Button>
            ) : (
              <Button
                className="bg-primary cursor-pointer text-primary-foreground px-6"
                onClick={RegisterNewCompany}
              >
                Create Company
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Companycreate;
