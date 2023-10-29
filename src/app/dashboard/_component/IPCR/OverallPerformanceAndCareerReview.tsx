"use client";

import React, { useState } from "react";

import { AiOutlineArrowRight } from "react-icons/ai";

import { useFetch } from "@/util/api";

type departmentWiseType = {
  max_average_minutes: number | string | null;
  max_occurrences: number;
  average_minutes: number | string | null;
  average_occurrences: number;
  data: {
    department: string;
    average_tardiness_minutes: number;
    average_tardiness_time: number;
    total_occurrences: number;
    late_employees: {
      id: string;
      department_id: string;
      first_name: string;
      middle_name: string;
      last_name: string;
      full_name: string;
      full_name_formal: string;
      is_flexible: boolean;
      schedule: {
        name: string;
        is_default: boolean;
        time_in: string;
        time_out: string;
        is_deletable: boolean;
      };
    }[];
  }[];
};

function OverallPerformanceAndCareerReview() {
  const [from, setFrom] = useState("");
  const [end, setEnd] = useState("");

  const { data, isLoading } = useFetch(
    "department-wise-tardiness",
    ["department-wise-tardiness", from, end],
    `/api/department-wise-tardiness`
  );

  const departmentWise: departmentWiseType = data?.data?.data;

  return (
    <div className=" space-y-5">
      <ul className=" flex justify-between flex-wrap gap-3 items-center">
        <li>
          <h5 className="inline-block font-bold text-red-2 relative after:content-[''] after:absolute after:w-full after:bottom-0 after:left-0 after:h-[2px] after:bg-yellow-400">
            Overall Performance and Career Review
          </h5>
        </li>
        <li className=" flex gap-2 flex-wrap items-center">
          <aside className=" flex items-center flex-wrap gap-2">
            <input type="date" onChange={(e) => setFrom(e.target.value)} />
            <AiOutlineArrowRight className=" text-red-2" />
            <input type="date" onChange={(e) => setEnd(e.target.value)} />
          </aside>
        </li>
      </ul>
      <ul className=" grid gap-5">
        <li className=" shadow-md 1280px:col-span-3 col-span-2 rounded-md p-5 h-auto">
          <div className="max-h-[400px] relative min-h-[10rem] overflow-auto w-full">
            <table className=" w-full font-medium">
              <thead>
                <tr>
                  <th className=" text-center text-sm text-red-2">Name</th>
                  <th className=" text-center text-sm text-red-2">
                    Office/College
                  </th>
                  <th className=" text-center text-sm text-red-2">
                    Final Average
                  </th>

                  <th className=" text-center text-sm text-red-2">
                    Adjectival Rating
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* {topHabitual?.map((item, indx) => (
              <tr key={indx}>
                <td>{item?.employee_name}</td>
                <td>{item?.department_name}</td>
                <td>{item?.total_tardiness}</td>
              </tr>
            ))} */}

                <tr>
                  <td colSpan={5}>
                    <h3 className=" text-center py-5">NO RECORD FOUND</h3>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default OverallPerformanceAndCareerReview;
