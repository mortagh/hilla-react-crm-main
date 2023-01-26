import {Cell, Pie, PieChart} from "recharts";
import {useSelector} from "react-redux";
import {getContactsByCompany, getNumberOfContacts} from "Frontend/features/contacts/contactsSlice";

export default function Dashboard() {
  const COLORS = ['#00747C', '#00BBC9', '#CACACA', '#878787', '#202022'];
  const contacts = useSelector(getNumberOfContacts);
  const contactStats = useSelector(getContactsByCompany);

  return (
    <div className="flex flex-col items-center">
      <h2>Dashboard</h2>

      <p className="text-l">{contacts} contacts</p>

      <PieChart width={800} height={400}>
        <Pie
          dataKey="value"
          data={contactStats}
          label={({name}) => name}
        >
          {contactStats.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
          ))}
        </Pie>
      </PieChart>
    </div>
  )
}