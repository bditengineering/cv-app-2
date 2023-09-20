"use client";

import { createClientComponentClient } from "@/lib/supabase-client";
import { CVWithTitlesAndUser } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<CVWithTitlesAndUser>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const firstName = row.original.first_name;
      const lastName = row.original.last_name;

      return (
        <div className="font-medium text-gray-900">{`${firstName} ${lastName}`}</div>
      );
    },
  },
  {
    accessorKey: "titleName",
    header: "Role",
    cell: ({ row }) => {
      const titleName = row.original.titles?.name;

      return <div>{titleName}</div>;
    },
  },
  {
    accessorKey: "update",
    header: "Last update",
    cell: ({ row }) => {
      const updatedAt = row.original.updated_at;
      const email = row.original.user?.email;

      const formattedDate = new Date(updatedAt)
        .toLocaleDateString("sr-RS")
        // remove spaces from string to fix hydration error
        // currently we're getting string without spaces from server
        // but toLocaleDateString("sr-RS") returns with spaces (22. 11. 2022.)
        .replaceAll(" ", "");

      return (
        <div>
          <div>{formattedDate}</div>
          <div className="truncate">{email}</div>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      async function downloadPdf(fileName: string) {
        const supabase = createClientComponentClient();

        const { data, error } = await supabase.storage
          .from("pdfs")
          .download(fileName);

        if (error) throw error;
        if (!data) throw new Error("No data received from Supabase.");

        const objectUrl = window.URL.createObjectURL(data);
        const link = document.createElement("a");
        link.href = objectUrl;
        link.download = fileName;
        link.click();
      }

      const firstName = row.original.first_name;
      const titleName = row.original.titles?.name;

      return (
        <div className="flex gap-3">
          <button
            className="text-base font-semibold leading-normal text-gray-600"
            type="button"
            onClick={() => downloadPdf(`BDIT_${firstName}_${titleName}`)}
          >
            Download
          </button>

          <Link
            className="text-base font-semibold leading-normal text-primary-light hover:text-sky-800"
            prefetch={false}
            href={`/edit/${row.original.id}`}
          >
            Edit
          </Link>
        </div>
      );
    },
  },
];
