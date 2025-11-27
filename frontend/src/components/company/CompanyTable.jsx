// components/company/CompanyTable.jsx
import React from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Edit } from "lucide-react";

const CompanyTable = ({ data, loading }) => {
  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[120px] text-center">Logo</TableHead>
            <TableHead className="w-[30%]">Company</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="text-right w-[120px]">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading &&
            [...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell className="text-center">
                  <Skeleton className="h-16 w-16 mx-auto rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-16" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-8 w-20 ml-auto" />
                </TableCell>
              </TableRow>
            ))}

          {!loading && data?.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                No companies found.
              </TableCell>
            </TableRow>
          )}

          {!loading &&
            data?.map((company) => (
              <TableRow key={company.id} className="hover:bg-muted/30">
                <TableCell className="text-center py-4">
                  <Avatar className="h-16 w-16 mx-auto">
                    <AvatarImage
                      src={company?.logo || "https://avatar.iran.liara.run/public/25"}
                    />
                  </Avatar>
                </TableCell>

                <TableCell>{company?.companyname}</TableCell>

                <TableCell>{company?.location}</TableCell>

                <TableCell className="text-right">
                  <Link to={`/admin/company/${company.id}`}>
                    <Button variant="outline" size="sm" className="flex gap-2 ml-auto">
                      <Edit size={16} />
                      Edit
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompanyTable;
