import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Search, Plus, Edit, Trash2, Eye, Phone, Calendar } from "lucide-react";

interface Pet {
  id: string; name: string; type: string; breed: string; age: string; gender: string; weight: string; color: string;
  owner: string; ownerPhone: string; ownerAddress: string;
  lastVisit: string; nextVisit: string; vaccinated: boolean; neutered: boolean;
  conditions: string; notes: string;
}

const initPets: Pet[] = [
  { id: "P-001", name: "Tommy", type: "Dog 🐕", breed: "Labrador", age: "3 years", gender: "Male", weight: "28 kg", color: "Golden", owner: "Rahim Uddin", ownerPhone: "01711-000001", ownerAddress: "Mohammadpur, Dhaka", lastVisit: "2026-03-08", nextVisit: "2026-06-08", vaccinated: true, neutered: false, conditions: "None", notes: "Very friendly. Mild fever episode in Jan 2026." },
  { id: "P-002", name: "Mitthu", type: "Cat 🐈", breed: "Persian Mix", age: "2 years", gender: "Female", weight: "3.2 kg", color: "White & Orange", owner: "Nusrat Jahan", ownerPhone: "01811-000002", ownerAddress: "Dhanmondi, Dhaka", lastVisit: "2026-03-08", nextVisit: "2026-09-08", vaccinated: true, neutered: true, conditions: "None", notes: "Post-surgery recovery complete." },
  { id: "P-003", name: "Bruno", type: "Dog 🐕", breed: "German Shepherd", age: "4 years", gender: "Male", weight: "32 kg", color: "Black & Tan", owner: "Arif Hossain", ownerPhone: "01911-000003", ownerAddress: "Mirpur, Dhaka", lastVisit: "2026-03-08", nextVisit: "2026-04-08", vaccinated: true, neutered: false, conditions: "Seasonal allergies", notes: "Deworming every 3 months." },
  { id: "P-004", name: "Mimi", type: "Cat 🐈", breed: "Siamese", age: "5 years", gender: "Female", weight: "2.8 kg", color: "Cream & Brown", owner: "Fatema Khatun", ownerPhone: "01611-000004", ownerAddress: "Uttara, Dhaka", lastVisit: "2026-03-08", nextVisit: "2026-03-15", vaccinated: true, neutered: true, conditions: "Post-operative care", notes: "Follow-up required after abdominal surgery." },
  { id: "P-005", name: "Rex", type: "Dog 🐕", breed: "Rottweiler", age: "6 years", gender: "Male", weight: "45 kg", color: "Black & Tan", owner: "Tanvir Ahmed", ownerPhone: "01711-000005", ownerAddress: "Banani, Dhaka", lastVisit: "2026-02-10", nextVisit: "2026-03-10", vaccinated: true, neutered: false, conditions: "Joint pain (hip)", notes: "Emergency consultation at midnight Dec 2025." },
  { id: "P-006", name: "Kiki", type: "Bird 🦜", breed: "Cockatiel", age: "1.5 years", gender: "Unknown", weight: "90 g", color: "Yellow & Grey", owner: "Sadia Islam", ownerPhone: "01811-000006", ownerAddress: "Gulshan, Dhaka", lastVisit: "2026-03-08", nextVisit: "2026-06-08", vaccinated: false, neutered: false, conditions: "Respiratory issues (resolved)", notes: "Responded well to treatment." },
  { id: "P-007", name: "Coco", type: "Rabbit 🐇", breed: "Holland Lop", age: "1 year", gender: "Female", weight: "1.5 kg", color: "Brown", owner: "Mehedi Hasan", ownerPhone: "01911-000007", ownerAddress: "Rayer Bazar, Dhaka", lastVisit: "2026-02-01", nextVisit: "2026-03-09", vaccinated: false, neutered: false, conditions: "None", notes: "First-time patient." },
  { id: "P-008", name: "Luna", type: "Cat 🐈", breed: "Domestic Shorthair", age: "2.5 years", gender: "Female", weight: "3.0 kg", color: "Grey & White", owner: "Rima Begum", ownerPhone: "01611-000008", ownerAddress: "Kalabagan, Dhaka", lastVisit: "2025-12-15", nextVisit: "2026-03-09", vaccinated: true, neutered: true, conditions: "None", notes: "Regular healthy patient." },
];

