"use client";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import estiloBar from "@/styles/Bar.css";
import { useSelector } from "react-redux";
import { closeBar, openBar } from "../store/barSlice"; // Importa las acciones
import Link from "next/link";
import { useSession } from "next-auth/react";
import Inventario from "@/app/inventario/page";

function Bar() {
  const [puesto, setPuesto] = useState("");
  const session = useSession();
  useEffect(() => {
    setPuesto(session.data?.user.persona[0].puesto);
  }, [session.data]);
  const isBarOpen = useSelector((state) => state.bar.isBarOpen);
  const isGerente = puesto === "Gerente";
  /* const barStyles = {
      
        display: isBarOpen? 'flex' : 'none'
        // Otros estilos según sea necesario
        
      }; */

  const sidebarClass = isBarOpen ? "Bar-Open" : "Bar";

  return (
    <div className={sidebarClass}>
      <div className="Logo">
        <a className="edi"> Zona Sana</a>
      </div>
      <div className="Options">
        <div className="paginas-div">
          <ul className="Paginas-ul">
            <li className="Paginas">
              <Link className="Paginas-Enlaces" href="/menu">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="pat"
                    d="M10 21H5C3.89543 21 3 20.1046 
                                3 19V12.2969C3 11.7852 3.19615 11.2929 3.54809 10.9215L10.5481 3.53257C11.3369 2.69989 12.663 2.69989 13.4519 3.53257L20.4519 10.9215C20.8038 11.2929 21 11.7852 21 12.2969V19C21 20.1046 20.1046 21 19 21H14M10 21V15.5C10 15.2239 10.2239 15 10.5 15H13.5C13.7761 15 14 15.2239 14 15.5V21M10 21H14"
                    stroke="#12B76A"
                    stroke-width="1.5"
                  />
                </svg>
                Inicio
              </Link>
            </li>
            {isGerente && (
              <>
                <li className="Paginas">
                  <Link className="Paginas-Enlaces" href="/inventario">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        className="pat"
                        d="M22.0102 15.5633L22.0109 15.566L22.0109 15.566C22.1775 16.1909 21.8186 16.8696 21.185 16.992L15.2478 18.5568C15.3216 19.7232 14.569 20.8124 13.4004 21.1165C12.2322 21.4433 11.0181 20.8703 10.5099 19.8297L9.53051 20.0968L9.52946 20.0971C9.32195 20.1488 9.10627 20.0454 9.05193 19.8294C9.05188 19.8292 9.05184 19.829 9.0518 19.8289L5.05583 5.11528L3.15679 5.59013L3.14467 5.54162L3.15679 5.59013C2.66761 5.71244 2.13082 5.41957 1.98428 4.90648M22.0102 15.5633L2.03235 4.89275M22.0102 15.5633L22.0102 15.5631L21.5701 13.942C21.57 13.9418 21.57 13.9416 21.5699 13.9414C21.5156 13.7254 21.2999 13.622 21.0924 13.6738L21.0919 13.6739L19.4481 14.1018L17.6072 7.26782C17.6072 7.26768 17.6071 7.26754 17.6071 7.2674C17.5528 7.05134 17.3371 6.94784 17.1296 6.99963L17.1287 6.99985L13.5385 7.96027L12.5554 4.3247C12.5553 4.32454 12.5553 4.32438 12.5553 4.32423C12.5009 4.1082 12.2852 4.00472 12.0777 4.05651L12.0771 4.05666L7.44408 5.27226M22.0102 15.5633L7.44408 5.27226M1.98428 4.90648L2.03235 4.89275M1.98428 4.90648C1.98428 4.90648 1.98428 4.90649 1.98428 4.90649L2.03235 4.89275M1.98428 4.90648C1.83695 4.39078 2.15686 3.87821 2.66749 3.73236L2.66916 3.73189L2.66917 3.73192L6.39939 2.80524M2.03235 4.89275C1.89335 4.40618 2.19449 3.91946 2.68123 3.78044L6.41224 2.85356M6.39939 2.80524C6.3991 2.80532 6.39882 2.8054 6.39853 2.80548L6.41224 2.85356M6.39939 2.80524L6.40019 2.80504L6.41224 2.85356M6.39939 2.80524C6.58712 2.75222 6.80093 2.85936 6.85458 3.07282L6.85448 3.07243L6.80618 3.08537M6.41224 2.85356C6.57437 2.80733 6.75979 2.89996 6.80618 3.08537M6.80618 3.08537L6.85468 3.07323M6.80618 3.08537L7.40866 5.33325L6.85468 3.07323M6.85468 3.07323L7.44408 5.27226M6.85468 3.07323L7.44408 5.27226M5.69548 4.57863L5.69555 4.57861L5.69466 4.57593C5.64281 4.42057 5.48733 4.28683 5.3228 4.28683H5.25329V4.28535L5.2414 4.28827L2.97039 4.84449L2.97038 4.84445L2.96856 4.84497C2.90035 4.86444 2.84749 4.85279 2.80878 4.82734C2.76892 4.80114 2.73981 4.75741 2.72648 4.70655C2.69967 4.60417 2.73901 4.49141 2.85679 4.45447L6.21445 3.60938L9.86283 17.0483C9.86287 17.0485 9.86291 17.0487 9.86296 17.0488C9.91729 17.2648 10.133 17.3683 10.3405 17.3165L10.3409 17.3164L10.8072 17.1955C10.3552 17.7407 10.1772 18.4624 10.2721 19.1303L9.69195 19.2704L5.69548 4.57863ZM11.0948 19.2925L11.0947 19.2924C10.8018 18.3462 11.3422 17.3784 12.2879 17.1308L12.2884 17.1306C13.2798 16.8603 14.2479 17.5142 14.4277 18.4132L14.4277 18.4132L14.4279 18.4141C14.63 19.3354 14.0467 20.1691 13.1886 20.4177C12.287 20.6655 11.3646 20.1695 11.0948 19.2925ZM20.9754 16.2927L15.0636 17.8568C14.8149 17.2186 14.2794 16.7014 13.6324 16.4619C14.2561 16.2965 14.9238 16.1196 15.6118 15.9374C17.3835 15.4682 19.2904 14.9631 20.9301 14.5249L21.2647 15.7743L21.2648 15.7745C21.3272 16.0038 21.203 16.23 20.9764 16.2924C20.9762 16.2924 20.976 16.2925 20.9758 16.2926L20.9754 16.2927ZM18.7255 14.3126L10.5027 16.4885L8.74449 10.0267L16.9673 7.85081L18.7255 14.3126ZM7.65536 6.01763L11.9153 4.88463L12.7931 8.14825L8.53301 9.28125L7.65536 6.01763Z"
                        fill="#12B76A"
                        stroke="#12B76A"
                        stroke-width="0.1"
                      />
                    </svg>
                    Inventario
                  </Link>
                </li>
                <li className="Paginas">
                  <Link className="Paginas-Enlaces" href="/estadisticas">
                    <svg
                      className="svgs"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.4445 20.8889V12.8039C16.4445 12.5008 16.7022 12.2551 17.0001 12.2551C17.3068 12.2551 17.5556 12.4946 17.5556 12.8039V20.8889H18.675C19.889 20.8889 20.889 19.8918 20.889 18.6749V5.32498C20.889 4.11098 19.8919 3.11099 18.675 3.11099H5.32512C4.11113 3.11099 3.11113 4.10806 3.11113 5.32498V18.6749C3.11113 19.8889 4.1082 20.8889 5.32512 20.8889H6.44454V15.5903C6.44454 15.2776 6.70221 15.0239 7.00007 15.0239C7.30685 15.0239 7.5556 15.2703 7.5556 15.5903V20.8889H9.77784V10.0379C9.77784 9.73333 10.0355 9.48652 10.3334 9.48652C10.6403 9.48652 10.889 9.72424 10.889 10.0379V20.8889H13.1111V5.88611C13.1111 5.58087 13.3689 5.33337 13.6668 5.33337C13.9736 5.33337 14.2223 5.58114 14.2223 5.88611V20.8889H16.4445ZM2 5.32505C2 3.4887 3.5032 2 5.32505 2H18.675C20.5113 2 22 3.5032 22 5.32505V18.675C22 20.5113 20.4968 22 18.675 22H5.32505C3.4887 22 2 20.4968 2 18.675V5.32505Z"
                        fill="#12B76A"
                      />
                    </svg>
                    Estadisticas
                  </Link>
                </li>
                <li className="Paginas">
                  <Link className="Paginas-Enlaces" href="/envios">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.187 21.3776L7.18698 21.3776L7.18863 21.3793C7.21922 21.4098 7.25378 21.4368 7.2959 21.4555C7.33846 21.4744 7.38353 21.4826 7.43226 21.4826H21.753C21.8498 21.4826 21.9382 21.4499 22.0028 21.3854C22.0673 21.321 22.1 21.2325 22.1 21.1356L22.0998 6.81485C22.0998 6.6871 22.0357 6.57088 21.9191 6.52642L15.2813 2.59282C15.2551 2.55776 15.2202 2.53749 15.1847 2.52738C15.1493 2.51729 15.1121 2.51736 15.0901 2.5174L15.0863 2.5174H2.24698C2.15022 2.5174 2.06177 2.55007 1.99725 2.61455C1.93273 2.67904 1.9 2.76751 1.9 2.86438V15.7037C1.9 15.7524 1.90821 15.7974 1.92709 15.84C1.94561 15.8817 1.97221 15.916 2.0025 15.9465C2.00279 15.9468 2.00307 15.947 2.00335 15.9473L7.187 21.3776ZM21.406 20.7886H7.77908V7.1617H12.5173V10.7653C12.5173 10.8621 12.5499 10.9506 12.6144 11.0151C12.6789 11.0796 12.7674 11.1123 12.8643 11.1123H16.0741C16.1709 11.1123 16.2593 11.0797 16.3239 11.0152C16.3884 10.9507 16.4211 10.8622 16.4211 10.7653L16.4209 7.1617H21.406L21.406 20.7886ZM13.2111 10.4184V7.16179H15.7272V10.4184H13.2111ZM11.5402 3.21114H14.9849L20.4748 6.46779H16.4253L11.5402 3.21114ZM12.9685 6.46796L8.08336 3.21129L10.2908 3.21114L15.1759 6.46781L12.9685 6.46796ZM7.54007 6.46796L3.28304 3.21114L6.83396 3.21114L11.7191 6.4678L7.54007 6.46796ZM2.59407 15.5647V3.56023L7.08535 6.98775V20.2688L2.59407 15.5647Z"
                        fill="#12B76A"
                        stroke="#12B76A"
                        stroke-width="0.2"
                      />
                    </svg>
                    Envios
                  </Link>
                </li>
              </>
            )}

            <li className="Paginas">
              <Link className="Paginas-Enlaces" href="/expedientes">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.9999 2.00018C6.48613 2.00018 2 6.48631 2 12.0001C2 14.4654 2.89843 16.7233 4.38279 18.4684C4.4018 18.4977 4.4236 18.5254 4.44906 18.5508C4.45482 18.5566 4.46127 18.5603 4.46702 18.5657C6.30174 20.6679 8.99734 21.9998 12 21.9998C15.0027 21.9998 17.6982 20.6679 19.533 18.5657C19.5387 18.5604 19.5455 18.5564 19.5509 18.5508C19.5764 18.5254 19.5984 18.4973 19.6172 18.4684C21.1016 16.7231 22 14.4652 22 12.0001C22 6.48631 17.5139 2.00018 12.0001 2.00018H11.9999ZM11.9999 21C9.44414 21 7.13567 19.9276 5.49595 18.2111L6.18095 17.5261C6.84273 16.8645 7.72232 16.5 8.65758 16.5H15.3424C16.2776 16.5 17.1572 16.8645 17.8188 17.5259L18.5038 18.2109C16.8642 19.9274 14.5557 21 11.9998 21H11.9999ZM19.1561 17.4492L18.5259 16.819C17.6754 15.9685 16.5449 15.4999 15.3424 15.4999H8.65758C7.455 15.4999 6.32465 15.9685 5.47417 16.819L4.84395 17.4492C3.68829 15.9356 2.99999 14.047 2.99999 12.0001C2.99999 7.03769 7.03719 3.00022 11.9999 3.00022C16.9624 3.00022 20.9999 7.03742 20.9999 12.0001C20.9999 14.0471 20.3116 15.9357 19.1561 17.4492H19.1561ZM11.9999 6.50019C9.79449 6.50019 7.99986 8.2946 7.99986 10.5003C7.99986 12.7057 9.79427 14.5003 11.9999 14.5003C14.2054 14.5003 16 12.7059 16 10.5003C16 8.2946 14.2054 6.50019 11.9999 6.50019ZM11.9999 13.5001C10.3457 13.5001 8.99999 12.1544 8.99999 10.5002C8.99999 8.84598 10.3457 7.50027 11.9999 7.50027C13.6541 7.50027 14.9999 8.84602 14.9999 10.5002C14.9999 12.1544 13.6541 13.5001 11.9999 13.5001Z"
                    fill="#12B76A"
                  />
                </svg>
                Expedientes
              </Link>
            </li>

            <li className="Paginas">
              <Link className="Paginas-Enlaces" href="/citas">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.0229 17.8548H9.64885C9.55729 17.8548 9.49615 17.9159 9.49615 18.0075C9.49615 18.099 9.55729 18.1602 9.64885 18.1602H11.0229C11.1145 18.1602 11.1756 18.099 11.1756 18.0075C11.1756 17.9311 11.0993 17.8548 11.0229 17.8548Z"
                    fill="#12B76A"
                  />
                  <path
                    d="M19.6773 2.84641C19.2276 2.39664 18.63 2.1492 17.9934 2.1492L6.56615 2.14893C5.92962 2.14893 5.33236 2.39636 4.88227 2.84613C4.43249 3.29591 4.18506 3.89346 4.18506 4.53002V19.7678C4.18506 20.4044 4.43249 21.0016 4.88227 21.4517C5.33204 21.9015 5.92959 22.1489 6.56615 22.1489H17.9949C18.6314 22.1489 19.2287 21.9015 19.6788 21.4517C20.1285 21.0019 20.376 20.4044 20.376 19.7678V4.53002C20.3748 3.89376 20.1274 3.29623 19.6776 2.84642L19.6773 2.84641ZM19.4229 19.7686C19.4229 20.5566 18.7825 21.197 17.9946 21.197H6.56585C5.77788 21.197 5.13747 20.5566 5.13747 19.7686V4.53008C5.13747 3.74211 5.7779 3.10171 6.56585 3.10171H17.9946C18.7825 3.10171 19.4229 3.74214 19.4229 4.53008V19.7686Z"
                    fill="#12B76A"
                  />
                  <path
                    d="M10.0385 10.86L8.47036 12.4284L7.85498 11.813C7.66934 11.6274 7.36707 11.6274 7.18171 11.813C6.99607 11.9987 6.99607 12.301 7.18171 12.4863L8.13442 13.439C8.22431 13.5289 8.34483 13.5787 8.47147 13.5787C8.59811 13.5787 8.71891 13.5289 8.80853 13.439L10.7136 11.5339C10.8993 11.3483 10.8993 11.046 10.7136 10.8606C10.528 10.6747 10.2238 10.6736 10.0384 10.8601L10.0385 10.86Z"
                    fill="#12B76A"
                  />
                  <path
                    d="M10.0385 15.6211L8.47036 17.1892L7.85498 16.5738C7.66934 16.3881 7.36707 16.3881 7.18171 16.5738C6.99607 16.7594 6.99607 17.0617 7.18171 17.2471L8.13442 18.1998C8.22431 18.2897 8.34483 18.3395 8.47147 18.3395C8.59811 18.3395 8.71891 18.2897 8.80853 18.1998L10.7136 16.2946C10.8993 16.109 10.8993 15.8067 10.7136 15.6214C10.528 15.4355 10.2238 15.4355 10.0384 15.6211L10.0385 15.6211Z"
                    fill="#12B76A"
                  />
                  <path
                    d="M10.0385 6.09761L8.47036 7.66571L7.85498 7.05033C7.66934 6.86469 7.36707 6.86469 7.18171 7.05033C6.99607 7.23598 6.99607 7.53824 7.18171 7.7236L8.13442 8.67631C8.22431 8.7662 8.34483 8.81602 8.47147 8.81602C8.59811 8.81602 8.71891 8.7662 8.80853 8.67631L10.7136 6.77119C10.8993 6.58554 10.8993 6.28328 10.7136 6.09792C10.528 5.91227 10.2238 5.91227 10.0384 6.09764L10.0385 6.09761Z"
                    fill="#12B76A"
                  />
                  <path
                    d="M17.0425 11.673H12.2803C12.017 11.673 11.8044 11.8865 11.8044 12.149C11.8044 12.4114 12.0179 12.6249 12.2803 12.6249H17.0425C17.3058 12.6249 17.5184 12.4114 17.5184 12.149C17.5184 11.8857 17.3049 11.673 17.0425 11.673Z"
                    fill="#12B76A"
                  />
                  <path
                    d="M17.0425 17.3874H12.2803C12.017 17.3874 11.8044 17.6009 11.8044 17.8633C11.8044 18.1258 12.0179 18.3393 12.2803 18.3393H17.0425C17.3058 18.3393 17.5184 18.1258 17.5184 17.8633C17.5184 17.6009 17.3049 17.3874 17.0425 17.3874Z"
                    fill="#12B76A"
                  />
                  <path
                    d="M17.0425 6.91058H12.2803C12.017 6.91058 11.8044 7.12406 11.8044 7.38652C11.8044 7.64898 12.0179 7.86246 12.2803 7.86246H17.0425C17.3058 7.86246 17.5184 7.64898 17.5184 7.38652C17.5184 7.12406 17.3049 6.91058 17.0425 6.91058Z"
                    fill="#12B76A"
                  />
                  <path
                    d="M11.0229 18.9233H9.64885C9.55729 18.9233 9.49615 18.9844 9.49615 19.076C9.49615 19.1675 9.55729 19.2287 9.64885 19.2287H11.0229C11.1145 19.2287 11.1756 19.1675 11.1756 19.076C11.1756 18.9844 11.0993 18.9233 11.0229 18.9233Z"
                    fill="#12B76A"
                  />
                </svg>
                Citas
              </Link>
            </li>
            <li className="Paginas">
              <Link className="Paginas-Enlaces" href="/ventas">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#0ACF83"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 6H2V4H4V6Z" />
                  <path d="M22 6H20V4H22V6Z" />
                  <path d="M4 10H2V8H4V10Z" />
                  <path d="M22 10H20V8H22V10Z" />
                  <path d="M8 10C7.44772 10 7 10.4477 7 11V13C7 13.5523 7.44772 14 8 14H16C16.5523 14 17 13.5523 17 13V11C17 10.4477 16.5523 10 16 10H8Z" />
                  <path d="M19 4H5C3.34315 4 2 5.34315 2 7V17C2 18.6569 3.34315 20 5 20H19C20.6569 20 22 18.6569 22 17V7C22 5.34315 20.6569 4 19 4ZM20 17C20 17.5523 19.5523 18 19 18H5C4.44772 18 4 17.5523 4 17V14H20V17ZM20 12H4V7C4 6.44772 4.44772 6 5 6H19C19.5523 6 20 6.44772 20 7V12Z" />
                </svg>
                Ventas
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="Close">
        <ul className="Close-Options">
          {isGerente && (
            <>
              <li className="Close-li">
                <a href="/ajustes" className="Close-Enlaces">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.99998 12.5C11.3807 12.5 12.5 11.3807 12.5 9.99998C12.5 8.61927 11.3807 7.49998 9.99998 7.49998C8.61927 7.49998 7.49998 8.61927 7.49998 9.99998C7.49998 11.3807 8.61927 12.5 9.99998 12.5Z"
                      stroke="#5D6679"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16.1666 12.5C16.0557 12.7513 16.0226 13.0301 16.0716 13.3005C16.1207 13.5708 16.2495 13.8202 16.4416 14.0166L16.4916 14.0666C16.6466 14.2214 16.7695 14.4052 16.8534 14.6076C16.9373 14.8099 16.9805 15.0268 16.9805 15.2458C16.9805 15.4648 16.9373 15.6817 16.8534 15.884C16.7695 16.0864 16.6466 16.2702 16.4916 16.425C16.3369 16.5799 16.153 16.7029 15.9507 16.7867C15.7484 16.8706 15.5315 16.9138 15.3125 16.9138C15.0935 16.9138 14.8766 16.8706 14.6742 16.7867C14.4719 16.7029 14.2881 16.5799 14.1333 16.425L14.0833 16.375C13.8869 16.1829 13.6375 16.054 13.3671 16.005C13.0968 15.956 12.818 15.989 12.5666 16.1C12.3202 16.2056 12.11 16.381 11.9619 16.6046C11.8138 16.8282 11.7344 17.0902 11.7333 17.3583V17.5C11.7333 17.942 11.5577 18.3659 11.2452 18.6785C10.9326 18.991 10.5087 19.1666 10.0666 19.1666C9.62462 19.1666 9.2007 18.991 8.88813 18.6785C8.57557 18.3659 8.39998 17.942 8.39998 17.5V17.425C8.39353 17.1491 8.30424 16.8816 8.14374 16.6572C7.98323 16.4328 7.75893 16.2619 7.49998 16.1666C7.24863 16.0557 6.96982 16.0226 6.69949 16.0716C6.42916 16.1207 6.17971 16.2495 5.98331 16.4416L5.93331 16.4916C5.77852 16.6466 5.59471 16.7695 5.39238 16.8534C5.19005 16.9373 4.97317 16.9805 4.75415 16.9805C4.53512 16.9805 4.31824 16.9373 4.11591 16.8534C3.91358 16.7695 3.72977 16.6466 3.57498 16.4916C3.42002 16.3369 3.29709 16.153 3.21321 15.9507C3.12934 15.7484 3.08617 15.5315 3.08617 15.3125C3.08617 15.0935 3.12934 14.8766 3.21321 14.6742C3.29709 14.4719 3.42002 14.2881 3.57498 14.1333L3.62498 14.0833C3.81709 13.8869 3.94597 13.6375 3.99498 13.3671C4.044 13.0968 4.01091 12.818 3.89998 12.5666C3.79434 12.3202 3.61894 12.11 3.39537 11.9619C3.17179 11.8138 2.9098 11.7344 2.64165 11.7333H2.49998C2.05795 11.7333 1.63403 11.5577 1.32147 11.2452C1.00891 10.9326 0.833313 10.5087 0.833313 10.0666C0.833313 9.62462 1.00891 9.2007 1.32147 8.88813C1.63403 8.57557 2.05795 8.39998 2.49998 8.39998H2.57498C2.85081 8.39353 3.11832 8.30424 3.34273 8.14374C3.56714 7.98323 3.73808 7.75893 3.83331 7.49998C3.94424 7.24863 3.97733 6.96982 3.92832 6.69949C3.8793 6.42916 3.75043 6.17971 3.55831 5.98331L3.50831 5.93331C3.35335 5.77852 3.23042 5.59471 3.14655 5.39238C3.06267 5.19005 3.0195 4.97317 3.0195 4.75415C3.0195 4.53512 3.06267 4.31824 3.14655 4.11591C3.23042 3.91358 3.35335 3.72977 3.50831 3.57498C3.6631 3.42002 3.84692 3.29709 4.04925 3.21321C4.25158 3.12934 4.46845 3.08617 4.68748 3.08617C4.90651 3.08617 5.12338 3.12934 5.32571 3.21321C5.52804 3.29709 5.71186 3.42002 5.86665 3.57498L5.91665 3.62498C6.11305 3.81709 6.36249 3.94597 6.63282 3.99498C6.90315 4.044 7.18197 4.01091 7.43331 3.89998H7.49998C7.74645 3.79434 7.95666 3.61894 8.10472 3.39537C8.25279 3.17179 8.33224 2.9098 8.33331 2.64165V2.49998C8.33331 2.05795 8.50891 1.63403 8.82147 1.32147C9.13403 1.00891 9.55795 0.833313 9.99998 0.833313C10.442 0.833313 10.8659 1.00891 11.1785 1.32147C11.4911 1.63403 11.6666 2.05795 11.6666 2.49998V2.57498C11.6677 2.84313 11.7472 3.10513 11.8952 3.3287C12.0433 3.55228 12.2535 3.72768 12.5 3.83331C12.7513 3.94424 13.0301 3.97733 13.3005 3.92832C13.5708 3.8793 13.8202 3.75043 14.0166 3.55831L14.0666 3.50831C14.2214 3.35335 14.4052 3.23042 14.6076 3.14655C14.8099 3.06267 15.0268 3.0195 15.2458 3.0195C15.4648 3.0195 15.6817 3.06267 15.884 3.14655C16.0864 3.23042 16.2702 3.35335 16.425 3.50831C16.5799 3.6631 16.7029 3.84692 16.7867 4.04925C16.8706 4.25158 16.9138 4.46845 16.9138 4.68748C16.9138 4.90651 16.8706 5.12338 16.7867 5.32571C16.7029 5.52804 16.5799 5.71186 16.425 5.86665L16.375 5.91665C16.1829 6.11305 16.054 6.36249 16.005 6.63282C15.956 6.90315 15.989 7.18197 16.1 7.43331V7.49998C16.2056 7.74645 16.381 7.95666 16.6046 8.10472C16.8282 8.25279 17.0902 8.33224 17.3583 8.33331H17.5C17.942 8.33331 18.3659 8.50891 18.6785 8.82147C18.991 9.13403 19.1666 9.55795 19.1666 9.99998C19.1666 10.442 18.991 10.8659 18.6785 11.1785C18.3659 11.4911 17.942 11.6666 17.5 11.6666H17.425C17.1568 11.6677 16.8948 11.7472 16.6713 11.8952C16.4477 12.0433 16.2723 12.2535 16.1666 12.5Z"
                      stroke="#5D6679"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Ajustes
                </a>
              </li>
            </>
          )}
          <li className="Close-li">
            <a
              onClick={() => {
                signOut();
              }}
              className="Close-Enlaces"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="path-1-outside-1_619_1184"
                  maskUnits="userSpaceOnUse"
                  x="3"
                  y="1"
                  width="18"
                  height="22"
                  fill="none"
                >
                  <rect fill="white" x="3" y="1" width="18" height="22" />
                  <path d="M12.5651 21.6454H5.09465C4.8466 21.6454 4.64516 21.4398 4.64516 21.187V3.11327C4.64516 2.86058 4.84677 2.65484 5.09465 2.65484H12.5651C12.7432 2.65484 12.8877 2.50813 12.8877 2.32742C12.8877 2.14672 12.7432 2 12.5651 2H5.09465C4.49106 2 4 2.49955 4 3.11328V21.187C4 21.8007 4.49106 22.3003 5.09465 22.3003H12.5651C12.7432 22.3003 12.8877 22.1535 12.8877 21.9728C12.8877 21.7921 12.7433 21.6454 12.5651 21.6454V21.6454ZM20.1499 11.9186L15.7247 7.42719C15.5987 7.29929 15.3946 7.29929 15.2684 7.42719C15.1422 7.55509 15.1424 7.76247 15.2684 7.89036L19.1433 11.8227H8.61245C8.43442 11.8227 8.28987 11.9694 8.28987 12.1501C8.28987 12.3308 8.43442 12.4775 8.61245 12.4775H19.1433L15.2684 16.4103C15.1424 16.5382 15.1424 16.7454 15.2684 16.8734C15.3314 16.9374 15.4136 16.9694 15.4964 16.9694C15.5792 16.9694 15.6617 16.9374 15.7245 16.8734L20.1497 12.382C20.21 12.3208 20.2442 12.2375 20.2442 12.1505C20.2444 12.0633 20.2105 11.9802 20.1499 11.9186V11.9186Z" />
                </mask>
                <path
                  d="M12.5651 21.6454H5.09465C4.8466 21.6454 4.64516 21.4398 4.64516 21.187V3.11327C4.64516 2.86058 4.84677 2.65484 5.09465 2.65484H12.5651C12.7432 2.65484 12.8877 2.50813 12.8877 2.32742C12.8877 2.14672 12.7432 2 12.5651 2H5.09465C4.49106 2 4 2.49955 4 3.11328V21.187C4 21.8007 4.49106 22.3003 5.09465 22.3003H12.5651C12.7432 22.3003 12.8877 22.1535 12.8877 21.9728C12.8877 21.7921 12.7433 21.6454 12.5651 21.6454V21.6454ZM20.1499 11.9186L15.7247 7.42719C15.5987 7.29929 15.3946 7.29929 15.2684 7.42719C15.1422 7.55509 15.1424 7.76247 15.2684 7.89036L19.1433 11.8227H8.61245C8.43442 11.8227 8.28987 11.9694 8.28987 12.1501C8.28987 12.3308 8.43442 12.4775 8.61245 12.4775H19.1433L15.2684 16.4103C15.1424 16.5382 15.1424 16.7454 15.2684 16.8734C15.3314 16.9374 15.4136 16.9694 15.4964 16.9694C15.5792 16.9694 15.6617 16.9374 15.7245 16.8734L20.1497 12.382C20.21 12.3208 20.2442 12.2375 20.2442 12.1505C20.2444 12.0633 20.2105 11.9802 20.1499 11.9186V11.9186Z"
                  fill="#5D6679"
                />
                <path
                  d="M12.5651 21.6454H12.6651V21.5454H12.5651V21.6454ZM12.5651 21.6454H12.4651V21.7454H12.5651V21.6454ZM20.1499 11.9186H20.2499V11.8776L20.2211 11.8484L20.1499 11.9186ZM15.7247 7.42719L15.6535 7.49737L15.6535 7.49737L15.7247 7.42719ZM15.2684 7.42719L15.3396 7.49742L15.3396 7.49742L15.2684 7.42719ZM15.2684 7.89036L15.1971 7.96055L15.1971 7.96055L15.2684 7.89036ZM19.1433 11.8227V11.9227H19.3822L19.2145 11.7525L19.1433 11.8227ZM19.1433 12.4775L19.2145 12.5477L19.3822 12.3775H19.1433V12.4775ZM15.2684 16.4103L15.1971 16.3401L15.1971 16.3401L15.2684 16.4103ZM15.2684 16.8734L15.1971 16.9436L15.1971 16.9436L15.2684 16.8734ZM15.7245 16.8734L15.6533 16.8032L15.6532 16.8034L15.7245 16.8734ZM20.1497 12.382L20.2209 12.4522L20.2209 12.4522L20.1497 12.382ZM20.2442 12.1505L20.1442 12.1503V12.1505H20.2442ZM20.1499 11.9186H20.0499V11.9596L20.0786 11.9888L20.1499 11.9186ZM12.5651 21.5454H5.09465V21.7454H12.5651V21.5454ZM5.09465 21.5454C4.90369 21.5454 4.74516 21.3865 4.74516 21.187H4.54516C4.54516 21.4932 4.7895 21.7454 5.09465 21.7454V21.5454ZM4.74516 21.187V3.11327H4.54516V21.187H4.74516ZM4.74516 3.11327C4.74516 2.91393 4.90387 2.75484 5.09465 2.75484V2.55484C4.78968 2.55484 4.54516 2.80724 4.54516 3.11327H4.74516ZM5.09465 2.75484H12.5651V2.55484H5.09465V2.75484ZM12.5651 2.75484C12.7998 2.75484 12.9877 2.56194 12.9877 2.32742H12.7877C12.7877 2.45431 12.6865 2.55484 12.5651 2.55484V2.75484ZM12.9877 2.32742C12.9877 2.0929 12.7998 1.9 12.5651 1.9V2.1C12.6865 2.1 12.7877 2.20054 12.7877 2.32742H12.9877ZM12.5651 1.9H5.09465V2.1H12.5651V1.9ZM5.09465 1.9C4.43424 1.9 3.9 2.44593 3.9 3.11328H4.1C4.1 2.55317 4.54788 2.1 5.09465 2.1V1.9ZM3.9 3.11328V21.187H4.1V3.11328H3.9ZM3.9 21.187C3.9 21.8543 4.43424 22.4003 5.09465 22.4003V22.2003C4.54788 22.2003 4.1 21.7471 4.1 21.187H3.9ZM5.09465 22.4003H12.5651V22.2003H5.09465V22.4003ZM12.5651 22.4003C12.7998 22.4003 12.9877 22.2074 12.9877 21.9728H12.7877C12.7877 22.0997 12.6865 22.2003 12.5651 22.2003V22.4003ZM12.9877 21.9728C12.9877 21.7383 12.8 21.5454 12.5651 21.5454V21.7454C12.6867 21.7454 12.7877 21.8459 12.7877 21.9728H12.9877ZM12.6651 21.6454V21.6454H12.4651V21.6454H12.6651ZM20.2211 11.8484L15.7959 7.357L15.6535 7.49737L20.0786 11.9888L20.2211 11.8484ZM15.7959 7.357C15.6307 7.18932 15.3625 7.18939 15.1972 7.35696L15.3396 7.49742C15.4266 7.40918 15.5666 7.40925 15.6535 7.49737L15.7959 7.357ZM15.1972 7.35695C15.0325 7.52386 15.0328 7.79378 15.1971 7.96055L15.3396 7.82018C15.2519 7.73115 15.2518 7.58632 15.3396 7.49742L15.1972 7.35695ZM15.1971 7.96055L19.0721 11.8929L19.2145 11.7525L15.3396 7.82017L15.1971 7.96055ZM19.1433 11.7227H8.61245V11.9227H19.1433V11.7227ZM8.61245 11.7227C8.37779 11.7227 8.18987 11.9156 8.18987 12.1501H8.38987C8.38987 12.0232 8.49105 11.9227 8.61245 11.9227V11.7227ZM8.18987 12.1501C8.18987 12.3846 8.37779 12.5775 8.61245 12.5775V12.3775C8.49105 12.3775 8.38987 12.277 8.38987 12.1501H8.18987ZM8.61245 12.5775H19.1433V12.3775H8.61245V12.5775ZM19.072 12.4074L15.1971 16.3401L15.3396 16.4804L19.2145 12.5477L19.072 12.4074ZM15.1971 16.3401C15.0327 16.5069 15.0328 16.7766 15.1971 16.9436L15.3397 16.8033C15.2519 16.7141 15.252 16.5694 15.3396 16.4804L15.1971 16.3401ZM15.1971 16.9436C15.2795 17.0272 15.3877 17.0694 15.4964 17.0694V16.8694C15.4396 16.8694 15.3833 16.8476 15.3396 16.8032L15.1971 16.9436ZM15.4964 17.0694C15.6051 17.0694 15.7136 17.0273 15.7958 16.9435L15.6532 16.8034C15.6098 16.8475 15.5534 16.8694 15.4964 16.8694V17.0694ZM15.7957 16.9436L20.2209 12.4522L20.0785 12.3118L15.6533 16.8032L15.7957 16.9436ZM20.2209 12.4522C20.2998 12.3722 20.3442 12.2636 20.3442 12.1505H20.1442C20.1442 12.2113 20.1202 12.2694 20.0785 12.3118L20.2209 12.4522ZM20.3442 12.1507C20.3444 12.0374 20.3004 11.9289 20.2211 11.8485L20.0786 11.9888C20.1207 12.0315 20.1443 12.0893 20.1442 12.1503L20.3442 12.1507ZM20.2499 11.9186V11.9186H20.0499V11.9186H20.2499Z"
                  fill="#5D6679"
                  mask="url(#path-1-outside-1_619_1184)"
                />
              </svg>
              Salir
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Bar;
