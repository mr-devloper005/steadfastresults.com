import Link from 'next/link'
import { ArrowRight, Linkedin, Twitter, Mail } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

const leadership = [
  {
    name: 'Aditi Sharma',
    role: 'Editor in Chief',
    bio: 'Leads editorial direction and long-form reporting strategy across the newsroom.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  },
  {
    name: 'Marcus Chen',
    role: 'Head of Newsroom',
    bio: 'Oversees daily publishing rhythm, contributors, and editorial workflow.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    name: 'Priya Iyer',
    role: 'Director of Research',
    bio: 'Runs investigative research, fact-checking, and source verification.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  },
]

const team = [
  {
    name: 'Daniel Park',
    role: 'Senior Writer',
    bio: 'Covers technology, platforms, and the business of software.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
  },
  {
    name: 'Sofia Reyes',
    role: 'Features Editor',
    bio: 'Edits long-form features and narrative reporting.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
  },
  {
    name: 'Jonas Weber',
    role: 'Markets Reporter',
    bio: 'Tracks markets, capital flows, and global business policy.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
  {
    name: 'Ananya Rao',
    role: 'Culture Writer',
    bio: 'Writes essays at the intersection of media, work, and identity.',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80',
  },
  {
    name: 'Ethan Brooks',
    role: 'Visual Editor',
    bio: 'Leads photography, illustration, and visual storytelling.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
  },
  {
    name: 'Maya Okafor',
    role: 'Newsletter Lead',
    bio: 'Curates the weekly briefing and reader programs.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80',
  },
]

function PersonCard({ person, large = false }: { person: typeof leadership[number]; large?: boolean }) {
  return (
    <div className="group overflow-hidden rounded-2xl bg-[#15151c] transition-transform hover:-translate-y-1">
      <div className={`relative w-full overflow-hidden ${large ? 'h-72' : 'h-60'}`}>
        <img
          src={person.image}
          alt={person.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className={`font-semibold text-white ${large ? 'text-xl' : 'text-lg'}`}>{person.name}</h3>
        <p className="mt-1 text-sm font-medium text-[#d6c5f0]">{person.role}</p>
        <p className="mt-3 text-sm leading-6 text-slate-400">{person.bio}</p>
        <div className="mt-5 flex gap-2">
          {[Linkedin, Twitter, Mail].map((Icon, i) => (
            <span
              key={i}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:border-[#d6c5f0]/40 hover:text-[#d6c5f0]"
            >
              <Icon className="h-3.5 w-3.5" />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#0b0b10] text-white">
      <NavbarShell />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5b3b8e]/85 via-[#3d2566]/80 to-[#0b0b10]" />
        <div className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:py-32 lg:px-8">
          <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider backdrop-blur">
            Our Team
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            The people behind every story.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-200">
            A small newsroom of editors, reporters, and contributors building a calmer, more thoughtful publishing
            experience for readers everywhere.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center rounded-full bg-[#d6c5f0]/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#d6c5f0]">
              Leadership
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Newsroom leadership</h2>
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {leadership.map((p) => (
            <PersonCard key={p.name} person={p} large />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center rounded-full bg-[#d6c5f0]/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#d6c5f0]">
              Editors &amp; writers
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Editorial team</h2>
          </div>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((p) => (
            <PersonCard key={p.name} person={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#3d2566] to-[#5b3b8e] p-10 text-center sm:p-14">
          <h2 className="text-3xl font-bold sm:text-4xl">Join the newsroom</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-200">
            We are always looking for writers, editors, and contributors who care about doing the work right.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1c1530] hover:bg-slate-100"
            >
              View open roles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
