import { usePathname, useRouter } from "next/navigation";

const useIdioma = () => {
  const router = useRouter();
  const path = usePathname();

  const changeLanguage = () => {
    const segments = path.split("/");
    segments[1] = path.includes("/en/")
      ? "es"
      : path.includes("/es/")
      ? "ar"
      : path.includes("/ar/")
      ? "pt"
      : "en";
    const newPath = segments.join("/");

    document.cookie = `NEXT_LOCALE=${segments[1]}; path=/; SameSite=Lax`;

    router.push(newPath);
  };

  return {
    changeLanguage,
  };
};

export default useIdioma;
