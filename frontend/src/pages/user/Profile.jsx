import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Loader2, PencilIcon, XIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { setLoading, setUser } from "@/features/authSlice";
import { toast } from "sonner";
import Savedjob from "@/components/job/Savedjob";

const EditableField = ({ label, children }) => (
  <div className="space-y-1">
    <p className="text-lg font-semibold">{label}</p>
    {children}
    <Separator />
  </div>
);

const Profile = () => {
  const { user, loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: Array.isArray(user?.profile?.skills) ? user.profile.skills : [],
    resume: user?.profile?.resume || null,
    profilePhoto: user?.profile?.profilePhoto || null,
    resumeFile: null,
    profilePhotoFile: null,
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const handleResumeUpload = (e) =>
    setInput({ ...input, resumeFile: e.target.files[0] });

  const handlePhotoUpload = (e) =>
    setInput({ ...input, profilePhotoFile: e.target.files[0] });

  if (!user) return <div>Loading profile...</div>;

  // ---------------- PROFILE COMPLETION LOGIC ----------------
  const calculateCompletion = () => {
    let score = 0;
    if (input.fullname) score += 10;
    if (input.phoneNumber) score += 10;
    if (input.bio) score += 15;
    if (input.skills?.length > 0) score += 20;
    if (input.resume || input.resumeFile) score += 25;
    if (input.profilePhoto || input.profilePhotoFile) score += 20;
    return score;
  };
  const completion = calculateCompletion();

  // ---------------- SUBMIT ----------------
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills.join(","));

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
        dispatch(setUser(res.data.data));
        toast.success("Profile updated successfully!");
        setEditing(false);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error updating profile");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-10 px-4 space-y-10">
      {/* -------- PROFILE CARD -------- */}
      <Card className="shadow-xl border relative">
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
          <CardHeader className="flex flex-col gap-6">
            <div className="flex gap-6 items-center">
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

                <Badge>Student</Badge>
              </div>
            </div>

            {/* -------- PROFILE COMPLETION BAR -------- */}
            <div className="w-full">
              <p className="text-sm font-medium">
                Profile Completion: {completion}%
              </p>
              <div className="w-full h-3 bg-muted rounded-full">
                <div
                  className="h-1 rounded-full bg-primary transition-all"
                  style={{ width: `${completion}%` }}
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* EMAIL */}
            <EditableField label="Email">
              {editing ? (
                <input
                  name="email"
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
                  value={input.phoneNumber}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 text-sm"
                />
              ) : (
                <p>{input.phoneNumber || "Not added"}</p>
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
            <EditableField label="Skills">
              <div className="w-full border rounded-md p-2 min-h-[44px] flex flex-wrap gap-2 items-center">
                {input.skills.map((skill, i) => (
                  <Badge key={i} variant="secondary" className="flex gap-1">
                    {skill}
                    {editing && (
                      <button
                        type="button"
                        onClick={() =>
                          setInput({
                            ...input,
                            skills: input.skills.filter((_, idx) => idx !== i),
                          })
                        }
                      >
                        ×
                      </button>
                    )}
                  </Badge>
                ))}

                {editing && (
                  <input
                    type="text"
                    placeholder="Add skill"
                    className="flex-1 outline-none text-sm bg-transparent"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        const value = e.currentTarget.value.trim();
                        if (!value) return;
                        setInput({
                          ...input,
                          skills: [...input.skills, value],
                        });
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                )}
              </div>
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
                  href={user.profile.resume}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  View Resume
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
                  {input.profilePhoto
                    ? "Photo uploaded"
                    : "Default photo in use"}
                </p>
              )}
            </EditableField>

            {editing &&
              (loading ? (
                <Button className="w-full my-4">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </Button>
              ) : (
                <Button type="submit" className="w-full cursor-pointer my-4">
                  Save Changes
                </Button>
              ))}
          </CardContent>
        </form>
      </Card>

      {/* -------- SAVED JOBS SECTION -------- */}
      <Card className="shadow-lg border">
        <CardHeader>
          <h1 className="text-xl font-bold">Saved Jobs</h1>
        </CardHeader>
        <CardContent>
          {/* Replace later with API data */}
          <div className="text-muted-foreground">
            <Savedjob />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
