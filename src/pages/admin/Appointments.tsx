import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Search, Plus, Calendar, Clock, Trash2, Edit, Eye, Phone } from "lucide-react";

type Status = "waiting" | "in-progress" | "completed" | "cancelled";

interface Appointment {
  id: string; date: string; time: string; patient: string; petType: string;
  owner: string; phone: string; service: string; status: Status; notes: string;
}

const initAppointments: Appointment[] = [
  { id: "A-001", date: "2026-03-08", time: "09:00", patient: "Tommy", petType: "Dog 🐕", owner: "Rahim Uddin", phone: "01711-000001", service: "General Consultation", status: "completed", notes: "Routine check-up, mild fever treated." },
  { id: "A-002", date: "2026-03-08", time: "10:30", patient: "Mitthu", petType: "Cat 🐈", owner: "Nusrat Jahan", phone: "01811-000002", service: "Vaccination", status: "completed", notes: "Rabies + Distemper vaccines given." },
  { id: "A-003", date: "2026-03-08", time: "11:00", patient: "Bruno", petType: "Dog 🐕", owner: "Arif Hossain", phone: "01911-000003", service: "Deworming", status: "in-progress", notes: "" },
  { id: "A-004", date: "2026-03-08", time: "12:30", patient: "Mimi", petType: "Cat 🐈", owner: "Fatema Khatun", phone: "01611-000004", service: "Surgery Follow-up", status: "waiting", notes: "" },
  { id: "A-005", date: "2026-03-08", time: "14:00", patient: "Rex", petType: "Dog 🐕", owner: "Tanvir Ahmed", phone: "01711-000005", service: "Lab Test", status: "waiting", notes: "" },
  { id: "A-006", date: "2026-03-08", time: "15:30", patient: "Kiki", petType: "Bird 🦜", owner: "Sadia Islam", phone: "01811-000006", service: "General Consultation", status: "waiting", notes: "" },
  { id: "A-007", date: "2026-03-09", time: "10:00", patient: "Coco", petType: "Rabbit 🐇", owner: "Mehedi Hasan", phone: "01911-000007", service: "Deworming", status: "waiting", notes: "" },
  { id: "A-008", date: "2026-03-09", time: "11:30", patient: "Luna", petType: "Cat 🐈", owner: "Rima Begum", phone: "01611-000008", service: "General Consultation", status: "waiting", notes: "" },
];

const statusStyles: Record<Status, string> = {
  waiting: "bg-muted text-muted-foreground",
  "in-progress": "bg-secondary/20 text-secondary",
  completed: "bg-primary/10 text-primary",
  cancelled: "bg-destructive/10 text-destructive",
};

const services = ["General Consultation", "Surgery / Operation", "Vaccination", "Deworming", "Lab Test", "Online Consultation", "Surgery Follow-up", "Dental Care", "Wound Care", "Neutering"];
const petTypes = ["Dog 🐕", "Cat 🐈", "Bird 🦜", "Rabbit 🐇", "Other"];

const emptyForm: Omit<Appointment, "id"> = { date: "", time: "", patient: "", petType: "Dog 🐕", owner: "", phone: "", service: "General Consultation", status: "waiting", notes: "" };

