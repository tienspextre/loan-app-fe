import React from "react";
import RequiredSharp from "./RequiredSharp";
const RELATIONSHIPS = [
  {
    en: "Father",
    vn: "Cha",
  },
  {
    en: "Mother",
    vn: "Mẹ",
  },
  {
    en: "Son",
    vn: "Con trai",
  },
  {
    en: "Daughter",
    vn: "Con gái",
  },
  {
    en: "Brother",
    vn: "Anh trai / Em trai",
  },
  {
    en: "Sister",
    vn: "Chị gái / Em gái",
  },
  {
    en: "Grandfather",
    vn: "Ông",
  },
  {
    en: "Grandmother",
    vn: "Bà",
  },
  {
    en: "Grandson",
    vn: "Cháu trai",
  },
  {
    en: "Granddaughter",
    vn: "Cháu gái",
  },
  {
    en: "Uncle",
    vn: "Chú / Bác",
  },
  {
    en: "Aunt",
    vn: "Cô / Dì",
  },
  {
    en: "Nephew",
    vn: "Cháu trai / Em trai",
  },
  {
    en: "Niece",
    vn: "Cháu gái / Em gái",
  },
  {
    en: "Cousin",
    vn: "Anh em họ",
  },
];

const ContactInfoForm = ({ contactInfo, setContactInfo }) => {
  return (
    <>
      <div className="form-group col-sm-8 col-lg-6">
        <label htmlFor="inputName1">
          <RequiredSharp />
          Họ tên:
        </label>
        <input
          type="text"
          className="form-control"
          id="inputName1"
          placeholder="Tên người thân"
          value={contactInfo.fullName}
          onChange={(e) =>
            setContactInfo((prev) => ({ ...prev, fullName: e.target.value }))
          }
          required
        />
      </div>
      <div className="form-group col-sm-8 col-lg-6">
        <label htmlFor="inputRelation1">
          <RequiredSharp />
          Mối quan hệ:
        </label>
        <select
          id="inputRelation1"
          className="form-select"
          value={contactInfo.relationship} // Set the value of the select to the selectedBranch state
          onChange={(e) =>
            setContactInfo((prev) => ({
              ...prev,
              relationship: e.target.value,
            }))
          }
          required // Call handleBranchChange when the value changes
        >
          {RELATIONSHIPS.map((rel, _id) => (
            <option key={_id} value={rel.en.toUpperCase()}>
              {rel.vn}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group col-sm-8 col-lg-6">
        <label htmlFor="inputPhone1">
          <RequiredSharp />
          Số điện thoại:
        </label>
        <input
          type="text"
          className="form-control"
          id="inputPhone1"
          placeholder=""
          value={contactInfo.phoneNumber}
          pattern="^0\d{9}$"
          onChange={(e) =>
            setContactInfo((prev) => ({
              ...prev,
              phoneNumber: e.target.value,
            }))
          }
          required
        />
      </div>
    </>
  );
};

export default ContactInfoForm;
