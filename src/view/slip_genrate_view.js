// import React, { useState } from "react";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { Button } from "react-bootstrap";

// export default function StoneCrusherSlip() {
//   const [formData, setFormData] = useState({
//     companyName: "",
//     mobileNumber: "",
//     ticketNo: "",
//     date: new Date(),
//     buyer: "",
//     supplier: "",
//     location: "",
//     vehicleDetail: "",
//     driverDetail: "",
//     mineralName: "",
//     charge: "",
//     grossWeight: "",
//     tareWeight: "",
//     netWeight: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const buildPDF = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(16);
//     doc.text(formData.companyName, 105, 15, { align: "center" });
//     doc.setFontSize(10);
//     doc.text(`Mobile: ${formData.mobileNumber}`, 105, 22, { align: "center" });

//     const tableData = [
//       ["Ticket No.", formData.ticketNo, "Date", formData.date.toLocaleString()],
//       ["Buyer", formData.buyer, "Mineral Name", formData.mineralName],
//       ["Supplier", formData.supplier, "Charge", formData.charge],
//       ["Location", formData.location, "Gross Weight", formData.grossWeight],
//       ["Vehicle Detail", formData.vehicleDetail, "Tare Weight", formData.tareWeight],
//       ["Driver Detail", formData.driverDetail, "Net Weight", formData.netWeight],
//     ];

//     autoTable(doc, {
//       body: tableData,
//       theme: "grid",
//       styles: { halign: "left", valign: "middle" },
//       headStyles: { fillColor: [220, 220, 220] },
//       startY: 30,
//     });

//     return doc;
//   };

//   const generatePDF = () => {
//     const doc = buildPDF();
//     doc.save(`Ticket_${formData.ticketNo}.pdf`);
//   };

//   const printSlip = () => {
//     const doc = buildPDF();
//     doc.autoPrint();
//     const blobUrl = doc.output("bloburl");
//     const printWindow = window.open(blobUrl);
//     if (!printWindow) {
//       // Fallback if popup is blocked
//       doc.save(`Ticket_${formData.ticketNo}.pdf`);
//     }
//   };

//   return (
//     <div className="container py-4" style={{
//             boxShadow:
//           "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
//       }}>
//       <div className="card shadow-sm" >
//         <div className="card-body">
//           <h1 className="text-center h4 mb-3 card text-bg-light" style={{padding:"10"}}>Slip Generator</h1>
//           <div className="row g-3">
//             {/* Company Name */}
//             <div className="col-12 col-md-6">
//               <label className="form-label text-start d-block text-start d-block " style={{fontSize:"14px"}} >Company Name</label>

