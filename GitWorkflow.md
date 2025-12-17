# Git Workflow
Mario Castillo López
## Commits

`git commit -a -m "<Nombre>: <Descripción>"`

- **-a**: Añade todos los archivos, evita hacer "git add ."
- **-m**: Añade un mensaje.
- **<Nombre/>**: Nombre del creador del commit.
- **<Descripción/>**: Descripción de los cambios hechos al código.

`git log`: Ver el historial de commits de la rama.

## Branching
Ramas principales:
- **Main**: Rama principal donde se meterán las versiones estables.
- **Develop**: Rama que se dividirá para llevar a cabo el desarrollo y donde se fusionarán los cambios.

### Estructura de las ramas
La forma de declarar una rama primero será en función del tipo de modificación que vayamos a hacer:
- **feature/**: Cuando vayamos a crear código nuevo y funciones nuevas.
- **update/**: Cuando vayamos a modificar código existente para hacer cambios necesarios o de funcionalidad.
- **fix/**: Cuando vayamos a arreglar un bug o corregir un error.
- **otros/**

Después de declarar el tipo de la rama, se declarará un nombre corto y descriptivo de los cambios que se van a hacer.
**Ejemplo:**
> feature/nuevo-item-daga

### Comandos de las ramas
- `git checkout <Rama/Commit>`: Moverse a una rama o commit existente.
- `git checkout -b <Rama>`: Crear una nueva rama. **-b** Indica que nos vamos a mover a la rama y a crearla simultaneamente.
- `git branch -d <Rama>`: Elimina una rama existente.
- `git merge <Rama>`: Fusionar rama especificada con rama actual.
- `git branch -a`: Mostrar listado de ramas.

## Workflow
1. Hacer **pull** para asegurarnos de que estamos trabajando con la última versión del repo.
2. Nos **moveremos** o a la última rama donde estuviésemos trabajando o a develop para crear una nueva.
3. Crear una nueva **rama**.
4. Hacer **commits** pertinentes.
5. Movernos de nuevo a rama **develop**.
6. Hacer **merge** para aplicar los cambios.

**Ejemplo para nueva rama:**
>- `git pull`
>- `git checkout develop`
>- `git checkout -b feature/nuevo-item-daga`
>- `git commit -a -m "Mario: Objeto daga creado y primeras funciones hechas."`
>- `git commit -a -m "Mario: Objeto daga completado."`
>- `git checkout develop`
>- `git merge feature/nuevo-item-daga`
>- `git branch -d feature/nuevo-item-daga`
>- `git push`

