import { useState } from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { MobileSidebar } from "./MobileSidebar";
import { TopNavbar } from "./TopNavbar";
import { TooltipProvider } from "@/components/ui/tooltip";

export function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex h-screen w-full bg-[#fafbfa]">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <MobileSidebar open={mobileOpen} onOpenChange={setMobileOpen} />

        <div className="flex min-w-0 flex-1 flex-col">
          <TopNavbar onOpenMobileNav={() => setMobileOpen(true)} />

          <main className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="mx-auto w-full max-w-[1400px] space-y-6 px-4 py-6 sm:px-6 lg:px-8"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
