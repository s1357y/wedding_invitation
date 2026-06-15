import { wedding } from '../config/wedding'

export default function Greeting() {
  return (
    <section className="px-8 py-20 text-center bg-theme-bg">
      <p className="font-serif-theme text-sm tracking-[0.25em] text-theme-accent uppercase mb-10">
        Greeting
      </p>

      <p className="text-theme-text text-sm leading-8 whitespace-pre-line">
        {wedding.greeting}
      </p>

      <div className="mt-10 text-theme-muted text-sm space-y-1">
        <p>
          <span className="text-theme-text">{wedding.groom.fatherName}</span>
          <span> · </span>
          <span className="text-theme-text">{wedding.groom.motherName}</span>
          <span className="text-theme-muted text-xs ml-2">의 아들</span>
          <span className="font-serif-theme text-theme-accent ml-2">{wedding.groom.name}</span>
        </p>
        <p>
          <span className="text-theme-text">{wedding.bride.fatherName}</span>
          <span> · </span>
          <span className="text-theme-text">{wedding.bride.motherName}</span>
          <span className="text-theme-muted text-xs ml-2">의 딸</span>
          <span className="font-serif-theme text-theme-accent ml-2">{wedding.bride.name}</span>
        </p>
      </div>
    </section>
  )
}