//               <input
//                 type="text"
//                 name="companyName"
//                 value={formData.companyName}
//                 onChange={handleChange}
//                 className="form-control small-input" 
//               />
//             </div>
//             {/* Mobile Number */}
//             <div className="col-12 col-md-6">
//               <label className="form-label text-start d-block" style={{fontSize:"14px"}}>Mobile Number</label>
//               <input
//                 type="text"
//                 name="mobileNumber"
//                 value={formData.mobileNumber}
//                 onChange={handleChange}
//                 className="form-control small-input"
//               />
//             </div>
//             {/* Ticket No */}
//             <div className="col-12 col-md-6">
//               <label className="form-label text-start d-block"style={{fontSize:"14px"}}>Ticket No</label>
//               <input
//                 type="text"
//                 name="ticketNo"
//                 value={formData.ticketNo}
//                 onChange={handleChange}
//                 className="form-control small-input"
//               />
//             </div>
//             {/* Date Picker */}
//             <div className="col-12 col-md-6">
//               <label className="form-label text-start d-block"style={{fontSize:"14px"}}>Date</label>
//               <DatePicker
//                 selected={formData.date}
//                 onChange={(date) => setFormData({ ...formData, date })}
//                 showTimeSelect
//                 dateFormat="dd/MM/yyyy HH:mm:ss"
//                 className="form-control small-input"
//               />
//             </div>
//             {/* Buyer */}
//             <div className="col-12 col-md-6">
//               <label className="form-label text-start d-block"style={{fontSize:"14px"}}>Buyer</label>
//               <input
//                 type="text"
//                 name="buyer"
//                 value={formData.buyer}
//                 onChange={handleChange}
//                 className="form-control small-input"
//               />
//             </div>
//             {/* Supplier */}
//             <div className="col-12 col-md-6">
//               <label className="form-label text-start d-block"style={{fontSize:"14px"}}>Supplier</label>
//               <input
//                 type="text"
//                 name="supplier"
//                 value={formData.supplier}
//                 onChange={handleChange}
//                 className="form-control small-input"
//               />
//             </div>
//             {/* Location */}
//             <div className="col-12 col-md-6">
//               <label className="form-label text-start d-block"style={{fontSize:"14px"}}>Location</label>
//               <input
//                 type="text"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//                 className="form-control small-input"
//               />
//             </div>
//             {/* Vehicle Detail */}
//             <div className="col-12 col-md-6">
//               <label className="form-label text-start d-block"style={{fontSize:"14px"}}>Vehicle Detail</label>
//               <input
//                 type="text"
//                 name="vehicleDetail"
//                 value={formData.vehicleDetail}
//                 onChange={handleChange}
//                 className="form-control small-input"
//               />
//             </div>
//             {/* Driver Detail */}
//             <div className="col-12 col-md-6">
//               <label className="form-label text-start d-block"style={{fontSize:"14px"}}>Driver Detail</label>
//               <input
//                 type="text"
//                 name="driverDetail"
//                 value={formData.driverDetail}
//                 onChange={handleChange}
//                 className="form-control small-input"
//               />
//             </div>
//             {/* Mineral Name */}
//             <div className="col-12 col-md-6">
//               <label className="form-label text-start d-block"style={{fontSize:"14px"}}>Mineral Name</label>
//               <input
//                 type="text"
//                 name="mineralName"
//                 value={formData.mineralName}
//                 onChange={handleChange}
//                 className="form-control small-input"
//               />
//             </div>
//             {/* Charge */}
//             <div className="col-12 col-md-6">
//               <label className="form-label text-start d-block"style={{fontSize:"14px"}}>Charge</label>
//               <input
//                 type="text"
//                 name="charge"
//                 value={formData.charge}
//                 onChange={handleChange}
//                 className="form-control small-input"
//               />
//             </div>
//             {/* Gross Weight */}
//             <div className="col-12 col-md-6">
//               <label className="form-label text-start d-block"style={{fontSize:"14px"}}>Gross Weight</label>
//               <input
//                 type="text"
//                 name="grossWeight"
//                 value={formData.grossWeight}
//                 onChange={handleChange}
//                 className="form-control small-input"
//               />
//             </div>
//             {/* Tare Weight */}
//             <div className="col-12 col-md-6">
//               <label className="form-label text-start d-block"style={{fontSize:"14px"}}>Vehicle Weight</label>
//               <input
//                 type="text"
//                 name="tareWeight"
//                 value={formData.tareWeight}
//                 onChange={handleChange}
//                 className="form-control small-input"
//               />
//             </div>
//             {/* Net Weight */}
//             <div className="col-12 col-md-6">
//               <label className="form-label text-start d-block"style={{fontSize:"14px"}}>Net Weight</label>
//               <input
//                 type="text"
//                 name="netWeight"
//                 value={formData.netWeight}
//                 onChange={handleChange}
//                 className="form-control small-input"
//               />
//             </div>
//           </div>
//           {/* Buttons */}
//           <div className="d-flex gap-2 justify-content-center mt-4">
//             <Button variant="primary" onClick={generatePDF}>Generate PDF</Button>
//             <Button variant="secondary" onClick={printSlip}>Print</Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
//-----------------------------------------------------

import React, { useState } from "react";
import jsPDF from "jspdf";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "react-bootstrap";

// Responsive single-file React component for Dharm Kanta Slip
// Uses Bootstrap grid utilities. Labels are placed inline (in the same row as the field).
// On small screens the layout stacks gracefully.

