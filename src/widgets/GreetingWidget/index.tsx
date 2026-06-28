import { Suspense, lazy, type FC } from "react";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import { LoadingFallback } from "../../components/Fallback";
import { useAuth } from "../../context/AuthContext";

const REMOTE_ENTRY_URL = "http://localhost:8081/mf-manifest.json";

interface GreetingWidgetProps {
  userName: string;
}

const OfflinePlaceholder: FC<GreetingWidgetProps> = ({ userName }) => (
  <div className="bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl p-6 shadow-sm text-white h-full">
    <p className="text-xs font-semibold uppercase tracking-widest text-gray-200 mb-3">
      Greeting · Remote MFE ✦
    </p>
    <p className="text-2xl font-bold">Hello, {userName}!</p>
    <p className="text-sm text-gray-200 mt-3">
      Run <code className="bg-white/20 px-1 rounded">npm run start:remote</code>{" "}
      to load the live widget from port 8081.
    </p>
  </div>
);

const RemoteGreeting = lazy(
  async (): Promise<{ default: FC<GreetingWidgetProps> }> => {
    const isAvailable = await fetch(REMOTE_ENTRY_URL, {
      signal: AbortSignal.timeout(3000),
    })
      .then((r) => r.ok)
      .catch(() => false);

    if (!isAvailable) {
      return { default: OfflinePlaceholder };
    }

    try {
      const { registerRemotes, loadRemote } =
        await import("@module-federation/runtime");
      registerRemotes([{ name: "greetingRemote", entry: REMOTE_ENTRY_URL }], {
        force: false,
      });
      const mod = await loadRemote<{ default: FC<GreetingWidgetProps> }>(
        "greetingRemote/GreetingWidget",
      );
      if (!mod?.default) throw new Error("Remote module returned empty");
      return mod;
    } catch {
      return { default: OfflinePlaceholder };
    }
  },
);

export const GreetingWidget: FC = () => {
  const { user } = useAuth();
  const userName = user?.username ?? "User";

  return (
    <ErrorBoundary fallback={<OfflinePlaceholder userName={userName} />}>
      <Suspense fallback={<LoadingFallback />}>
        <RemoteGreeting userName={userName} />
      </Suspense>
    </ErrorBoundary>
  );
};
