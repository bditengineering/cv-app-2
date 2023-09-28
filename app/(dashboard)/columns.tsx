"use client";

import Button from "@/ui/button";
import { createClientComponentClient } from "@/lib/supabase-client";
import { CVWithTitlesAndUser } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import certifiedPic from "/public/certified.png";

export const columns: ColumnDef<CVWithTitlesAndUser>[] = [
  {
    id: "name",
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    header: ({ column }) => {
      return (
        <Button
          variant="plain"
          className="text-gray-500 focus:text-gray-600"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const firstName = row.original.first_name;
      const lastName = row.original.last_name;
      const isCertified = row.original.is_certified;

      return (
        <div className="font-medium text-gray-900 flex gap-3">
          <span>
            {firstName} {lastName}
          </span>
          {isCertified && (
            <div className="flex justify-center">
              <Image
                src={certifiedPic}
                alt="Certified"
                sizes="10vw"
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />{" "}
            </div>
          )}
        </div>
      );
    },
  },
  {
    id: "titles",
    accessorKey: "titles.name",
    header: ({ column }) => {
      return (
        <Button
          variant="plain"
          className="text-gray-500 focus:text-gray-600"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const titleName = row.original.titles?.name;

      return <div>{titleName}</div>;
    },
  },
  {
    id: "updatedAt",
    accessorFn: (row) => new Date(row.updated_at),
    header: ({ column }) => {
      return (
        <Button
          variant="plain"
          className="text-gray-500 focus:text-gray-600"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Update
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: "datetime",
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
        <div className="flex gap-3 float-right">
          <button
            className="text-base font-semibold leading-normal text-gray-600 hover:text-gray-500"
            type="button"
            onClick={() => downloadPdf(`BDIT_${firstName}_${titleName}`)}
          >
            Download
          </button>

          <Link
            className="text-base font-semibold leading-normal text-primary-light hover:text-sky-600"
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
