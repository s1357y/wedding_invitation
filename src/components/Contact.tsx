import { wedding } from '../config/wedding'

interface PersonCardProps {
  label: string
  name: string
  phone: string
}

function PersonCard({ label, name, phone }: PersonCardProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-theme-border last:border-0">
      <div>
        <p className="text-theme-muted text-xs">{label}</p>
        <p className="text-theme-text text-sm font-medium mt-0.5">{name}</p>
      </div>
      <a
        href={`tel:${phone}`}
        className="flex items-center gap-1.5 text-theme-accent text-sm border border-theme-accent rounded-full px-4 py-1.5"
      >
        <span>전화</span>
      </a>
    </div>
  )
}

export default function Contact() {
  return (
    <section className="px-6 py-20 bg-theme-bg">
      <p className="font-serif-theme text-sm tracking-[0.25em] text-theme-accent uppercase mb-10 text-center">
        Contact
      </p>

      <div className="max-w-sm mx-auto space-y-6">
        <div className="border border-theme-border rounded-xl p-5 bg-theme-surface">
          <p className="font-serif-theme text-theme-accent text-xs tracking-widest mb-3">GROOM</p>
          <PersonCard label="신랑" name={wedding.groom.nameFull} phone={wedding.groom.phone} />
          <PersonCard label="신랑 아버지" name={wedding.groom.fatherName} phone={wedding.groom.phone} />
          <PersonCard label="신랑 어머니" name={wedding.groom.motherName} phone={wedding.groom.phone} />
        </div>

        <div className="border border-theme-border rounded-xl p-5 bg-theme-surface">
          <p className="font-serif-theme text-theme-accent text-xs tracking-widest mb-3">BRIDE</p>
          <PersonCard label="신부" name={wedding.bride.nameFull} phone={wedding.bride.phone} />
          <PersonCard label="신부 아버지" name={wedding.bride.fatherName} phone={wedding.bride.phone} />
          <PersonCard label="신부 어머니" name={wedding.bride.motherName} phone={wedding.bride.phone} />
        </div>
      </div>
    </section>
  )
}
