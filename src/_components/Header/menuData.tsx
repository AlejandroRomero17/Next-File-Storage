import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Inicio",
    path: "/home",
    newTab: false,
  },
  {
    id: 2,
    title: "Manuales y Formatos",
    path: "/about",
    newTab: false,
  },


  {
    id: 4,
    title: "Paginas",
    newTab: false,
    submenu: [
      {
        id: 40,
        title: "Inicio",
        path: "/",
        newTab: false,
      },
      {
        id: 41,
        title: "Manuales y Formatos",
        path: "/about",
        newTab: false,
      },
    ],
  },
];
export default menuData;
