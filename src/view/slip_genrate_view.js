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
    // IMPORTANT: turn off compression & use only built-in Courier font
    const doc = new jsPDF({
      unit: "mm",
      format: "a4",
      compress: false,
      putOnlyUsedFonts: true,
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const marginLeft = 10;
    const marginRight = pageWidth - 10;
    const centerX = pageWidth / 2;

    // Base font setup – dot-matrix friendly
    doc.setFont("courier", "normal");
    doc.setTextColor(0, 0, 0);
    doc.setLineHeightFactor(1.0);

    // Header
    doc.setFontSize(12);
    doc.text((formData.companyName || "").toUpperCase(), centerX, 15, {
      align: "center",
    });

    doc.setFontSize(9);

    // Company address (single line – keep it simple for dot-matrix)
    const addrLines = (formData.companyAddress || "").split("\n");
    addrLines.forEach((ln, i) =>
      doc.text(ln, centerX, 20 + i * 4, { align: "center" })
    );

    // Capacity line
    const capacityY = 20 + addrLines.length * 4 + 4;
    doc.text(
      `CAPACITY ${formData.capacity || "150"} MT`,
      centerX,
      capacityY,
      { align: "center" }
    );

    let y = capacityY + 4;

    // Horizontal line instead of dashed characters
    doc.line(marginLeft, y, marginRight, y);
    y += 6;

    // Top Info Block (RST, Vehicle, Vhl Type, Party name)
    // Keep labels & values short and aligned – better for dot-matrix
    doc.text("RST No.     :", marginLeft, y);
    doc.text(formData.rstNo || "", marginLeft + 30, y);
    doc.text("Vehicle No. :", centerX, y);
    doc.text(formData.vehicleNo || "", centerX + 30, y);
    y += 6;

    doc.text("Vhl Type    :", marginLeft, y);
    doc.text(formData.vhlType || "", marginLeft + 30, y);
    doc.text("Party Name  :", centerX, y);
    doc.text(formData.partyName || "", centerX + 30, y);
    y += 6;

    doc.text("Address     :", marginLeft, y);
    doc.text(formData.partyAddress || "", marginLeft + 30, y);
    doc.text("Item        :", centerX, y);
    doc.text(formData.item || "", centerX + 30, y);
    y += 6;

    doc.line(marginLeft, y, marginRight, y);
    y += 6;

    // Weights block (Gross, Tare, Net) with dates and times
    doc.text("Gross  :", marginLeft, y);
    doc.text(`${formData.grossWeight || "0"} Kg`, marginLeft + 20, y);
    doc.text("Date :", centerX, y);
    doc.text(formatDate(formData.grossDateTime), centerX + 15, y);
    doc.text("Time :", centerX + 50, y);
    doc.text(formatTime(formData.grossDateTime), centerX + 65, y);
    y += 6;

    doc.text("Tare   :", marginLeft, y);
    doc.text(`${formData.tareWeight || "0"} Kg`, marginLeft + 20, y);
    doc.text("Date :", centerX, y);
    doc.text(formatDate(formData.tareDateTime), centerX + 15, y);
    doc.text("Time :", centerX + 50, y);
    doc.text(formatTime(formData.tareDateTime), centerX + 65, y);
    y += 6;

    doc.text("Net    :", marginLeft, y);
    doc.text(`${formData.netWeight || "0"} Kg`, marginLeft + 20, y);
    y += 6;

    doc.line(marginLeft, y, marginRight, y);
    y += 6;

    // Charges row
    doc.text("Charges :", marginLeft, y);
    doc.text(`Rs ${formData.charges || "0"}`, marginLeft + 25, y);
    y += 6;

    doc.line(marginLeft, y, marginRight, y);
    y += 6;

    // Footer: phones and thanks
    const phones = [formData.phone1, formData.phone2].filter(Boolean).join("  ");
    if (phones) {
      doc.text(`PH NO ${phones}`, centerX, y, { align: "center" });
      y += 6;
    }

    doc.text("Thanks for your visit", centerX, y, { align: "center" });

    return doc;
  };

  const generatePDF = () => {
    const doc = buildPDF();
    doc.save(`DharmKanta_${formData.vehicleNo || "Slip"}.pdf`);
  };

  const printSlip = () => {
    const doc = buildPDF();
    // Use an iframe-based print – more reliable with dot matrix printers
    const blobUrl = doc.output("bloburl");

    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = blobUrl;
    document.body.appendChild(iframe);

    iframe.onload = () => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    };
  };

  return (
    <div className="container-fluid py-3">
      <div className="card shadow-sm mx-auto" style={{ maxWidth: 980 }}>
        <div className="card-body">
          <h4 className="text-center mb-3">Slip Generator</h4>

          <form>
            {/* Use a consistent two-column grid: each item is col-12 on xs, col-md-6 on md+ */}
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label text-start small">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="form-control form-control-sm"
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label text-start small">Company Address</label>
                <input
                  type="text"
                  name="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleChange}
                  className="form-control form-control-sm"
                />
              </div>

              {/* Capacity (MT) */}
              <div className="col-12 col-md-4">
                <label className="form-label text-start small">Capacity (MT)</label>
                <input
                  type="text"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="form-control form-control-sm"
                />
              </div>

              {/* Vhl Type */}
              <div className="col-12 col-md-4">
                <label className="form-label text-start small">Vhl Type</label>
                <input
                  type="text"
                  name="vhlType"
                  value={formData.vhlType}
                  onChange={handleChange}
                  className="form-control form-control-sm"
                />
              </div>

              {/* Vehicle No */}
              <div className="col-12 col-md-4">
                <label className="form-label text-start small">Vehicle No</label>
                <input
                  type="text"
                  name="vehicleNo"
                  value={formData.vehicleNo}
                  onChange={handleChange}
                  className="form-control form-control-sm"
                />
              </div>

              {/* RST No */}
              <div className="col-12 col-md-4">
                <label className="form-label text-start small">RST No</label>
                <input
                  type="text"
                  name="rstNo"
                  value={formData.rstNo}
                  onChange={handleChange}
                  className="form-control form-control-sm"
                />
              </div>

              {/* Party Name */}
              <div className="col-12 col-md-4">
                <label className="form-label text-start small">Party Name</label>
                <input
                  type="text"
                  name="partyName"
                  value={formData.partyName}
                  onChange={handleChange}
                  className="form-control form-control-sm"
                />
              </div>

              {/* Item */}
              <div className="col-12 col-md-4">
                <label className="form-label text-start small">Item</label>
                <input
                  type="text"
                  name="item"
                  value={formData.item}
                  onChange={handleChange}
                  className="form-control form-control-sm"
                />
              </div>

              {/* Party Address - full width */}
              <div className="col-12">
                <label className="form-label text-start small">Party Address</label>
                <input
                  type="text"
                  name="partyAddress"
                  value={formData.partyAddress}
                  onChange={handleChange}
                  className="form-control form-control-sm"
                />
              </div>

              {/* Gross, Tare, Net - each one third on md+ */}
              <div className="col-12 col-md-4">
                <label className="form-label text-start small">Gross (Kg)</label>
                <input
                  type="text"
                  name="grossWeight"
                  value={formData.grossWeight}
                  onChange={handleChange}
                  className="form-control form-control-sm"
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label text-start small">Tare (Kg)</label>
                <input
                  type="text"
                  name="tareWeight"
                  value={formData.tareWeight}
                  onChange={handleChange}
                  className="form-control form-control-sm"
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label text-start small">Net (Kg)</label>
                <input
                  type="text"
                  name="netWeight"
                  value={formData.netWeight}
                  onChange={handleChange}
                  className="form-control form-control-sm"
                />
              </div>

              {/* Gross Date & Time */}
              <div className="col-12 col-md-6">
                <label className="form-label text-start small">Gross Date & Time</label>
                <DatePicker
                  selected={formData.grossDateTime}
                  onChange={(d) => handleDateChange("grossDateTime", d)}
                  showTimeSelect
                  dateFormat="dd/MM/yyyy HH:mm:ss"
                  className="form-control form-control-sm"
                />
              </div>

              {/* Tare Date & Time */}
              <div className="col-12 col-md-6">
                <label className="form-label text-start small">Tare Date & Time</label>
                <DatePicker
                  selected={formData.tareDateTime}
                  onChange={(d) => handleDateChange("tareDateTime", d)}
                  showTimeSelect
                  dateFormat="dd/MM/yyyy HH:mm:ss"
                  className="form-control form-control-sm"
                />
              </div>

              {/* Charges, Phone1, Phone2 */}
              <div className="col-12 col-md-4">
                <label className="form-label text-start small">Charges (Rs)</label>
                <input
                  type="text"
                  name="charges"
                  value={formData.charges}
                  onChange={handleChange}
                  className="form-control form-control-sm"
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label text-start small">Phone 1</label>
                <input
                  type="text"
                  name="phone1"
                  value={formData.phone1}
                  onChange={handleChange}
                  className="form-control form-control-sm"
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label text-start small">Phone 2</label>
                <input
                  type="text"
                  name="phone2"
                  value={formData.phone2}
                  onChange={handleChange}
                  className="form-control form-control-sm"
                />
              </div>
            </div>

            <div className="d-flex justify-content-center gap-2 mt-3">
              <Button
                variant="primary"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  generatePDF();
                }}
              >
                Generate PDF
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  printSlip();
                }}
              >
                Print Slip
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Minor tweaks to keep labels compact on tiny screens */}
      <style>{`
        .card { border-radius: 8px; }
        .form-label { display:block; margin-bottom:6px; }
        @media (max-width: 575.98px) {
          .form-label.small { font-size: .85rem; }
        }
        .react-datepicker-wrapper { width: 100% !important; }
        .react-datepicker__input-container input {
          width: 100% !important;
          box-sizing: border-box;
        }
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

// // Responsive single-file React component for Dharm Kanta Slip
// // Uses Bootstrap grid utilities. Labels are placed inline (in the same row as the field).
// // On small screens the layout stacks gracefully.

// export default function A4DharmKantaSlip() {
//   const [formData, setFormData] = useState({
//     companyName: "",
//     companyAddress: "",
//     capacity: "",
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
//     doc.setFontSize(16);
//   //   doc.text((formData.companyName || "").toUpperCase(), centerX, 15, {
//   //   align: "center",
//   //   charSpace: 1,    // ⭐ Add character spacing here
//   // });
//     doc.text((formData.companyName || "").toUpperCase(), centerX, 15, { align: "center",});

//     doc.setFont("courier", "normal");
//     doc.setFontSize(10);
//     // Company address may be long -> wrap manually
//     const addrLines = (formData.companyAddress || "").split("\n");
//     addrLines.forEach((ln, i) => doc.text(ln, centerX, 20 + i * 5, { align: "center" }));

//     // Capacity line
//     doc.setFontSize(10);
//     doc.text(`CAPACITY ${formData.capacity || "150"} MT`, centerX, 20 + addrLines.length * 5, { align: "center" });

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
//     doc.text(`Gross  : ${formData.grossWeight || "0"} Kg`, 20, y);
//     doc.text(`Date : ${formatDate(formData.grossDateTime)}`, 110, y);
//     doc.text(`Time : ${formatTime(formData.grossDateTime)}`, 150, y);
//     y += 6;

//     doc.text(`Tare   : ${formData.tareWeight || "0"} Kg`, 20, y);
//     doc.text(`Date : ${formatDate(formData.tareDateTime)}`, 110, y);
//     doc.text(`Time : ${formatTime(formData.tareDateTime)}`, 150, y);
//     y += 6;

//     doc.text(`Net    : ${formData.netWeight || "0"} Kg`, 20, y);
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
//     <div className="container-fluid py-3">
//       <div className="card shadow-sm mx-auto" style={{ maxWidth: 980 }}>
//         <div className="card-body">
//           <h4 className="text-center mb-3">Slip Generator</h4>

//           <form>
//             {/* Use a consistent two-column grid: each item is col-12 on xs, col-md-6 on md+ */}
//             <div className="row g-3">
//               <div className="col-12 col-md-6">
//               <label className="form-label text-start small">Company Name</label>
//               <input
//                 type="text"
//                 name="companyName"
//                 value={formData.companyName}
//                 onChange={handleChange}
//                 className="form-control form-control-sm"
//               />
//             </div>
//           <div className="col-12 col-md-6">
//             <label className="form-label text-start small">Company Address</label>
//             <input
//              type="text"
//               name="companyAddress"
//               value={formData.companyAddress}
//               onChange={handleChange}
//               className="form-control form-control-sm"
//             />
//           </div>

//               {/* Capacity (MT) */}
//               <div className="col-12 col-md-4">
//                 <label className="form-label text-start small">Capacity (MT)</label>
//                 <input
//                   type="text"
//                   name="capacity"
//                   value={formData.capacity}
//                   onChange={handleChange}
//                   className="form-control form-control-sm"
//                 />
//               </div>

//               {/* Vhl Type */}
//               <div className="col-12 col-md-4">
//                 <label className="form-label text-start small">Vhl Type</label>
//                 <input
//                   type="text"
//                   name="vhlType"
//                   value={formData.vhlType}
//                   onChange={handleChange}
//                   className="form-control form-control-sm"
//                 />
//               </div>

//               {/* Vehicle No */}
//               <div className="col-12 col-md-4">
//                 <label className="form-label text-start small">Vehicle No</label>
//                 <input
//                   type="text"
//                   name="vehicleNo"
//                   value={formData.vehicleNo}
//                   onChange={handleChange}
//                   className="form-control form-control-sm"
//                 />
//               </div>

//               {/* RST No */}
//               <div className="col-12 col-md-4">
//                 <label className="form-label text-start small">RST No</label>
//                 <input
//                   type="text"
//                   name="rstNo"
//                   value={formData.rstNo}
//                   onChange={handleChange}
//                   className="form-control form-control-sm"
//                 />
//               </div>

//               {/* Party Name */}
//               <div className="col-12 col-md-4">
//                 <label className="form-label text-start small">Party Name</label>
//                 <input
//                   type="text"
//                   name="partyName"
//                   value={formData.partyName}
//                   onChange={handleChange}
//                   className="form-control form-control-sm"
//                 />
//               </div>

//               {/* Item */}
//               <div className="col-12 col-md-4">
//                 <label className="form-label text-start small">Item</label>
//                 <input
//                   type="text"
//                   name="item"
//                   value={formData.item}
//                   onChange={handleChange}
//                   className="form-control form-control-sm"
//                 />
//               </div>

//               {/* Party Address - full width */}
//               <div className="col-12">
//                 <label className="form-label text-start small">Party Address</label>
//                 <input
//                   type="text"
//                   name="partyAddress"
//                   value={formData.partyAddress}
//                   onChange={handleChange}
//                   className="form-control form-control-sm"
//                 />
//               </div>

//               {/* Gross, Tare, Net - each one third on md+ */}
//               <div className="col-12 col-md-4">
//                 <label className="form-label text-start small">Gross (Kg)</label>
//                 <input
//                   type="text"
//                   name="grossWeight"
//                   value={formData.grossWeight}
//                   onChange={handleChange}
//                   className="form-control form-control-sm"
//                 />
//               </div>

//               <div className="col-12 col-md-4">
//                 <label className="form-label text-start small">Tare (Kg)</label>
//                 <input
//                   type="text"
//                   name="tareWeight"
//                   value={formData.tareWeight}
//                   onChange={handleChange}
//                   className="form-control form-control-sm"
//                 />
//               </div>

//               <div className="col-12 col-md-4">
//                 <label className="form-label text-start small">Net (Kg)</label>
//                 <input
//                   type="text"
//                   name="netWeight"
//                   value={formData.netWeight}
//                   onChange={handleChange}
//                   className="form-control form-control-sm"
//                 />
//               </div>

//               {/* Gross Date & Time */}
//               <div className="col-12 col-md-6">
//                 <label className="form-label text-start small">Gross Date & Time</label>
//                 <DatePicker
//                   selected={formData.grossDateTime}
//                   onChange={(d) => handleDateChange("grossDateTime", d)}
//                   showTimeSelect
//                   dateFormat="dd/MM/yyyy HH:mm:ss"
//                   className="form-control form-control-sm"
//                 />
//               </div>

//               {/* Tare Date & Time */}
//               <div className="col-12 col-md-6">
//                 <label className="form-label text-start small">Tare Date & Time</label>
//                 <DatePicker
//                   selected={formData.tareDateTime}
//                   onChange={(d) => handleDateChange("tareDateTime", d)}
//                   showTimeSelect
//                   dateFormat="dd/MM/yyyy HH:mm:ss"
//                   className="form-control form-control-sm"
//                 />
//               </div>

//               {/* Charges, Phone1, Phone2 */}
//               <div className="col-12 col-md-4">
//                 <label className="form-label text-start small">Charges (Rs)</label>
//                 <input
//                   type="text"
//                   name="charges"
//                   value={formData.charges}
//                   onChange={handleChange}
//                   className="form-control form-control-sm"
//                 />
//               </div>

//               <div className="col-12 col-md-4">
//                 <label className="form-label text-start small">Phone 1</label>
//                 <input
//                   type="text"
//                   name="phone1"
//                   value={formData.phone1}
//                   onChange={handleChange}
//                   className="form-control form-control-sm"
//                 />
//               </div>

//               <div className="col-12 col-md-4">
//                 <label className="form-label text-start small">Phone 2</label>
//                 <input
//                   type="text"
//                   name="phone2"
//                   value={formData.phone2}
//                   onChange={handleChange}
//                   className="form-control form-control-sm"
//                 />
//               </div>
//             </div>

//             <div className="d-flex justify-content-center gap-2 mt-3">
//               <Button
//                 variant="primary"
//                 size="sm"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   generatePDF();
//                 }}
//               >
//                 Generate PDF
//               </Button>
//               <Button
//                 variant="secondary"
//                 size="sm"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   printSlip();
//                 }}
//               >
//                 Print Slip
//               </Button>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Minor tweaks to keep labels compact on tiny screens */}
//       <style>{`
//         .card { border-radius: 8px; }
//         .form-label { display:block; margin-bottom:6px; }
//         @media (max-width: 575.98px) {
//           .form-label.small { font-size: .85rem; }
//         }
//         .react-datepicker-wrapper { width: 100% !important; }
//         .react-datepicker__input-container input {
//           width: 100% !important;
//           box-sizing: border-box;
//         }

//       `}</style>
//     </div>
//   );
// }
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

