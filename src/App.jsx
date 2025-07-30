import { useState } from "react";
import { CheckCircle } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function HVACServiceForm() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("HVAC Service Request", 14, 20);

    const entries = Object.entries(formData).map(([key, value]) => [key, value]);
    doc.autoTable({
      startY: 30,
      head: [["Field", "Value"]],
      body: entries,
    });

    doc.save("HVAC_Service_Request.pdf");
    alert("Service request submitted and PDF downloaded!");
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-2xl shadow">
      <h1 className="text-xl font-bold mb-6 text-center">HVAC Service Request / Solicitud de Servicio HVAC</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Info */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Customer Information / Información del Cliente</h2>
          <input name="fullName" placeholder="Juan Pérez" className="w-full border p-2 rounded mb-3" onChange={handleChange} required />
          <input name="address" placeholder="123 Main St" className="w-full border p-2 rounded mb-3" onChange={handleChange} required />

          <div className="grid grid-cols-2 gap-4">
            <input name="city" placeholder="Cincinnati" className="w-full border p-2 rounded" onChange={handleChange} required />
            <input name="zip" placeholder="45240" className="w-full border p-2 rounded" inputMode="numeric" onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-3">
            <input name="phone" placeholder="513-123-4567" className="w-full border p-2 rounded" inputMode="tel" onChange={handleChange} required />
            <input name="email" type="email" placeholder="example@email.com" className="w-full border p-2 rounded" onChange={handleChange} required />
          </div>
        </div>

        {/* Service */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Service Details / Detalles del Servicio</h2>
          <select name="service" className="w-full border p-2 rounded mb-3" onChange={handleChange} required>
            <option value="">Select Service / Seleccione el servicio</option>
            <option value="maintenance">Maintenance / Mantenimiento</option>
            <option value="repair">Repair / Reparación</option>
            <option value="installation">Installation / Instalación</option>
            <option value="inspection">Inspection / Inspección</option>
            <option value="other">Other / Otro</option>
          </select>
          <textarea name="description" placeholder="Describe the issue / Describa el problema" className="w-full border p-2 rounded" rows={4} onChange={handleChange} />
        </div>

        {/* Equipment */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Equipment Info / Información del Equipo</h2>
          <div className="grid grid-cols-3 gap-4">
            <input name="brand" placeholder="Brand / Marca" className="w-full border p-2 rounded" onChange={handleChange} />
            <input name="model" placeholder="Model / Modelo" className="w-full border p-2 rounded" onChange={handleChange} />
            <input name="age" placeholder="Age / Edad aprox." className="w-full border p-2 rounded" onChange={handleChange} />
          </div>
        </div>

        {/* Schedule */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Preferred Appointment / Cita Preferida</h2>
          <div className="grid grid-cols-2 gap-4">
            <input name="preferredDate" type="date" className="w-full border p-2 rounded" onChange={handleChange} />
            <select name="preferredTime" className="w-full border p-2 rounded" onChange={handleChange}>
              <option value="">Select Time / Seleccione la hora</option>
              <option value="morning">Morning / Mañana</option>
              <option value="afternoon">Afternoon / Tarde</option>
            </select>
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Additional Notes / Notas Adicionales</h2>
          <textarea name="notes" className="w-full border p-2 rounded" rows={3} onChange={handleChange} placeholder="Other details you want us to know / Otros detalles que desea que sepamos" />
        </div>

        {/* Submit */}
        <div className="pt-4 text-center">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow flex items-center justify-center gap-2 mx-auto">
            <CheckCircle size={18} /> Submit / Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