export default function A4DharmKantaSlip() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    capacity: "",
    rstNo: "",
    vhlType: "",
    vehicleNo: "",
    partyName: "",
    partyAddress: "",
    item: "",
    grossWeight: "",
    tareWeight: "",
    netWeight: "",
    grossDateTime: new Date(),
    tareDateTime: new Date(),
    charges: "",
    phone1: "",
    phone2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setFormData((s) => ({ ...s, [name]: date }));
  };

  const formatDate = (d) => {
    if (!d) return "";
    const date = new Date(d);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const formatTime = (d) => {
    if (!d) return "";
    const date = new Date(d);
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const sec = String(date.getSeconds()).padStart(2, "0");
    return `${hh}:${min}:${sec}`;
  };

  const buildPDF = () => {
    const doc = new jsPDF({
      unit: "mm",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = pageWidth / 2;

    // Header
    doc.setFont("courier", "bold");
    doc.setFontSize(14);
    doc.text((formData.companyName || "").toUpperCase(), centerX, 15, { align: "center" });

    doc.setFont("courier", "normal");
    doc.setFontSize(10);
    // Company address may be long -> wrap manually
    const addrLines = (formData.companyAddress || "").split("\n");
    addrLines.forEach((ln, i) => doc.text(ln, centerX, 20 + i * 5, { align: "center" }));

    // Capacity line
    doc.setFontSize(10);
    doc.text(`CAPACITY ${formData.capacity || "150"} MT`, centerX, 20 + addrLines.length * 5, { align: "center" });

    let y = 25 + addrLines.length * 5;
    doc.text("-----------------------------------------------------------------------------------", centerX, y, { align: "center" });
    y += 6;

    // Top Info Block (RST, Vehicle, Vhl Type, Party name)
    doc.setFontSize(11);
    doc.text(`RST No.     : ${formData.rstNo || ""}`, 20, y);
    doc.text(`Vehicle No. : ${formData.vehicleNo || ""}`, 120, y);
    y += 6;
    doc.text(`Vhl Type    : ${formData.vhlType || ""}`, 20, y);
    doc.text(`Party Name  : ${formData.partyName || ""}`, 120, y);
    y += 6;
    doc.text(`Address     : ${formData.partyAddress || ""}`, 20, y);
    doc.text(`Item        : ${formData.item || ""}`, 120, y);
    y += 6;
    doc.text("----------------------------------------------------------------------------", centerX, y, { align: "center" });
    y += 6;

    // Weights block (Gross, Tare, Net) with dates and times
    doc.setFontSize(10);
    doc.text(`Gross  : ${formData.grossWeight || "0"} Kg`, 20, y);
    doc.text(`Date : ${formatDate(formData.grossDateTime)}`, 110, y);
    doc.text(`Time : ${formatTime(formData.grossDateTime)}`, 150, y);
    y += 6;

    doc.text(`Tare   : ${formData.tareWeight || "0"} Kg`, 20, y);
    doc.text(`Date : ${formatDate(formData.tareDateTime)}`, 110, y);
    doc.text(`Time : ${formatTime(formData.tareDateTime)}`, 150, y);
    y += 6;

    doc.text(`Net    : ${formData.netWeight || "0"} Kg`, 20, y);
    y += 6;

    doc.text("------------------------------------------------------------------------------------", centerX, y, { align: "center" });
    y += 6;

    // Charges row
    doc.text(`Charges : Rs ${formData.charges || "0"}`, 20, y);
    y += 6;

    doc.text("------------------------------------------------------------------------------------", centerX, y, { align: "center" });
    y += 6;

    // Footer: phones and thanks
    doc.setFontSize(10);
    const phones = [formData.phone1, formData.phone2].filter(Boolean).join("  ");
    doc.text(`PH NO ${phones}`, centerX, y, { align: "center" });
    y += 6;
    doc.text("Thanks for your visit", centerX, y, { align: "center" });

    return doc;
  };

  const generatePDF = () => {
    const doc = buildPDF();
    doc.save(`DharmKanta_${formData.vehicleNo || "Slip"}.pdf`);
  };

  const printSlip = () => {
    const doc = buildPDF();
    doc.autoPrint();
    const blobUrl = doc.output("bloburl");
    window.open(blobUrl);
  };

  return (
    <div className="container-fluid py-3">
      <div className="card shadow-sm mx-auto" style={{ maxWidth: 980 }}>
        <div className="card-body">
          <h4 className="text-center mb-3">Slip Generator</h4>

          {/* Use responsive grid: each pair stacks on xs and sits side-by-side on md+ */}
          <form>
            <div className="row g-2 align-items-center">

              {/* Company Name (label inline) */}
              <div className="col-12">
                <div className="row gx-2 align-items-center">
                  <label className="col-12 col-sm-4 col-form-label small text-sm-end">Company Name</label>
                  <div className="col-12 col-sm-8">
                    <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="form-control form-control-sm" />
                  </div>
                </div>
              </div>

              {/* Company Address */}
              <div className="col-12">
                <div className="row gx-2 align-items-start">
                  <label className="col-12 col-sm-4 col-form-label small text-sm-end">Company Address</label>
                  <div className="col-12 col-sm-8">
                    <textarea name="companyAddress" value={formData.companyAddress} onChange={handleChange} rows={2} className="form-control form-control-sm" />
                  </div>
                </div>
              </div>

              {/* Capacity, Vhl Type, Vehicle No - arranged responsively */}
              <div className="col-12 col-md-4">
                <div className="row gx-2 align-items-center">
                  <label className="col-5 col-form-label small text-end">Capacity (MT)</label>
                  <div className="col-7">
                    <input type="text" name="capacity" value={formData.capacity} onChange={handleChange} className="form-control form-control-sm" />
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="row gx-2 align-items-center">
                  <label className="col-5 col-form-label small text-end">Vhl Type</label>
                  <div className="col-7">
                    <input type="text" name="vhlType" value={formData.vhlType} onChange={handleChange} className="form-control form-control-sm" />
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="row gx-2 align-items-center">
                  <label className="col-5 col-form-label small text-end">Vehicle No</label>
                  <div className="col-7">
                    <input type="text" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} className="form-control form-control-sm" />
                  </div>
                </div>
              </div>

              {/* RST No, Party Name, Item */}
              <div className="col-12 col-md-4">
                <div className="row gx-2 align-items-center">
                  <label className="col-5 col-form-label small text-end">RST No</label>
                  <div className="col-7">
                    <input type="text" name="rstNo" value={formData.rstNo} onChange={handleChange} className="form-control form-control-sm" />
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="row gx-2 align-items-center">
                  <label className="col-5 col-form-label small text-end">Party Name</label>
                  <div className="col-7">
                    <input type="text" name="partyName" value={formData.partyName} onChange={handleChange} className="form-control form-control-sm" />
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="row gx-2 align-items-center">
                  <label className="col-5 col-form-label small text-end">Item</label>
                  <div className="col-7">
                    <input type="text" name="item" value={formData.item} onChange={handleChange} className="form-control form-control-sm" />
                  </div>
                </div>
              </div>

              {/* Party Address full width */}
              <div className="col-12">
                <div className="row gx-2 align-items-center">
                  <label className="col-12 col-sm-4 col-form-label small text-sm-end">Party Address</label>
                  <div className="col-12 col-sm-8">
                    <input type="text" name="partyAddress" value={formData.partyAddress} onChange={handleChange} className="form-control form-control-sm" />
                  </div>
                </div>
              </div>

              {/* Weights: Gross, Tare, Net */}
              <div className="col-12 col-md-4">
                <div className="row gx-2 align-items-center">
                  <label className="col-5 col-form-label small text-end">Gross (Kg)</label>
                  <div className="col-7">
                    <input type="text" name="grossWeight" value={formData.grossWeight} onChange={handleChange} className="form-control form-control-sm" />
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="row gx-2 align-items-center">
                  <label className="col-5 col-form-label small text-end">Tare (Kg)</label>
                  <div className="col-7">
                    <input type="text" name="tareWeight" value={formData.tareWeight} onChange={handleChange} className="form-control form-control-sm" />
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="row gx-2 align-items-center">
                  <label className="col-5 col-form-label small text-end">Net (Kg)</label>
                  <div className="col-7">
                    <input type="text" name="netWeight" value={formData.netWeight} onChange={handleChange} className="form-control form-control-sm" />
                  </div>
                </div>
              </div>

              {/* Date & Time pickers - each takes half on md+ */}
              <div className="col-12 col-md-6">
                <div className="row gx-2 align-items-center">
                  <label className="col-5 col-form-label small text-end">Gross Date & Time</label>
                  <div className="col-7">
                    <DatePicker
                      selected={formData.grossDateTime}
                      onChange={(d) => handleDateChange("grossDateTime", d)}
                      showTimeSelect
                      dateFormat="dd/MM/yyyy HH:mm:ss"
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="row gx-2 align-items-center">
                  <label className="col-5 col-form-label small text-end">Tare Date & Time</label>
                  <div className="col-7">
                    <DatePicker
                      selected={formData.tareDateTime}
                      onChange={(d) => handleDateChange("tareDateTime", d)}
                      showTimeSelect
                      dateFormat="dd/MM/yyyy HH:mm:ss"
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Charges and Phones */}
              <div className="col-12 col-md-4">
                <div className="row gx-2 align-items-center">
                  <label className="col-5 col-form-label small text-end">Charges (Rs)</label>
                  <div className="col-7">
                    <input type="text" name="charges" value={formData.charges} onChange={handleChange} className="form-control form-control-sm" />
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="row gx-2 align-items-center">
                  <label className="col-5 col-form-label small text-end">Phone 1</label>
                  <div className="col-7">
                    <input type="text" name="phone1" value={formData.phone1} onChange={handleChange} className="form-control form-control-sm" />
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="row gx-2 align-items-center">
                  <label className="col-5 col-form-label small text-end">Phone 2</label>
                  <div className="col-7">
                    <input type="text" name="phone2" value={formData.phone2} onChange={handleChange} className="form-control form-control-sm" />
                  </div>
                </div>
              </div>

            </div>

            <div className="d-flex justify-content-center gap-2 mt-3">
              <Button variant="primary" size="sm" onClick={(e) => { e.preventDefault(); generatePDF(); }}>Generate PDF</Button>
              <Button variant="secondary" size="sm" onClick={(e) => { e.preventDefault(); printSlip(); }}>Print Slip</Button>
            </div>

          </form>

        </div>
      </div>

      {/* small CSS tweaks to keep labels compact on very small screens */}
      <style>{`
        @media (max-width: 575.98px) {
          .col-form-label.text-sm-end { text-align: left !important; margin-bottom: 4px; }
        }
        .card { border-radius: 8px; }
      `}</style>
    </div>
  );
}
//-----------------------------------------------------
// import React, { useState } from "react";
// import jsPDF from "jspdf";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { Button } from "react-bootstrap";

