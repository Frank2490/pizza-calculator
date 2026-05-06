import { PizzaCalculator } from "@/app/components/PizzaCalculator";
import { ChefHat } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-[800px] px-4 py-12 space-y-10">

        {/* HEADER */}
        <header className="space-y-2">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            <ChefHat className="inline-block mr-3 mb-1" size={40} strokeWidth={1.5} />Pizza Calculator
          </h1>
          <p className="text-base text-muted-foreground">
          </p>
          <div className="pt-2 border-b border-border" />
        </header>

        {/* KALKULATOR */}
        <PizzaCalculator />
      </div>
    </div>
  );
}
