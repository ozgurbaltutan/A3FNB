import { permanentRedirect } from "next/navigation";

export default function LegacyGreenCoffeePage() {
  permanentRedirect("/en/products/coffee");
}
