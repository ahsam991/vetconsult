import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, FileText, CreditCard, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Today's Appointments", value: "8", sub: "+2 from yesterday", icon: Calendar, color: "text-primary", bg: "bg-primary/10" },
  { label: "Total Patients", value: "342", sub: "12 new this month", icon: Users, color: "text-secondary", bg: "bg-secondary/10" },
  { label: "Prescriptions", value: "1,204", sub: "18 issued today", icon: FileText, color: "text-accent-foreground", bg: "bg-accent/30" },
  { label: "Revenue (Month)", value: "৳ 48,500", sub: "+15% vs last month", icon: CreditCard, color: "text-primary", bg: "bg-primary/10" },
];

const todayAppointments = [
  { time: "09:00", patient: "Tommy", owner: "Rahim Uddin", type: "General Consultation", status: "completed" },
  { time: "10:30", patient: "Mitthu", owner: "Nusrat Jahan", type: "Vaccination", status: "completed" },
  { time: "11:00", patient: "Bruno", owner: "Arif Hossain", type: "Deworming", status: "in-progress" },
  { time: "12:30", patient: "Mimi", owner: "Fatema Khatun", type: "Surgery Follow-up", status: "waiting" },
  { time: "14:00", patient: "Rex", owner: "Tanvir Ahmed", type: "Lab Test", status: "waiting" },
  { time: "15:30", patient: "Kiki", owner: "Sadia Islam", type: "General Consultation", status: "waiting" },
];

const recentPrescriptions = [
  { id: "RX-1024", patient: "Tommy", owner: "Rahim U.", date: "Today 09:15", medicines: 3 },
  { id: "RX-1023", patient: "Mitthu", owner: "Nusrat J.", date: "Today 10:45", medicines: 2 },
  { id: "RX-1022", patient: "Charlie", owner: "Karim A.", date: "Yesterday", medicines: 4 },
  { id: "RX-1021", patient: "Luna", owner: "Rima B.", date: "Yesterday", medicines: 1 },
];

const statusColor: Record<string, string> = {
  completed: "bg-primary/10 text-primary",
  "in-progress": "bg-secondary/20 text-secondary",
  waiting: "bg-muted text-muted-foreground",
  cancelled: "bg-destructive/10 text-destructive",
};

const statusIcon: Record<string, React.ReactNode> = {
  completed: <CheckCircle className="w-3.5 h-3.5" />,
  "in-progress": <Clock className="w-3.5 h-3.5" />,
  waiting: <AlertCircle className="w-3.5 h-3.5" />,
};

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-5 text-primary-foreground flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Good morning, Dr. Foysal 👋</h2>
          <p className="text-primary-foreground/80 text-sm mt-0.5">You have <strong>8 appointments</strong> today. 3 completed, 1 in progress.</p>
        </div>
        <button
          onClick={() => navigate("/admin/appointments")}
          className="bg-primary-foreground text-primary px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity hidden sm:block"
        >
          View Schedule
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-primary" />{s.sub}
                  </p>
                </div>
                <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Today's Appointments */}
        <div className="lg:col-span-2">
          <Card className="border-border bg-card">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold">Today's Appointments</CardTitle>
              <button onClick={() => navigate("/admin/appointments")} className="text-xs text-primary hover:underline font-medium">View All</button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {todayAppointments.map((apt, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3">
                    <div className="text-xs font-mono text-muted-foreground w-10 flex-shrink-0">{apt.time}</div>
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary">{apt.patient[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{apt.patient} <span className="text-muted-foreground font-normal">· {apt.owner}</span></p>
                      <p className="text-xs text-muted-foreground truncate">{apt.type}</p>
                    </div>
                    <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${statusColor[apt.status]}`}>
                      {statusIcon[apt.status]}{apt.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Prescriptions */}
        <div>
          <Card className="border-border bg-card h-full">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold">Recent Prescriptions</CardTitle>
              <button onClick={() => navigate("/admin/prescriptions")} className="text-xs text-primary hover:underline font-medium">View All</button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {recentPrescriptions.map((rx) => (
                  <div key={rx.id} className="flex items-center gap-3 px-4 py-3">
                    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{rx.patient} <span className="text-muted-foreground font-normal text-xs">· {rx.owner}</span></p>
                      <p className="text-xs text-muted-foreground">{rx.id} · {rx.date}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs flex-shrink-0">{rx.medicines} meds</Badge>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3">
                <button
                  onClick={() => navigate("/admin/prescriptions")}
                  className="w-full text-center text-xs text-primary font-semibold py-2 rounded-lg border border-primary/30 hover:bg-primary/5 transition-colors"
                >
                  + New Prescription
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
