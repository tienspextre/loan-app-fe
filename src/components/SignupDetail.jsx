import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import RequiredSharp from "./RequiredSharp";

export default function SignupForm() {
  const [phone, setPhone] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("-1");
  const [selectedProvince, setSelectedProvince] = useState("-1");
  const [branches, setBranches] = useState(null);
  const [address, setAddress] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [idNumber, setidNumber] = useState("");
  const [dob, setDob] = useState(new Date());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId] = useState("");
  const [gender, setGender] = useState("MALE");
  const [email, setEmail] = useState("");
  const [province, setProvince] = useState(null);
  const navigate = useNavigate();

  const fetchBranchInfos = async (provinceId) => {
    if (provinceId === "-1" || provinceId === -1) {
      return;
    }

    const requestOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/branchInfos/?provinceId=" + provinceId,
        requestOptions
      );
      const result = await response.json();
      setBranches(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchProvinces = async () => {
      const requestOptions = {
        method: "GET",
      };

      try {
        const response = await fetch(
          "http://localhost:8080/api/provinces",
          requestOptions
        );
        const result = await response.json();
        setProvince(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProvinces();
  }, []);

  const handleSignup = async (event) => {
    event.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      accountNumber: accountNumber,
      legal: idNumber,
      emailAddress: email,
      phoneNumber: phone,
      address: address,
      branchInfo: {
        id: selectedBranch,
      },
      user: {
        id: localStorage.getItem("id"),
      },
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "http://localhost:8080/api/accountInfos?user_id=" +
          localStorage.getItem("id"),
        requestOptions
      );
      const result = await response.json();
      localStorage.setItem("isDeclared", 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value); // Update selectedBranch state when the value changes
  };

  const handleProvinceChange = (event) => {
    if (event.target.value === "-1") {
      setSelectedProvince(event.target.value);
      setSelectedBranch("-1");
      setBranches(null);
      return;
    }
    setSelectedProvince(event.target.value); // Update selectedBranch state when the value changes
    fetchBranchInfos(event.target.value);
  };

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Nhập thông tin</h5>
              <form onSubmit={handleSignup}>
                {/* <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    <RequiredSharp /> Họ:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    placeholder="Nhập họ"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    <RequiredSharp /> Tên:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Nhập tên"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div> */}
                {/* <div className="mb-3">
                  <label htmlFor="gender" className="form-label">
                    <RequiredSharp /> Giới tính:
                  </label>
                  <select
                    id="inputGenger"
                    className="form-select"
                    value={gender} // Set the value of the select to the selectedBranch state
                    name="gender"
                    onChange={(e) => setGender(e.target.value)}
                    required // Call handleBranchChange when the value changes
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div> */}
                <div className="mb-3">
                  <label htmlFor="accountNumber" className="form-label">
                    <RequiredSharp /> Số tài khoản:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="accountNumber"
                    placeholder="Nhập số tài khoản"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="idNumber" className="form-label">
                    <RequiredSharp /> CCCD/CMND:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="idNumber"
                    placeholder="Nhập số CCCD"
                    value={idNumber}
                    onChange={(e) => setidNumber(e.target.value)}
                    required
                  />
                </div>
                {/* <div className="mb-3">
                  <label htmlFor="dob" className="form-label">
                    <RequiredSharp /> Ngày sinh:
                  </label>
                  <br />
                  <DatePicker
                    selected={dob}
                    onChange={(date) => setDob(date)}
                    required
                  />
                </div> */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label has-validation">
                    <RequiredSharp /> Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Nhập email"
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    <RequiredSharp /> Số điện thoại:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="phone"
                    placeholder="Nhập số điện thoại"
                    pattern="^0\d{9}$"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="branch" className="form-label">
                    <RequiredSharp /> Chọn Tỉnh:
                  </label>
                  <select
                    id="inputProvince"
                    className="form-select"
                    value={selectedProvince} // Set the value of the select to the selectedBranch state
                    onChange={handleProvinceChange}
                    required // Call handleBranchChange when the value changes
                  >
                    <option value="-1">Chọn Tỉnh</option>
                    {province &&
                      province.map(({ id, name, region }, _id) => (
                        <option key={_id} value={id}>
                          {name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="branch" className="form-label">
                    <RequiredSharp /> Chi nhánh:
                  </label>
                  <select
                    id="inputBranch"
                    className="form-select"
                    value={selectedBranch} // Set the value of the select to the selectedBranch state
                    onChange={handleBranchChange}
                  >
                    <option value="-1">Chọn chi nhánh</option>
                    {branches &&
                      branches.map((option, _id) => (
                        <option key={_id} value={option.id}>
                          {option.branchName}
                        </option>
                      ))}
                  </select>
                </div>
                {branches && selectedBranch !== "-1" && (
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      <RequiredSharp /> Địa chỉ chi nhánh:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={branches[selectedBranch]?.address}
                      disabled
                    />
                  </div>
                )}
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    <RequiredSharp /> Địa chỉ:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Nhập địa chỉ"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Lưu thông tin
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
