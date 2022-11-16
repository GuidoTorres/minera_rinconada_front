import { AiOutlineDollarCircle,AiOutlineFileText, AiFillSetting, AiOutlineUser, AiOutlineSetting, AiOutlineSolution } from "react-icons/ai";

export const SidebarData = [
  {
    title: "Administración",
    path: "/administracion",
    icon: <AiOutlineSetting />,
  },
  {
    title: "Personal",
    path: "/personal",
    icon: <AiOutlineUser />,
    // main: () => <Personal/>
  },
  {
    title: "Planillas",
    path: "/planilla",
    icon: <AiOutlineSolution />,
  },
  {
    title: "Logística",
    path: "/logistica",
    icon: <AiOutlineFileText />,
  },
  {
    title: "Finanzas",
    path: "/finanzas",
    icon: <AiOutlineDollarCircle />,
  },
];
