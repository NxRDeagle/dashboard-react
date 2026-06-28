import type { FC } from "react";
import { Header } from "../../components/Header";
import { Widgets } from "../../components/Widgets";

export const DashboardPage: FC = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
    <Header />
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <Widgets />
    </main>
  </div>
);
