import { PizzaCalculator } from "@/app/components/PizzaCalculator";
import { PizzaioloTips } from "@/app/components/PizzaioloTips";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-[800px] px-4 py-12 space-y-10">

        {/* HEADER */}
        <header className="space-y-2">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            🍕 Pizza Calculator
          </h1>
          <p className="text-base text-muted-foreground">
          </p>
          <div className="pt-2 border-b border-border" />
        </header>

        {/* PORADY */}
        <PizzaioloTips />

        {/* SEPARATOR */}
        <div className="flex items-center gap-3">
          <div className="flex-1 border-t border-border" />
          <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Kalkulator
          </span>
          <div className="flex-1 border-t border-border" />
        </div>

        {/* KALKULATOR */}
        <PizzaCalculator />
      </div>
    </div>
  );
}
