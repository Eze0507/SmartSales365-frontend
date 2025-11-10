# Sistema de Autenticación SmartSales365

Sistema completo de login/logout con modal para tu proyecto universitario.

## 📁 Estructura de Archivos Creados

```
src/
├── api/
│   ├── axiosConfig.js          # Configuración de axios con interceptores
│   └── authApi.js              # Funciones de autenticación (login, logout, register)
├── context/
│   └── AuthContext.jsx         # Context API para estado global de autenticación
├── components/
│   └── auth/
│       ├── LoginModal.jsx      # Modal de login/registro
│       └── LoginModal.css      # Estilos del modal
└── components/layout/
    └── Header.jsx              # Header actualizado con botones de auth
```

## 🚀 Cómo Funciona

### 1. Al hacer clic en "Login" o "Register"
- Se abre un **modal** (ventana emergente)
- **NO** redirige a otra página
- El modal aparece sobre la página actual

### 2. Formulario de Login
- Usuario
- Contraseña
- Botón "Iniciar Sesión"
- Link para cambiar a registro

### 3. Formulario de Registro
- Usuario
- Email
- Contraseña
- Confirmar Contraseña
- Botón "Registrarse"
- Link para cambiar a login

### 4. Usuario Autenticado
El Header muestra:
- Nombre de usuario
- Botón "Cerrar Sesión"

### 5. Usuario NO Autenticado
El Header muestra:
- Botón "Login"
- Botón "Register"

## 💻 Uso en Tu Código

### Acceder al usuario actual

```jsx
import { useAuth } from '../context/AuthContext';

function MiComponente() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <p>Hola, {user.username}!</p>
      ) : (
        <p>No has iniciado sesión</p>
      )}
    </div>
  );
}
```

### Abrir el modal de login programáticamente

```jsx
import { useAuth } from '../context/AuthContext';

function MiComponente() {
  const { openLoginModal } = useAuth();

  return (
    <button onClick={openLoginModal}>
      Iniciar Sesión
    </button>
  );
}
```

### Cerrar sesión

```jsx
import { useAuth } from '../context/AuthContext';

function MiComponente() {
  const { logout } = useAuth();

  return (
    <button onClick={logout}>
      Cerrar Sesión
    </button>
  );
}
```

## 🔐 Endpoints del Backend Utilizados

- `POST /api/login/` - Iniciar sesión
- `POST /api/register/` - Registrar usuario
- `POST /api/logout/` - Cerrar sesión
- `POST /api/refresh/` - Refrescar token (automático)

## 📝 Datos Guardados en localStorage

- `access` - Token de acceso JWT
- `refresh` - Token de refresh JWT
- `user` - Información del usuario (JSON)

## ✨ Características

- ✅ Modal elegante con animaciones
- ✅ Validación de formularios
- ✅ Mensajes de error claros
- ✅ Refresh automático de tokens
- ✅ Protección contra tokens expirados
- ✅ Diseño responsive (funciona en móvil)
- ✅ Código separado en carpetas (organizado)
- ✅ No redirige, todo en la misma página

## 🎨 Personalización

### Cambiar colores del modal

Edita `src/components/auth/LoginModal.css`:

```css
.btn-submit {
  background-color: #17a2b8;  /* Cambia este color */
}
```

### Cambiar tiempo de expiración del token

En el backend, edita `settings.py`:

```python
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),  # Cambia aquí
}
```

## 🐛 Solución de Problemas

### El modal no aparece
- Verifica que `LoginModal` esté en `main.jsx`
- Verifica que `AuthProvider` envuelva tu app

### Error de CORS
- Asegúrate que el backend tenga configurado CORS
- Verifica que `CORS_ALLOWED_ORIGINS` incluya `http://localhost:5173`

### Token inválido
- Verifica que el backend esté corriendo
- Verifica que la URL en `axiosConfig.js` sea correcta

## 📚 Para Tu Proyecto Universitario

Este código está:
- ✅ Bien organizado en carpetas
- ✅ Comentado y documentado
- ✅ Siguiendo buenas prácticas de React
- ✅ Separado por responsabilidades
- ✅ Listo para presentar

## 🎓 Explicación para la Presentación

1. **Frontend (React)**:
   - Context API para estado global
   - Axios con interceptores para tokens
   - Modal para UX mejorada (no redirige)

2. **Backend (Django REST Framework)**:
   - JWT para autenticación
   - Endpoints REST
   - Token blacklist para logout seguro

3. **Seguridad**:
   - Tokens JWT encriptados
   - Refresh automático
   - Logout con invalidación de tokens
