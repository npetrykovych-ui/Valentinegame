import { createBrowserRouter } from "react-router";
import Onboarding from "./pages/Onboarding";
import GameScreen from "./pages/GameScreen";
import AIPartnerTest from "./pages/AIPartnerTest";
import Results from "./pages/Results";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Onboarding,
  },
  {
    path: "/game",
    Component: GameScreen,
  },
  {
    path: "/test",
    Component: AIPartnerTest,
  },
  {
    path: "/results",
    Component: Results,
  },
]);
