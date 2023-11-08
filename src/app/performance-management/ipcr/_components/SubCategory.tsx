"use client";

import React, { useEffect, useMemo, useState } from "react";

import { useFieldArray } from "react-hook-form";

import { IoIosRemoveCircle } from "react-icons/io";

import Button from "@/components/Button";
import ControllerField from "@/components/ControllerField";
import ControllerFieldData from "@/components/ControllerFieldData";

import Layout from "@/components/Layout";

import LayoutColumn from "@/components/LayoutColumn";

import Modal from "@/components/Modal";

import { convertToRoman } from "@/util/helpers";

import SubCategoryForm from "./SubCategoryForm";

type props = {
  control: any;
  errors: any;
  watch: any;
  setValue: any;
  category_name: string;
};

const SubCategory = ({
  control,
  errors,
  watch,
  category_name,
  setValue,
}: props) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    rules: {
      required: "Required!",
    },
    name: category_name, // This should match the name of your field in the form data
  });

  return (
    <>
      {fields.map((field, indx) => (
        <SubCategoryItem
          field={field}
          fields={fields}
          indx={indx}
          remove={remove}
          control={control}
          errors={errors}
          category_name={category_name}
          watch={watch}
          append={append}
          update={update}
          key={indx}
          setValue={setValue}
        />
      ))}
    </>
  );
};

export default SubCategory;

type SubCategoryItemType = {
  field: any;
  fields: any;
  indx: any;
  remove: any;
  control: any;
  errors: any;
  category_name: any;
  watch: any;
  append: any;
  update: any;
  setValue: any;
};

const SubCategoryItem = ({
  field,
  fields,
  indx,
  remove,
  control,
  errors,
  category_name,
  watch,
  append,
  update,
  setValue,
}: SubCategoryItemType) => {
  const q = watch(`${category_name}[${indx}].rating_q`);
  const e = watch(`${category_name}[${indx}].rating_e`);
  const t = watch(`${category_name}[${indx}].rating_t`);
  const evaluations = watch(`${category_name}[${indx}].evaluations`);
  const parent_evaluation = watch(
    `${category_name}[${indx}].parent_evaluation`
  );
  const getAverage = useMemo(() => {
    const average = Number(q) + Number(e) + Number(t);
    return average / 3;
  }, [q, e, t]);

  const childNumber = `${category_name}[${indx}]`.split(".").length;

  const addHandler = () => {
    let add: any = {
      name: "",
      order: "",
      major_final_output: "",
      performance_indicators: "",
      target_of_accomplishment: "",
      actual_accomplishments: "",
      rating_q: "",
      rating_e: "",
      rating_t: "",
      remarks: "",
      evaluations: [],
    };
    if (parent_evaluation) {
      add = { ...add, parent_evaluation: true };
    }
    append(add);
  };

  const updateEvaluationHandler = () => {
    let addEvaluation: any = {
      name: "",
      order: "",
      major_final_output: "",
      performance_indicators: "",
      target_of_accomplishment: "",
      actual_accomplishments: "",
      rating_q: "",
      rating_e: "",
      rating_t: "",
      remarks: "",
      evaluations: [],
    };
    setValue(`${category_name}[${indx}].evaluations`, [
      ...evaluations,
      addEvaluation,
    ]);
  };

  return (
    <>
      <div
        className={`p-5 border-2 border-dashed rounded-md space-y-5 ${
          parent_evaluation && "border-black"
        }`}
      >
        <div className=" w-full flex justify-between">
          <h3 className=" font-bold text-red-2">
            {childNumber % 2 === 0 ? indx + 1 : convertToRoman(indx + 1)}
          </h3>
          {!parent_evaluation && (
            <IoIosRemoveCircle
              className=" cursor-pointer hover:text-red-1 text-2xl text-red-2 text-end"
              onClick={() => remove(indx)}
            />
          )}
        </div>

        <ul className=" flex justify-between gap-5">
          <li className=" w-9/12">
            <LayoutColumn colNumber={3}>
              {childNumber >= 2 && (
                <ControllerFieldData
                  control={control}
                  errors={errors}
                  rules={{ required: "required" }}
                  displayValue={watch(
                    `${category_name}[${indx}].parent_subcategory_id`
                  )}
                  displayValueKey={`${category_name}[${indx}].parent_subcategory_id`}
                  name={`${category_name}[${indx}].parent_subcategory_id`}
                  keyID="id"
                  keyName="name"
                  setDisplayValue={setValue}
                  placeholder={"Select Sub-Category"}
                  endpoint={"/api/options/ipcr_subcategories"}
                />
              )}
              <ControllerField
                control={control}
                errors={errors}
                name={`${category_name}[${indx}].name`}
                rules={{ required: "required" }}
                placeholder={"Sector Goals"}
                type={"text"}
              />
              <ControllerField
                control={control}
                errors={errors}
                name={`${category_name}[${indx}].major_final_output`}
                rules={{ required: "required" }}
                placeholder={"Major Final Output"}
                type={"text"}
              />
              <ControllerField
                control={control}
                errors={errors}
                name={`${category_name}[${indx}].performance_indicators`}
                rules={{ required: "required" }}
                placeholder={"Performance Indicators"}
                type={"text"}
              />
              <ControllerField
                control={control}
                errors={errors}
                name={`${category_name}[${indx}].target_of_accomplishment`}
                rules={{ required: "required" }}
                placeholder={"Target Of Accomplishment"}
                type={"text"}
              />
              <ControllerField
                control={control}
                errors={errors}
                name={`${category_name}[${indx}].actual_accomplishments`}
                rules={{ required: "required" }}
                placeholder={"Actual Accomplishments"}
                type={"text"}
              />
              <ControllerField
                control={control}
                errors={errors}
                name={`${category_name}[${indx}].remarks`}
                rules={{ required: "required" }}
                placeholder={"Remarks"}
                type={"text"}
              />
            </LayoutColumn>
          </li>
          <li className=" w-3/12 space-y-5">
            <ControllerField
              control={control}
              errors={errors}
              name={`${category_name}[${indx}].rating_q`}
              rules={{ required: "required" }}
              placeholder={"Rating Q"}
              type={"select"}
              selectOptions={[0, 1, 2, 3, 4, 5]}
            />
            <ControllerField
              control={control}
              errors={errors}
              name={`${category_name}[${indx}].rating_e`}
              rules={{ required: "required" }}
              placeholder={"Rating E"}
              type={"select"}
              selectOptions={[0, 1, 2, 3, 4, 5]}
            />
            <ControllerField
              control={control}
              errors={errors}
              name={`${category_name}[${indx}].rating_t`}
              rules={{ required: "required" }}
              placeholder={"Rating T"}
              type={"select"}
              selectOptions={[0, 1, 2, 3, 4, 5]}
            />
            <aside>
              Average Rating: {isNaN(getAverage) ? 0 : getAverage?.toFixed(2)}
            </aside>
          </li>
        </ul>
        <aside className=" w-full flex justify-end gap-3">
          <Button appearance="primary" onClick={updateEvaluationHandler}>
            Add Sub-Category
          </Button>
          {fields.length === indx + 1 && (
            <Button appearance="primary" onClick={addHandler}>
              Add Item
            </Button>
          )}
        </aside>
        <SubCategory
          watch={watch}
          category_name={`${category_name}[${indx}].evaluations`}
          control={control}
          errors={errors}
          setValue={setValue}
        />
      </div>
    </>
  );
};
