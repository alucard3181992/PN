import React from "react";
import { Menubar } from 'primereact/menubar';
import Link from 'next/link';
import { useRouter } from 'next/router'

import { items } from "./data";
export default function Navbar() {

  const router = useRouter()
  return (<React.Fragment>
    <div className="topInicio">
      <div className="w-full mb-5">
        <Menubar model={items.map(item => (
          {
            ...item,
            url: undefined, // Establece el valor de la URL en null o undefined
            command: () => { }, // Esto es importante para evitar la recarga de la página
            template: (menuItem) => (
              menuItem.link == "no" ? <React.Fragment>
                <a href={menuItem.href}
                  role="menuitem" className="p-menuitem-link"
                  aria-haspopup="false" data-pc-section="action">
                  <span className={"p-menuitem-icon " + menuItem.icon}
                    data-pc-section="icon">
                  </span>
                  <span className="p-menuitem-text" data-pc-section="label">
                    {menuItem.label}</span>
                </a>
              </React.Fragment>
                :
                < Link href={menuItem.href} role="menuitem"
                  aria-haspopup="false" data-pc-section="action"
                  className={router.route === menuItem.href ? 'seleccionado tol p-menuitem-link' : 'tol p-menuitem-link'}>
                  <span className={"p-menuitem-icon " + menuItem.icon}
                    data-pc-section="icon">
                  </span>
                  <span className="p-menuitem-text" data-pc-section="label">{menuItem.label}</span>
                </Link>
            ),
          }
        ))} />
      </div>
    </div>

  </React.Fragment >);
}