// export default function A4DharmKantaSlip() {
//   const [formData, setFormData] = useState({
//     companyName: "ABC",
//     companyAddress: "XYZ",
//     capacity: "10",
//     rstNo: "",
//     vhlType: "",
//     vehicleNo: "",
//     partyName: "",
//     partyAddress: "",
//     item: "",
//     grossWeight: "",
//     tareWeight: "",
//     netWeight: "",
//     grossDateTime: new Date(),
//     tareDateTime: new Date(),
//     charges: "",
//     phone1: "",
//     phone2: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((s) => ({ ...s, [name]: value }));
//   };

//   const handleDateChange = (name, date) => {
//     setFormData((s) => ({ ...s, [name]: date }));
//   };

//   const formatDate = (d) => {
//     if (!d) return "";
//     const date = new Date(d);
//     const dd = String(date.getDate()).padStart(2, "0");
//     const mm = String(date.getMonth() + 1).padStart(2, "0");
//     const yyyy = date.getFullYear();
//     return `${dd}/${mm}/${yyyy}`;
//   };

//   const formatTime = (d) => {
//     if (!d) return "";
//     const date = new Date(d);
//     const hh = String(date.getHours()).padStart(2, "0");
//     const min = String(date.getMinutes()).padStart(2, "0");
//     const sec = String(date.getSeconds()).padStart(2, "0");
//     return `${hh}:${min}:${sec}`;
//   };

