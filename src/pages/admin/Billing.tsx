import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Search, Plus, Printer, Eye, Trash2, Edit, PlusCircle, MinusCircle, TrendingUp, CreditCard, Clock, CheckCircle } from "lucide-react";

type PayStatus = "paid" | "pending" | "partial" | "cancelled";
type PayMethod = "Cash" | "bKash" | "Nagad" | "Bank Transfer" | "Card";

interface LineItem { description: string; qty: number; unit: number; }
interface Invoice {
  id: string; date: string; patient: string; petType: string; owner: string; phone: string;
  items: LineItem[]; discount: number; payMethod: PayMethod; status: PayStatus; notes: string;
}

function calcTotal(items: LineItem[], discount: number) {
  const sub = items.reduce((s, i) => s + i.qty * i.unit, 0);
  return sub - (sub * discount / 100);
}

const initInvoices: Invoice[] = [
  { id: "INV-1001", date: "2026-03-08", patient: "Tommy", petType: "Dog 🐕", owner: "Rahim Uddin", phone: "01711-000001", items: [{ description: "General Consultation", qty: 1, unit: 500 }, { description: "Amoxicillin 500mg (7 days)", qty: 7, unit: 30 }, { description: "Paracetamol 250mg (3 days)", qty: 3, unit: 15 }], discount: 0, payMethod: "Cash", status: "paid", notes: "" },
  { id: "INV-1002", date: "2026-03-08", patient: "Mitthu", petType: "Cat 🐈", owner: "Nusrat Jahan", phone: "01811-000002", items: [{ description: "Vaccination (Rabies)", qty: 1, unit: 800 }, { description: "Vaccination (Distemper)", qty: 1, unit: 600 }, { description: "Consultation Fee", qty: 1, unit: 500 }], discount: 10, payMethod: "bKash", status: "paid", notes: "10% loyalty discount applied." },
  { id: "INV-1003", date: "2026-03-08", patient: "Bruno", petType: "Dog 🐕", owner: "Arif Hossain", phone: "01911-000003", items: [{ description: "Deworming (Large Dog)", qty: 1, unit: 400 }, { description: "Consultation Fee", qty: 1, unit: 300 }], discount: 0, payMethod: "Cash", status: "pending", notes: "" },
  { id: "INV-1004", date: "2026-03-07", patient: "Charlie", petType: "Dog 🐕", owner: "Karim Ahmed", phone: "01911-000009", items: [{ description: "Dermatology Consultation", qty: 1, unit: 600 }, { description: "Cetirizine 5mg (14 days)", qty: 14, unit: 20 }, { description: "Antifungal Shampoo", qty: 1, unit: 350 }, { description: "Lab Test (Skin Scraping)", qty: 1, unit: 500 }], discount: 5, payMethod: "Nagad", status: "paid", notes: "" },
  { id: "INV-1005", date: "2026-03-06", patient: "Mimi", petType: "Cat 🐈", owner: "Fatema Khatun", phone: "01611-000004", items: [{ description: "Abdominal Surgery", qty: 1, unit: 8000 }, { description: "Anaesthesia", qty: 1, unit: 1500 }, { description: "Post-Op Medication", qty: 1, unit: 600 }, { description: "Hospitalization (2 days)", qty: 2, unit: 500 }], discount: 0, payMethod: "Bank Transfer", status: "partial", notes: "৳5000 paid. ৳5600 due." },
];

const statusStyles: Record<PayStatus, string> = {
  paid: "bg-primary/10 text-primary",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  partial: "bg-secondary/20 text-secondary",
  cancelled: "bg-destructive/10 text-destructive",
};

const emptyInvoice: Omit<Invoice, "id"> = { date: new Date().toISOString().slice(0, 10), patient: "", petType: "Dog 🐕", owner: "", phone: "", items: [{ description: "", qty: 1, unit: 0 }], discount: 0, payMethod: "Cash", status: "pending", notes: "" };

