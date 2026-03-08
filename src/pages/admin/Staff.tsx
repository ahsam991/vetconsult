import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Search, Plus, Edit, Trash2, Eye, Phone, Mail, Clock } from "lucide-react";

type StaffRole = "Veterinarian" | "Assistant" | "Receptionist" | "Nurse" | "Lab Technician";
type StaffStatus = "active" | "on-leave" | "inactive";

interface StaffMember {
  id: string; name: string; role: StaffRole; phone: string; email: string;
  joinDate: string; shift: string; status: StaffStatus;
  qualification: string; address: string; notes: string;
  salary: string;
}

const initStaff: StaffMember[] = [
  { id: "S-001", name: "Dr. Foysal Kabir", role: "Veterinarian", phone: "01835-220347", email: "foysal@vetandpetcare.com", joinDate: "2020-01-01", shift: "24/7 (On-call)", status: "active", qualification: "B.Sc. Vet. Sci. & A.H. (SAU), MS. Fellow in Surgery (SAU)", address: "Mohammadpur, Dhaka", notes: "BVC Reg. No. 9774. Principal doctor.", salary: "N/A" },
  { id: "S-002", name: "Kamal Hossain", role: "Assistant", phone: "01711-100001", email: "kamal@vetandpetcare.com", joinDate: "2021-06-15", shift: "Morning (8am–3pm)", status: "active", qualification: "Diploma in Veterinary Science", address: "Mohammadpur, Dhaka", notes: "Handles patient intake and basic care.", salary: "৳18,000" },
  { id: "S-003", name: "Sumaiya Akter", role: "Receptionist", phone: "01811-100002", email: "sumaiya@vetandpetcare.com", joinDate: "2022-03-01", shift: "Morning (9am–5pm)", status: "active", qualification: "B.Com (Graduate)", address: "Shyamoli, Dhaka", notes: "Manages appointments, billing, and front desk.", salary: "৳15,000" },
  { id: "S-004", name: "Rakib Mahmud", role: "Nurse", phone: "01911-100003", email: "rakib@vetandpetcare.com", joinDate: "2022-09-10", shift: "Evening (3pm–10pm)", status: "active", qualification: "Certificate in Animal Nursing", address: "Mirpur, Dhaka", notes: "Post-op care and medication administration.", salary: "৳16,500" },
  { id: "S-005", name: "Nasrin Sultana", role: "Lab Technician", phone: "01611-100004", email: "nasrin@vetandpetcare.com", joinDate: "2023-01-20", shift: "Morning (8am–4pm)", status: "on-leave", qualification: "B.Sc. in Microbiology", address: "Rayer Bazar, Dhaka", notes: "Handles blood tests, skin scrapings, and lab diagnostics.", salary: "৳20,000" },
];

const roles: StaffRole[] = ["Veterinarian", "Assistant", "Receptionist", "Nurse", "Lab Technician"];
const statusStyles: Record<StaffStatus, string> = {
  active: "bg-primary/10 text-primary",
  "on-leave": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  inactive: "bg-muted text-muted-foreground",
};
const roleColors: Record<StaffRole, string> = {
  "Veterinarian": "bg-primary text-primary-foreground",
  "Assistant": "bg-secondary/30 text-secondary",
  "Receptionist": "bg-accent/50 text-accent-foreground",
  "Nurse": "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  "Lab Technician": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
};

const emptyStaff: Omit<StaffMember, "id"> = { name: "", role: "Assistant", phone: "", email: "", joinDate: "", shift: "", status: "active", qualification: "", address: "", notes: "", salary: "" };

