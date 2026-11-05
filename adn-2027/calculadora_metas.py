#!/usr/bin/env python3
"""Calculadora de metas ADN 2027 (solo librería estándar de Python).

Con tu presupuesto y tus comisiones, calcula cuántas ventas, alquileres,
leads, citas y captaciones necesitas por año, mes y semana.

Uso:
    python3 calculadora_metas.py                  # usa config.json de esta carpeta
    python3 calculadora_metas.py mi_config.json   # usa otro archivo
"""

import json
import math
import sys
from pathlib import Path

CONFIG_POR_DEFECTO = Path(__file__).with_name("config.json")


def arriba(x):
    """Redondea hacia arriba (no tiene sentido pedir 20,3 ventas)."""
    return math.ceil(x - 1e-9)


def calcular(c):
    fin = c["finanzas"]
    ven = c["ventas"]
    alq = c["alquileres"]
    emb = c["embudo"]
    pauta = c["pauta"]
    semanas = c["semanas_trabajo"]

    # 1) Dinero que necesitas ingresar en bruto (comisiones antes de impuestos/reserva)
    costos_mes = fin["gastos_fijos_mensuales"] + fin["marketing_mensual"]
    bruto_mes = (costos_mes + fin["ingreso_neto_deseado_mensual"]) / (1 - fin["reserva_impuestos_pct"])
    bruto_anio = bruto_mes * 12

    # 2) Lo que te queda por cada operación (tu parte de la comisión)
    neta_venta = ven["ticket_promedio"] * ven["comision_pct"] * ven["split_asesor_pct"]
    neta_alq = alq["ticket_mensual_promedio"] * alq["comision_meses"] * alq["split_asesor_pct"]

    # 3) Cuántas operaciones necesitas
    mix = c["mix_ventas_pct"]
    ventas_anio = arriba(bruto_anio * mix / neta_venta)
    alq_anio = arriba(bruto_anio * (1 - mix) / neta_alq)

    # 4) Embudo: de leads a cita a cierre
    leads_por_venta = 1 / (emb["venta_lead_a_cita"] * emb["venta_cita_a_cierre"])
    leads_por_alq = 1 / (emb["alquiler_lead_a_cita"] * emb["alquiler_cita_a_cierre"])
    leads_anio = arriba(ventas_anio * leads_por_venta + alq_anio * leads_por_alq)
    citas_anio = arriba(ventas_anio / emb["venta_cita_a_cierre"] + alq_anio / emb["alquiler_cita_a_cierre"])
    captaciones_anio = arriba(ventas_anio / emb["captacion_a_venta"])

    # 5) Presupuesto de pauta necesario vs. el que tienes
    leads_pagados = leads_anio * pauta["pct_leads_pagados"]
    pauta_necesaria_anio = leads_pagados * pauta["costo_por_lead"]
    pauta_disponible_anio = fin["marketing_mensual"] * 12

    return {
        "bruto_mes": bruto_mes,
        "bruto_anio": bruto_anio,
        "neta_venta": neta_venta,
        "neta_alq": neta_alq,
        "ventas_anio": ventas_anio,
        "alq_anio": alq_anio,
        "leads_anio": leads_anio,
        "citas_anio": citas_anio,
        "captaciones_anio": captaciones_anio,
        "pauta_necesaria_anio": pauta_necesaria_anio,
        "pauta_disponible_anio": pauta_disponible_anio,
        "semanas": semanas,
        "meses": 12,
    }


def usd(x):
    return f"${x:,.0f}"


def imprimir(c, r):
    s = r["semanas"]
    print("=" * 62)
    print("  METAS ADN 2027 – calculadora")
    print("=" * 62)
    print(f"Ingreso bruto necesario:   {usd(r['bruto_mes'])} al mes  |  {usd(r['bruto_anio'])} al año")
    print(f"Tu parte por VENTA:        {usd(r['neta_venta'])} neto")
    print(f"Tu parte por ALQUILER:     {usd(r['neta_alq'])} neto")
    print()
    print(f"{'Meta':<28}{'Año':>8}{'Mes':>8}{'Semana':>9}")
    print("-" * 53)
    filas = [
        ("Ventas cerradas", r["ventas_anio"]),
        ("Alquileres cerrados", r["alq_anio"]),
        ("Leads nuevos", r["leads_anio"]),
        ("Citas / visitas", r["citas_anio"]),
        ("Captaciones (propiedades)", r["captaciones_anio"]),
    ]
    for nombre, anual in filas:
        print(f"{nombre:<28}{anual:>8}{anual / r['meses']:>8.1f}{anual / s:>9.1f}")
    print()
    print("Presupuesto de pauta (Meta / Google / etc.)")
    print(f"  Necesario:   {usd(r['pauta_necesaria_anio'])} al año "
          f"({usd(r['pauta_necesaria_anio'] / 12)} al mes)")
    print(f"  Disponible:  {usd(r['pauta_disponible_anio'])} al año")
    if r["pauta_necesaria_anio"] > r["pauta_disponible_anio"]:
        falta = r["pauta_necesaria_anio"] - r["pauta_disponible_anio"]
        print(f"  ⚠ Te faltan {usd(falta)} al año: sube el marketing o baja la meta de leads pagados.")
    else:
        print("  ✅ Tu presupuesto de marketing alcanza para la meta de leads pagados.")
    print()
    print("Nota: las cifras son una estimación con los supuestos de config.json.")
    print("Ajusta tickets, comisiones, embudo y costo por lead con tus datos reales cada mes.")


if __name__ == "__main__":
    ruta = Path(sys.argv[1]) if len(sys.argv) > 1 else CONFIG_POR_DEFECTO
    with open(ruta, encoding="utf-8") as f:
        config = json.load(f)
    imprimir(config, calcular(config))
