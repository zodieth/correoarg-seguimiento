// /seguimiento/[id].jsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import "tailwindcss/tailwind.css";

function DetalleSeguimiento() {
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (router.query.id) {
      axios
        .post(`/api/correo/`, { id: router.query.id })
        .then((res) => {
          setData(res.data);
          data.pop();
        })
        .catch((err) => {
          // Manejar el error
          console.error(err);
        });
    }
  }, [router.query.id]);

  // const data = [
  //   {
  //     Fecha: "01-12-2023 11:11",
  //     Planta: "CENTRO PAQUETERIA QUILMES",
  //     Historia: "INTENTO DE ENTREGA",
  //     Estado: "ENTREGADO",
  //   },
  //   {
  //     Fecha: "01-12-2023 07:51",
  //     Planta: "CENTRO PAQUETERIA QUILMES",
  //     Historia: "EN PODER DEL DISTRIBUIDOR",
  //     Estado: "",
  //   },
  //   {
  //     Fecha: "01-12-2023 03:54",
  //     Planta: "CENTRO PAQUETERIA QUILMES",
  //     Historia: "LLEGADA AL CENTRO DE PROCESAMIENTO",
  //     Estado: "",
  //   },
  //   {
  //     Fecha: "30-11-2023 22:49",
  //     Planta: "PAQUETERIA VICENTE LOPEZ",
  //     Historia: "EN PROCESO DE CLASIFICACIÓN",
  //     Estado: "",
  //   },
  //   {
  //     Fecha: "30-11-2023 19:35",
  //     Planta: "PAQUETERIA VICENTE LOPEZ",
  //     Historia: "LLEGADA AL CENTRO DE PROCESAMIENTO",
  //     Estado: "",
  //   },
  //   {
  //     Fecha: "30-11-2023 17:17",
  //     Planta: "MAXIKIOSCO",
  //     Historia: "EN PROCESO DE CLASIFICACIÓN",
  //     Estado: "",
  //   },
  //   {
  //     Fecha: "30-11-2023 14:48",
  //     Planta: "MAXIKIOSCO",
  //     Historia: "INGRESO AL CORREO",
  //     Estado: "",
  //   },
  //   {
  //     Fecha: "30-11-2023 14:48",
  //     Planta: "MAXIKIOSCO",
  //     Historia: "REPESAJE",
  //     Estado: "",
  //   },
  //   {
  //     Fecha: "30-11-2023 10:48",
  //     Planta: "CORREO ARGENTINO",
  //     Historia: "PREIMPOSICION",
  //     Estado: "",
  //   },
  // ];

  return (
    <>
      {data ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Fecha
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Planta
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Historia
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Estado
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {data?.map((e) => {
                return (
                  <tr className="odd:bg-gray-50">
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {e.Fecha}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {e.Planta}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {e.Historia}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {e.Estado}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default DetalleSeguimiento;