export default function Staff() {
  const [staff, setStaff] = useState<StaffMember[]>(initStaff);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [showDialog, setShowDialog] = useState(false);
  const [viewMember, setViewMember] = useState<StaffMember | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<StaffMember, "id">>(emptyStaff);

  const filtered = staff.filter(s => {
    const ms = s.name.toLowerCase().includes(search.toLowerCase()) || s.role.toLowerCase().includes(search.toLowerCase());
    const mr = filterRole === "All" || s.role === filterRole;
    return ms && mr;
  });

  function openNew() { setForm(emptyStaff); setEditMode(false); setEditId(null); setShowDialog(true); }
  function openEdit(s: StaffMember) { const { id, ...rest } = s; setForm(rest); setEditMode(true); setEditId(s.id); setShowDialog(true); }
  function saveMember() {
    if (!form.name || !form.role) return;
    if (editMode && editId) { setStaff(prev => prev.map(s => s.id === editId ? { ...s, ...form } : s)); }
    else { const newId = `S-${String(staff.length + 1).padStart(3, "0")}`; setStaff(prev => [...prev, { id: newId, ...form }]); }
    setShowDialog(false);
  }

  const activeCount = staff.filter(s => s.status === "active").length;
  const onLeaveCount = staff.filter(s => s.status === "on-leave").length;

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground">Staff Management</h2>
          <p className="text-sm text-muted-foreground">{activeCount} active · {onLeaveCount} on leave</p>
        </div>
        <Button onClick={openNew} className="gap-2"><Plus className="w-4 h-4" />Add Staff</Button>
      </div>

      {/* Role Filter */}
      <div className="flex gap-2 flex-wrap">
        {["All", ...roles].map(r => (
          <button key={r} onClick={() => setFilterRole(r)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${filterRole === r ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:border-primary/40"}`}>{r}</button>
        ))}
      </div>

      {/* Staff Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(member => (
          <Card key={member.id} className="border-border bg-card hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">{member.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground leading-tight">{member.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${roleColors[member.role]}`}>{member.role}</span>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyles[member.status]}`}>{member.status}</span>
              </div>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2"><Phone className="w-3 h-3" />{member.phone}</div>
                {member.email && <div className="flex items-center gap-2"><Mail className="w-3 h-3" />{member.email}</div>}
                <div className="flex items-center gap-2"><Clock className="w-3 h-3" />{member.shift || "—"}</div>
              </div>
              <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                <button onClick={() => setViewMember(member)} className="flex-1 text-xs py-1.5 rounded-lg border border-border hover:bg-muted transition-colors font-medium">View</button>
                <button onClick={() => openEdit(member)} className="flex-1 text-xs py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors font-medium">Edit</button>
                {member.id !== "S-001" && <button onClick={() => setStaff(prev => prev.filter(s => s.id !== member.id))} className="px-3 py-1.5 rounded-lg hover:bg-destructive/10 transition-colors"><Trash2 className="w-3.5 h-3.5 text-destructive" /></button>}
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-12 text-muted-foreground text-sm">No staff members found.</div>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-lg max-h-[92vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editMode ? "Edit Staff Member" : "Add Staff Member"}</DialogTitle></DialogHeader>
          <div className="space-y-3 py-2">
            <div className="grid grid-cols-2 gap-3">
              {[["Full Name *", "name", "text", "Full name"], ["Phone", "phone", "text", "01XXXXXXXXX"], ["Email", "email", "email", "email@domain.com"], ["Join Date", "joinDate", "date", ""], ["Shift", "shift", "text", "e.g. 9am–5pm"], ["Salary", "salary", "text", "e.g. ৳15,000"], ["Qualification", "qualification", "text", "Degrees / certs"], ["Address", "address", "text", "Area, Dhaka"]].map(([l, f, t, ph]) => (
                <div key={f as string}>
                  <label className="text-xs font-medium text-foreground mb-1 block">{l}</label>
                  <Input type={t as string} placeholder={ph as string} value={(form as any)[f as string]} onChange={e => setForm(p => ({ ...p, [f as string]: e.target.value }))} />
                </div>
              ))}
              <div>
                <label className="text-xs font-medium text-foreground mb-1 block">Role</label>
                <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value as StaffRole }))} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                  {roles.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-foreground mb-1 block">Status</label>
                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as StaffStatus }))} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                  {["active", "on-leave", "inactive"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-foreground mb-1 block">Notes</label>
              <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Additional notes..." rows={3} className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
            <Button onClick={saveMember}>{editMode ? "Save Changes" : "Add Staff"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      {viewMember && (
        <Dialog open={!!viewMember} onOpenChange={() => setViewMember(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>Staff Profile</DialogTitle></DialogHeader>
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-4 p-4 bg-muted/40 rounded-xl">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{viewMember.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{viewMember.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${roleColors[viewMember.role]}`}>{viewMember.role}</span>
                  <div className="mt-1"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[viewMember.status]}`}>{viewMember.status}</span></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[["Phone", viewMember.phone], ["Email", viewMember.email || "—"], ["Shift", viewMember.shift || "—"], ["Joined", viewMember.joinDate], ["Salary", viewMember.salary || "—"], ["Address", viewMember.address || "—"]].map(([k, v]) => (
                  <div key={k}><p className="text-xs text-muted-foreground font-medium">{k}</p><p className="text-foreground">{v}</p></div>
                ))}
                <div className="col-span-2"><p className="text-xs text-muted-foreground font-medium">Qualification</p><p className="text-foreground">{viewMember.qualification || "—"}</p></div>
                {viewMember.notes && <div className="col-span-2"><p className="text-xs text-muted-foreground font-medium">Notes</p><p className="text-foreground">{viewMember.notes}</p></div>}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { openEdit(viewMember); setViewMember(null); }}>Edit</Button>
              <Button onClick={() => setViewMember(null)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
