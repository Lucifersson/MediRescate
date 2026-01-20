# 📝 Documentación de Etiquetas de Comentarios (Annotations)

Estas etiquetas se utilizan para estandarizar la comunicación dentro del código, facilitando el mantenimiento y la búsqueda de puntos críticos mediante herramientas como **Telescope** o **Trouble.nvim**.

## 🚀 Implementación en el Código

Para que el resaltado funcione, la mayoría de los motores requieren que la etiqueta esté en **mayúsculas** y seguida de **dos puntos** o un espacio claro dentro de un comentario.

Lua

```
-- TODO: Implementar la validación de archivos aquí
-- FIX: Corregir el desbordamiento de memoria en el bucle
```

---

## 🏷️ Diccionario de Etiquetas

### 🔵 `TODO`

- **Definición:** Tareas pendientes que no son urgentes pero deben realizarse en el futuro.
    
- **Cuándo usarlo:** Cuando dejas una función a medias o planeas añadir una característica más adelante.
    
- **Ejemplo:**
    
    Python
    
    ```
    # TODO: Añadir soporte para archivos .zip
    ```
    

### 🔴 `FIX` / `FIXME` / `BUG`

- **Definición:** Indica código que está roto, que causa errores o que tiene un comportamiento incorrecto conocido.
    
- **Cuándo usarlo:** Cuando identificas un fallo que debe ser resuelto antes de pasar a producción.
    
- **Ejemplo:**
    
    JavaScript
    
    ```
    // FIXME: El cálculo del IVA devuelve NaN si el precio es 0
    ```
    

### 🟡 `WARN` / `WARNING`

- **Definición:** Advertencias sobre partes del código que son frágiles o donde un cambio podría romper dependencias ocultas.
    
- **Cuándo usarlo:** Para avisar a otros desarrolladores (o a ti mismo) que no toquen esa lógica sin precaución.
    
- **Ejemplo:**
    
    Lua
    
    ```
    -- WARNING: No cambiar el orden de estos parámetros, rompe la API de Hyprland
    ```
    

### 🟠 `HACK`

- **Definición:** Una solución rápida, poco elegante o temporal ("chapuza") que funciona pero debería refactorizarse.
    
- **Cuándo usarlo:** Cuando usas un "parche" para cumplir un plazo o solucionar un bug de librería externa.
    
- **Ejemplo:**
    
    C
    
    ```
    // HACK: Forzamos un delay de 10ms porque la cámara tarda en inicializar
    ```
    

### 🟣 `PERF`

- **Definición:** Notas sobre el rendimiento o puntos donde el código es ineficiente.
    
- **Cuándo usarlo:** Cuando detectas un cuello de botella pero no tienes tiempo de optimizarlo en ese momento.
    
- **Ejemplo:**
    
    Rust
    
    ```
    // PERF: Este bucle O(n^2) podría ser O(n log n) usando un HashMap
    ```
    

### 🟢 `NOTE`

- **Definición:** Información de contexto, recordatorios o explicaciones de por qué se tomó una decisión de diseño específica.
    
- **Cuándo usarlo:** Para evitar que alguien (o tú en el futuro) se pregunte "¿Por qué hice esto así?".
    
- **Ejemplo:**
    
    Bash
    
    ```
    # NOTE: Usamos ifuse aquí porque Arch no monta el iPhone automáticamente
    ```
