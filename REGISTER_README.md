# Sistema de Registro en 2 Pasos - SmartSales365

## 📋 Descripción

Sistema completo de registro de usuarios con recolección de datos del cliente en dos pasos:

**Paso 1:** Credenciales de usuario (usuario, email, contraseña)  
**Paso 2:** Datos del cliente (información personal y de ubicación)

## 🎯 Características

- ✅ Registro en 2 pasos con indicador visual de progreso
- ✅ Validación de contraseñas (mínimo 8 caracteres, confirmación)
- ✅ Selección de ubicación (Departamento → Ciudades filtradas)
- ✅ Campos personalizados (Razón Social, Sexo, Estado)
- ✅ Asociación automática del usuario al cliente
- ✅ Modales separados para Login y Registro
- ✅ Diseño responsive y profesional
- ✅ Navegación fluida entre modales

## 📦 Archivos Creados

### Frontend

#### Componentes
- `src/components/auth/RegisterModal.jsx` - Modal de registro en 2 pasos
- `src/components/auth/RegisterModal.css` - Estilos del modal de registro
- `src/components/auth/LoginModal.jsx` - Modal de login (actualizado)

#### API
- `src/api/ubicacionApi.js` - API para departamentos, ciudades y clientes

#### Context
- `src/context/AuthContext.jsx` - Context actualizado con gestión de modales

### Backend

#### Vistas
- `administracion/views.py` - CiudadViewSet actualizado con filtro por departamento

## 🚀 Flujo de Registro

### 1. Paso 1: Credenciales

El usuario ingresa:
- **Usuario** (username)
- **Email** (email)
- **Contraseña** (mínimo 8 caracteres)
- **Confirmar Contraseña** (debe coincidir)

Al hacer clic en **"Siguiente"**:
- Se validan todos los campos
- Se verifica que las contraseñas coincidan
- Se avanza al Paso 2

### 2. Paso 2: Datos del Cliente

El usuario ingresa:
- **Nombre Completo**
- **NIT/CI** (Número de identificación)
- **Teléfono**
- **Razón Social** (Persona Natural / Persona Jurídica)
- **Sexo** (Masculino / Femenino / Opcional)
- **Estado** (Activo / Inactivo)
- **Departamento** (Select dinámico)
- **Ciudad** (Filtrado según departamento seleccionado)

Al hacer clic en **"Registrarse"**:
1. Se crea el usuario en el backend (`/api/register/`)
2. Se obtiene el token JWT
3. Se crea el cliente asociado (`/api/clientes/`)
4. Se cierra el modal y el usuario queda autenticado

## 🔧 Uso

### Abrir Modal de Registro

Desde cualquier componente:

```jsx
import { useAuth } from '../../context/AuthContext';

function MiComponente() {
  const { openRegisterModal } = useAuth();
  
  return (
    <button onClick={openRegisterModal}>
      Registrarse
    </button>
  );
}
```

### Cambiar entre Login y Registro

Los modales tienen links para cambiar entre ellos:

- **LoginModal:** "¿No tienes cuenta? Regístrate aquí"
- **RegisterModal:** "¿Ya tienes cuenta? Inicia sesión aquí"

## 🎨 Características de UI/UX

### Indicador de Pasos

```
┌─────────┐              ┌─────────┐
│    1    │─────────────▶│    2    │
│ Cuenta  │              │  Datos  │
└─────────┘              └─────────┘
```

- **Activo:** Color azul con efecto de brillo
- **Completado:** Color verde (Paso 1 al avanzar)
- **Pendiente:** Color gris

### Validaciones en Tiempo Real

- Errores mostrados en un banner rojo con borde izquierdo
- Campos marcados como requeridos con asterisco (*)
- Select de ciudades deshabilitado hasta seleccionar departamento
- Botón "Registrarse" deshabilitado durante el proceso

### Diseño Responsive

- **Desktop:** Formularios en 2 columnas (grid)
- **Mobile:** Formularios en 1 columna
- Modal ajustado al 95% del ancho en pantallas pequeñas

## 📡 Endpoints Utilizados

### Autenticación

```http
POST /api/register/
Content-Type: application/json

{
  "username": "usuario123",
  "email": "usuario@example.com",
  "password": "password123",
  "password_confirm": "password123"
}
```

