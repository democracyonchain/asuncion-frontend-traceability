<div align="center">
  <img src="https://vitejs.dev/logo.svg" width="120" alt="Vite Logo" />
</div>

<div align="center">
  <a href="https://react.dev/" target="_blank">
    <img src="https://img.shields.io/badge/React-18-blue.svg" alt="React">
  </a>
  <a href="https://www.typescriptlang.org/" target="_blank">
    <img src="https://img.shields.io/badge/TypeScript-5.x-blue.svg" alt="TypeScript">
  </a>
  <a href="https://vitejs.dev/" target="_blank">
    <img src="https://img.shields.io/badge/Vite-5.x-purple.svg" alt="Vite">
  </a>
  <a href="https://nodejs.org/" target="_blank">
    <img src="https://img.shields.io/badge/Node-%3E%3D18-green.svg" alt="NodeJS">
  </a>
</div>

---

# Traceability Frontend  
## Blockchain Voting System  
**STATUS:** ACTIVE

Frontend application for visualizing **end-to-end blockchain traceability** of electoral tally sheets (*actas de escrutinio*).  
This project is part of the **Blockchain Voting System** initiative.

---

## English Version

### Table of Contents
1. Author  
2. Project Phases  
3. Problem Statement  
4. Objective  
5. Scope  
6. Architecture  
7. Functional Features  
8. Technical Stack  
9. Environment Configuration  
10. Installation Procedure  
11. Development Workflow  
12. Versioning Strategy  
13. Deployment  
14. Security Considerations  

---

### Author
**David Tacuri**  
Lead Architect & Full Stack Developer

---

### Project Phases
- [x] Planning  
- [x] Implementation  
- [ ] Production  

---

### Problem Statement

Traditional manual vote counting processes lack transparent and verifiable mechanisms for public auditing.  
Once tally sheets are scanned, citizens and auditors cannot independently verify:
- Data integrity
- Image authenticity
- State transitions between process phases

---

### Objective

To provide a **read-only, verifiable, and transparent frontend** that allows any authorized user to trace the lifecycle of an electoral tally sheet registered on the blockchain.

---

### Scope

✔ Visualization of traceability timeline  
✔ Verification of blockchain transactions  
✔ Metadata inspection  
✔ Secure IPFS image retrieval  
✔ Support for institutional audits  

❌ Vote counting  
❌ Data modification  
❌ Blockchain write operations  

---

### Architecture

- Single Page Application (SPA)
- API-first approach
- No direct blockchain interaction from frontend
- Backend handles Cardano and IPFS communication

```
User → React UI → Traceability API → Cardano / IPFS
```

---

### Functional Features

- Acta timeline visualization
- Transaction hash validation
- Metadata decoding and display
- IPFS file download
- Multi-phase traceability (scan, digitization, QA)

---

### Technical Stack

| Layer | Technology |
|-----|-----------|
| UI | React 18 |
| Language | TypeScript |
| Build Tool | Vite |
| Runtime | Node.js |
| Communication | REST API |
| Output | Static Assets |

---

### Environment Configuration

Create `.env` from `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:5116
VITE_METADATA_BASE_URL=http://localhost:5116
```

---

### Installation Procedure

```bash
git clone https://github.com/democracyonchain/asuncion-frontend-traceability.git
cd asuncion-frontend-traceability
npm install
npm run dev
```

---

### Development Workflow

1. Develop features in feature branches  
2. Merge into main branch  
3. Tag releases using SemVer  

---

### Versioning Strategy

This project follows **Semantic Versioning**:

```
MAJOR.MINOR.PATCH
```

Example:
- v0.1.0 – Initial functional release

---

### Deployment

- `npm run build` generates `/dist`
- Deployable to any static hosting
- Environment variables configured per environment

---

### Security Considerations

- Frontend is read-only
- No private keys or secrets stored
- All sensitive operations handled by backend

---

********************************************************************************************************************

## Versión en Español

# Frontend de Trazabilidad  
## Blockchain Voting System  
**ESTADO:** ACTIVO

Aplicación frontend para la visualización de la **trazabilidad completa en blockchain** de actas de escrutinio electoral.

---

### Tabla de Contenidos
1. Autor  
2. Fases del Proyecto  
3. Problema  
4. Objetivo  
5. Alcance  
6. Arquitectura  
7. Funcionalidades  
8. Stack Tecnológico  
9. Configuración de Entorno  
10. Procedimiento de Instalación  
11. Flujo de Desarrollo  
12. Estrategia de Versionado  
13. Despliegue  
14. Consideraciones de Seguridad  

---

### Autor
**David Tacuri**  
Arquitecto Líder y Desarrollador Full Stack

---

### Fases del Proyecto
- [x] Planificación  
- [x] Implementación  
- [ ] Producción  

---

### Problema

Los procesos tradicionales de escrutinio manual carecen de mecanismos verificables de auditoría pública, lo que dificulta garantizar:
- Integridad de los datos
- Autenticidad de las imágenes
- Transparencia del proceso

---

### Objetivo

Proveer un frontend **de solo lectura**, transparente y verificable que permita rastrear el ciclo de vida completo de un acta registrada en blockchain.

---

### Alcance

✔ Visualización de línea de tiempo  
✔ Verificación de transacciones blockchain  
✔ Inspección de metadatos  
✔ Descarga segura de imágenes IPFS  
✔ Auditoría institucional  

❌ Conteo de votos  
❌ Modificación de datos  
❌ Escritura en blockchain  

---

### Arquitectura

- SPA (Single Page Application)
- Comunicación exclusiva vía API
- Blockchain gestionada solo en backend

```
Usuario → React UI → API de Trazabilidad → Cardano / IPFS
```

---

### Funcionalidades

- Visualización de fases del acta
- Validación de hash de transacciones
- Consulta de metadatos
- Descarga de archivos IPFS
- Trazabilidad por etapas

---

### Stack Tecnológico

| Capa | Tecnología |
|-----|-----------|
| UI | React 18 |
| Lenguaje | TypeScript |
| Build | Vite |
| Runtime | Node.js |
| Comunicación | API REST |
| Resultado | Archivos Estáticos |

---

### Configuración de Entorno

```env
VITE_API_BASE_URL=http://localhost:5116
VITE_METADATA_BASE_URL=http://localhost:5116
```

---

### Procedimiento de Instalación

```bash
git clone https://github.com/democracyonchain/asuncion-frontend-traceability.git
cd asuncion-frontend-traceability
npm install
npm run dev
```

---

### Flujo de Desarrollo

1. Desarrollo en ramas feature  
2. Integración en rama principal  
3. Versionado con tags SemVer  

---

### Estrategia de Versionado

```
MAJOR.MINOR.PATCH
```

Ejemplo:
- v0.1.0 – Primera versión funcional

---

### Despliegue

- `npm run build` genera `/dist`
- Despliegue en servidores institucionales
- Variables por entorno

---

### Consideraciones de Seguridad

- Frontend sin escritura de datos
- No almacena secretos
- Seguridad delegada al backend