const emptyPet: Omit<Pet, "id"> = { name: "", type: "Dog 🐕", breed: "", age: "", gender: "Male", weight: "", color: "", owner: "", ownerPhone: "", ownerAddress: "", lastVisit: "", nextVisit: "", vaccinated: false, neutered: false, conditions: "", notes: "" };
const petTypes = ["Dog 🐕", "Cat 🐈", "Bird 🦜", "Rabbit 🐇", "Other"];

export default function Patients() {
  const [pets, setPets] = useState<Pet[]>(initPets);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [showDialog, setShowDialog] = useState(false);
  const [viewPet, setViewPet] = useState<Pet | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<Omit<Pet, "id">>(emptyPet);
  const [editId, setEditId] = useState<string | null>(null);

  const filtered = pets.filter(p => {
    const ms = p.name.toLowerCase().includes(search.toLowerCase()) || p.owner.toLowerCase().includes(search.toLowerCase());
    const mt = filterType === "All" || p.type === filterType;
    return ms && mt;
  });

  function openNew() { setForm(emptyPet); setEditMode(false); setEditId(null); setShowDialog(true); }
  function openEdit(p: Pet) { const { id, ...rest } = p; setForm(rest); setEditMode(true); setEditId(p.id); setShowDialog(true); }
  function savePet() {
    if (!form.name || !form.owner) return;
    if (editMode && editId) { setPets(prev => prev.map(p => p.id === editId ? { ...p, ...form } : p)); }
    else { setPets(prev => [{ id: `P-${String(prev.length + 1).padStart(3, "0")}`, ...form }, ...prev]); }
    setShowDialog(false);
  }

  const typeFilters = ["All", ...petTypes];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground">Patients & Pets</h2>
          <p className="text-sm text-muted-foreground">{pets.length} registered patients</p>
        </div>
        <Button onClick={openNew} className="gap-2"><Plus className="w-4 h-4" />Add Patient</Button>
      </div>

      {/* Type Filter */}
      <div className="flex gap-2 flex-wrap">
        {typeFilters.map(t => (
          <button key={t} onClick={() => setFilterType(t)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${filterType === t ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:border-primary/40"}`}>{t}</button>
        ))}
      </div>

      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search patient or owner..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  {["ID", "Pet", "Breed / Age", "Owner", "Last Visit", "Vaccinated", "Actions"].map(h => (
                    <th key={h} className={`text-left px-4 py-3 text-xs font-semibold text-muted-foreground ${h === "Owner" ? "hidden md:table-cell" : h === "Breed / Age" ? "hidden sm:table-cell" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm flex-shrink-0">{p.type.split(" ")[1]}</div>
                        <div>
                          <p className="font-medium text-foreground">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.gender}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <p className="text-foreground">{p.breed}</p>
                      <p className="text-xs text-muted-foreground">{p.age} · {p.weight}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-foreground">{p.owner}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><Phone className="w-3 h-3" />{p.ownerPhone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground"><Calendar className="w-3 h-3" />{p.lastVisit || "—"}</div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={p.vaccinated ? "default" : "secondary"} className="text-xs">{p.vaccinated ? "✓ Yes" : "No"}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setViewPet(p)} className="p-1.5 rounded hover:bg-muted transition-colors"><Eye className="w-3.5 h-3.5 text-muted-foreground" /></button>
                        <button onClick={() => openEdit(p)} className="p-1.5 rounded hover:bg-muted transition-colors"><Edit className="w-3.5 h-3.5 text-muted-foreground" /></button>
                        <button onClick={() => { if (window.confirm(`Delete patient ${p.name}?`)) setPets(prev => prev.filter(x => x.id !== p.id)); }} className="p-1.5 rounded hover:bg-destructive/10 transition-colors"><Trash2 className="w-3.5 h-3.5 text-destructive" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="text-center py-12 text-muted-foreground text-sm">No patients found.</div>}
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editMode ? "Edit Patient" : "Add New Patient"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <h3 className="col-span-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Pet Information</h3>
              {[["Pet Name *", "name", "text", "e.g. Tommy"], ["Breed", "breed", "text", "e.g. Labrador"], ["Age", "age", "text", "e.g. 2 years"], ["Weight", "weight", "text", "e.g. 5 kg"], ["Color", "color", "text", "e.g. Golden"], ["Conditions", "conditions", "text", "Any known conditions"]].map(([l, f, t, ph]) => (
                <div key={f as string}>
                  <label className="text-xs font-medium text-foreground mb-1 block">{l}</label>
                  <Input type={t as string} placeholder={ph as string} value={(form as any)[f as string]} onChange={e => setForm(prev => ({ ...prev, [f as string]: e.target.value }))} />
                </div>
              ))}
              <div>
                <label className="text-xs font-medium text-foreground mb-1 block">Pet Type</label>
                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                  {petTypes.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-foreground mb-1 block">Gender</label>
                <select value={form.gender} onChange={e => setForm(f => ({ ...f, gender: e.target.value }))} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                  {["Male", "Female", "Unknown"].map(g => <option key={g}>{g}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-4 col-span-2">
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.vaccinated} onChange={e => setForm(f => ({ ...f, vaccinated: e.target.checked }))} className="rounded" /><span className="text-sm">Vaccinated</span></label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.neutered} onChange={e => setForm(f => ({ ...f, neutered: e.target.checked }))} className="rounded" /><span className="text-sm">Neutered / Spayed</span></label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <h3 className="col-span-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Owner Information</h3>
              {[["Owner Name *", "owner", "text", "Full name"], ["Owner Phone *", "ownerPhone", "text", "01XXXXXXXXX"]].map(([l, f, t, ph]) => (
                <div key={f as string}>
                  <label className="text-xs font-medium text-foreground mb-1 block">{l}</label>
                  <Input type={t as string} placeholder={ph as string} value={(form as any)[f as string]} onChange={e => setForm(prev => ({ ...prev, [f as string]: e.target.value }))} />
                </div>
              ))}
              <div className="col-span-2">
                <label className="text-xs font-medium text-foreground mb-1 block">Address</label>
                <Input placeholder="Owner's address" value={form.ownerAddress} onChange={e => setForm(f => ({ ...f, ownerAddress: e.target.value }))} />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-foreground mb-1 block">Medical Notes</label>
              <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Medical history, observations..." rows={3} className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
            <Button onClick={savePet}>{editMode ? "Save Changes" : "Add Patient"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      {viewPet && (
        <Dialog open={!!viewPet} onOpenChange={() => setViewPet(null)}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Patient Profile — {viewPet.name}</DialogTitle></DialogHeader>
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-4 p-4 bg-muted/40 rounded-xl">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-3xl">{viewPet.type.split(" ")[1]}</div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{viewPet.name}</h3>
                  <p className="text-sm text-muted-foreground">{viewPet.breed} · {viewPet.age} · {viewPet.gender}</p>
                  <div className="flex gap-2 mt-1">
                    {viewPet.vaccinated && <Badge variant="default" className="text-xs">Vaccinated</Badge>}
                    {viewPet.neutered && <Badge variant="secondary" className="text-xs">Neutered</Badge>}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {[["Weight", viewPet.weight], ["Color", viewPet.color], ["Conditions", viewPet.conditions || "None"], ["Last Visit", viewPet.lastVisit || "—"], ["Owner", viewPet.owner], ["Phone", viewPet.ownerPhone], ["Address", viewPet.ownerAddress]].map(([k, v]) => (
                  <div key={k} className={k === "Address" || k === "Conditions" ? "col-span-2" : ""}>
                    <p className="text-xs text-muted-foreground font-medium">{k}</p>
                    <p className="text-foreground">{v}</p>
                  </div>
                ))}
              </div>
              {viewPet.notes && <div className="p-3 bg-muted/40 rounded-lg"><p className="text-xs font-medium text-muted-foreground mb-1">Medical Notes</p><p className="text-sm text-foreground">{viewPet.notes}</p></div>}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { openEdit(viewPet); setViewPet(null); }}>Edit</Button>
              <Button onClick={() => setViewPet(null)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
