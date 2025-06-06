# Suma de Teológia - Aplicación React Native

Una aplicación móvil para consultar la Suma de Teológia de Santo Tomás de Aquino en español y latín.

## Características

- **Diseño minimalista**: Usando los colores de la Orden de Predicadores (blanco, negro y gris)
- **Navegación intuitiva**: Organizada por Partes → Cuestiones → Artículos
- **Multiidioma**: Contenido disponible en español y latín
- **Estructura fiel**: Respeta la estructura original de la obra con objeciones, sed contra, corpus y respuestas
- **Sin backend**: Toda la información está almacenada localmente en formato JSON

## Estructura de la Aplicación

### Pantallas

1. **HomeScreen**: Página principal con cards para las 4 partes principales
   - I: Primera parte (Prima)
   - I-II: Primera sección de la segunda parte (Prima secundae)
   - II-II: Segunda sección de la segunda parte (Secunda secundae)
   - III: Tercera parte (Tertia)

2. **PartScreen**: Lista de cuestiones de una parte específica

3. **QuestionScreen**: Lista de artículos de una cuestión específica

4. **ArticleScreen**: Contenido completo del artículo con:
   - Selector de idioma (Español/Latín)
   - Objeciones
   - Sed Contra
   - Corpus (Respondo)
   - Respuestas a las objeciones

### Estructura del JSON

El archivo `data/sumaTeologica.json` contiene:

```json
{
  "title": "Suma de Teológia",
  "author": "Santo Tomás de Aquino (1225-1274)",
  "structure": {
    "parts": [
      {
        "id": "I",
        "title": "Primera parte",
        "questions": [
          {
            "id": 1,
            "title": "La Sagrada Doctrina",
            "articles": [
              {
                "id": 1,
                "title": "Si es necesaria alguna otra doctrina...",
                "content": {
                  "es": {
                    "objections": [...],
                    "sed_contra": "...",
                    "corpus": "...",
                    "replies": [...]
                  },
                  "la": {
                    "objections": [...],
                    "sed_contra": "...",
                    "corpus": "...",
                    "replies": [...]
                  }
                }
              }
            ]
          }
        ]
      }
    ]
  }
}
```

## Instalación

1. **Prerequisitos**:
   - Node.js (v16 o superior)
   - npm o yarn
   - Expo CLI (`npm install -g @expo/cli`)

2. **Clonar e instalar**:
   ```bash
   git clone [repository-url]
   cd SumaTeologica
   npm install
   ```

3. **Ejecutar la aplicación**:
   ```bash
   npm start
   ```

4. **Ver en dispositivo**:
   - Instalar Expo Go en tu dispositivo móvil
   - Escanear el código QR que aparece en la terminal

## Tecnologías Utilizadas

- **React Native**: Framework de desarrollo móvil
- **Expo**: Plataforma de desarrollo y despliegue
- **React Navigation**: Sistema de navegación
- **JSON**: Almacenamiento local de datos

## Fuente de los Datos

Los textos de la Suma de Teológia provienen de [hjg.com.ar/sumat/](https://hjg.com.ar/sumat/), una fuente confiable que ofrece el texto completo de la obra de Santo Tomás de Aquino.

## Estado del Proyecto

### Implementado ✅
- Estructura básica de navegación
- Diseño con colores de la Orden de Predicadores
- Selector de idioma (español/latín)
- Ejemplos de contenido para las 4 partes principales
- Estructura JSON completa

### Por Implementar 🚧
- Contenido completo de todas las cuestiones y artículos
- Funcionalidad de búsqueda
- Marcadores/favoritos
- Modo oscuro
- Función de compartir
- Navegación secuencial entre artículos

## Expansión de Contenido

Para agregar más contenido:

1. Extraer texto de [hjg.com.ar/sumat/](https://hjg.com.ar/sumat/)
2. Formatear según la estructura JSON existente
3. Agregar tanto versión en español como en latín
4. Mantener la estructura de objeciones, sed contra, corpus y respuestas

## Contribución

El proyecto está diseñado para ser expandido gradualmente. Las contribuciones para agregar más contenido de la Suma de Teológia son bienvenidas.

## Licencia

Este proyecto es de uso educativo y religioso. Los textos de la Suma de Teológia son de dominio público. 