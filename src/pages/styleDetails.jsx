import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useSessionStorage from "../hooks/useSessionStorage";
import DropDown from "../components/BasicDropdown";
import MultiSelectDropDown from "../components/DropDown";
import Button from "../components/Button";
import NavBar from "../components/NavBar";
import InputBox from "../components/InputBox";
import Textarea from "../components/InputTextarea";
import RichTextEditor from "../components/RichTextEditor";
import BackLogo from "../logos/chevron-down.svg";
import Loader from "../components/loader";
import { properties } from "../properties";

export default function StyleDetails({ quickFix = false, styleId }) {
  const { serverHostName } = properties;
  const location = useLocation();
  const navigate = useNavigate();
  const [genus, setGenus] = useState([]);
  const [species, setSpecies] = useState([]);
  const [hattributes, setHattributes] = useState(null);
  const [isFetchingGenus, setIsFetchingGenus] = useState(false);
  const [defaultSpecies, setDefaultSpecies] = useState(null);
  const [isFetchingSpecies, setIsFetchingSpecies] = useState(false);
  const [isFetchingHattributes, setIsFetchingHattributes] = useState(false);
  const [techSpecs, setTechSpecs] = useState(null);
  const [values, setValues] = useState({});
  const [productInfo, setProductInfo] = useState(null);
  const [defaultGenus, setDefaultGenus] = useState(null);
  const [accountDetails] = useSessionStorage("accountDetails");
  const { quickFix: quickFixFromLink } = location.state || {};
  const quick = quickFixFromLink || quickFix;
  const [searchParams] = useSearchParams();
  const STYLE_ID = searchParams.get("styleId");

  const [detailedDescription, setDetailedDescription] = useState(null);
  const [competitiveCylistDescription, setCompetitiveCylistDescription] =
    useState(null);

  useEffect(() => {
    (async () => {
      try {
        setIsFetchingGenus(true);
        const response =
          (await fetch(`${serverHostName}/api/v1/dataNormalization/genus`)) ||
          {};
        const { data } = await response.json();
        setGenus(
          data?.genus?.map(({ id, name }) => ({
            value: id,
            label: name
          }))
        );
        setIsFetchingGenus(false);
      } catch (_) {
        setIsFetchingGenus(false);
      }
    })();
  }, []);

  useEffect(() => {
    fetchProductInfo();
  }, []);

  useEffect(() => {
    if (!accountDetails?.idTokenClaims?.exp) {
      navigate("/");
    }
  }, [accountDetails]);

  useEffect(() => {
    const { genus, species, hattributes } = values;
    if (genus && species && !hattributes) {
      (async () => {
        try {
          setIsFetchingHattributes(true);
          const response =
            (await fetch(
              `${serverHostName}/api/v1/dataNormalization/genus/${genus}/species/${species}/hAttributes/${STYLE_ID}`
            )) || {};
          const { data } = await response.json();
          setHattributes(data.hattributes);
          setTechSpecs(data.techSpecs);
          setIsFetchingHattributes(false);
        } catch (err) {
          setIsFetchingHattributes(false);
        }
      })();
    }
  }, [values]);

  useEffect(() => {
    if (productInfo?.attributeApiResponse?.speciesId) {
      setDefaultSpecies([
        {
          value: productInfo?.attributeApiResponse?.speciesId,
          label: productInfo?.attributeApiResponse?.speciesName
        }
      ]);
    }
  }, [productInfo]);

  useEffect(() => {
    if (hattributes || techSpecs) {
      setValues({
        ...values,
        hattributes: Object.keys(hattributes).reduce(
          (acc, el) => ({
            ...acc,
            [el]: hattributes[el]
              .filter((e) => e.selected)
              .map((e) => ({ value: e.hattributevid, label: e.text }))
          }),
          {}
        ),
        ...(techSpecs && { techSpecs })
      });
    }
  }, [hattributes, techSpecs]);

  const onGenusChangeHandler = async (e) => {
    try {
      setIsFetchingSpecies(true);
      setSpecies([]);
      setValues({
        ...values,
        genus: e.value,
        species: null
      });
      const response =
        (await fetch(
          `${serverHostName}/api/v1/dataNormalization/genus/${e.value}/species`
        )) || {};
      const { data } = await response.json();
      setSpecies(
        data?.result?.map(({ dattributevid, text }) => ({
          value: dattributevid,
          label: text
        }))
      );
      setDefaultSpecies([
        {
          value: data.label[0].dattributevid,
          label: data.label[0].text
        }
      ]);
      setIsFetchingSpecies(false);
    } catch (_) {
      setIsFetchingSpecies(false);
    }
  };

  const onSpeciesChangeHandler = async (e) => {
    if (e?.value) {
      setValues({
        ...values,
        species: e.value
      });
    }
  };

  const fetchProductInfo = async () => {
    try {
      const response =
        (await fetch(
          `${serverHostName}/api/v1/dataNormalization/productInfo/${STYLE_ID}`
        )) || {};
      const {
        data: {
          copyApiResponse,
          merchApiResponse,
          attributeApiResponse,
          sizingChart
        }
      } = (await response.json()) || { data: {} };
      setProductInfo({
        copyApiResponse,
        merchApiResponse,
        attributeApiResponse,
        sizingChart
      });

      setValues({
        ...values,
        bulletPoints: copyApiResponse?.bulletPoints,
        listDescription: copyApiResponse?.listDescription,
        productTitle: copyApiResponse?.title,
        bottomLine: copyApiResponse?.bottomLine,
        competitiveCyclistBottomLine:
          copyApiResponse?.competitiveCyclistBottomLine,
        competitiveCyclistDescription:
          copyApiResponse?.competitiveCyclistDescription
      });

      setDetailedDescription(copyApiResponse?.detailDescription);

      setDefaultGenus([
        {
          value: attributeApiResponse?.genusId,
          label: attributeApiResponse?.genusName
        }
      ]);
      if (
        !attributeApiResponse?.speciesId ||
        !attributeApiResponse?.speciesName
      ) {
        setIsFetchingHattributes(true);
        const response =
          (await fetch(
            `${serverHostName}/api/v1/dataNormalization/genus/${attributeApiResponse.genusId}/hAttributes/${STYLE_ID}`
          )) || {};
        const { data } = (await response.json()) || {};
        setHattributes(data.hattributes);
        setTechSpecs(data.techSpecs);
        setIsFetchingHattributes(false);
        setValues({
          ...values,
          genus: attributeApiResponse?.genusId
        });
        return;
      }
      setDefaultSpecies([
        {
          value: attributeApiResponse?.speciesId,
          label: attributeApiResponse?.speciesName
        }
      ]);
      setValues({
        ...values,
        genus: attributeApiResponse?.genusId,
        species: attributeApiResponse?.speciesId
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <NavBar />
      <div className="mx-[50px] md:mx-[100px] lg:mx-[150px] mb-[200px] mt-[40px]">
        <p
          aria-label="navigate-back"
          className="flex cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <img src={BackLogo} alt="Go-Back Icon" />
          <span className="ml-[7px]"> Back</span>
        </p>
        <div className="border-solid border border-gray-300 rounded-xl pt-[50px] pb-[50px] px-[50px] mt-[20px]">
          <div className="flex justify-between">
            <div className="flex-column">
              <p className="text-2xl">{STYLE_ID}</p>
              <p className="text-xl font-light">
                {productInfo?.copyApiResponse?.title}
              </p>
            </div>
            <div>
              <Button className="border border-slate-800 rounded-md px-[18px] py-[6px] text-[14px]">
                Recent History
              </Button>
            </div>
          </div>
          <div className="bg-gray-100 border border-gray-200 mt-[30px] rounded-xl  px-[28px] py-[30px]">
            {productInfo && (
              <div className="grid grid-cols-4 gap-4 mt-[20px]">
                <div>
                  <p className="text-md font-light text-gray-600">Site</p>
                  <p>{}</p>
                </div>
                <div>
                  <p className="text-md font-light text-gray-600">
                    Site Assignment
                  </p>
                  <p>{}</p>
                </div>
                <div>
                  <p className="text-md font-light text-gray-600">Brand</p>
                  <p>{productInfo?.merchApiResponse?.brandName}</p>
                </div>
                <div>
                  <p className="text-md font-light text-gray-600">Status</p>
                  <p>
                    {productInfo?.merchApiResponse?.inactive === "false"
                      ? "Inactive"
                      : "Active"}
                  </p>
                </div>
                {/* <div>
                <p className="text-md font-light text-gray-600">Size</p>
                <p>L</p>
              </div> */}
                <div>
                  <p className="text-md font-light text-gray-600">
                    Product Group
                  </p>
                  <p>{productInfo?.attributeApiResponse?.productGroupName}</p>
                </div>
                <div>
                  <p className="text-md font-light text-gray-600">
                    Age Category
                  </p>
                  <p>{productInfo?.merchApiResponse?.ageCategory}</p>
                </div>
                <div>
                  <p className="text-md font-light text-gray-600">
                    Gender Category
                  </p>
                  <p>{productInfo?.merchApiResponse?.genderCategory}</p>
                </div>
              </div>
            )}
            {!productInfo && <Loader className={"!h-full"} />}
          </div>
          <div className="mt-[40px] flex-column">
            <p className="text-xl">Category</p>
            <div className="flex mt-[5px]">
              <div className="mr-[20px] flex-1">
                {!isFetchingGenus && defaultGenus && (
                  <DropDown
                    id="single-option-dropdown"
                    classNamePrefix="genus-dropdown"
                    options={genus}
                    onChange={onGenusChangeHandler}
                    defaultValue={defaultGenus}
                    placeholder="Genus"
                  />
                )}
                {(isFetchingGenus || !defaultGenus) && (
                  <Loader className={"!h-full"} />
                )}
              </div>
              <div className="flex-1">
                {!isFetchingSpecies && defaultSpecies && (
                  <DropDown
                    id="single-option-dropdown"
                    classNamePrefix="species-dropdown"
                    options={species}
                    onChange={onSpeciesChangeHandler}
                    defaultValue={defaultSpecies}
                    isClearable={false}
                    placeholder="Species"
                  />
                )}
                {(isFetchingSpecies || !defaultSpecies) && (
                  <Loader className={"!h-full"} />
                )}
              </div>
            </div>
          </div>
          <div className="mt-[40px] flex-column">
            <p className="text-xl">Harmonizing Attributes</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-[20px]">
              {values &&
                values.hattributes &&
                Object.keys(values.hattributes).map((e) => {
                  return values.hattributes[e].length > 0 ? (
                    <MultiSelectDropDown
                      labelClassName={"mb-[8px] text-[14px] text-[#4D4D4D]"}
                      className={"text-[14px] text-[#4D4D4D] font-light"}
                      placeholder={`Select ${e}`}
                      values={values.hattributes[e]}
                      onChangeHandler={(l) => {
                        setValues({
                          ...values,
                          hattributes: {
                            ...values.hattributes,
                            [e]: l
                          }
                        });
                      }}
                      options={hattributes[e].map(
                        ({ hattributevid, text }) => ({
                          value: hattributevid,
                          key: text,
                          label: text
                        })
                      )}
                      label={e}
                    />
                  ) : (
                    <MultiSelectDropDown
                      labelClassName={"mb-[8px] text-[14px] text-[#4D4D4D]"}
                      className={"text-[14px] text-[#4D4D4D] font-light"}
                      placeholder={`Select ${e}`}
                      values={values.hattributes[e]}
                      onChangeHandler={(l) => {
                        setValues({
                          ...values,
                          hattributes: {
                            ...values.hattributes,
                            [e]: l
                          }
                        });
                      }}
                      options={hattributes[e].map(
                        ({ hattributevid, text }) => ({
                          value: hattributevid,
                          key: text,
                          label: text
                        })
                      )}
                      label={e}
                    />
                  );
                })}
              {isFetchingHattributes && <Loader className={"!h-full"} />}
            </div>
          </div>
          <div className="mt-[40px] flex-column">
            <p className="text-xl">Tech Specs</p>
            <div className="grid grid-cols-3 gap-3 mt-[20px]">
              {!isFetchingHattributes &&
                Array.isArray(values.techSpecs) &&
                values.techSpecs.map(({ label, value }) => (
                  <InputBox
                    className={"w-[100%] mt-[20px] rounded-sm"}
                    label={label}
                    onChangeHandler={(e) => {
                      const techSpecs = [...values.techSpecs];
                      techSpecs.find(
                        (l) => l.label === e.currentTarget.id
                      ).value = e.target.value;
                      setValues({
                        ...values,
                        techSpecs
                      });
                    }}
                    val={value}
                  />
                ))}
              {isFetchingHattributes && <Loader className={"!h-full"} />}
            </div>
          </div>
          <div className="mt-[40px] flex-column">
            <p className="text-xl">Product Info</p>
            <div className="flex">
              <div className="mr-[20px] flex-1">
                <InputBox
                  isDisabled={true}
                  className={"w-full mt-[20px] rounded-sm"}
                  label="Product title"
                  onChangeHandler={(e) => {
                    setValues({
                      ...values,
                      productTitle: e.target.value
                    });
                  }}
                  val={values.productTitle}
                />
              </div>
              <div className="flex-1">
                <InputBox
                  className={"w-full mt-[20px] rounded-sm"}
                  label="Top Line"
                  onChangeHandler={(e) => {
                    setValues({
                      ...values,
                      bottomLine: e.target.value
                    });
                  }}
                  val={values.bottomLine}
                />
              </div>
            </div>
            <div className={"mt-[40px] mb-[20px]"}>
              <RichTextEditor
                label="Detailed description"
                onChange={(e) => setDetailedDescription(e)}
                labelClassName={"text-gray-600 font-light"}
                val={detailedDescription}
                className={"h-[250px] pb-[50px] mt-[10px]"}
              />
            </div>
            <div className="mt-[50px]">
              <Textarea
                label="List Description"
                labelClassName={
                  "!top-[12px] !left-[15px] !z-1 !bg-white !relative !text-[14px] !text-[#4D4D4D]"
                }
                containerClassName={"!w-full"}
                className={"w-full"}
                rows={5}
                onChange={(e) => {
                  setValues({
                    ...values,
                    listDescription: e.target.value
                  });
                }}
                val={values.listDescription}
              />
            </div>
            <div className="mt-[50px]">
              <Textarea
                label="Bullet Points"
                labelClassName={
                  "!top-[12px] !left-[15px] !z-1 !bg-white !relative !text-[14px] !text-[#4D4D4D]"
                }
                containerClassName={"!w-full"}
                className={"w-full"}
                rows={5}
                onChange={(e) => {
                  setValues({
                    ...values,
                    bulletPoints: e.target.value
                  });
                }}
                val={values.bulletPoints}
              />
            </div>
            <div className="flex">
              <div className="mr-[20px] flex-1 mt-[30px]">
                <DropDown
                  id="single-option-dropdown"
                  isClearable={true}
                  placeholder="Sizing Chart"
                  defaultValue={null}
                  options={null}
                />
              </div>
              <div className="flex-1 mt-[25px]">
                <InputBox
                  className={"w-full mt-[30px] rounded-sm h-[37px]"}
                  labelClassName={
                    "!top-[34px] z-[1] bg-white !text-gray-900 !text-[10px]"
                  }
                  label="Competitive Cyclist Top Line"
                  onChange={(e) => {
                    setValues({
                      ...values,
                      competitiveCyclistBottomLine: e.target.value
                    });
                  }}
                  val={values.competitiveCyclistBottomLine}
                />
              </div>
            </div>
            <div className={"mt-[40px] mb-[20px]"}>
              <RichTextEditor
                label="Competitive Cyclist description"
                labelClassName={"text-gray-600 font-light"}
                onChange={(e) => setCompetitiveCylistDescription(e)}
                val={competitiveCylistDescription}
                className={"h-[250px] pb-[50px] mt-[10px]"}
              />
            </div>

            <div className="flex justify-center mt-[50px]">
              {quick && (
                <Button
                  className={
                    "bg-gray-900 border text-white rounded border-gray-800 w-[150px] h-[50px]"
                  }
                >
                  Publish
                </Button>
              )}
              {!quick && (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