//   const buildPDF = () => {
//     const doc = new jsPDF({
//       unit: "mm",
//       format: "a4",
//     });

//     const pageWidth = doc.internal.pageSize.getWidth();
//     const centerX = pageWidth / 2;

//     // Header
//     doc.setFont("courier", "bold");
//     doc.setFontSize(14);
//     doc.text((formData.companyName || "").toUpperCase(), centerX, 15, { align: "center" });

//     doc.setFont("courier", "normal");
//     doc.setFontSize(10);
//     // Company address may be long -> wrap manually
//     const addrLines = (formData.companyAddress || "").split("\n");
//     addrLines.forEach((ln, i) => doc.text(ln, centerX, 20 + i * 5, { align: "center" }));

//     // Capacity line
//     doc.setFontSize(10);
//     doc.text(`CAPACITY ${formData.capacity || "150"} MT`, centerX, 20  + addrLines.length * 5, { align: "center" });

//     let y = 25 + addrLines.length * 5;
//     doc.text("-----------------------------------------------------------------------------------", centerX, y, { align: "center" });
//     y += 6;

//     // Top Info Block (RST, Vehicle, Vhl Type, Party name)
//     doc.setFontSize(11);
//     doc.text(`RST No.     : ${formData.rstNo || ""}`, 20, y);
//     doc.text(`Vehicle No. : ${formData.vehicleNo || ""}`, 120, y);
//     y += 6;
//     doc.text(`Vhl Type    : ${formData.vhlType || ""}`, 20, y);
//     doc.text(`Party Name  : ${formData.partyName || ""}`, 120, y);
//     y += 6;
//     doc.text(`Address     : ${formData.partyAddress || ""}`, 20, y);
//     doc.text(`Item        : ${formData.item || ""}`, 120, y);
//     y += 6;
//     doc.text("----------------------------------------------------------------------------", centerX, y, { align: "center" });
//     y += 6;

