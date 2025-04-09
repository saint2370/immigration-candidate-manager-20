import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

const IRCCHeader = () => {
  const [open, setOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  const menuItems = [
    {
      title: t("immigration_programs"),
      items: [
        { href: "/programmes-immigration", label: t("immigration_programs") },
        { href: "/visa-etudiant", label: t("student_visa") },
        { href: "/visa-travail", label: t("work_visa") },
        { href: "/residence-permanente", label: t("permanent_residence") },
        { href: "/parrainage-familial", label: "Parrainage familial" },
        { href: "/refugies-asile", label: "Réfugiés et asile" },
        { href: "/visiter-canada", label: "Visiter le Canada" },
      ],
    },
    {
      title: "Services",
      items: [
        { href: "/formulaires-guides", label: "Formulaires et guides" },
        { href: "/services-nouveaux-arrivants", label: "Services aux nouveaux arrivants" },
        { href: "/rendez-vous-biometriques", label: "Rendez-vous biométriques" },
        { href: "/calculateur-eligibilite", label: t("eligibility_calculator") },
        { href: "/emplois-canada", label: "Emplois au Canada" },
      ],
    },
    {
      title: "Ressources",
      items: [
        { href: "/centre-soutien", label: "Centre de soutien" },
        { href: "/publications", label: "Publications" },
        { href: "/guides-officiels", label: "Guides officiels" },
      ],
    },
  ];

  return (
    <div className="bg-white border-b sticky top-0 z-50">
      <div className="container py-4 px-4 flex items-center justify-between">
        <a href="/" className="font-bold text-xl">
          IRCC
        </a>

        <div className="hidden md:flex gap-4 items-center">
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.map((menuItem) => (
                <NavigationMenuItem key={menuItem.title}>
                  <NavigationMenuTrigger>{menuItem.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px]">
                      {menuItem.items.map((item) => (
                        <li key={item.label}>
                          <NavigationMenuLink asChild>
                            <a
                              href={item.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">
                                {item.label}
                              </div>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Languages className="mr-2 h-4 w-4" />
                {language.toUpperCase()}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom">
              <SheetHeader>
                <SheetTitle>Select Language</SheetTitle>
                <SheetDescription>
                  Choose your preferred language.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <Button onClick={() => setLanguage('fr')}>Français</Button>
                <Button onClick={() => setLanguage('en')}>English</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                Menu
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Explore our services and resources.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                {menuItems.map((menuItem) => (
                  <div key={menuItem.title}>
                    <h3 className="font-bold text-lg">{menuItem.title}</h3>
                    <ul className="grid gap-2">
                      {menuItem.items.map((item) => (
                        <li key={item.label}>
                          <a
                            href={item.href}
                            className="block py-2 px-4 rounded-md hover:bg-gray-100"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <Button onClick={() => setLanguage('fr')}>Français</Button>
                <Button onClick={() => setLanguage('en')}>English</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default IRCCHeader;