export default function Billing() {
  const [invoices, setInvoices] = useState<Invoice[]>(initInvoices);
  const [search, setSearch] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [viewInv, setViewInv] = useState<Invoice | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Invoice, "id">>(emptyInvoice);

  const filtered = invoices.filter(i => i.patient.toLowerCase().includes(search.toLowerCase()) || i.owner.toLowerCase().includes(search.toLowerCase()) || i.id.toLowerCase().includes(search.toLowerCase()));

  const totalRevenue = invoices.filter(i => i.status === "paid").reduce((s, i) => s + calcTotal(i.items, i.discount), 0);
  const totalPending = invoices.filter(i => i.status === "pending" || i.status === "partial").reduce((s, i) => s + calcTotal(i.items, i.discount), 0);

  function openNew() { setForm({ ...emptyInvoice, date: new Date().toISOString().slice(0, 10) }); setEditMode(false); setEditId(null); setShowDialog(true); }
  function openEdit(inv: Invoice) { const { id, ...rest } = inv; setForm({ ...rest }); setEditMode(true); setEditId(inv.id); setShowDialog(true); }
  function saveInv() {
    if (!form.patient || !form.owner || form.items.length === 0) return;
    if (editMode && editId) { setInvoices(prev => prev.map(i => i.id === editId ? { ...i, ...form } : i)); }
    else { const newId = `INV-${1005 + invoices.length - initInvoices.length + 1}`; setInvoices(prev => [{ id: newId, ...form }, ...prev]); }
    setShowDialog(false);
  }
  function addItem() { setForm(f => ({ ...f, items: [...f.items, { description: "", qty: 1, unit: 0 }] })); }
  function removeItem(i: number) { setForm(f => ({ ...f, items: f.items.filter((_, idx) => idx !== i) })); }
  function updateItem(i: number, field: keyof LineItem, val: string | number) { setForm(f => ({ ...f, items: f.items.map((it, idx) => idx === i ? { ...it, [field]: typeof val === "string" ? val : Number(val) } : it) })); }

  function handlePrint(inv: Invoice) {
    const total = calcTotal(inv.items, inv.discount);
    const sub = inv.items.reduce((s, i) => s + i.qty * i.unit, 0);
    const w = window.open("", "_blank");
    if (w) {
      w.document.write(`<html><head><title>Invoice ${inv.id}</title><style>
        body { font-family: Arial, sans-serif; padding: 40px; color: #111; }
        .header { text-align: center; border-bottom: 2px solid #059669; padding-bottom: 16px; margin-bottom: 20px; }
        .header h1 { font-size: 22px; color: #059669; margin: 0; }
        .header p { margin: 2px 0; font-size: 13px; color: #555; }
        .meta { display: flex; justify-content: space-between; margin-bottom: 20px; }
        .patient { background: #f9f9f9; padding: 12px; border-radius: 8px; font-size: 13px; }
        .patient span { font-weight: 700; color: #777; display: block; font-size: 11px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
        th { background: #059669; color: white; padding: 8px 12px; text-align: left; font-size: 12px; }
        td { border: 1px solid #eee; padding: 8px 12px; font-size: 13px; }
        tr:nth-child(even) td { background: #f9fafb; }
        .total-row td { font-weight: bold; background: #f0fdf4; }
        .badge { display: inline-block; padding: 2px 10px; border-radius: 999px; font-size: 12px; font-weight: bold; background: ${inv.status === "paid" ? "#d1fae5" : "#fef9c3"}; color: ${inv.status === "paid" ? "#065f46" : "#92400e"}; }
        .footer { margin-top: 40px; display: flex; justify-content: space-between; font-size: 12px; color: #777; }
      </style></head><body>
        <div class="header">
          <h1>🐾 Vet Consult</h1>
          <p>Dr. Foysal Kabir — BVC Reg. No. 9774</p>
          <p>10/7 Block-A, Iqbal Road, Mohammadpur, Dhaka-1207 | 📞 01835-220347</p>
        </div>
        <div class="meta">
          <div>
            <p style="margin:0;font-size:20px;font-weight:bold">INVOICE</p>
            <p style="margin:2px 0;font-size:13px;color:#777">Invoice No: <strong>${inv.id}</strong></p>
            <p style="margin:2px 0;font-size:13px;color:#777">Date: <strong>${inv.date}</strong></p>
            <p style="margin:2px 0">Status: <span class="badge">${inv.status.toUpperCase()}</span></p>
          </div>
          <div class="patient">
            <span>BILLED TO</span>
            <p style="margin:0;font-weight:bold">${inv.owner}</p>
            <p style="margin:2px 0">${inv.phone}</p>
            <p style="margin:2px 0">Pet: ${inv.patient} (${inv.petType})</p>
          </div>
        </div>
        <table>
          <thead><tr><th>#</th><th>Description</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead>
          <tbody>
            ${inv.items.map((it, i) => `<tr><td>${i + 1}</td><td>${it.description}</td><td>${it.qty}</td><td>৳${it.unit}</td><td>৳${(it.qty * it.unit).toLocaleString()}</td></tr>`).join("")}
            <tr><td colspan="4" style="text-align:right;font-size:12px;color:#777">Subtotal</td><td>৳${sub.toLocaleString()}</td></tr>
            ${inv.discount > 0 ? `<tr><td colspan="4" style="text-align:right;font-size:12px;color:#777">Discount (${inv.discount}%)</td><td>-৳${(sub * inv.discount / 100).toLocaleString()}</td></tr>` : ""}
            <tr class="total-row"><td colspan="4" style="text-align:right">TOTAL</td><td style="font-size:16px">৳${total.toLocaleString()}</td></tr>
          </tbody>
        </table>
        <p style="font-size:13px"><strong>Payment Method:</strong> ${inv.payMethod}</p>
        ${inv.notes ? `<p style="font-size:13px;color:#777">Note: ${inv.notes}</p>` : ""}
        <div class="footer"><div>Thank you for trusting Vet Consult with your pet's health!</div><div>Powered by Vet Consult Management System</div></div>
      </body></html>`);
      w.document.close();
      w.print();
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground">Billing & Invoices</h2>
          <p className="text-sm text-muted-foreground">{invoices.length} invoices total</p>
        </div>
        <Button onClick={openNew} className="gap-2"><Plus className="w-4 h-4" />New Invoice</Button>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Revenue", value: `৳${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "text-primary", bg: "bg-primary/10" },
          { label: "Pending Amount", value: `৳${totalPending.toLocaleString()}`, icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100 dark:bg-yellow-900/20" },
          { label: "Paid Invoices", value: String(invoices.filter(i => i.status === "paid").length), icon: CheckCircle, color: "text-primary", bg: "bg-primary/10" },
          { label: "Pending Invoices", value: String(invoices.filter(i => i.status === "pending" || i.status === "partial").length), icon: CreditCard, color: "text-secondary", bg: "bg-secondary/10" },
        ].map(s => (
          <Card key={s.label} className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-xl font-bold text-foreground mt-0.5">{s.value}</p>
                </div>
                <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center`}>
                  <s.icon className={`w-4 h-4 ${s.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search invoices..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  {["Invoice ID", "Date", "Patient", "Owner", "Total", "Payment", "Status", "Actions"].map(h => (
                    <th key={h} className={`text-left px-4 py-3 text-xs font-semibold text-muted-foreground ${h === "Owner" ? "hidden md:table-cell" : h === "Payment" ? "hidden lg:table-cell" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(inv => (
                  <tr key={inv.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-primary">{inv.id}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{inv.date}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{inv.patient}</p>
                      <p className="text-xs text-muted-foreground">{inv.petType}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-foreground">{inv.owner}</td>
                    <td className="px-4 py-3 font-semibold text-foreground">৳{calcTotal(inv.items, inv.discount).toLocaleString()}</td>
                    <td className="px-4 py-3 hidden lg:table-cell text-xs text-muted-foreground">{inv.payMethod}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${statusStyles[inv.status]}`}>{inv.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setViewInv(inv)} className="p-1.5 rounded hover:bg-muted transition-colors"><Eye className="w-3.5 h-3.5 text-muted-foreground" /></button>
                        <button onClick={() => openEdit(inv)} className="p-1.5 rounded hover:bg-muted transition-colors"><Edit className="w-3.5 h-3.5 text-muted-foreground" /></button>
                        <button onClick={() => handlePrint(inv)} className="p-1.5 rounded hover:bg-primary/10 transition-colors"><Printer className="w-3.5 h-3.5 text-primary" /></button>
                        <button onClick={() => { if (window.confirm(`Delete invoice ${inv.id}?`)) setInvoices(prev => prev.filter(i => i.id !== inv.id)); }} className="p-1.5 rounded hover:bg-destructive/10 transition-colors"><Trash2 className="w-3.5 h-3.5 text-destructive" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="text-center py-12 text-muted-foreground text-sm">No invoices found.</div>}
          </div>
        </CardContent>
      </Card>

      {/* New/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editMode ? "Edit Invoice" : "New Invoice"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <h3 className="col-span-2 sm:col-span-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Patient Details</h3>
              {[["Patient Name *", "patient", "text", ""], ["Pet Type", "petType", "select", ""], ["Owner Name *", "owner", "text", ""], ["Phone", "phone", "text", ""], ["Date", "date", "date", ""]].map(([l, f, t, ph]) => (
                <div key={f as string}>
                  <label className="text-xs font-medium text-foreground mb-1 block">{l}</label>
                  {t === "select" ? (
                    <select value={(form as any)[f as string]} onChange={e => setForm(p => ({ ...p, [f as string]: e.target.value }))} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                      {["Dog 🐕", "Cat 🐈", "Bird 🦜", "Rabbit 🐇", "Other"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  ) : <Input type={t as string} placeholder={ph as string} value={(form as any)[f as string]} onChange={e => setForm(p => ({ ...p, [f as string]: e.target.value }))} />}
                </div>
              ))}
            </div>
            {/* Line Items */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Services / Items</h3>
                <Button variant="outline" size="sm" onClick={addItem} className="gap-1 h-7 text-xs"><PlusCircle className="w-3.5 h-3.5" />Add Item</Button>
              </div>
              <div className="space-y-2">
                {form.items.map((item, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <Input placeholder="Description" value={item.description} onChange={e => updateItem(i, "description", e.target.value)} className="flex-1" />
                    <Input type="number" placeholder="Qty" value={item.qty} onChange={e => updateItem(i, "qty", e.target.value)} className="w-16" />
                    <Input type="number" placeholder="৳ Price" value={item.unit} onChange={e => updateItem(i, "unit", e.target.value)} className="w-24" />
                    <span className="text-xs font-semibold text-foreground w-20 text-right">৳{(item.qty * item.unit).toLocaleString()}</span>
                    {form.items.length > 1 && <button onClick={() => removeItem(i)}><MinusCircle className="w-4 h-4 text-destructive" /></button>}
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-border flex justify-end gap-6 text-sm">
                <span className="text-muted-foreground">Subtotal: <strong className="text-foreground">৳{form.items.reduce((s, i) => s + i.qty * i.unit, 0).toLocaleString()}</strong></span>
                <span className="text-primary font-bold">Total: ৳{calcTotal(form.items, form.discount).toLocaleString()}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-xs font-medium text-foreground mb-1 block">Discount %</label>
                <Input type="number" min="0" max="100" value={form.discount} onChange={e => setForm(f => ({ ...f, discount: Number(e.target.value) }))} />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground mb-1 block">Payment Method</label>
                <select value={form.payMethod} onChange={e => setForm(f => ({ ...f, payMethod: e.target.value as PayMethod }))} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                  {["Cash", "bKash", "Nagad", "Bank Transfer", "Card"].map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-foreground mb-1 block">Status</label>
                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as PayStatus }))} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                  {["paid", "pending", "partial", "cancelled"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="text-xs font-medium text-foreground mb-1 block">Notes</label>
                <Input value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Optional notes" />
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
            <Button onClick={saveInv}>{editMode ? "Save Changes" : "Create Invoice"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Invoice Dialog */}
      {viewInv && (
        <Dialog open={!!viewInv} onOpenChange={() => setViewInv(null)}>
          <DialogContent className="max-w-lg max-h-[92vh] overflow-y-auto">
            <DialogHeader><DialogTitle className="flex items-center justify-between"><span>{viewInv.id}</span><span className={`text-xs px-2 py-1 rounded-full font-semibold ${statusStyles[viewInv.status]}`}>{viewInv.status}</span></DialogTitle></DialogHeader>
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-2 p-3 bg-muted/40 rounded-xl text-sm">
                {[["Patient", viewInv.patient], ["Pet Type", viewInv.petType], ["Owner", viewInv.owner], ["Phone", viewInv.phone], ["Date", viewInv.date], ["Payment", viewInv.payMethod]].map(([k, v]) => (
                  <div key={k}><p className="text-xs text-muted-foreground">{k}</p><p className="font-medium text-foreground">{v}</p></div>
                ))}
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Items</p>
                <div className="space-y-1">
                  {viewInv.items.map((it, i) => (
                    <div key={i} className="flex justify-between text-sm py-1 border-b border-border last:border-0">
                      <span>{it.description} <span className="text-muted-foreground">×{it.qty}</span></span>
                      <span className="font-medium">৳{(it.qty * it.unit).toLocaleString()}</span>
                    </div>
                  ))}
                  {viewInv.discount > 0 && <div className="flex justify-between text-sm py-1 text-muted-foreground"><span>Discount ({viewInv.discount}%)</span><span>-৳{(viewInv.items.reduce((s, i) => s + i.qty * i.unit, 0) * viewInv.discount / 100).toLocaleString()}</span></div>}
                  <div className="flex justify-between text-base font-bold pt-2"><span>TOTAL</span><span className="text-primary">৳{calcTotal(viewInv.items, viewInv.discount).toLocaleString()}</span></div>
                </div>
              </div>
              {viewInv.notes && <p className="text-sm text-muted-foreground">Note: {viewInv.notes}</p>}
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => { openEdit(viewInv); setViewInv(null); }}>Edit</Button>
              <Button onClick={() => { handlePrint(viewInv); setViewInv(null); }}><Printer className="w-4 h-4 mr-1" />Print Invoice</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