//     // Weights block (Gross, Tare, Net) with dates and times
//     doc.setFontSize(10);
//     doc.text(`Gross  : ${formData.grossWeight || ""} Kg`, 20, y);
//     doc.text(`Date : ${formatDate(formData.grossDateTime)}`, 110, y);
//     doc.text(`Time : ${formatTime(formData.grossDateTime)}`, 150, y);
//     y += 6;

//     doc.text(`Tare   : ${formData.tareWeight || ""} Kg`, 20, y);
//     doc.text(`Date : ${formatDate(formData.tareDateTime)}`, 110, y);
//     doc.text(`Time : ${formatTime(formData.tareDateTime)}`, 150, y);
//     y += 6;

//     doc.text(`Net    : ${formData.netWeight || ""} Kg`, 20, y);
//     // optionally show same time or separate time; we'll show tare time under Time column already
//     y += 6;

//     doc.text("------------------------------------------------------------------------------------", centerX, y, { align: "center" });
//     y += 6;

//     // Charges row
//     doc.text(`Charges : Rs ${formData.charges || "0"}`, 20, y);
//     y += 6;

//     doc.text("------------------------------------------------------------------------------------", centerX, y, { align: "center" });
//     y += 6;

//     // Footer: phones and thanks
//     doc.setFontSize(10);
//     const phones = [formData.phone1, formData.phone2].filter(Boolean).join("  ");
//     doc.text(`PH NO ${phones}`, centerX, y, { align: "center" });
//     y += 6;
//     doc.text("Thanks for your visit", centerX, y, { align: "center" });

//     return doc;
//   };

//   const generatePDF = () => {
//     const doc = buildPDF();
//     doc.save(`DharmKanta_${formData.vehicleNo || "Slip"}.pdf`);
//   };

//   const printSlip = () => {
//     const doc = buildPDF();
//     doc.autoPrint();
//     const blobUrl = doc.output("bloburl");
//     window.open(blobUrl);
//   };

//   return (
//     <div className="container py-4">
//       <div className="card shadow-sm">
//         <div className="card-body">
//           <h4 className="text-center mb-3">Dharm Kanta Slip Generator</h4>

