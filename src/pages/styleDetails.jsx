import React, { useState } from "react";
import BasicDropDown from "../components/BasicDropdown";
import Button from "../components/Button";
import NavBar from "../components/NavBar";
import InputBox from "../components/InputBox";
import Textarea from "../components/InputTextarea";
import RichTextEditor from "../components/RichTextEditor";
import BackLogo from "../logos/chevron-down.svg";

export default function StyleDetails({ styleId }) {
  return (
    <>
      <NavBar />
      <div className="mx-[50px] md:mx-[100px] lg:mx-[150px] xl:mx-[200px] mb-[200px] mt-[40px]">
        <p className="flex">
          <img src={BackLogo} alt="Go-Back Icon" />
          <span className="ml-[7px]"> Back</span>
        </p>
        <div className="border-solid border border-gray-300 rounded-xl pt-[50px] pb-[50px] px-[50px] mt-[20px]">
          <div className="flex justify-between">
            <div className="flex-column">
              <p className="text-2xl">{styleId}</p>
              <p className="text-xl font-light">
                FlyWeight Access Wet Wading shoe
              </p>
            </div>
            <div>
              <Button className="border border-slate-800 rounded-md px-[18px] py-[6px] text-[14px]">
                Recent History
              </Button>
            </div>
          </div>
          <div className="bg-gray-100 border border-gray-200 mt-[30px] rounded-xl  px-[28px] py-[30px]">
            <div className="grid grid-cols-4 gap-4 mt-[20px]">
              <div>
                <p className="text-md font-light text-gray-600">Site</p>
                <p>backcountry.com</p>
              </div>
              <div>
                <p className="text-md font-light text-gray-600">
                  Site Assignment
                </p>
                <p>Lorem Ipsum</p>
              </div>
              <div>
                <p className="text-md font-light text-gray-600">Brand</p>
                <p>Sims</p>
              </div>
              <div>
                <p className="text-md font-light text-gray-600">Status</p>
                <p>Active</p>
              </div>
              <div>
                <p className="text-md font-light text-gray-600">Size</p>
                <p>L</p>
              </div>
              <div>
                <p className="text-md font-light text-gray-600">
                  Product Group
                </p>
                <p>Foot Wear</p>
              </div>
              <div>
                <p className="text-md font-light text-gray-600">Age Category</p>
                <p>20 - 40</p>
              </div>
              <div>
                <p className="text-md font-light text-gray-600">
                  Gender Category
                </p>
                <p>Men</p>
              </div>
            </div>
          </div>
          <div className="mt-[40px] flex-column">
            <p className="text-xl">Category</p>
            <div className="flex mt-[5px]">
              <div className="mr-[20px] flex-1">
                <BasicDropDown
                  defaultValue={[{ value: "purple", label: "Purple" }]}
                  placeholder="Genus"
                />
              </div>
              <div className="flex-1">
                <BasicDropDown placeholder="Species" />
              </div>
            </div>
          </div>
          <div className="mt-[40px] flex-column">
            <p className="text-xl">Harmonizing Attributes</p>
            <div className="grid grid-cols-4 gap-4 mt-[20px]">
              <BasicDropDown
                isClearable={true}
                isMulti={true}
                classNamePrefix={"multi-dropdown"}
                defaultValue={[
                  { value: "purple", label: "Purple" },
                  { value: "orange", label: "Orange" }
                ]}
                placeholder="Activity"
              />

              <BasicDropDown
                isClearable={true}
                classNamePrefix={"multi-dropdown"}
                isMulti={true}
                placeholder="Features"
              />
              <BasicDropDown
                isClearable={true}
                isMulti={true}
                classNamePrefix={"multi-dropdown"}
                defaultValue={[
                  { value: "red", label: "Red", color: "#FF5630" },
                  { value: "orange", label: "Orange", color: "#FF8B00" }
                ]}
                placeholder="Fit"
              />

              <BasicDropDown
                isClearable={true}
                classNamePrefix={"multi-dropdown"}
                isMulti={true}
                placeholder="Sole"
              />
              <BasicDropDown
                isClearable={true}
                classNamePrefix={"multi-dropdown"}
                isMulti={true}
                placeholder="Style"
              />

              <BasicDropDown
                isClearable={true}
                classNamePrefix={"multi-dropdown"}
                isMulti={true}
                placeholder="Shop By"
              />
              <BasicDropDown
                isClearable={true}
                classNamePrefix={"multi-dropdown"}
                isMulti={true}
                placeholder="Special"
              />
            </div>
          </div>
          <div className="mt-[40px] flex-column">
            <p className="text-xl">Tech Specs</p>
            <div className="grid grid-cols-3 gap-3 mt-[20px]">
              <InputBox
                className={"w-[100%] mt-[20px] rounded-sm"}
                labelClassName={"!top-3"}
                label="Material"
                val="2.0mm full grain leather"
              />
              <InputBox
                className={"w-[100%] mt-[20px] rounded-sm"}
                labelClassName={"!top-3"}
                label="Responsible Collection"
                val="Hiking"
              />
              <InputBox
                className={"w-[100%] mt-[20px] rounded-sm"}
                labelClassName={"!top-3"}
                label="Closure"
                val="lace"
              />
              <InputBox
                className={"w-[100%] mt-[20px] rounded-sm"}
                labelClassName={"!top-3"}
                label="Sole"
                val="Vibram Fuga"
              />
              <InputBox
                className={"w-[100%] mt-[20px] rounded-sm"}
                labelClassName={"!top-3"}
                label="Mid sole"
                val="nylon shank"
              />
              <InputBox
                className={"w-[100%] mt-[20px] rounded-sm"}
                labelClassName={"!top-3"}
                label="Footbed"
                val="Ortholite"
              />
              <InputBox
                className={"w-[100%] mt-[20px] rounded-sm"}
                labelClassName={"!top-3"}
                label="Manufacturer Warranty"
                val="1 year"
              />
              <InputBox
                className={"w-[100%] mt-[20px] rounded-sm"}
                labelClassName={"!top-3"}
                label="Activity"
                val="Hiking"
              />
            </div>
          </div>
          <div className="mt-[40px] flex-column">
            <p className="text-xl">Product Info</p>
            <div className="flex">
              <div className="mr-[20px] flex-1">
                <InputBox
                  className={"w-full mt-[20px] rounded-sm"}
                  labelClassName={"!top-3"}
                  label="Product title"
                  val="Mountain 600 Full-Grain Hiking Boot - Men's"
                />
              </div>
              <div className="flex-1">
                <InputBox
                  className={"w-full mt-[20px] rounded-sm"}
                  labelClassName={"!top-3"}
                  label="Top Line"
                  val="Lorem Ipsum dolor"
                />
              </div>
            </div>
            <div className={"mt-[40px] mb-[20px]"}>
              <RichTextEditor
                label="Detailed description"
                labelClassName={"text-gray-600 font-light"}
                val={
                  "<p>I am a <b>bold text</b> with <i>italics</i> and <u>Underline</u> mixed in for good measure.</p>"
                }
                className={"h-[250px] pb-[50px] mt-[10px]"}
              />
            </div>
            <div className="mt-[50px]">
              <Textarea
                label="List Description"
                className={"w-full"}
                val={
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                }
              />
            </div>
            <div className="mt-[50px]">
              <Textarea
                label="Bullet Points"
                className={"w-full"}
                val={
                  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
                }
              />
            </div>
            <div className="flex">
              <div className="mr-[20px] flex-1 mt-[30px]">
                <BasicDropDown isClearable={true} placeholder="Sizing Chart" />
              </div>
              <div className="flex-1 mt-[25px]">
                <InputBox
                  className={"w-full mt-[30px] rounded-sm h-[37px]"}
                  labelClassName={"!top-3"}
                  label="Competitive Cyclist Top Lane"
                  val="Lorem Ipsum dolor"
                />
              </div>
            </div>
            <div className={"mt-[40px] mb-[20px]"}>
              <RichTextEditor
                label="Competitive Cyclist description"
                labelClassName={"text-gray-600 font-light"}
                val={
                  "<p>I am a <b>bold text</b> with <i>italics</i> and <u>Underline</u> mixed in for good measure.</p>"
                }
                className={"h-[250px] pb-[50px] mt-[10px]"}
              />
            </div>
            <div className="flex justify-center mt-[50px]">
              <Button
                className={
                  "border rounded border-gray-800 w-[150px] h-[50px] mr-[20px]"
                }
              >
                Save for later
              </Button>
              <Button
                className={
                  "bg-gray-900 border text-white rounded border-gray-800 w-[150px] h-[50px]"
                }
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
