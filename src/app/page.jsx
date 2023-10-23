import { TablaClientes } from "@/components/tabla";
import Styles from "./page.module.css";

export default function Home() {
  return (
    <div className={Styles.Contenedor}>
      <h1>Holaa</h1>
      <TablaClientes />
    </div>
  );
}
