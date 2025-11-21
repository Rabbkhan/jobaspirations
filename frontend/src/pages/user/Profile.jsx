import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Loader2, PencilIcon, XIcon } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constants";
import { setLoading, setUser } from "../../features/authSlice";
import { toast } from "sonner";
import AppliedJobs from "../jobs/AppliedJobs";

const EditableField = ({ label, children }) => (
  <div className="space-y-1">
    <h2 className="text-lg font-semibold">{label}</h2>
    {children}
    <Separator />
  </div>
);

const Profile = () => {
  const { user, loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  // -----------------------------
  // INITIALIZE CLEAN INPUT STATE
  // -----------------------------
  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: Array.isArray(user?.profile?.skills) ? user.profile.skills : [],

    resume: user?.profile?.resume || null,
    profilePhoto: user?.profile?.profilePhoto || null,

    resumeFile: null, // uploaded resume
    profilePhotoFile: null, // uploaded photo
  });

  const [editing, setEditing] = useState(false);

  // -----------------------------
  // GENERIC INPUT HANDLER
  // -----------------------------
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // FILE HANDLERS
  const handleResumeUpload = (e) => {
    setInput({ ...input, resumeFile: e.target.files[0] });
  };

  const handlePhotoUpload = (e) => {
    setInput({ ...input, profilePhotoFile: e.target.files[0] });
  };


  if (!user) {
  return <div>Loading profile...</div>;
}

  // -----------------------------
  // SUBMIT HANDLER
  // -----------------------------
  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills.join(",")); // backend expects string

    if (input.resumeFile) formData.append("resume", input.resumeFile);
    if (input.profilePhotoFile)
      formData.append("profilePhoto", input.profilePhotoFile);
    try {
      dispatch(setLoading(true));
      const res = await axios.put(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.data)); // backend returns "data"
        toast.success("Profile updated successfully!");
        setEditing(false);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error updating profile");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // -----------------------------
  // UI RENDER
  // -----------------------------
  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 space-y-8">
      <Card className="shadow-xl border relative">
        {/* EDIT BUTTON */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 p-1"
          onClick={() => setEditing(!editing)}
        >
          {editing ? (
            <XIcon className="w-5 h-5 text-red-600" />
          ) : (
            <PencilIcon className="w-5 h-5" />
          )}
        </Button>

        <form onSubmit={submitHandler}>
          <CardHeader className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={
                  input.profilePhotoFile
                    ? URL.createObjectURL(input.profilePhotoFile)
                    : input.profilePhoto ||
                      "https://avatar.iran.liara.run/public/25"
                }
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              <EditableField label="Full Name">
                {editing ? (
                  <input
                    name="fullname"
                    type="text"
                    value={input.fullname}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2 text-sm"
                  />
                ) : (
                  <p>{input.fullname}</p>
                )}
              </EditableField>
              <Badge className="mt-2">Student</Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* EMAIL */}
            <EditableField label="Email">
              {editing ? (
                <input
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 text-sm"
                />
              ) : (
                <p>{input.email}</p>
              )}
            </EditableField>

            {/* PHONE */}
            <EditableField label="Phone Number">
              {editing ? (
                <input
                  name="phoneNumber"
                  type="text"
                  value={input.phoneNumber}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 text-sm"
                />
              ) : (
                <p>{input.phoneNumber}</p>
              )}
            </EditableField>

            {/* BIO */}
            <EditableField label="Bio">
              {editing ? (
                <textarea
                  name="bio"
                  value={input.bio}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border rounded-md p-2 text-sm"
                />
              ) : (
                <p>{input.bio || "No bio added"}</p>
              )}
            </EditableField>

            {/* SKILLS */}
            <EditableField label="Skills" className="my-5">
              {editing ? (
                <input
                  type="text"
                  value={input.skills.join(", ")}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      skills: e.target.value.split(",").map((s) => s.trim()), // always array
                    })
                  }
                  className="w-full border rounded-md p-2 text-sm"
                  // placeholder="HTML, CSS, JS"
                />
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  {input.skills.map((skill, i) => (
                    <Badge key={i}>{skill}</Badge>
                  ))}
                </div>
              )}
            </EditableField>

            {/* RESUME */}
            <EditableField label="Resume">
              {editing ? (
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleResumeUpload}
                />
              ) : user?.profile?.resume ? (
                <a
                  href={user?.profile?.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {user?.profile?.resumeOriginalName || "View Resume"}
                </a>
              ) : (
                <p>No resume uploaded</p>
              )}
            </EditableField>

            {/* PROFILE PHOTO */}
            <EditableField label="Profile Photo">
              {editing ? (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
              ) : (
                <p>
                  {input.profilePhoto ? "Photo uploaded" : "Default photo used"}
                </p>
              )}
            </EditableField>

            {/* SAVE BUTTON */}
            {editing && (
              <>
                {loading ? (
                  <Button className="w-full my-4">
                    {" "}
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait{" "}
                  </Button>
                ) : (
                  <Button type="submit" className="w-full my-4">
                    Save Changes
                  </Button>
                )}
              </>
            )}
          </CardContent>
        </form>
      </Card>

      <AppliedJobs />
    </div>
  );
};

export default Profile;
