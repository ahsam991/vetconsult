import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Search, Plus, Printer, Eye, Trash2, Edit, PlusCircle, MinusCircle } from "lucide-react";

interface Medicine {
  name: string; dosage: string; frequency: string; duration: string; instructions: string;
}

interface Prescription {
  id: string; date: string; patient: string; petType: string; owner: string; phone: string;
  weight: string; age: string; diagnosis: string; medicines: Medicine[]; notes: string; followUp: string;
}

const initRx: Prescription[] = [
  { id: "RX-1024", date: "2026-03-08", patient: "Tommy", petType: "Dog 🐕", owner: "Rahim Uddin", phone: "01711-000001", weight: "28 kg", age: "3 years", diagnosis: "Bacterial infection with mild fever (38.9°C). Throat inflammation noted.", medicines: [{ name: "Amoxicillin 500mg", dosage: "1 tablet", frequency: "Twice daily", duration: "7 days", instructions: "Give with food" }, { name: "Paracetamol 250mg", dosage: "Half tablet", frequency: "Once daily (evening)", duration: "3 days", instructions: "If fever persists" }, { name: "Vitamin B Complex", dosage: "1 tablet", frequency: "Once daily", duration: "14 days", instructions: "With meal" }], notes: "Keep the patient well hydrated. Avoid cold water. Monitor temperature daily.", followUp: "2026-03-15" },
  { id: "RX-1023", date: "2026-03-08", patient: "Mitthu", petType: "Cat 🐈", owner: "Nusrat Jahan", phone: "01811-000002", weight: "3.2 kg", age: "2 years", diagnosis: "Post-vaccination monitoring. All vitals normal.", medicines: [{ name: "Probiotics (Fortiflora)", dosage: "1 sachet", frequency: "Once daily", duration: "5 days", instructions: "Mix with food" }, { name: "Omega-3 supplement", dosage: "0.5 ml", frequency: "Once daily", duration: "30 days", instructions: "Add to food" }], notes: "Normal post-vaccine reaction expected. Watch for any unusual behavior.", followUp: "2026-09-08" },
  { id: "RX-1022", date: "2026-03-07", patient: "Charlie", petType: "Dog 🐕", owner: "Karim Ahmed", phone: "01911-000009", weight: "15 kg", age: "5 years", diagnosis: "Skin allergy — atopic dermatitis. Mild hair loss on back.", medicines: [{ name: "Cetirizine 5mg", dosage: "1 tablet", frequency: "Once daily", duration: "14 days", instructions: "Evening with food" }, { name: "Antifungal shampoo", dosage: "As required", frequency: "Twice weekly bath", duration: "4 weeks", instructions: "Leave on for 5 mins" }, { name: "Fish Oil capsule", dosage: "1 capsule", frequency: "Once daily", duration: "30 days", instructions: "With meal" }, { name: "Prednisolone 5mg", dosage: "1 tablet", frequency: "Once daily", duration: "5 days, then taper", instructions: "With food, do not stop abruptly" }], notes: "Avoid carpets and dusty environments. Regular grooming essential.", followUp: "2026-03-21" },
];

const emptyMed: Medicine = { name: "", dosage: "", frequency: "", duration: "", instructions: "" };
const emptyRx: Omit<Prescription, "id"> = { date: new Date().toISOString().slice(0, 10), patient: "", petType: "Dog 🐕", owner: "", phone: "", weight: "", age: "", diagnosis: "", medicines: [{ ...emptyMed }], notes: "", followUp: "" };