export default function Appointments() {
  const [apts, setApts] = useState<Appointment[]>(initAppointments);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showDialog, setShowDialog] = useState(false);
  const [viewApt, setViewApt] = useState<Appointment | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<Omit<Appointment, "id">>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);

  const filtered = apts.filter(a => {
    const matchSearch = a.patient.toLowerCase().includes(search.toLowerCase()) || a.owner.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  function openNew() { setForm(emptyForm); setEditMode(false); setEditId(null); setShowDialog(true); }
  function openEdit(a: Appointment) { setForm({ date: a.date, time: a.time, patient: a.patient, petType: a.petType, owner: a.owner, phone: a.phone, service: a.service, status: a.status, notes: a.notes }); setEditMode(true); setEditId(a.id); setShowDialog(true); }
  function saveForm() {
    if (!form.patient || !form.owner || !form.date || !form.time) return;
    if (editMode && editId) {
      setApts(prev => prev.map(a => a.id === editId ? { ...a, ...form } : a));
    } else {
      setApts(prev => [{ id: `A-${String(prev.length + 1).padStart(3, "0")}`, ...form }, ...prev]);
    }
    setShowDialog(false);
  }
  function deleteApt(id: string) { setApts(prev => prev.filter(a => a.id !== id)); }
  function updateStatus(id: string, status: Status) { setApts(prev => prev.map(a => a.id === id ? { ...a, status } : a)); }

  const counts = { all: apts.length, waiting: apts.filter(a => a.status === "waiting").length, "in-progress": apts.filter(a => a.status === "in-progress").length, completed: apts.filter(a => a.status === "completed").length, cancelled: apts.filter(a => a.status === "cancelled").length };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground">Appointments</h2>
          <p className="text-sm text-muted-foreground">Manage all patient appointments</p>
        </div>
        <Button onClick={openNew} className="gap-2"><Plus className="w-4 h-4" />New Appointment</Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "waiting", "in-progress", "completed", "cancelled"] as const).map(s => (
          <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${filterStatus === s ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:border-primary/40"}`}>
            {s.charAt(0).toUpperCase() + s.slice(1)} <span className="opacity-70">({counts[s as keyof typeof counts]})</span>
          </button>
        ))}
      </div>

      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search patient or owner..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">ID</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Date & Time</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Patient</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground hidden md:table-cell">Owner</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground hidden lg:table-cell">Service</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(a => (
                  <tr key={a.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{a.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-xs">
                        <Calendar className="w-3 h-3 text-muted-foreground" />{a.date}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <Clock className="w-3 h-3" />{a.time}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{a.patient}</p>
                      <p className="text-xs text-muted-foreground">{a.petType}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-foreground">{a.owner}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><Phone className="w-3 h-3" />{a.phone}</p>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">{a.service}</td>
                    <td className="px-4 py-3">
                      <select value={a.status} onChange={e => updateStatus(a.id, e.target.value as Status)} className={`text-xs px-2 py-1 rounded-full font-semibold border-0 cursor-pointer outline-none ${statusStyles[a.status]}`}>
                        <option value="waiting">Waiting</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setViewApt(a)} className="p-1.5 rounded hover:bg-muted transition-colors" title="View"><Eye className="w-3.5 h-3.5 text-muted-foreground" /></button>
                        <button onClick={() => openEdit(a)} className="p-1.5 rounded hover:bg-muted transition-colors" title="Edit"><Edit className="w-3.5 h-3.5 text-muted-foreground" /></button>
                        <button onClick={() => deleteApt(a.id)} className="p-1.5 rounded hover:bg-destructive/10 transition-colors" title="Delete"><Trash2 className="w-3.5 h-3.5 text-destructive" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="text-center py-12 text-muted-foreground text-sm">No appointments found.</div>}
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editMode ? "Edit Appointment" : "New Appointment"}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-3 py-2">
            {[["Patient Name *", "patient", "text", "e.g. Tommy"], ["Owner Name *", "owner", "text", "Full name"], ["Phone *", "phone", "text", "01XXXXXXXXX"], ["Date *", "date", "date", ""], ["Time *", "time", "time", ""]].map(([label, field, type, ph]) => (
              <div key={field as string} className={field === "owner" || field === "phone" ? "col-span-2 sm:col-span-1" : field === "date" || field === "time" ? "" : "col-span-2"}>
                <label className="text-xs font-medium text-foreground mb-1 block">{label}</label>
                <Input type={type as string} placeholder={ph as string} value={(form as any)[field as string]} onChange={e => setForm(f => ({ ...f, [field as string]: e.target.value }))} />
              </div>
            ))}
            <div>
              <label className="text-xs font-medium text-foreground mb-1 block">Pet Type</label>
              <select value={form.petType} onChange={e => setForm(f => ({ ...f, petType: e.target.value }))} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                {petTypes.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-foreground mb-1 block">Status</label>
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Status }))} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                {["waiting", "in-progress", "completed", "cancelled"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="text-xs font-medium text-foreground mb-1 block">Service *</label>
              <select value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                {services.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="text-xs font-medium text-foreground mb-1 block">Notes</label>
              <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Visit notes, observations..." rows={3} className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
            <Button onClick={saveForm}>{editMode ? "Save Changes" : "Add Appointment"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      {viewApt && (
        <Dialog open={!!viewApt} onOpenChange={() => setViewApt(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>Appointment Details — {viewApt.id}</DialogTitle></DialogHeader>
            <div className="space-y-3 py-2">
              {[["Patient", viewApt.patient + " " + viewApt.petType], ["Owner", viewApt.owner], ["Phone", viewApt.phone], ["Date & Time", `${viewApt.date} at ${viewApt.time}`], ["Service", viewApt.service], ["Status", viewApt.status], ["Notes", viewApt.notes || "—"]].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium">{k}</span>
                  <span className="text-foreground text-right max-w-[60%]">{v}</span>
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { openEdit(viewApt); setViewApt(null); }}>Edit</Button>
              <Button onClick={() => setViewApt(null)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
