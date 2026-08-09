import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "./primitives";
import Photo from "./Photo";

const inr = (n) => `₹${n.toLocaleString("en-IN")}`;

export default function BookingModal({ trek, onClose }) {
  const [people, setPeople] = useState(1);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (trek) {
      setPeople(1);
      setSent(false);
    }
    document.body.style.overflow = trek ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [trek]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const max = trek?.seats ?? 1;

  return (
    <AnimatePresence>
      {trek && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center md:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="absolute inset-0 bg-ink/85 backdrop-blur-md" onClick={onClose} />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Reserve a seat on ${trek.name}`}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative z-10 grid w-full max-w-3xl overflow-hidden rounded-t-lg bg-moss md:rounded-lg md:grid-cols-2"
          >
            <div className="relative hidden md:block">
              <Photo src={trek.image} className="relative h-full w-full object-cover" depth={0.5} />
              <div className="absolute inset-0 bg-gradient-to-t from-moss via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="font-display text-3xl">{trek.name}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-lichen/70">
                  {trek.region}
                </p>
              </div>
            </div>

            <div className="p-7 md:p-9">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-lichen/60">
                    Reserve a seat
                  </p>
                  <p className="mt-2 font-display text-2xl md:hidden">{trek.name}</p>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="text-[11px] uppercase tracking-[0.2em] text-bone/50 hover:text-bone"
                >
                  Close
                </button>
              </div>

              {sent ? (
                <div className="mt-10">
                  <p className="font-display text-3xl leading-snug">
                    Seat held for 48 hours.
                  </p>
                  <p className="mt-4 text-[14px] leading-relaxed text-bone/60">
                    Your lead guide will call to confirm fitness and kit before
                    payment. Nothing is charged yet.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-8 w-full rounded-full bg-amber py-3.5 text-[12px] uppercase tracking-[0.2em] text-ink"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form
                  className="mt-8 flex flex-col gap-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <Field label="Full name" name="name" />
                  <Field label="Email" name="email" type="email" />
                  <Field label="Phone" name="phone" type="tel" />

                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-bone/40">
                      Seats · {trek.seats} left
                    </span>
                    <div className="mt-2 flex items-center gap-4">
                      <Stepper
                        sign="−"
                        onClick={() => setPeople((p) => Math.max(1, p - 1))}
                        disabled={people <= 1}
                      />
                      <span className="font-display text-2xl tabular-nums">{people}</span>
                      <Stepper
                        sign="+"
                        onClick={() => setPeople((p) => Math.min(max, p + 1))}
                        disabled={people >= max}
                      />
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between border-t border-bone/15 pt-5">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-bone/45">
                      Your share
                    </span>
                    <span className="font-display text-3xl">
                      {inr(trek.price * people)}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="group relative isolate overflow-hidden rounded-full border border-amber py-3.5 text-[12px] uppercase tracking-[0.2em] text-amber transition-colors duration-500 hover:text-ink"
                  >
                    <span className="absolute inset-0 -z-10 translate-y-full bg-amber transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
                    Hold my seat
                  </button>
                  <p className="text-center text-[11px] text-bone/35">
                    No card needed to hold. Free cancellation up to 14 days out.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, name, type = "text" }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.2em] text-bone/40">{label}</span>
      <input
        required
        name={name}
        type={type}
        className="mt-2 w-full border-b border-bone/20 bg-transparent pb-2 text-[15px] text-bone outline-none transition-colors focus:border-amber"
      />
    </label>
  );
}

function Stepper({ sign, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="h-9 w-9 rounded-full border border-bone/25 text-bone/80 transition-colors hover:border-amber hover:text-amber disabled:opacity-25 disabled:hover:border-bone/25 disabled:hover:text-bone/80"
    >
      {sign}
    </button>
  );
}