**Respuesta:**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "username": "usuario123",
    "email": "usuario@example.com"
  }
}
```

### Clientes

```http
POST /api/clientes/
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "nit_ci": "1234567",
  "telefono": "71234567",
  "razon_social": "natural",
  "sexo": "M",
  "estado": "activo",
  "ciudad_id": 5
}
```

### Ubicación

```http
GET /api/departamentos/
GET /api/ciudades/
GET /api/ciudades/?departamento=2
```

## 🔐 Seguridad

- El cliente se asocia automáticamente al usuario autenticado
- Los tokens JWT se almacenan en localStorage
- El refresh token se usa para renovar el access token
- Todos los endpoints protegidos requieren autenticación

## 📝 Ejemplo de Datos

### Departamentos y Ciudades

```javascript
departamentos: [
  { id: 1, nombre: "La Paz" },
  { id: 2, nombre: "Cochabamba" },
  { id: 3, nombre: "Santa Cruz" }
]

ciudades: [
  { id: 1, nombre: "La Paz", departamento: 1 },
  { id: 2, nombre: "El Alto", departamento: 1 },
  { id: 3, nombre: "Cochabamba", departamento: 2 },
  { id: 4, nombre: "Santa Cruz", departamento: 3 }
]
```

### Cliente Creado

```javascript
{
  "id": 1,
  "nombre": "Juan Pérez",
  "nit_ci": "1234567",
  "telefono": "71234567",
  "razon_social": "natural",
  "sexo": "M",
  "estado": "activo",
  "ciudad": {
    "id": 1,
    "nombre": "La Paz",
    "departamento": {
      "id": 1,
      "nombre": "La Paz"
    }
  },
  "usuario": 1,
  "fecha_registro": "2024-11-10T10:30:00Z"
}
```

## 🐛 Solución de Problemas

### Error: "No se pudieron cargar los departamentos"

**Causa:** El backend no está corriendo o el endpoint no está configurado  
**Solución:** Verifica que el backend esté en http://127.0.0.1:8000 y que los routers estén registrados en `urls.py`

### Error: "Primero seleccione un departamento"

**Causa:** El usuario intenta seleccionar una ciudad sin seleccionar un departamento  
**Solución:** Esto es esperado. El campo de ciudades se habilita solo después de seleccionar un departamento.

### Error: "Error al crear cliente"

**Causa:** Token inválido o expirado  
**Solución:** El sistema debería refrescar el token automáticamente. Si persiste, el usuario debe hacer logout y volver a iniciar sesión.

### Las ciudades no se filtran

**Causa:** El ViewSet no tiene el método `get_queryset` implementado  
**Solución:** Ya está implementado en `administracion/views.py` - verifica que esté el código actualizado.

## 🔄 Mejoras Futuras

- [ ] Validación de formato de email en el frontend
- [ ] Validación de formato de teléfono (solo números)
- [ ] Subida de foto de perfil del cliente
- [ ] Verificación de email por correo electrónico
- [ ] Recuperación de contraseña
- [ ] Opción de registro social (Google, Facebook)
- [ ] Validación de NIT/CI con API externa

## 📚 Estructura de Carpetas

```
SmartSales365-frontend/
├── src/
│   ├── components/
│   │   └── auth/
│   │       ├── LoginModal.jsx        # Modal de login
│   │       ├── LoginModal.css        # Estilos compartidos
│   │       ├── RegisterModal.jsx     # Modal de registro (2 pasos)
│   │       └── RegisterModal.css     # Estilos específicos
│   ├── api/
│   │   ├── axiosConfig.js           # Configuración de axios
│   │   ├── authApi.js               # API de autenticación
│   │   └── ubicacionApi.js          # API de ubicación (NUEVO)
│   ├── context/
│   │   └── AuthContext.jsx          # Context de autenticación
│   └── main.jsx                      # Punto de entrada
```

## 🎓 Notas para Presentación Universitaria

Este sistema demuestra:

1. **Arquitectura limpia:** Separación de responsabilidades (API, Context, Componentes)
2. **UX avanzada:** Registro en pasos con validaciones en tiempo real
3. **Integración Backend-Frontend:** Comunicación con API REST
4. **Gestión de estado:** React Context API para autenticación global
5. **Diseño responsive:** Adaptación a diferentes tamaños de pantalla
6. **Seguridad:** Autenticación con JWT, validaciones de entrada
7. **Código reutilizable:** APIs modulares y hooks personalizados

## 📞 Soporte

Para dudas o problemas, consulta:
- `AUTH_README.md` - Documentación del sistema de autenticación base
- `README.md` - Documentación general del proyecto

---

**Desarrollado para:** SmartSales365  
**Versión:** 1.0  
**Fecha:** Noviembre 2024