export default function Prescriptions() {
  const [rxList, setRxList] = useState<Prescription[]>(initRx);
  const [search, setSearch] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [viewRx, setViewRx] = useState<Prescription | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Prescription, "id">>(emptyRx);

  const filtered = rxList.filter(r => r.patient.toLowerCase().includes(search.toLowerCase()) || r.owner.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase()));

  function openNew() { setForm({ ...emptyRx, date: new Date().toISOString().slice(0, 10), medicines: [{ ...emptyMed }] }); setEditMode(false); setEditId(null); setShowDialog(true); }
  function openEdit(r: Prescription) { const { id, ...rest } = r; setForm({ ...rest }); setEditMode(true); setEditId(r.id); setShowDialog(true); }
  function saveRx() {
    if (!form.patient || !form.owner || !form.diagnosis) return;
    if (editMode && editId) { setRxList(prev => prev.map(r => r.id === editId ? { ...r, ...form } : r)); }
    else { const newId = `RX-${1024 + rxList.length + 1 - initRx.length + 1}`; setRxList(prev => [{ id: newId, ...form }, ...prev]); }
    setShowDialog(false);
  }
  function addMed() { setForm(f => ({ ...f, medicines: [...f.medicines, { ...emptyMed }] })); }
  function removeMed(i: number) { setForm(f => ({ ...f, medicines: f.medicines.filter((_, idx) => idx !== i) })); }
  function updateMed(i: number, field: keyof Medicine, val: string) { setForm(f => ({ ...f, medicines: f.medicines.map((m, idx) => idx === i ? { ...m, [field]: val } : m) })); }

  function handlePrint(rx: Prescription) {
    const w = window.open("", "_blank");
    if (w) {
          w.document.write(`<html><head><title>Prescription ${rx.id}</title><style>
            body { font-family: Arial, sans-serif; padding: 40px; color: #111; }
            .header { text-align: center; border-bottom: 2px solid #059669; padding-bottom: 16px; margin-bottom: 20px; }
            .header h1 { font-size: 22px; color: #059669; margin: 0; }
            .header p { margin: 2px 0; font-size: 13px; color: #555; }
            .meta { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; background: #f9f9f9; padding: 12px; border-radius: 8px; }
            .meta div span { font-weight: 700; font-size: 12px; color: #777; display: block; }
            .meta div p { margin: 0; font-size: 13px; }
            .diagnosis { margin-bottom: 20px; }
            .diagnosis h3 { font-size: 13px; color: #777; margin: 0 0 6px; }
            .diagnosis p { margin: 0; font-size: 14px; background: #f9f9f9; padding: 10px; border-radius: 6px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th { background: #059669; color: white; padding: 8px 12px; text-align: left; font-size: 12px; }
            td { border: 1px solid #eee; padding: 8px 12px; font-size: 13px; }
            tr:nth-child(even) td { background: #f9fafb; }
            .rx-symbol { font-size: 28px; color: #059669; font-style: italic; font-weight: bold; margin-bottom: 8px; }
            .footer { margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end; }
            .signature { text-align: center; }
            .signature div { border-top: 1px solid #111; padding-top: 8px; font-size: 13px; margin-top: 50px; }
            .notes { background: #fffbeb; border: 1px solid #fde68a; padding: 10px; border-radius: 6px; font-size: 13px; margin-bottom: 16px; }
          </style></head><body>
            <div class="header">
              <h1>🐾 Vet Consult</h1>
              <p>Dr. Foysal Kabir — B.Sc. Vet. Sci. & A.H. | MS. Fellow in Surgery (SAU)</p>
              <p>BVC Reg. No. 9774 | 10/7 Block-A, Iqbal Road, Mohammadpur, Dhaka-1207</p>
              <p>📞 01835-220347 | Always Open 24/7</p>
            </div>
            <p style="text-align:right;font-size:12px;color:#777;margin:0 0 16px">Prescription ID: <strong>${rx.id}</strong> | Date: <strong>${rx.date}</strong></p>
            <div class="meta">
              <div><span>PATIENT NAME</span><p>${rx.patient}</p></div>
              <div><span>PET TYPE</span><p>${rx.petType}</p></div>
              <div><span>AGE</span><p>${rx.age}</p></div>
              <div><span>WEIGHT</span><p>${rx.weight}</p></div>
              <div><span>OWNER</span><p>${rx.owner}</p></div>
              <div><span>PHONE</span><p>${rx.phone}</p></div>
            </div>
            <div class="diagnosis"><h3>DIAGNOSIS / CLINICAL FINDINGS</h3><p>${rx.diagnosis}</p></div>
            <div class="rx-symbol">℞</div>
            <table>
              <thead><tr><th>#</th><th>Medicine</th><th>Dosage</th><th>Frequency</th><th>Duration</th><th>Instructions</th></tr></thead>
              <tbody>${rx.medicines.map((m, i) => `<tr><td>${i + 1}</td><td><strong>${m.name}</strong></td><td>${m.dosage}</td><td>${m.frequency}</td><td>${m.duration}</td><td>${m.instructions}</td></tr>`).join("")}</tbody>
            </table>
            ${rx.notes ? `<div class="notes"><strong>⚠️ Notes / Advice:</strong> ${rx.notes}</div>` : ""}
            ${rx.followUp ? `<p style="font-size:13px"><strong>📅 Follow-up Date:</strong> ${rx.followUp}</p>` : ""}
            <div class="footer">
              <div style="font-size:12px;color:#777">This prescription is valid for 30 days from issue date.</div>
              <div class="signature"><div>Dr. Foysal Kabir<br><small>BVC Reg. No. 9774</small></div></div>
            </div>
          </body></html>`);
      w.document.close();
      w.print();
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground">Prescriptions</h2>
          <p className="text-sm text-muted-foreground">{rxList.length} total prescriptions</p>
        </div>
        <Button onClick={openNew} className="gap-2"><Plus className="w-4 h-4" />New Prescription</Button>
      </div>

      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by patient, owner or ID..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  {["Rx ID", "Date", "Patient", "Owner", "Diagnosis", "Medicines", "Actions"].map(h => (
                    <th key={h} className={`text-left px-4 py-3 text-xs font-semibold text-muted-foreground ${h === "Diagnosis" ? "hidden lg:table-cell" : h === "Owner" ? "hidden md:table-cell" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(rx => (
                  <tr key={rx.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-primary">{rx.id}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{rx.date}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{rx.patient}</p>
                      <p className="text-xs text-muted-foreground">{rx.petType}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-foreground">{rx.owner}</td>
                    <td className="px-4 py-3 hidden lg:table-cell max-w-xs">
                      <p className="text-xs text-muted-foreground truncate">{rx.diagnosis}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary">{rx.medicines.length} med{rx.medicines.length !== 1 ? "s" : ""}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setViewRx(rx)} className="p-1.5 rounded hover:bg-muted transition-colors"><Eye className="w-3.5 h-3.5 text-muted-foreground" /></button>
                        <button onClick={() => openEdit(rx)} className="p-1.5 rounded hover:bg-muted transition-colors"><Edit className="w-3.5 h-3.5 text-muted-foreground" /></button>
                        <button onClick={() => handlePrint(rx)} className="p-1.5 rounded hover:bg-primary/10 transition-colors" title="Print"><Printer className="w-3.5 h-3.5 text-primary" /></button>
                        <button onClick={() => { if (window.confirm(`Delete prescription ${rx.id}?`)) setRxList(prev => prev.filter(r => r.id !== rx.id)); }} className="p-1.5 rounded hover:bg-destructive/10 transition-colors"><Trash2 className="w-3.5 h-3.5 text-destructive" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="text-center py-12 text-muted-foreground text-sm">No prescriptions found.</div>}
          </div>
        </CardContent>
      </Card>

      {/* New/Edit Prescription Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-3xl max-h-[92vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editMode ? "Edit Prescription" : "New Prescription"}</DialogTitle></DialogHeader>
          <div className="space-y-5 py-2">
            {/* Patient Info */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Patient Information</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[["Patient Name *", "patient", "text", "e.g. Tommy"], ["Pet Type", "petType", "select", ""], ["Age", "age", "text", "e.g. 3 years"], ["Weight", "weight", "text", "e.g. 28 kg"], ["Owner Name *", "owner", "text", "Full name"], ["Phone", "phone", "text", "01XXXXXXXXX"], ["Date", "date", "date", ""]].map(([l, f, t, ph]) => (
                  <div key={f as string}>
                    <label className="text-xs font-medium text-foreground mb-1 block">{l}</label>
                    {t === "select" ? (
                      <select value={(form as any)[f as string]} onChange={e => setForm(prev => ({ ...prev, [f as string]: e.target.value }))} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                        {["Dog 🐕", "Cat 🐈", "Bird 🦜", "Rabbit 🐇", "Other"].map(o => <option key={o}>{o}</option>)}
                      </select>
                    ) : (
                      <Input type={t as string} placeholder={ph as string} value={(form as any)[f as string]} onChange={e => setForm(prev => ({ ...prev, [f as string]: e.target.value }))} />
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Diagnosis */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">Diagnosis / Clinical Findings *</label>
              <textarea value={form.diagnosis} onChange={e => setForm(f => ({ ...f, diagnosis: e.target.value }))} placeholder="Clinical findings, diagnosis details..." rows={3} className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            {/* Medicines */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Medicines ℞</h3>
                <Button type="button" variant="outline" size="sm" onClick={addMed} className="gap-1 h-7 text-xs"><PlusCircle className="w-3.5 h-3.5" />Add Medicine</Button>
              </div>
              <div className="space-y-3">
                {form.medicines.map((med, i) => (
                  <div key={i} className="p-3 border border-border rounded-xl bg-muted/20 relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-primary">Medicine #{i + 1}</span>
                      {form.medicines.length > 1 && <button type="button" onClick={() => removeMed(i)}><MinusCircle className="w-4 h-4 text-destructive" /></button>}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {([["Medicine Name *", "name", "e.g. Amoxicillin 500mg"], ["Dosage", "dosage", "e.g. 1 tablet"], ["Frequency", "frequency", "e.g. Twice daily"], ["Duration", "duration", "e.g. 7 days"], ["Instructions", "instructions", "e.g. With food"]] as const).map(([l, f, ph]) => (
                        <div key={f} className={f === "name" || f === "instructions" ? "col-span-2 sm:col-span-1" : ""}>
                          <label className="text-xs font-medium text-foreground mb-1 block">{l}</label>
                          <Input placeholder={ph} value={med[f]} onChange={e => updateMed(i, f, e.target.value)} className="h-8 text-xs" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Notes & Follow-up */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-foreground mb-1 block">Follow-up Date</label>
                <Input type="date" value={form.followUp} onChange={e => setForm(f => ({ ...f, followUp: e.target.value }))} />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-medium text-foreground mb-1 block">Notes / Advice for Owner</label>
                <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Home care instructions, dietary advice..." rows={2} className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
            <Button onClick={saveRx}>{editMode ? "Save Changes" : "Create Prescription"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Prescription Dialog */}
      {viewRx && (
        <Dialog open={!!viewRx} onOpenChange={() => setViewRx(null)}>
          <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>Prescription — {viewRx.id}</span>
                <Badge variant="outline">{viewRx.date}</Badge>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-3 gap-3 p-4 bg-muted/40 rounded-xl text-sm">
                {[["Patient", viewRx.patient + " " + viewRx.petType], ["Age / Weight", `${viewRx.age} · ${viewRx.weight}`], ["Owner", viewRx.owner], ["Phone", viewRx.phone]].map(([k, v]) => (
                  <div key={k}><p className="text-xs text-muted-foreground font-medium">{k}</p><p className="text-foreground font-medium">{v}</p></div>
                ))}
              </div>
              <div className="p-3 bg-accent/20 rounded-xl">
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Diagnosis</p>
                <p className="text-sm text-foreground">{viewRx.diagnosis}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">℞ Medicines</p>
                <div className="space-y-2">
                  {viewRx.medicines.map((m, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"><span className="text-xs font-bold text-primary">{i + 1}</span></div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-foreground">{m.name}</p>
                        <p className="text-xs text-muted-foreground">{m.dosage} · {m.frequency} · {m.duration}</p>
                        {m.instructions && <p className="text-xs text-muted-foreground italic">ℹ️ {m.instructions}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {viewRx.notes && <div className="p-3 bg-muted/60 border border-border rounded-lg"><p className="text-xs font-semibold mb-1 text-muted-foreground">⚠️ Notes for Owner</p><p className="text-sm text-foreground">{viewRx.notes}</p></div>}
              {viewRx.followUp && <p className="text-sm"><strong>📅 Follow-up:</strong> {viewRx.followUp}</p>}
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => { openEdit(viewRx); setViewRx(null); }}><Edit className="w-4 h-4 mr-1" />Edit</Button>
              <Button onClick={() => { handlePrint(viewRx); setViewRx(null); }}><Printer className="w-4 h-4 mr-1" />Print</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
