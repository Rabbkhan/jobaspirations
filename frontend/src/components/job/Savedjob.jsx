import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { unsaveJobThunk } from "@/thunk/SavedJobThunk";

const Savedjob = () => {
  const savedJobs = useSelector((state) => state.job.savedJobs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!savedJobs || savedJobs.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-20">
        <h2 className="text-xl font-semibold mb-2">No Saved Jobs</h2>
        <p>When you save jobs, they will appear here.</p>
      </div>
    );
  }

  const handleRemove = (jobId) => {
    dispatch(unsaveJobThunk(jobId));
  };

  return (
    <div className="space-y-4">
      {savedJobs.map((job) => (
        <Card key={job._id} className="border shadow-sm">
          <CardContent className="p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              {/* Job Info */}
              <div>
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-muted-foreground">
                  {job.company?.companyname || "Unknown Company"} •{" "}
                  {job.company?.location || "Remote"}
                </p>

                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary">
                    {job.jobType || "Full Time"}
                  </Badge>
                  <Badge>{job.category || "General"}</Badge>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => navigate(`/jobs/${job._id}`)}
                >
                  View
                </Button>
                <Button
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={() => handleRemove(job._id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Savedjob;
