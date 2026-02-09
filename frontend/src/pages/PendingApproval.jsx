export default function PendingApproval() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md bg-card p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold">Application Pending</h1>
        <p className="mt-4 text-muted-foreground">
          Your recruiter application is under review. You will be notified via email once it is approved.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Please do not attempt to access recruiter features until approval.
        </p>
      </div>
    </div>
  );
}
