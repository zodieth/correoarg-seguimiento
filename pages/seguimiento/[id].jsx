"use client";
import React from "react";
import { useRouter } from "next/router";

function DetalleSeguimiento({}) {
  const router = useRouter();

  console.log(router.query.id);

  return <div>DetalleSeguimiento</div>;
}

export default DetalleSeguimiento;