//           <div className="row g-2">
//             <div className="col-12">
//               <label className="form-label small">Company Name</label>
//               <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="form-control form-control-sm" />
//             </div>

//             <div className="col-12">
//               <label className="form-label small">Company Address</label>
//               <textarea name="companyAddress" value={formData.companyAddress} onChange={handleChange} rows={2} className="form-control form-control-sm" />
//             </div>

//             <div className="col-4">
//               <label className="form-label small">Capacity (MT)</label>
//               <input type="text" name="capacity" value={formData.capacity} onChange={handleChange} className="form-control form-control-sm" />
//             </div>

//             <div className="col-4">
//               <label className="form-label small">Vhl Type</label>
//               <input type="text" name="vhlType" value={formData.vhlType} onChange={handleChange} className="form-control form-control-sm" />
//             </div>

//             <div className="col-4">
//               <label className="form-label small">Vehicle No</label>
//               <input type="text" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} className="form-control form-control-sm" />
//             </div>

//             <div className="col-4">
//               <label className="form-label small">RST No</label>
//               <input type="text" name="rstNo" value={formData.rstNo} onChange={handleChange} className="form-control form-control-sm" />
//             </div>

//             <div className="col-4">
//               <label className="form-label small">Party Name</label>
//               <input type="text" name="partyName" value={formData.partyName} onChange={handleChange} className="form-control form-control-sm" />
//             </div>

//             <div className="col-4">
//               <label className="form-label small">Item</label>
//               <input type="text" name="item" value={formData.item} onChange={handleChange} className="form-control form-control-sm" />
//             </div>

//             <div className="col-12">
//               <label className="form-label small">Party Address</label>
//               <input type="text" name="partyAddress" value={formData.partyAddress} onChange={handleChange} className="form-control form-control-sm" />
//             </div>

//             <div className="col-4">
//               <label className="form-label small">Gross Weight (Kg)</label>
//               <input type="text" name="grossWeight" value={formData.grossWeight} onChange={handleChange} className="form-control form-control-sm" />
//             </div>

//             <div className="col-4">
//               <label className="form-label small">Tare Weight (Kg)</label>
//               <input type="text" name="tareWeight" value={formData.tareWeight} onChange={handleChange} className="form-control form-control-sm" />
//             </div>

//             <div className="col-4">
//               <label className="form-label small">Net Weight (Kg)</label>
//               <input type="text" name="netWeight" value={formData.netWeight} onChange={handleChange} className="form-control form-control-sm" />
//             </div>

//             <div className="col-6">
//               <label className="form-label small">Gross Date & Time</label>
//               <DatePicker
//                 selected={formData.grossDateTime}
//                 onChange={(d) => handleDateChange("grossDateTime", d)}
//                 showTimeSelect
//                 dateFormat="dd/MM/yyyy HH:mm:ss"
//                 className="form-control form-control-sm"
//               />
//             </div>

//             <div className="col-6">
//               <label className="form-label small">Tare Date & Time</label>
//               <DatePicker
//                 selected={formData.tareDateTime}
//                 onChange={(d) => handleDateChange("tareDateTime", d)}
//                 showTimeSelect
//                 dateFormat="dd/MM/yyyy HH:mm:ss"
//                 className="form-control form-control-sm"
//               />
//             </div>

//             <div className="col-6">
//               <label className="form-label small">Charges (Rs)</label>
//               <input type="text" name="charges" value={formData.charges} onChange={handleChange} className="form-control form-control-sm" />
//             </div>

//             <div className="col-6">
//               <label className="form-label small">Phone 1</label>
//               <input type="text" name="phone1" value={formData.phone1} onChange={handleChange} className="form-control form-control-sm" />
//             </div>

//             <div className="col-6 mt-2">
//               <label className="form-label small">Phone 2</label>
//               <input type="text" name="phone2" value={formData.phone2} onChange={handleChange} className="form-control form-control-sm" />
//             </div>
//           </div>

//           <div className="d-flex justify-content-center gap-2 mt-3">
//             <Button variant="primary" size="sm" onClick={generatePDF}>Generate PDF</Button>
//             <Button variant="secondary" size="sm" onClick={printSlip}>Print Slip</Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

