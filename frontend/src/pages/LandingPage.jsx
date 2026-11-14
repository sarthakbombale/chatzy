import {
  ArrowRight,
  MessageCircle,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <MessageSquareText size={19} />,
    title: "Conversations that flow",
    description: "Keep your chats clear, simple, and all in one place.",
  },
  {
    icon: <UsersRound size={19} />,
    title: "Closer, wherever you are",
    description: "Pick up with your people from wherever the day takes you.",
  },
  {
    icon: <ShieldCheck size={19} />,
    title: "Your space to connect",
    description: "A comfortable place for the conversations that matter.",
  },
];

function LandingPage() {
  return (
    <main className="w-full min-h-screen flex flex-col">
      <header className="w-full max-w-7xl mx-auto px-6 py-6 sm:px-10 lg:px-12">
        <nav className="flex items-center justify-between" aria-label="Main navigation">
          <Link to="/" className="flex items-center gap-2.5 text-slate-100" aria-label="Chatzy home">
            <span className="flex size-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-400/20">
              <MessageCircle size={21} />
            </span>
            <span className="text-xl font-semibold tracking-tight">chatzy</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white sm:px-4"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-950/30 transition-colors hover:bg-cyan-400"
            >
              Sign up
            </Link>
          </div>
        </nav>
      </header>

      <section className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-14 px-6 py-12 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-20">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3.5 py-2 text-sm text-cyan-200">
            <Sparkles size={15} />
            <span>A little closer, every day</span>
          </div>
          <h1 className="text-5xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Good chats.
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-pink-300 bg-clip-text text-transparent">
              Better connections.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
            Make room for the conversations that make your day. Chatzy brings your people together,
            one message at a time.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3.5 font-semibold text-slate-950 shadow-lg shadow-cyan-950/30 transition-all hover:-translate-y-0.5 hover:bg-cyan-400"
            >
              Get started <ArrowRight size={18} />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800/60 px-6 py-3.5 font-medium text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800"
            >
              I already have an account
            </Link>
          </div>
          <p className="mt-5 text-sm text-slate-500">Free to join. Easy to make yourself at home.</p>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:ml-auto">
          <div className="absolute -inset-8 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute -right-3 top-8 size-24 rounded-full bg-pink-500/20 blur-2xl sm:-right-8" />
          <div className="relative overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-7">
            <div className="flex items-center justify-between border-b border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="relative flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-sm font-semibold text-white">
                  J
                  <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-slate-900 bg-emerald-400" />
                </div>
                <div>
                  <p className="font-medium text-slate-100">Jamie Parker</p>
                  <p className="text-xs text-emerald-400">Online now</p>
                </div>
              </div>
              <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                Your chats
              </span>
            </div>

            <div className="space-y-5 py-7">
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-slate-700/70 bg-slate-800 px-4 py-3 text-sm leading-6 text-slate-200">
                  Hey! Have you checked out that little coffee place downtown?
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-cyan-500 px-4 py-3 text-sm leading-6 text-slate-950">
                  Not yet! We should go this weekend ☕
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-slate-700/70 bg-slate-800 px-4 py-3 text-sm leading-6 text-slate-200">
                  It’s a plan. Can’t wait! <span className="text-pink-300">♥</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-700/80 bg-slate-800/70 px-4 py-3">
              <span className="flex-1 text-sm text-slate-500">Write a message...</span>
              <span className="flex size-9 items-center justify-center rounded-lg bg-cyan-500 text-slate-950">
                <ArrowRight size={17} />
              </span>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl border border-slate-700/80 bg-slate-800/95 px-4 py-3 shadow-xl sm:-left-10">
            <span className="flex size-9 items-center justify-center rounded-xl bg-pink-400/10 text-pink-300">
              <MessageCircle size={18} />
            </span>
            <div>
              <p className="text-xs font-medium text-slate-100">A message away</p>
              <p className="text-[11px] text-slate-400">From your favorite people</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-12 sm:px-10 lg:px-12 lg:pb-16">
        <div className="grid gap-4 border-t border-slate-800/80 pt-8 sm:grid-cols-3 sm:gap-6">
          {features.map(({ icon, title, description }) => (
            <div key={title} className="flex gap-3 rounded-xl p-3 sm:p-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-cyan-300 ring-1 ring-slate-700/80">
                {icon}
              </span>
              <div>
                <h2 className="font-medium text-slate-100">{title}</h2>
                <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
